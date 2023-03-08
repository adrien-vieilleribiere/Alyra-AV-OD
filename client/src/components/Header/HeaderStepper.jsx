import {
  Box,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';

import useEth from "../../contexts/EthContext/useEth";
import { stepsLabel } from '../../helper/const';

function HeaderStepper() {
  const { state: { currentStep } } = useEth();

  return (
    <Box
      component="header"
      sx={{ p: 2, border: '1px solid grey', borderRadius: '10px' }}
      className="App-header"
    >
      {/* Stepper */}
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={currentStep} alternativeLabel>
          {stepsLabel.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  );
};

export default HeaderStepper;