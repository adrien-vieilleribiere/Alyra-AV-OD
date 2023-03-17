import { useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";

function VoterRegisteredEvents() {
  const { state: { contract, voters, deployBlock }, actions, dispatch } = useEth();

  /* NEW VOTER REGISTERED: VoterRegistered(address voterAddress) */
  useEffect(() => {
    (async function () {

      if (contract) {
        let options = {
          filter: {},
          fromBlock: deployBlock,
          toBlock: 'latest'
        };

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

        // Get all already registered voters
        if (voters.length === 0) {
          contract.getPastEvents('VoterRegistered', options)
            .then(voters => {
              voters.map((voter) => {
                addVoter(voter.returnValues.voterAddress);
              })
            })
            .catch(err => console.log(err));
        }

        // Detect new voter addition
        await contract.events.VoterRegistered({ fromBlock: "latest" })
          .on('data', event => {
            addVoter(event.returnValues.voterAddress);
          })
          .on('error', err => console.log(err))

        return () => {
          contract.events.removeEventListener('VoterRegistered');
        }
      }
    })();
  }, [])
}

export default VoterRegisteredEvents;
