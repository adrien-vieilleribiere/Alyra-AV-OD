import GetWinner from "../GetWinner";
import { TabPanel } from '@mui/lab';

function GetWinnerTab() {
  return (
    <TabPanel value="getWinner" key="getWinner">
      <GetWinner />
    </TabPanel>
  );
}
export default GetWinnerTab;