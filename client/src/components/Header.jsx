import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';

import WalletWidget from './WalletWidget';

import useEth from "../contexts/EthContext/useEth";


function Header() {
  let { state: { accounts, voters, proposals, votes } } = useEth();
  /* TEMP DEBUG BUTTON 
    - used to check state variable on click
    - TODO: Remove
  */
  const debug = () => {
    // console.log(accounts);
    // console.log(user);
    console.log('voters:', voters);
    console.log('proposals:', proposals);
    console.log('accounts:', accounts);
    console.log('votes:', votes);
    console.log('ethereum:', window.ethereum);
    console.log('selectedAddress:', window.ethereum.selectedAddress);
  }
  /* END TEMP DEBUG BUTTON */
  return (
    <>
      <Box sx={{ mt: 1, mb: 2 }}>
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
    </>
  );
};

export default Header;