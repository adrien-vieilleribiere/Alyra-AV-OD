
import Vote from "../Vote";
import { TabPanel } from '@mui/lab';

function VoteTab() {
  return (
    <TabPanel value="vote" key="vote">
      <Vote />
    </TabPanel>
  );
}

export default VoteTab;
