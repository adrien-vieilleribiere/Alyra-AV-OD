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

function Examples() {

  return <><h2>Examples</h2>
    <hr />
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={0} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>

    <hr />

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

    <hr />
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
    <hr />
  </>;

}

export default Examples;
