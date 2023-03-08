import {
  Container,
  Grid,
} from '@mui/material';

import { EthProvider } from "./contexts/EthContext";

import Header from './components/Header/Header';
import Aside from './components/Aside';
import Main from './components/Main/Main';
import Footer from './components/Footer';


function App() {
  return (
    <EthProvider>
      <Container className="App">

        <Header />

        <Grid container spacing={3}>

          {/* Aside with vote statistics */}
          <Grid item xs={2}>
            <Aside />
          </Grid>

          {/* Main */}
          <Grid item xs={10}>
            <Main />
          </Grid>
        </Grid>

        <Footer />

      </Container >
    </EthProvider>
  );
}

export default App;
