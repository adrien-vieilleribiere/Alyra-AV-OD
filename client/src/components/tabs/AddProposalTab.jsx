import {
  Box,
} from '@mui/material';
import { TabPanel } from '@mui/lab';

import AddProposal from "../AddProposal";


function AddProposalTab() {
  return (
    <TabPanel value="addProp" key="addProp">
      <h3>Add a proposal</h3>
      <br />
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        '& > :not(style)': { m: 1 },
      }}>
        <AddProposal />
      </Box>
    </TabPanel>
  );
}

export default AddProposalTab;
