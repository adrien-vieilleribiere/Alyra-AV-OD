import { useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";

function VotedEvents() {
  const { state: { contract, votes, deployBlock }, actions, dispatch } = useEth();

  /* NEW VOTE : Voted (address voter, uint proposalId) */
  useEffect(() => {
    (async function () {

      if (contract) {
        let options = {
          filter: {},
          fromBlock: deployBlock,
          toBlock: 'latest'
        };

        const addVote = async (addr, propId) => {
          dispatch({
            type: actions.addVote,
            data: {
              voter: addr,
              proposalId: propId,
            }
          });
        };

        // Get all previous votes
        if (votes.length === 0) {
          contract.getPastEvents('Voted', options)
            .then(votes => {
              votes.map((vote) => {
                addVote(vote.returnValues.voter, vote.returnValues.proposalId);
              })
            })
            .catch(err => console.log(err));
        }
        /* Detect new event */
        await contract.events.Voted({ fromBlock: "latest" })
          .on('data', event => {
            addVote(event.returnValues.address, event.returnValues.proposalId);
          })
          .on('error', err => console.log(err))

        return () => {
          contract.events.removeEventListener('Voted');
        }
      }
    })();
  }, [])
}

export default VotedEvents;
