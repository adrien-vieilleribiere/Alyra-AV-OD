import {
    Box,
    Stack,
    Badge,
    Chip,
  } from '@mui/material';
  
  import HowToRegIcon from '@mui/icons-material/HowToReg';
  import PostAddIcon from '@mui/icons-material/PostAdd';
  import HowToVoteIcon from '@mui/icons-material/HowToVote';
  
  function Aside() {
  
    return (
      <Box
        component="aside"
        mt={2}
        sx={{ p: 2, border: '1px solid grey', borderRadius: '10px' }}
        className="App-aside"
      >
        Statistics
        <Stack
          direction={{ xs: 'row', md: 'column' }}
          justifyContent="space-around"
        >
          <Badge sx={{ my:2 }} badgeContent={5} color="primary">
            <Chip icon={<HowToRegIcon />} label="Voters" title="Voters"/>
          </Badge>
          <Badge sx={{ my:2 }} badgeContent={3} color="primary">
            <Chip icon={<PostAddIcon />} label="Proposals" title="Proposals"/>
          </Badge>
          <Badge sx={{ my:2 }} badgeContent={1} color="primary">
            <Chip icon={<HowToVoteIcon />} label="Votes" title="Votes"/>
          </Badge>
        </Stack>
      </Box>
    );
  }
  
  export default Aside;