import React, { useEffect, useState } from "react";
import useEth from "./../contexts/EthContext/useEth";
import { stepsNextLabel } from '../helper/const';


import {
  Button
} from '@mui/material';

import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';

function StepIncrementer({ step }) {
  console.log("step", step);
  step = step || 0;
  console.log("step", step);
  const [nextBtnDisabled, SetNextBtnDisabled] = useState(true);
  const { state: { contract, currentStep, accounts } } = useEth();

  useEffect(() => {
    // Next Step Button status management
    SetNextBtnDisabled(step > 4);
  }, [step]);

  const increaseWstate = async () => {
    const _step = parseInt(await contract.methods.workflowStatus().call({ from: accounts[0] }));
    switch (_step) {
      case 0:
        contract.methods.startProposalsRegistering().send({ from: accounts[0] });
        break;
      case 1:
        await contract.methods.endProposalsRegistering().send({ from: accounts[0] });
        break;
      case 2:
        await contract.methods.startVotingSession().send({ from: accounts[0] });
        break;
      case 3:
        await contract.methods.endVotingSession().send({ from: accounts[0] });
        break;
      case 4:
        await contract.methods.tallyVotes().send({ from: accounts[0] });
        break;
      default:
        console.log("vote inna bad state");
    }
  };

  return (
    <>
      {/* Button for step changing */}
      <Button variant="contained" onClick={increaseWstate}
        disabled={nextBtnDisabled}> {stepsNextLabel[currentStep]}
        <ArrowForwardIcon sx={{ ml: 1 }} /></Button>
    </>
  );
}

export default StepIncrementer;
