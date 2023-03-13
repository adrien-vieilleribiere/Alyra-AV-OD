
// import React, { useEffect, useState } from "react";
//import useEth from "../contexts/EthContext/useEth";
import {
  TextField,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function AddProposition() {
  return (
    [
      <TextField fullWidth id="addProposal" label="Proposal description" variant="outlined" />,
      <Button variant="contained" size='large' title='Add'>
        <AddIcon></AddIcon>
      </Button>
    ]
  );
}

export default AddProposition;
