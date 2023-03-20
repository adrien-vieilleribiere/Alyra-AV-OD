import { Box, Typography } from '@mui/material';
import { TabPanel } from '@mui/lab';

import AddProposal from "../AddProposal";


function AddProposalTab() {
  return (
    <TabPanel value="addProp" key="addProp">
      <Box
        sx={{ p: 2, border: '1px solid grey', borderRadius: '10px' }}
      >
        <Typography variant="h6" component="h3">
          Add a proposal to this poll
        </Typography>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          '& > :not(style)': { m: 1 },
        }}>
          <AddProposal />
        </Box>
      </Box>
    </TabPanel>
  );
}

export default AddProposalTab;
