
import {
  Alert,
  Box,
} from '@mui/material';

import useEth from "../../contexts/EthContext/useEth";

import MainOwner from './MainOwner';
import MainVoter from './MainVoter';

function Main() {
  // temp
  let { state: { user, currentStep } } = useEth();
  currentStep = currentStep || 0;

  return (
    <Box
      component="main"
      mt={2}
      sx={{ p: 2, border: '1px solid grey', borderRadius: '10px' }}
      className="App-main"
    >
      {/* Conditionnal display */}
      {user.isConnected
        ?
        /* user connected */
        <>
          {/* user unknown: connected but not voter or admin */}
          {!user.isOwner && !user.isVoter &&
            <Alert
              variant="outlined"
              severity="warning"
            >
              Your address is not registered!
            </Alert>
          }
          {/* user voter */}
          {user.isVoter &&
            <MainVoter step={currentStep} hasVoted={user.hasVoted} />
          }
          {/* user owner */}
          {user.isOwner &&
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
    </Box>
  );
}

export default Main;