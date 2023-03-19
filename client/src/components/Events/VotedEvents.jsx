import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function VotedEvents() {
  const { state: { contract, votes, deployBlock }, actions, dispatch } = useEth();
  const [lastBlockV, setLastBlockV] = useState(deployBlock);
  const [votedDispached, setVotedDispached] = useState(false);
  const [voteCountDispached, setVoteCountDispached] = useState(false);

  const addVote = (addr, propId, txHash) => {

  };

  const setVoted = (addr, propId, txHash) => {
    dispatch({
      type: actions.setVoted,
      data: {
        address: addr,
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
                console.log("goAddVote")
                dispatch({
                  type: actions.addVote,
                  data: {
                    voter: event.returnValues.voter,
                    proposalId: event.returnValues.proposalId,
                    txHash: event.transactionHash,
                  }
                });
              }
              if (!votedDispached) {
                console.log("dispatch voted", event.returnValues.voter);
                setVotedDispached(true);
                dispatch({
                  type: actions.setVoted,
                  data: {
                    adress: event.returnValues.voter,
                    txHash: event.transactionHash,
                  }
                });
              }
              if (!voteCountDispached) {
                setVoteCountDispached(true);
                dispatch({
                  type: actions.incrementVoteCount,
                  data: {
                    proposalId: event.returnValues.proposalId,
                  }
                });
              }
              setLastBlockV(event.blockNumber);

            })
          })
          .catch(err => console.log(err));
      }
    })();
  },)
}

export default VotedEvents;
