import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";


function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async artifact => {
      if (artifact) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const accounts = await web3.eth.requestAccounts();
        console.log(`[init] account: ${accounts[0]}`);
        const networkID = await web3.eth.net.getId();
        const { abi } = artifact;
        let address, contract, currentStep, contractOwner;
        try {
          address = artifact.networks[networkID].address;
          console.log(`[init] contract address: ${address}`);
          contract = new web3.eth.Contract(abi, address);
          currentStep = parseInt(await contract.methods.workflowStatus().call({ from: accounts[0] }));
          contractOwner = await contract.methods.owner().call({ from: accounts[0] });
        } catch (err) {
          console.error(err);
        }
        dispatch({
          type: actions.init,
          data: { artifact, web3, accounts, networkID, contract, step: currentStep, owner: contractOwner }
        });
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = require("../../contracts/Voting.json");
        init(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  /* User connection and role management */
  useEffect(() => {
    const getUserInfo = () => {
      const user = {
        isConnected: false,
        isOwner: false,
        isVoter: false,
      };
      // isConnected ?
      if (state.accounts && state.accounts.length !== 0) {
        user.isConnected = true;
        // isOwner ?
        if (state.accounts[0] === state.owner) {
          user.isOwner = true;
        }
        // isVoter ?
        const voter = state.voters.filter((voter) =>
          voter.address === state.accounts[0]
        )
        if (voter.length !== 0) {
          user.isVoter = true;
        }
      }
      dispatch({
        type: actions.updateUserInfo,
        data: user,
      });
    };

    getUserInfo();
  }, [state.accounts]);

  /* Events management used to update the state */
  useEffect(() => {
    (async function () {
      if (state.contract) {
        /* 1 NEW VOTER REGISTERED: VoterRegistered(address voterAddress) */
        const addVoter = (address) => {
          dispatch({
            type: actions.addVoter,
            data: {
              address: address,
              hasVoted: false,
              votedProposalId: 0,
            }
          });
        };

        // 1-A get all already registered voters
        let options = {
          filter: {},
          fromBlock: 0,
          toBlock: 'latest'
        };
        state.contract.getPastEvents('VoterRegistered', options)
          .then(voters => {
            // console.log('getPastEvents');
            voters.map((voter) => {
              addVoter(voter.returnValues.voterAddress);
            })
          })
          .catch(err => console.log(err));

        // 1-B detect new voter addition
        await state.contract.events.VoterRegistered({ fromBlock: "latest" })
          .on('data', event => {
            const voterAddress = event.returnValues.voterAddress;
            // console.log(`event2: ${voterAddress}`);
            // console.log(event);
            addVoter(voterAddress);
          })
          .on('error', err => console.log(err))

        /* 2 STEP CHANGE: WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus) */
        await state.contract.events.WorkflowStatusChange({ fromBlock: "latest" })
          .on('data', event => {
            const newStep = parseInt(event.returnValues.newStatus);
            // console.log(event.returnValues.newStatus)
            dispatch({
              type: actions.updateStep,
              data: newStep
            });
          })
          .on('error', err => console.log(err))

        /* 3 New proposal registered: ProposalRegistered(uint proposalId) */
        const addProposal = async (id, transactionHash) => {
          // TODO: check desc doesn't exist

          console.log(`Prop id: ${id}`);
          console.log(`hash: ${transactionHash}`);
          const prop = await state.contract.methods.getOneProposal(id).call({ from: state.accounts[0] });
          const transac = await state.web3.eth.getTransaction(transactionHash)
          console.log(transac);

          dispatch({
            type: actions.addProposal,
            data: {
              id: id,
              description: prop.description,
              submitter: transac.from,
              voteCount: 0,
            }
          });
        };
        // 3-A get all already registered voters
        state.contract.getPastEvents('ProposalRegistered', options)
          .then(proposals => {
            proposals.map((proposal) => {
              console.log(proposal);
              addProposal(
                proposal.returnValues.proposalId,
                proposal.transactionHash              ,
              );
            })
          })
          .catch(err => console.log(err));

        // 3-B detect new proposal addition
        await state.contract.events.ProposalRegistered({ fromBlock: "latest" })
          .on('data', event => {
            addProposal(
              event.returnValues.proposalId,
              event.transactionHash              ,
            );
          })
          .on('error', err => console.log(err))

        /* Voter submit a vote: Voted (address voter, uint proposalId) */
        // TODO

        return () => {
          state.contract.events.removeEventListener('VoterRegistered');
          state.contract.events.removeEventListener('WorkflowStatusChange');
          state.contract.events.removeEventListener('ProposalRegistered');
        }
      }
    })();
  }, [state.contract])

  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
