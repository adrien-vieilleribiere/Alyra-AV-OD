import React, { useState } from "react";
//import useEth from "./../../contexts/EthContext/useEth";

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
import InfoIcon from '@mui/icons-material/Info';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import InfoTab from "../tabs/InfosTab";
import AddVoterTab from "./../tabs/AddVoterTab";
import AddPropositionTab from "../tabs/AddPropositionTab";
import VoteTab from "../tabs/VoteTab";
import GetVoteTab from "../tabs/GetVoteTab";
import GetWinnerTab from "../tabs/GetWinnerTab";

function ActionTabs({ params }) {
  const [currentTab, SetCurrentTab] = useState("info");
  console.log({ params });
  // const { state: { contract, currentStep, accounts } } = useEth();

  const handleChange = (evt, val) => {
    SetCurrentTab(val);
  }
  let step = params.step || 5;
  let isOwner = params.isOwner || false;
  let isVoter = params.isVoter || true;

  const addVoterTabHeader = isOwner && step == 0 && <Tab icon={<HowToRegIcon />} label="add Voter" value="addVoter" />;
  const addVoterTab = (isOwner && step == 0) ? <AddVoterTab /> : <></>;
  const addPropositionTabHeader = isVoter && step == 1 && <Tab icon={<PostAddIcon />} label="add Proposition" value="addProp" />;
  const addPropositionTab = (isVoter && step == 1) ? <AddPropositionTab /> : <></>;
  const voteTabHeader = isVoter && step == 3 && <Tab icon={<HowToVoteIcon />} label="Vote" value="vote" />;
  const voteTab = (isVoter && step == 3) ? <VoteTab /> : <></>;
  const getVoteTabHeader = isVoter && step >= 3 && <Tab icon={<VisibilityIcon />} label="See Votes" value="getVote" />;
  const getVoteTab = (isVoter && step >= 3) ? <GetVoteTab /> : <></>;
  const getWinnerTabHeader = isVoter && step >= 5 && <Tab icon={<EmojiEventsIcon />} label="Winning Proposal" value="getWinner" />;
  const getWinnerTab = (isVoter && step >= 5) ? <GetWinnerTab /> : <></>;

  console.log("tabs params", step, isOwner, isVoter);

  return (
    <>
      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="icon label tabs example">
            <Tab icon={<InfoIcon />} label="Info" value="info" />
            {addVoterTabHeader}
            {addPropositionTabHeader}
            {voteTabHeader}
            {getVoteTabHeader}
            {getWinnerTabHeader}
            {/* <Tab icon={<PostAddIcon />} label="PROPOSALS" value="1" /> */}
            {/* <Tab icon={<HowToVoteIcon />} label="VOTES" value="2" /> */}
            {/* <Tab icon={<PollIcon />} label="RESULT" value="3" /> */}
          </TabList>
        </Box>

        <InfoTab />
        {addVoterTab}
        {addPropositionTab}
        {voteTab}
        {getVoteTab}
        {getWinnerTab}
      </TabContext>

    </>
  );
}

export default ActionTabs;
