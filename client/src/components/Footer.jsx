import {
  Box,
  Divider
} from '@mui/material';

function Link({ uri, text }) {
  return <a
    href={uri}
    className="App-link"
    target="_blank"
    rel="noopener noreferrer">{text}
  </a>;
}

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
      <Link
        uri={"https://github.com/adrien-vieilleribiere/Alyra-AV-OD"}
        text={"Github sources"}
      />
    </Box>
  );
}

export default Footer;
