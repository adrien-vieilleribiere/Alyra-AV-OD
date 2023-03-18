import React, { useState, useEffect } from "react";
import useEth from "./../contexts/EthContext/useEth";

import {
  Alert,
  Typography,
  Tab,
  Box,
} from '@mui/material';
import { TabContext, TabList } from '@mui/lab';

import PostAddIcon from '@mui/icons-material/PostAdd';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import InfoIcon from '@mui/icons-material/Info';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import VoterRegisteredEvents from "./Events/VoterRegisteredEvents";
import WorkflowStatusChangeEvents from "./Events/WorkflowStatusChangeEvents";
import ProposalRegisteredEvents from "./Events/ProposalRegisteredEvents";
import VotedEvents from "./Events/VotedEvents";

import InfoTab from "./tabs/InfosTab";
import AddVoterTab from "./tabs/AddVoterTab";
import AddProposalTab from "./tabs/AddProposalTab";
import VoteTab from "./tabs/VoteTab";
import GetVoteTab from "./tabs/GetVoteTab";
import GetWinnerTab from "./tabs/GetWinnerTab";

function ActionTabs() {
  const { state: { step, user: { isConnected, isOwner, isVoter } } } = useEth();
  const [currentTab, SetCurrentTab] = useState("info");

  const handleChange = (evt, val) => {
    SetCurrentTab(val);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (currentTab === "addVoter" && step > 0) {
      if (isVoter && step === 1) {
        SetCurrentTab("addProposal");
      }
      else {
        SetCurrentTab("info");
      }
    }
    if (currentTab === "addProposal" && step > 1) {
      SetCurrentTab("info");
    }
    if (currentTab === "vote" && step > 3) {
      if (step > 4) {
        SetCurrentTab("getWinner");
      }
      else {
        SetCurrentTab("getVote");
      }
    }
  });

  // No MetaMask extension detected
  if (!window.ethereum) {
    return (
      <Alert severity="warning">The MetaMask extension was not detected in your browser!</Alert>
    )
  }

  // User is not connected
  if (!isConnected) {
    return (
      <Alert severity="info">You should connect with MetaMask!</Alert>
    )
  }

  const addVoterTabHeader = <Tab sx={{ my: 2 }} icon={<HowToRegIcon />} label="add Voter" value="addVoter" disabled={!(isOwner && step === 0)} />;
  const addVoterTab = <AddVoterTab disabled={!(isOwner && step === 0)} />;
  const addProposalTabHeader = <Tab sx={{ my: 2 }} icon={<PostAddIcon />} label="add Proposal" value="addProp" disabled={!(isVoter && step === 1)} />;
  const addProposalTab = <AddProposalTab disabled={!(isVoter && step === 1)} />;
  const voteTabHeader = <Tab icon={<HowToVoteIcon />} label="Vote" value="vote" disabled={!(isVoter && step === 3)} />;
  const voteTab = <VoteTab />;
  const getVoteTabHeader = <Tab icon={<VisibilityIcon />} label="See Votes" value="getVote" disabled={!(isVoter && step >= 3)} />;
  const getVoteTab = <GetVoteTab disabled={!(isVoter && step >= 3)} />;
  const getWinnerTabHeader = <Tab icon={<EmojiEventsIcon />} label="Results" value="getWinner" disabled={!(isVoter && step >= 5)} />;
  const getWinnerTab = <GetWinnerTab disabled={!(isVoter && step >= 5)} />;

  return (
    <Box
      mt={2}
      sx={{ p: 2, border: '1px solid grey', borderRadius: '10px', background: 'var(--mid-gray)', flexGrow: 1 }}
    >
      {/* Event listeners */}
      {isConnected &&
        <>
          <VoterRegisteredEvents />
          <WorkflowStatusChangeEvents />
          <ProposalRegisteredEvents />
          <VotedEvents />
        </>
      }

      <Typography variant="h5" component="h2" mb={-1}>
        <b>Poll:</b> <em>Hey Cyril, what are we going to do this evening ?</em>
      </Typography>

      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="icon label tabs example">
            <Tab icon={<InfoIcon />} label="Info" value="info" />
            {addVoterTabHeader}
            {addProposalTabHeader}
            {voteTabHeader}
            {getVoteTabHeader}
            {getWinnerTabHeader}

          </TabList>
        </Box>
        <InfoTab />
        {addVoterTab}
        {addProposalTab}
        {voteTab}
        {getVoteTab}
        {getWinnerTab}
      </TabContext>
    </Box>
  );
}

export default ActionTabs;
