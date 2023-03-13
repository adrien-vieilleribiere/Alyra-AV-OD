
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';

import WalletWidget from './WalletWidget';
import StepsTimeline from './StepsTimeline';
import StepIncrementer from './StepIncrementer';

import useEth from "../contexts/EthContext/useEth";


function Header() {
  let { state: { accounts, user } } = useEth();
  /* TEMP DEBUG BUTTON 
    - used to check state variable on click
    - TODO: Remove
  */
  const debug = () => {
    console.log(accounts);
    console.log(user);
  }
  /* END TEMP DEBUG BUTTON */
  return (
    <>
      <Box sx={{ flexGrow: 1, mb: 2 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
                <div className='header-title'>VoteOnChain</div>
                <div className='header-subtitle'>Secure your vote, secure your future</div>
              </Typography>
            {/* TODO: remove debug button*/}
            <Button color="inherit" onClick={debug} title="Don't touch">DEBUG</Button>
            {accounts && accounts.length !== 0 && (
              <WalletWidget address={accounts[0]} />
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <StepsTimeline />
      <Box textAlign='center' sx={{ flexGrow: 1, mb: 2, marginTop: 1 }}>
        {/* <StepIncrementer step={step} /> */}
        <StepIncrementer />
      </Box>

    </>
  );
};

export default Header;