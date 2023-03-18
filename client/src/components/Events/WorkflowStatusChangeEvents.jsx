import { useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";

function WorkflowStatusChangeEvents() {
  const { state: { contract }, actions, dispatch } = useEth();

  /* STEP CHANGE: WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus) */
  useEffect(() => {
    (async function () {
      if (contract) {

        await contract.events.WorkflowStatusChange({ fromBlock: "latest" })
          .on('data', event => {
            const newStep = parseInt(event.returnValues.newStatus);
            dispatch({
              type: actions.updateStep,
              data: newStep
            });
          })
          .on('error', err => console.log(err))

        return () => {
          contract.events.removeEventListener('WorkflowStatusChange');
        }

      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default WorkflowStatusChangeEvents;
