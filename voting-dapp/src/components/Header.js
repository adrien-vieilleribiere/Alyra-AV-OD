import PropTypes from 'prop-types';

import {
    Box,
    Stepper,
    Step,
    StepLabel,
  } from '@mui/material';


function Header({step, steps}) {
    return (
      <Box
        component="header"
        sx={{ p: 2, border: '1px solid grey', borderRadius: '10px' }}
        className="App-header"
      >
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1>Voting app</h1>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={step} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* <Divider variant="middle" ><br /><br /></Divider>
        <Divider variant="middle" ><br /><br /></Divider>
            <Divider variant="middle" ><br /><br /></Divider> */}

      </Box> 
    );
};

Header.propTypes = {
    step: PropTypes.number.isRequired,
    steps: PropTypes.array.isRequired,
};

export default Header;