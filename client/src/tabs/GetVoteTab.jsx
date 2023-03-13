import React, { useState } from "react";
import GetVote from "../components/GetVote";
import { TabPanel } from '@mui/lab';

function GetVoteTab() {
  return (
    <TabPanel value="getVote">
      <GetVote />
    </TabPanel>
  );
}

export default GetVoteTab;
