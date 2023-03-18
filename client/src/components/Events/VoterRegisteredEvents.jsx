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
  // Detect old and new voter addition using gestPastEvents and txHash
  // This is REALLY DIRTY don't do this at home !!!!!
  useEffect(() => {
    (async function () {

      if (contract) {
        let options = {
          fromBlock: lastBlockVR,
          toBlock: 'latest'
        };

        contract.getPastEvents('VoterRegistered', options)
          .then(events => {
            events.map((event) => {
              const find = voters.filter((voter) => voter.txHash === event.transactionHash);
              if (find.length === 0) {
                addVoter(event.returnValues.voterAddress, event.transactionHash);
                setLastBlockVR(event.blockNumber);
              }
            })
          })
          .catch(err => console.log(err));

      }
    })();
  })

}

export default VoterRegisteredEvents;
