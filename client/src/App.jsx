import {
  Container,
} from '@mui/material';

import { EthProvider } from "./contexts/EthContext";

import UserStatus from './components/UserStatus';
import Header from './components/Header';
import Footer from './components/Footer';
import ActionTabs from './components/ActionTabs';
import Timeline from './components/Timeline';



function App() {
  return (
    <EthProvider>

      {/* User status update */}
      <UserStatus />

      <Container className="App" sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'space-between',
      }}>
        <Header />

        <Timeline />
        <ActionTabs />

        <Footer />
      </Container >

    </EthProvider >
  );
}

export default App;
