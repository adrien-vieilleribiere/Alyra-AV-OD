import React, { useState } from "react";
import useEth from "./../../contexts/EthContext/useEth";

import {
  Typography,
  Fab,
  Tab,
  Box,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import { TabContext, TabPanel, TabList } from '@mui/lab';

import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import PostAddIcon from '@mui/icons-material/PostAdd';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import PollIcon from '@mui/icons-material/Poll';


function MainOwner({ step }) {
  const [currentTab, SetCurrentTab] = useState("0");

  const { state: { contract, currentStep, accounts } } = useEth()


  const increaseWstate = async () => {
    const _wstate = await contract.methods.workflowStatus().call({ from: accounts[0] });

    console.log(_wstate);
    switch (parseInt(await _wstate)) {
      case 0:
        contract.methods.startProposalsRegistering().send({ from: accounts[0] });
        break;
      case 1:
        await contract.methods.endProposalsRegistering().send({ from: accounts[0] });
        break;
      case 2:
        await contract.methods.startVotingSession().send({ from: accounts[0] });
        break;
      case 3:
        await contract.methods.endVotingSession().send({ from: accounts[0] });
        break;
      case 4:
        await contract.methods.tallyVotes().send({ from: accounts[0] });
        break;
      case 5:
        console.log("no step after that");
        break;

      default:
        console.log("vote inna bad state");

    }
    if (parseInt(_wstate) < 5) {
      console.log("next step");
    }
    else {
      console.log("no step to go")
    }
  };


  const handleChange = (evt, val) => {
    // TODO: set active tab using current step
    SetCurrentTab(val);
  }
  return (
    <>
      <Typography component="h2" variant="h4" align="center">
        Main Owner component
      </Typography>

      {/* Button for step changing */}
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="add"
        sx={{ float: 'right' }}
        onClick={increaseWstate}
      >
        Go to next step
        <ArrowForwardIcon sx={{ ml: 1 }} />
      </Fab>
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
                <TextField fullWidth id="addVoterAddress" label="Voter address" variant="outlined" />
                <Button variant="contained" size='large' title='Add'>
                  <AddIcon></AddIcon>
                </Button>
              </Box>
            </>
          }
          {/* Voter list limited height with scroller */}
          <>
            <Divider sx={{ my: 2 }} />
            <h3>Voters already registered</h3>
            <>Registered voters list or not yet</>
          </>
        </TabPanel>{/* end voters panel */}

        {/* proposals panel */}
        <TabPanel value="1">
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

export default MainOwner;
