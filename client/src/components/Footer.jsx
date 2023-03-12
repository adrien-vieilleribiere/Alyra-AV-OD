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
      <div>
        <a
          href="https://github.com/adrien-vieilleribiere/Alyra-AV-OD"
          className="App-link"
          target="_blank"
          rel="noopener noreferrer">Made with &#10084; for Alyra.
        </a>
      </div>
    </Box>
  );
}

export default Footer;
