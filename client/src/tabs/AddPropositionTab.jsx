import React, { useState } from "react";
import {
  Box,
} from '@mui/material';
import { TabPanel } from '@mui/lab';

import AddIcon from '@mui/icons-material/Add';
import AddProposition from "../components/AddProposition";


function AddPropositionTab() {
  return (
    <TabPanel value="addProp">
      <h3>Add a proposition</h3>
      <br />
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        '& > :not(style)': { m: 1 },
      }}>
        <AddProposition />
      </Box>
    </TabPanel>
  );
}

export default AddPropositionTab;
