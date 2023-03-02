import React, { useState } from 'react';
import PropTypes from 'prop-types'

import {
    Box,
    TextField,
    Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


function MainOwner(step) {

  return (
    <>
        <p>Main Owner component</p>
        {/* Button for changing step or in header ? */}

        {/* Conditionnal display depending on the current status */}
            {/* register voter */}
            {step == 0  &&
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '& > :not(style)': { m: 1 },
                }}>
                  <TextField fullWidth id="addVoterAddress" label="Address to add" variant="filled" />
                  <Button variant="contained">
                    <AddIcon></AddIcon>
                  </Button>
                </Box>
            }
            {/* proposal registration started */}
            {step == 1  &&
              <></>
            }
            {/* TODO : list case */}


    </>
  );
}

MainOwner.propTypes = {
    step: PropTypes.number.isRequired
}; 

export default MainOwner;
