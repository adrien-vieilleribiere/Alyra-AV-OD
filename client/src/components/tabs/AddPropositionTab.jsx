import {
  Box,
} from '@mui/material';
import { TabPanel } from '@mui/lab';

import AddProposition from "../AddProposition";


function AddPropositionTab() {
  return (
    <TabPanel value="addProp" key="addProp">
      <h3>Add a proposal</h3>
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
