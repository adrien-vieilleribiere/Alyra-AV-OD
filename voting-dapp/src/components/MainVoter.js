import React, { useState } from 'react';
import PropTypes from 'prop-types'

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// props needed : proposals
function MainVoter({ step, hasVoted }) {

  return (
    <>{/* TODO : use step label */}
      <h2>Main Voter component</h2>
      {/* Conditionnal display depending on the current status */}
      {step == 0 &&
        /* recap proposals submitted from voter */
        <>Nothing to display yet. Come back later!</>
      }

      {/* proposal registration started */}
      {step > 0 &&
        /* recap proposals submitted from voter */
        <>
          <h3>My proposals</h3>
          <>List or no proposal yet</>
        </>
      }
      {step == 1 &&
        /* input + button to add proposals */
        <>
          <Divider sx={{ my: 2 }} />
          <h3>Add a proposal</h3>
          <>form</>
        </>
      }

      {/* vote started */}
      {step > 2 && !hasVoted &&
        <>
          <Divider sx={{ my: 2 }} />
          <h3>Vote</h3>
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
        </>
      }
      {step > 2 && hasVoted &&
        /* Vote value recap */
        <>
          <Divider sx={{ my: 2 }} />
          <h3>Your vote</h3>
          proposal
        </>
      }

      {/* vote ended */}
      {step > 4 &&
        /* Check vote from another user: select? */
        <>
          <Divider sx={{ my: 2 }} />
          <h3>Check vote from a voter</h3>
          form
        </>
      }
    </>
  );
}

MainVoter.propTypes = {
  step: PropTypes.number.isRequired,
  hasVoted: PropTypes.bool.isRequired,
};

export default MainVoter;
