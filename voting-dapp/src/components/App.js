import React, { useState, useEffect } from 'react';

import {
  Alert,
  Container,
  Grid,
  Box,
} from '@mui/material';

import Header from './Header';
import Aside from './Aside';
import MainOwner from './MainOwner';
import MainVoter from './MainVoter';
import Footer from './Footer';
import './App.css';

// Need an array of object with short label, description?
const steps = [
  'Registering Voters',
  'Proposals Registration Started',
  'Proposals Registration Ended',
  'Voting Session Started',
  'Voting Session Ended',
  'VotesTallied'
];

const roles = {
  NONE: 0,
  VOTER: 1,
  OWNER: 2,
};


function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [userConnected, setUserConnected] = useState(false);
  const [userRole, setUserRole] = useState(roles.NONE);
  const [hasVoted, setHasVoted] = useState(false);
  const [vote, setVote] = useState();

  useEffect(() => {
    /* TODO - getters needed :
      - list of all voters registered : owner tab0 & voter tab2
      - list of all proposals : voter tab1 & owner tab1
      - list of current voter proposals : voter tab0
      - winning proposal : voter tab 2 & 
      - vote of current user : voter tab 2
      - number of votes : owner tab2
      - list of proposals with their votecount : owner tab3
    */

    // FOR TEST
    setCurrentStep(0);
    setUserConnected(true);
    setUserRole(roles.OWNER);
    setHasVoted(false);
    // --- 
  }, []);

  return (
    <Container className="App">

      <Header step={currentStep} steps={steps} />

      <Grid container spacing={3}>

        {/* Aside with vote statistics */}
        <Grid item xs={2}>
          <Aside />
        </Grid>

        {/* Main */}
        <Grid item xs={10}>
          <Box
            component="main"
            mt={2}
            sx={{ p: 2, border: '1px solid grey', borderRadius: '10px' }}
            className="App-main"
          >
            {/* Conditionnal display */}
            {userConnected
              ?
              /* user connected */
              <>
                {/* user unknown: connected but not voter or admin */}
                {userRole == roles.NONE &&
                  <Alert
                    variant="outlined"
                    severity="warning"
                  >
                    Your address is not registered!
                  </Alert>
                }
                {/* user voter */}
                {userRole == roles.VOTER &&
                  <MainVoter step={currentStep} hasVoted={hasVoted} />
                }
                {/* user owner */}
                {userRole == roles.OWNER &&
                  <MainOwner step={currentStep} />
                }
              </>

              /* user not connected */
              : <Alert
                variant="outlined"
                severity="info"
              >
                You should be connected with your wallet to interact with the application.
              </Alert>
            }
          </Box>{/* end of main */}

        </Grid>
      </Grid>

      <Footer />

    </Container >
  );
}

export default App;
