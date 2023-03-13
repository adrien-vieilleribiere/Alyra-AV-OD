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
        const networkID = await web3.eth.net.getId();
        const { abi } = artifact;
        let address, contract, step, contractOwner;
        try {
          address = artifact.networks[networkID].address;
          contract = new web3.eth.Contract(abi, address);
          step = parseInt(await contract.methods.workflowStatus().call({ from: accounts[0] }));
          contractOwner = await contract.methods.owner().call({ from: accounts[0] });
        } catch (err) {
          console.error(err);
        }
        dispatch({
          type: actions.init,
          data: { artifact, web3, accounts, networkID, contract, currentStep: step, owner: contractOwner }
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
        /* New voter registered 
          VoterRegistered(address voterAddress) */
        // TODO

        /* Status change 
          WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus) */
        await state.contract.events.WorkflowStatusChange({ fromBlock: "latest" })
          .on('data', event => {
            const newStep = parseInt(event.returnValues.newStatus);
            dispatch({
              type: actions.updateCurrentStep,
              data: { newStep }
            });
          })
          .on('error', err => console.log(err))

        /* New propsal registered 
          ProposalRegistered(uint proposalId) */
        // TODO

        /* Voter submit a vote 
          Voted (address voter, uint proposalId) */
        // TODO
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
