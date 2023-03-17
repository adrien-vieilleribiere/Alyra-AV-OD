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
        let address, contract, currentStep, contractOwner, txhash, deployTx, deployBlock;
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
          data: {
            artifact, web3, accounts, networkID, contract, txhash, deployTx,
            deployBlock, step: currentStep, owner: contractOwner
          }
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
    if (window.ethereum) {
      events.forEach(e => window.ethereum.on(e, handleChange));
    }
    return () => {
      if (window.ethereum) {
        events.forEach(e => window.ethereum.removeListener(e, handleChange));
      }
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider value={{
      state,
      actions,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
