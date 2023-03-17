import { useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ProposalRegisteredEvents() {
  const { state: { web3, contract, accounts, proposals, deployBlock }, actions, dispatch } = useEth();

  /* NEW PROPOSAL REGISTERED: ProposalRegistered(uint proposalId) */
  useEffect(() => {
    (async function () {

      if (contract) {
        let options = {
          filter: {},
          fromBlock: deployBlock,
          toBlock: 'latest'
        };

        const addProposal = async (id, transactionHash) => {
          const prop = await contract.methods.getOneProposal(id).call({ from: accounts[0] });
          const transac = await web3.eth.getTransaction(transactionHash)

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

        // Get all already registered proposals
        if (proposals.length === 0) {
          contract.getPastEvents('ProposalRegistered', options)
            .then(proposals => {
              proposals.map((proposal) => {
                addProposal(
                  proposal.returnValues.proposalId,
                  proposal.transactionHash,
                );
              })
            })
            .catch(err => console.log(err));
        }

        // Detect new proposal addition
        await contract.events.ProposalRegistered({ fromBlock: "latest" })
          .on('data', event => {
            addProposal(
              event.returnValues.proposalId,
              event.transactionHash,
            );
          })
          .on('error', err => console.log(err))

        return () => {
          contract.events.removeEventListener('ProposalRegistered');
        }
      }
    })();
  }, [])
}

export default ProposalRegisteredEvents;
