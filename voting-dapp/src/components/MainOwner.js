import React, { useState } from 'react';
import PropTypes from 'prop-types'

import {
  Typography,
  Tab,
  Box,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import { TabContext, TabPanel, TabList } from '@mui/lab';

import AddIcon from '@mui/icons-material/Add';
import PostAddIcon from '@mui/icons-material/PostAdd';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import PollIcon from '@mui/icons-material/Poll';


function MainOwner({ step }) {
  const [currentTab, SetCurrentTab] = useState("0");

  const handleChange = (evt, val) => {
    SetCurrentTab(val);
  }
  return (
    <>
      <Typography component="h2" variant="h4" align="center">
        Main Owner component
      </Typography>
      {/* Button for changing step or in header ? */}
      {/* Controls to perform:
            - one voter at least
            - one proposal at least
            - one vote at least
            => to be discusssed
        */}
      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="icon label tabs example">
            <Tab icon={<HowToRegIcon />} label="VOTERS" value="0" />
            <Tab icon={<PostAddIcon />} label="PROPOSALS" value="1" />
            <Tab icon={<HowToVoteIcon />} label="VOTES" value="2" />
            <Tab icon={<PollIcon />} label="RESULT" value="3" />
          </TabList>
        </Box>
        
        {/* voters panel */}
        <TabPanel value="0">
          {/* register voter */}
          {step < 1 &&
            <>
              <h3>Add a voter</h3>
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
              <Divider sx={{ my: 2 }} />
            </>
          }
          {/* Voter list limited height with scroller */}
          <>
            <h3>Voters already registered</h3>
            <>Registered voters list or not yet</>
          </>
        </TabPanel>{/* end voters panel */}

        {/* proposals panel */}
        <TabPanel  value="1">
          {/* proposal registration started */}
          {step > 0 &&
            <>
              <h3>Proposals registered</h3>
              <>Registered proposals list</>
            </>

          }
        </TabPanel>{/* end proposals panel */}

        {/* votes panel */}
        <TabPanel value="2">
          {/* vote session started */}
          {step > 2 &&
            <>
              <h3>Numbers of votes</h3>
              <>number of votes only</>
            </>
          }
        </TabPanel>{/* end votes panel */}

        {/* result panel */}
        <TabPanel value="3">
          {/* votes tallied */}
          {step > 2 &&
            <>
              <h3>Result</h3>
              <>Recap number of votes detailled and winning proposal</>
            </>
          }
        </TabPanel>{/* end result panel */}
      </TabContext>

    </>
  );
}

MainOwner.propTypes = {
  step: PropTypes.number.isRequired
};

export default MainOwner;
