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

  /* Smart contract events management 
    used to update the state
*/
  useEffect(() => {
    (async function () {
      /* VoterRegistered(address voterAddress) */
      // TODO

      /* WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus) */
      try {
        await state.contract.events.WorkflowStatusChange({ fromBlock: "latest" })
          .on('data', event => {
            // console.log(event)
            const newWstate = parseInt(event.returnValues.newStatus);
            if (newWstate !== state.currentStep) {
              dispatch({
                type: actions.updateCurrentStep,
                data: { newWstate }
              });
            }
          })
          .on('error', err => console.log(err))
      } catch (err) {
        //console.error(err);
      }

      // ProposalRegistered(uint proposalId);
      // TODO

      // Voted (address voter, uint proposalId);
      // TODO

      // example
      if (false) {
        let oldEvents = await state.contract.getPastEvents('valueChanged', {
          fromBlock: 0,
          toBlock: 'latest'
        });
        let oldies = [];
        oldEvents.forEach(event => {
          oldies.push(event.returnValues._val);
        });
        //setOldEvents(oldies);

        await state.contract.events.valueChanged({ fromBlock: "earliest" })
          .on('data', event => {
            let lesevents = event.returnValues._val;
            //setEventValue(lesevents);
          })
          .on('changed', changed => console.log(changed))
          .on('error', err => console.log(err))
          .on('connected', str => console.log(str))
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
