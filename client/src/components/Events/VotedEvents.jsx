import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function VotedEvents() {
  const { state: { contract, votes, deployBlock }, actions, dispatch } = useEth();
  const [lastBlockV, setLastBlockV] = useState(deployBlock);

  const addVote = (addr, propId, txHash) => {
    dispatch({
      type: actions.addVote,
      data: {
        voter: addr,
        proposalId: propId,
        txHash: txHash,
      }
    });
  };

  /* NEW VOTE : Voted (address voter, uint proposalId) */
  // Detect old and new event voter addition using gestPastEvents and txHash
  // This is REALLY DIRTY don't do this at home !!!!!
  useEffect(() => {
    (async function () {

      if (contract) {
        let options = {
          fromBlock: lastBlockV,
          toBlock: 'latest'
        };

        contract.getPastEvents('Voted', options)
          .then(events => {
            events.map((event) => {
              const find = votes.filter((vote) => vote.txHash === event.transactionHash);
              if (find.length === 0) {
                addVote(
                  event.returnValues.voter,
                  event.returnValues.proposalId,
                  event.transactionHash
                );
                setLastBlockV(event.blockNumber);
              }
            })
          })
          .catch(err => console.log(err));
      }
    })();
  })
}

export default VotedEvents;
