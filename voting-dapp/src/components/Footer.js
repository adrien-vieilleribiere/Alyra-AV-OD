import PropTypes from 'prop-types';

import {
  Box,
  Divider
} from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      mt={2}
      sx={{ p: 2, border: '1px solid grey', borderRadius: '10px' }}
      className="App-footer"
    >
      <div>Made with &#10084; for Alyra</div>
      <Divider sx={{ my: 2 }} />
      <a
        className="App-link"
        href="https://github.com/adrien-vieilleribiere/Alyra-AV-OD"
        target="_blank"
        rel="noopener noreferrer"
      >
        Github sources
      </a>
    </Box>
  );
};

Footer.propTypes = {

};

export default Footer;