import React, { useState } from 'react';
import PropTypes from 'prop-types'

import {
  Typography,
  Box,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from '@mui/material';
import { TabContext, TabPanel, TabList } from '@mui/lab';

import PostAddIcon from '@mui/icons-material/PostAdd';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import PollIcon from '@mui/icons-material/Poll';


// props needed : proposals
function MainVoter({ step, hasVoted }) {
  const [currentTab, SetCurrentTab] = useState("0");

  const handleChange = (evt, val) => {
    SetCurrentTab(val);
  }
  return (
    <>{/* TODO : use step label */}
      <Typography component="h2" variant="h4" align="center">
        Main Voter component
      </Typography>

      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="icon label tabs example">
            <Tab icon={<PostAddIcon />} label="PROPOSALS" value="0" />
            <Tab icon={<HowToVoteIcon />} label="VOTE" value="1" />
            <Tab icon={<PollIcon />} label="RESULT" value="2" />
          </TabList>
        </Box>

        {/* my proposals panel */}
        <TabPanel value="0">
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
        </TabPanel>{/* end my proposals panel */}

        {/* my vote panel */}
        <TabPanel value="1">
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
        </TabPanel>{/* end my vote panel */}

        {/* result panel */}
        <TabPanel value="2">
          {/* vote ended */}
          {step > 4 &&
            <>
              {/* Display winning proposal */}
              <Divider sx={{ my: 2 }} />
              <h3>Winning proposal</h3>
              form

              {/* Check vote from another user: select? */}
              <Divider sx={{ my: 2 }} />
              <h3>Check vote from a voter</h3>
              form
            </>
          }
        </TabPanel>{/* end result panel */}


      </TabContext>









    </>
  );
}

MainVoter.propTypes = {
  step: PropTypes.number.isRequired,
  hasVoted: PropTypes.bool.isRequired,
};

export default MainVoter;
