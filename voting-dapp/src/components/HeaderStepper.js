import PropTypes from 'prop-types';

import {
  Box,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';


function HeaderStepper({ step, steps }) {
  return (
      <Box
        component="header"
        sx={{ p: 2, border: '1px solid grey', borderRadius: '10px' }}
        className="App-header"
      >
        {/* Stepper */}
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={step} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Box>
  );
};

HeaderStepper.propTypes = {
  step: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default HeaderStepper;