import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ProposalRegisteredEvents() {
  const { state: { web3, contract, accounts, proposals, deployBlock }, actions, dispatch } = useEth();
  const [lastBlockPR, setLastBlockPR] = useState(deployBlock);

  const addProposal = async (id, txHash) => {
    const prop = await contract.methods.getOneProposal(id).call({ from: accounts[0] });
    const transac = await web3.eth.getTransaction(txHash)

    dispatch({
      type: actions.addProposal,
      data: {
        id: id,
        description: prop.description,
        submitter: transac.from,
        voteCount: 0,
        txHash: txHash,
      }
    });
  };

  /* NEW PROPOSAL REGISTERED: ProposalRegistered(uint proposalId) */
  // Detect old and new proposal addition using gestPastEvents and txHash
  // This is REALLY DIRTY don't do this at home !!!!!
  useEffect(() => {
    (async function () {

      if (contract) {
        let options = {
          fromBlock: lastBlockPR,
          toBlock: 'latest'
        };

        contract.getPastEvents('ProposalRegistered', options)
          .then(events => {
            events.map((event) => {
              const find = proposals.filter(
                (proposal) => proposal.txHash === event.transactionHash
              );
              if (find.length === 0) {
                addProposal(
                  event.returnValues.proposalId,
                  event.transactionHash
                );
                setLastBlockPR(event.blockNumber);
              }
            })
          })
          .catch(err => console.log(err));

      }
    })();
  })

}

export default ProposalRegisteredEvents;
