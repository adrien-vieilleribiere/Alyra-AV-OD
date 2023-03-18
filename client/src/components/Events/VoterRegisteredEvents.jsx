import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function VoterRegisteredEvents() {
  const { state: { contract, voters, deployBlock }, actions, dispatch } = useEth();
  const [lastBlockVR, setLastBlockVR] = useState(deployBlock);

  const addVoter = (address, txHash) => {
    dispatch({
      type: actions.addVoter,
      data: {
        address: address,
        hasVoted: false,
        votedProposalId: 0,
        txHash: txHash,
      }
    });
  };

  /* NEW VOTER REGISTERED: VoterRegistered(address voterAddress) */
  // Get all already registered voters
  useEffect(() => {
    (async function () {

      if (contract) {
        let options = {
          filter: {},
          fromBlock: deployBlock,
          toBlock: 'latest'
        };

        if (voters.length === 0) {
          contract.getPastEvents('VoterRegistered', options)
            .then(events => {
              events.map((event) => {
                addVoter(event.returnValues.voterAddress, event.transactionHash);
                setLastBlockVR(event.blockNumber);
              })
            })
            .catch(err => console.log(err));
        }
      }
    })();
  }, [])

  // Detect new voter addition using gestPastEvents and txHash
  // This is REALLY DIRTY don't do this at home !!!!!
  useEffect(() => {
    (async function () {

      if (contract) {
        let options = {
          filter: {},
          fromBlock: lastBlockVR,
          toBlock: 'latest'
        };

        if (voters.length !== 0) {
          contract.getPastEvents('VoterRegistered', options)
            .then(events => {
              events.map((event) => {
                console.log(lastBlockVR);
                const find = voters.filter((voter) => voter.txHash === event.transactionHash);
                if (find.length === 0) {
                  addVoter(event.returnValues.voterAddress, event.transactionHash);
                  setLastBlockVR(event.blockNumber);
                }
              })
            })
            .catch(err => console.log(err));
        }
      }
    })();
  })

}



export default VoterRegisteredEvents;
