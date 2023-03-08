import React, { useState } from 'react';
import PropTypes from 'prop-types'

import {
  Typography,
  Box,
  Tab,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from '@mui/material';
import { TabContext, TabPanel, TabList } from '@mui/lab';

import AddIcon from '@mui/icons-material/Add';
import PostAddIcon from '@mui/icons-material/PostAdd';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import PollIcon from '@mui/icons-material/Poll';


// props needed : proposals
function MainVoter({ step, hasVoted }) {
  const [currentTab, SetCurrentTab] = useState("0");

  const handleChange = (evt, val) => {
    // TODO: set active tab using current step
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
          {step === 0 &&
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
          {step === 1 &&
            /* input + button to add proposals */
            <>
              <Divider sx={{ my: 2 }} />
              <h3>Add a proposal</h3>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                '& > :not(style)': { m: 1 },
              }}>
                <TextField fullWidth id="addProposal" label="Proposal description" variant="outlined" />
                <Button variant="contained" size='large' title='Add'>
                  <AddIcon></AddIcon>
                </Button>
              </Box>
            </>
          }
        </TabPanel>{/* end my proposals panel */}

        {/* my vote panel */}
        <TabPanel value="1">
          {/* vote started */}
          {step > 2 && !hasVoted &&
            <>
              <h3>Vote</h3>
              <FormControl fullWidth>
                <InputLabel id="proposal-select-label">Select a proposal</InputLabel>
                <Select
                  label="Select a proposal"
                  labelId="proposal-select-label"
                  id="proposal-select"
                // value={proposal}
                // onChange={handleChange}
                >
                  <MenuItem value={0}></MenuItem>
                  <MenuItem value={1}>Proposal 1</MenuItem>
                  <MenuItem value={2}>Proposal 2</MenuItem>
                  <MenuItem value={3}>Proposal 3</MenuItem>
                </Select>
              </FormControl>
            </>
          }
          {step > 2 && hasVoted &&
            /* Vote value recap */
            <>
              <h3>Your vote</h3>
              Proposal description
            </>
          }
        </TabPanel>{/* end my vote panel */}

        {/* result panel */}
        <TabPanel value="2">
          {/* vote ended */}
          {step > 4 &&
            <>
              {/* Display winning proposal */}
              <h3>Winning proposal</h3>
              Proposal description, number of votes or detailled results?

              {/* Check vote from another user: select? */}
              <Divider sx={{ my: 2 }} />
              <h3>Check vote from a voter</h3>
              <FormControl fullWidth>
                <InputLabel id="voter-select-label">Select a voter</InputLabel>
                <Select
                  label="Select a voter"
                  labelId="voter-select-label"
                  id="voter-select"
                // value={voter}
                // onChange={handleChange}
                >
                  <MenuItem value={0}></MenuItem>
                  <MenuItem value={1}>Voter 1</MenuItem>
                  <MenuItem value={2}>Voter 2</MenuItem>
                  <MenuItem value={3}>Voter 3</MenuItem>
                </Select>
              </FormControl>
              Proposal description of the selected voter
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
