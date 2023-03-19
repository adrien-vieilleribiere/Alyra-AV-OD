import GetWinner from "../GetWinner";
import { TabPanel } from '@mui/lab';
import useEth from "../../contexts/EthContext/useEth";

function GetWinnerTab() {
  const { state: { contract, accounts, proposals } } = useEth();
  console.log(proposals);

  return (
    <TabPanel value="getWinner" key="getWinner">
      <GetWinner />
    </TabPanel>
  );
}
export default GetWinnerTab;