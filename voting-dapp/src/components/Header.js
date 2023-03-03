import PropTypes from 'prop-types';

import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';


function Header({ step, steps }) {
  return (
    <Box
      component="header"
      sx={{ p: 2, border: '1px solid grey', borderRadius: '10px' }}
      className="App-header"
    >
      <Box sx={{ flexGrow: 1, mt:1, mb:4 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
              Voting app
            </Typography>
             {/* TODO: Add Metamask connection widget*/}
            <Button color="inherit">Metamask widget</Button>
          </Toolbar>
        </AppBar>
      </Box>

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

Header.propTypes = {
  step: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Header;