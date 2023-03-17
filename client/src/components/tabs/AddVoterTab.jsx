import AddVoter from "../AddVoter";
import {
  Box,
} from '@mui/material';
import { TabPanel } from '@mui/lab';

function AddVoterTab() {
  return (
    <TabPanel value="addVoter" key="addVoter">
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
