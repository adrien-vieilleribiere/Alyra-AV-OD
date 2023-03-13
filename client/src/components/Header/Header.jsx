
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';

import StepsTimeline from './../StepsTimeline';
import StepIncrementer from './../StepIncrementer';
import useEth from "../../contexts/EthContext/useEth";


function Header() {
  let { state: { currentStep } } = useEth();
  currentStep = currentStep || 0;
  return (
    <>
      <Box sx={{ flexGrow: 1, mb: 2 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
              Voting app
            </Typography>
            {/* TODO: Add Metamask connection widget*/}
            <Button color="inherit">Metamask widget</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <StepsTimeline />
      <Box textAlign='center' sx={{ flexGrow: 1, mb: 2, marginTop: 1 }}>
        <StepIncrementer step={currentStep} />
      </Box>

    </>
  );
};

export default Header;