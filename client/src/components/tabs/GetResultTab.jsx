import GetResult from "../GetResult";
import { TabPanel } from '@mui/lab';

function GetResultTab() {
  return (
    <TabPanel value="getResult" key="getResult">
      <GetResult />
    </TabPanel>
  );
}

export default GetResultTab;
