import logo from './logo.svg';

import './App.css';

import {
  Container,
  FormControl,
  FormHelperText,
  MenuItem,
  Button,
  TextField,
  InputLabel,
  Select,
  Input,
  Box,
  Icon,
  Stepper,
  Step,
  StepLabel,
  Divider
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

const steps = [
  'Registering Voters',
  'Proposals Registration Started',
  'Proposals Registration Ended',
  'Voting Session Started',
  'Voting Session Ended',
  'VotesTallied'
];




function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={0} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Divider variant="middle" ><br /><br /></Divider>

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          '& > :not(style)': { m: 1 },
        }}>
          <TextField fullWidth id="addVoterAddress" label="Address to add" variant="filled" />
          <Button variant="contained">
            <AddIcon></AddIcon>
          </Button>
        </Box>


        <FormControl fullWidth>
          <InputLabel id="proposition-id" fullWidth>Vote For</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
          >
            <MenuItem value={0}></MenuItem>
            <MenuItem value={1}>Proposition 1</MenuItem>
            <MenuItem value={2}>Proposition 2</MenuItem>
            <MenuItem value={3}>Proposition 3</MenuItem>
          </Select>
        </FormControl>

        <Divider variant="middle" ><br /><br /></Divider>
        <Divider variant="middle" ><br /><br /></Divider>
        <Divider variant="middle" ><br /><br /></Divider>


        <a
          className="App-link"
          href="https://github.com/adrien-vieilleribiere/Alyra-AV-OD"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github sources
        </a>
      </header>
    </div >
  );
}

export default App;
