
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';

import useEth from "../../contexts/EthContext/useEth";
import HeaderStepper from './HeaderStepper';
import HeaderWalletWidget from './HeaderWalletWidget';


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
              <HeaderWalletWidget address={accounts[0]} />
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <HeaderStepper />
    </>
  );
};

export default Header;