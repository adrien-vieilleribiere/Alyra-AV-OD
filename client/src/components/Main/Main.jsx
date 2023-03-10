
import {
  Alert,
  Box,
} from '@mui/material';

import useEth from "../../contexts/EthContext/useEth";
import { roles } from "../../helper/const";

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
      {user.connected
        ?
        /* user connected */
        <>
          {/* user unknown: connected but not voter or admin */}
          {user.role === roles.NONE &&
            <Alert
              variant="outlined"
              severity="warning"
            >
              Your address is not registered!
            </Alert>
          }
          {/* user voter */}
          {user.role === roles.VOTER &&
            <MainVoter step={currentStep} hasVoted={user.hasVoted} />
          }
          {/* user owner */}
          {user.role === roles.OWNER &&
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