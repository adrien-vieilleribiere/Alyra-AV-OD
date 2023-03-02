import React, { useState } from 'react';
import PropTypes from 'prop-types'

import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// props needed : proposals
function MainVoter({step}) {

  return (
    <>
        <p>Main Voter component</p>
        {/* Conditionnal display depending on the current status */}
            {/* register voter */}
            {step == 0  &&
              <></>
            }
            {/* proposal registration started */}
            {step == 1  &&
              <></>
            }

            {/* TODO : list case and use label */}

            {/* vote started */}
            {step == 3  &&
              <FormControl fullWidth>
                <InputLabel id="proposition-id" fullWidth>Vote For</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                >
                    <MenuItem value={0}></MenuItem>
                    <MenuItem value={1}>Proposition 1</MenuItem>
                    <MenuItem value={2}>Proposition 2</MenuItem>
                    <MenuItem value={3}>Proposition 3</MenuItem>
                </Select>
              </FormControl>
            }
    </>
  );
}

MainVoter.propTypes = {
    step: PropTypes.number.isRequired
};  

export default MainVoter;
