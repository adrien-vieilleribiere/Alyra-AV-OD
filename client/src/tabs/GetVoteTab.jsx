import GetVote from "../components/GetVote";
import { TabPanel } from '@mui/lab';

function GetVoteTab() {
  return (
    <TabPanel value="getVote" key="getVote">
      <GetVote />
    </TabPanel>
  );
}

export default GetVoteTab;
