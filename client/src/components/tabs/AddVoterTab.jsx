import AddVoter from "../AddVoter";
import { Box, Typography } from '@mui/material';
import { TabPanel } from '@mui/lab';

function AddVoterTab() {
  return (
    <TabPanel value="addVoter" key="addVoter">
      <Box
        sx={{ p: 2, border: '1px solid grey', borderRadius: '10px' }}
      >
        <Typography variant="h6" component="h3">
          Add a voter to this poll
        </Typography>

        <AddVoter />

      </Box>
    </TabPanel>
  );
}

export default AddVoterTab;
