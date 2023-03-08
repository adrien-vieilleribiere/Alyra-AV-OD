
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';

import HeaderStepper from './HeaderStepper';


function Header() {
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

      <HeaderStepper />

    </>
  );
};

export default Header;