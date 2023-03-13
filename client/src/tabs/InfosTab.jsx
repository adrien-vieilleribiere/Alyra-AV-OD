import { TabPanel } from '@mui/lab';
import {
  Box,
  Divider,
  Stack,
  Badge,
  Chip,
} from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PostAddIcon from '@mui/icons-material/PostAdd';
import HowToVoteIcon from '@mui/icons-material/HowToVote';

function Link({ uri, text }) {
  return <a
    href={uri}
    className="App-link"
    target="_blank"
    rel="noopener noreferrer">{text}
  </a>;
}

function InfosTab() {
  return (
    <TabPanel value="info">
      <h3 className='h3'>Voting Dapp by Adrien Vieilleribiere &amp; Olivier David for Alyra</h3>
      <Divider />
      <ul>
        <li><Link
          uri={"https://github.com/adrien-vieilleribiere/Alyra-AV-OD"}
          text={"Deployed demo"}
        /></li>
        <li><Link
          uri={"https://github.com/adrien-vieilleribiere/Alyra-AV-OD"}
          text={"Github Repository"}
        /></li>
      </ul>
      <Divider />

      <Box
        mt={2}
        sx={{ p: 2, border: '1px solid grey', borderRadius: '10px' }}
      >

        <Stack
          direction={{ xs: 'row', md: 'row' }}
          justifyContent='space-around'
          alignItems='center'
        >
          <Badge sx={{ my: 2 }} badgeContent={5} color="primary">
            <Chip icon={<HowToRegIcon />} label="Voters" title="Voters" />
          </Badge>
          <Badge sx={{ my: 2 }} badgeContent={3} color="primary">
            <Chip icon={<PostAddIcon />} label="Proposals" title="Proposals" />
          </Badge>
          <Badge sx={{ my: 2 }} badgeContent={1} color="primary">
            <Chip icon={<HowToVoteIcon />} label="Votes" title="Votes" />
          </Badge>
        </Stack>
      </Box>

    </TabPanel>
  );
}

export default InfosTab;
