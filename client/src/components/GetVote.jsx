import React, { useEffect, useState } from "react";
import useEth from "../contexts/EthContext/useEth";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function GetVote() {
  const { state: { contract, accounts } } = useEth();
  console.log(accounts[0]);
  return (
    <FormControl fullWidth>
      <InputLabel id="voter-select-label">Select a voter</InputLabel>
      <Select
        label="Select a voter"
        labelId="voter-select-label"
        id="voter-select"
      // value={voter}
      // onChange={handleChange}
      >
        <MenuItem value={0}></MenuItem>
        <MenuItem value={1}>voter 1</MenuItem>
        <MenuItem value={2}>voter 2</MenuItem>
        <MenuItem value={3}>voter 3</MenuItem>
      </Select>
      <br />
      <Button variant="contained">See the Vote</Button>
    </FormControl>
  );
}

export default GetVote;
