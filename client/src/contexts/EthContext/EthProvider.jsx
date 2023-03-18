import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";


function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async artifact => {
      if (artifact && window.ethereum) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const accounts = await web3.eth.requestAccounts();
        console.log(`[init] account: ${accounts[0]}`);
        const networkID = await web3.eth.net.getId();
        const { abi } = artifact;
        let address, contract, currentStep, contractOwner, txhash, deployTx, deployBlock, latestBlock;
        latestBlock = await web3.eth.getBlockNumber();
        try {
          address = artifact.networks[networkID].address;
          console.log(`[init] contract address: ${address}`);
          contract = new web3.eth.Contract(abi, address);
          currentStep = parseInt(await contract.methods.workflowStatus().call({ from: accounts[0] }));
          contractOwner = await contract.methods.owner().call({ from: accounts[0] });
          txhash = artifact.networks[networkID].transactionHash;
          deployTx = await web3.eth.getTransaction(txhash);
          deployBlock = deployTx.blockNumber;


        } catch (err) {
          console.error(err);
        }
        dispatch({
          type: actions.init,
          data: { artifact, web3, accounts, networkID, contract, txhash, deployTx, deployBlock, latestBlock, step: currentStep, owner: contractOwner }
        });
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = require("../../contracts/Voting.json");
        init(artifact);
        console.log(window.ethereum);
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
    if (window.ethereum) {
      events.forEach(e => window.ethereum.on(e, handleChange));
    }
    return () => {
      if (window.ethereum) {
        events.forEach(e => window.ethereum.removeListener(e, handleChange));
      }
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
  }, [state.accounts, state.owner, state.voters]);

  /* Events management used to update the state */
  useEffect(() => {
    (async function () {
      if (state.contract) {
        let options = {
          filter: {},
          fromBlock: state.deployBlock,
          toBlock: 'latest'
        };

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
        if (state.voters.length === 0) {
          state.contract.getPastEvents('VoterRegistered', options)
            .then(voters => {
              // console.log('getPastEvents');
              voters.map((voter) => {
                addVoter(voter.returnValues.voterAddress);
              })
            })
            .catch(err => console.log(err));
        }

        // 1-B detect new voter addition
        await state.contract.events.VoterRegistered({ fromBlock: "latest" })
          .on('data', event => {
            if (event.blockNumber > state.latestBlock) {
              const voterAddress = event.returnValues.voterAddress;
              addVoter(voterAddress);
              state.latestBlock = event.blockNumber
            }
          })
          .on('error', err => console.log(err))


        /* 2 STEP CHANGE: WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus) */
        await state.contract.events.WorkflowStatusChange({ fromBlock: "latest" })
          .on('data', event => {
            if (event.blockNumber > state.latestBlock) {
              const newStep = parseInt(event.returnValues.newStatus);
              state.latestBlock = event.blockNumber;
              dispatch({
                type: actions.updateStep,
                data: newStep
              });
            }
          })
          .on('error', err => console.log(err))

        /* 3 New proposal registered: ProposalRegistered(uint proposalId) */
        const addProposal = async (id, transactionHash) => {
          // TODO: check desc doesn't exist
          // => should be done before the form submission
          const prop = await state.contract.methods.getOneProposal(id).call({ from: state.accounts[0] });
          const transac = await state.web3.eth.getTransaction(transactionHash);

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
        // 3-A get all already registered proposals
        if (state.proposals.length === 0) {
          state.contract.getPastEvents('ProposalRegistered', options)
            .then(proposals => {
              proposals.map((proposal) => {
                // console.log(proposal);
                addProposal(
                  proposal.returnValues.proposalId,
                  proposal.transactionHash,
                );
              })
            })
            .catch(err => console.log(err));
        }

        // 3-B detect new proposal addition
        await state.contract.events.ProposalRegistered({ fromBlock: "latest" })
          .on('data', event => {
            if (event.blockNumber > state.latestBlock) {
              addProposal(
                event.returnValues.proposalId,
                event.transactionHash,
              );
              state.latestBlock = event.blockNumber;
            }
          })
          .on('error', err => console.log(err));

        const addVote = async (addr, propId) => {
          dispatch({
            type: actions.addVote,
            data: {
              voter: addr,
              proposalId: propId,
            }
          });
        };

        // 4.A get all previous votes
        if (state.votes.length === 0) {
          state.contract.getPastEvents('Voted', options)
            .then(votes => {
              votes.map((vote) => {
                addVote(vote.returnValues.voter, vote.returnValues.proposalId);
              })
            })
            .catch(err => console.log(err));
        }
        /* 4.B Voter submit a vote: Voted (address voter, uint proposalId) */
        await state.contract.events.Voted({ fromBlock: "latest" })
          .on('data', event => {
            if (event.blockNumber > state.latestBlock) {
              addVote(event.returnValues.address, event.returnValues.proposalId);
              state.latestBlock = event.blockNumber;
            }
          })
          .on('error', err => console.log(err))

        return () => {
          state.contract.events.removeEventListener('VoterRegistered');
          state.contract.events.removeEventListener('WorkflowStatusChange');
          state.contract.events.removeEventListener('ProposalRegistered');
          state.contract.events.removeEventListener('Voted');

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
