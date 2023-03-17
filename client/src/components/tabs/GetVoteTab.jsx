import GetVote from "../GetVote";
import { TabPanel } from '@mui/lab';

function GetVoteTab() {
  return (
    <TabPanel value="getVote" key="getVote">
      <GetVote />
    </TabPanel>
  );
}

export default GetVoteTab;
