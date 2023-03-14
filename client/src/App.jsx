import {
  Container,
} from '@mui/material';

import { EthProvider } from "./contexts/EthContext";

import Header from './components/Header';
import Footer from './components/Footer';
import ActionTabs from './components/ActionTabs';


function App() {
  return (
    <EthProvider>
      <Container className="App">

        <Header />

        <Container>
          <ActionTabs />
        </Container>

        <Footer />

      </Container >
    </EthProvider >
  );
}

export default App;
