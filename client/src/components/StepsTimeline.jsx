import {
  Box,
  Typography,
  MobileStepper,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import useEth from "./../contexts/EthContext/useEth";
import { stepsLabel } from './../helper/const';

function StepsTimeline() {
  const theme = useTheme();
  const mobile = !useMediaQuery(theme.breakpoints.up('sm'));

  let { state: { step } } = useEth();
  step = step || 0;

  return (
    <>
      {/* Mobile display */}
      {mobile && (
        <Box
          component="header"
          sx={{
            p: 2, border: '1px solid grey', borderRadius: '10px',
            maxWidth: 600, flexGrow: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center'
          }}
          className="App-header"
        >
          <Typography sx={{ color: 'black', textAlign: 'center' }}>
            {stepsLabel[step]}
          </Typography>
          <MobileStepper
            variant="dots"
            steps={stepsLabel.length}
            position="static"
            activeStep={step}
            sx={{ backgroundColor: 'var(--light-grey)' }}
          />
          <MobileStepper
            variant="text"
            steps={stepsLabel.length}
            position="static"
            activeStep={step}
            sx={{ backgroundColor: 'var(--light-grey)' }}
          />
        </Box>
      )}
      {/* Desktop display */}
      {!mobile && (
        <Box
          component="header"
          sx={{ p: 2, border: '1px solid grey', borderRadius: '10px' }}
          className="App-header"
        >
          {/* Stepper */}
          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={step} alternativeLabel>
              {stepsLabel.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Box>
      )}
    </>
  );
};

export default StepsTimeline;