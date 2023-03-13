import {
  Container,
} from '@mui/material';

import { EthProvider } from "./contexts/EthContext";

import Header from './components/Header/Header';
import Footer from './components/Footer';
import ActionTabs from './components/ActionTabs';


function App() {
  // let myParams = { step: 0, isVoter: true, isOwner: true };
  return (
    <EthProvider>
      <Container className="App">

        <Header />

        <Container>
          {/* <ActionTabs params={myParams} ></ActionTabs> */}
          <ActionTabs />
        </Container>

        <Footer />

      </Container >
    </EthProvider >
  );
}

export default App;
