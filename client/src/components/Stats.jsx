
import useEth from "../contexts/EthContext/useEth";
import {
  Box,
  Typography,
  Stack,
  Badge,
  Chip,
} from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PostAddIcon from '@mui/icons-material/PostAdd';
import HowToVoteIcon from '@mui/icons-material/HowToVote';



function Stats() {
  const { state: { voters, proposals, votes } } = useEth();
  return (
    <Box
      sx={{ p: 2, border: '1px solid grey', borderRadius: '10px' }}
    >
      <Typography variant="h6" component="h3">
        Statistics
      </Typography>

      <Stack
        direction={{ xs: 'row', md: 'row' }}
        justifyContent='space-around'
        alignItems='center'
      >
        <Badge sx={{ my: 2 }} badgeContent={Object.keys(voters).length || 0} color="primary" showZero>
          <Chip icon={<HowToRegIcon />} label="Voters" title="Voters" />
        </Badge>
        <Badge sx={{ my: 2 }} badgeContent={Object.keys(proposals).length || 0} color="primary" showZero>
          <Chip icon={<PostAddIcon />} label="Proposals" title="Proposals" />
        </Badge>
        {/* TODO plug the real context variable */}
        <Badge sx={{ my: 2 }} badgeContent={Object.keys(votes).length || 0} color="primary" showZero>
          <Chip icon={<HowToVoteIcon />} label="Votes" title="Votes" />
        </Badge>
      </Stack>
    </Box>

  );
}

export default Stats;
