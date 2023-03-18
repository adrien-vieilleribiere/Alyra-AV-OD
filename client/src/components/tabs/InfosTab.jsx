
import useEth from "../../contexts/EthContext/useEth";
import { TabPanel } from '@mui/lab';
import {
  Divider,
} from '@mui/material';
import Stats from "../Stats";

function Link({ uri, text }) {
  return <a
    href={uri}
    className="App-link"
    target="_blank"
    rel="noopener noreferrer">{text}
  </a>;
}

function InfosTab() {
  const { state: { voters, proposals } } = useEth();
  return (
    <TabPanel value="info" key="info">
      <h3 className='h3'>Voting Dapp by Adrien Vieilleribiere &amp; Olivier David for Alyra</h3>
      <Divider />
      <ul>
        <li><Link
          uri={"https://github.com/adrien-vieilleribiere/Alyra-AV-OD"}
          text={"Deployed demo"}
        /></li>
        <li><Link
          uri={"https://github.com/adrien-vieilleribiere/Alyra-AV-OD"}
          text={"Github Repository"}
        /></li>
      </ul>
      <Divider />

      <Stats />

    </TabPanel>
  );
}

export default InfosTab;
