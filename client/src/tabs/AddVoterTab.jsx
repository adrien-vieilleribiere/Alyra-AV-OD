import React, { useState } from "react";
import AddVoter from "./../components/AddVoter";
import {
  Box,
} from '@mui/material';
import { TabContext, TabPanel, TabList } from '@mui/lab';

import AddIcon from '@mui/icons-material/Add';


function AddVoterTab() {
  return (
    <TabPanel value="addVoter">
      <h3>Add a voter</h3>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        '& > :not(style)': { m: 1 },
      }}>
        <AddVoter></AddVoter>
      </Box>
    </TabPanel>
  );
}

export default AddVoterTab;
