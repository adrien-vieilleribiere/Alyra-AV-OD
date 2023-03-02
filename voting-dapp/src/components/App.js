import React, { useState, useEffect } from 'react';

import {
  Alert,
  Container,
  FormControl,
  FormHelperText,
  MenuItem,
  Button,
  TextField,
  InputLabel,
  Select,
  Input,
  Box,
  Icon,
  Stepper,
  Step,
  StepLabel,
  Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import logo from '../assets/images/logo.svg';

import Header from './Header';
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
  NONE:  0,
  VOTER: 1,
  OWNER: 2,
};


function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [userConnected, setUserConnected] = useState(false);
  const [userRole, setUserRole] = useState(roles.NONE);

  useEffect(() => {
    // FOR TEST
    setCurrentStep(2);
    setUserConnected(1);
    setUserRole(roles.OWNER);
    // --- 
  }, []);

  return (
    <Container className="App">
      
      <Header step={currentStep} steps={steps}/>
      
      <Box
        component="main"
        mt={2}
        sx={{ p: 2, border: '1px solid grey', borderRadius: '10px' }}
        className="App-main"
      >
        {/* <h2>Title 2: needed ???</h2> */}

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
            {userRole == roles.VOTER  &&
              <MainVoter step={currentStep}/>
            }
            {/* user owner */}
            {userRole == roles.OWNER  &&
              <MainOwner step={currentStep}/>
            }
          </>

        /* user not connected */
        : <Alert
            variant="outlined"
            severity="info"
          >
            You should be connected with your wallet to interact with the application
          </Alert>
        }

      </Box>{/* end of main */}
      
      <Footer/>

    </Container >
  );
}

export default App;
