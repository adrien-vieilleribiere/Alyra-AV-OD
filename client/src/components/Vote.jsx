// import React, { useEffect, useState } from "react";
//import useEth from "../contexts/EthContext/useEth";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

function Vote() {
  return (
    <FormControl fullWidth>
      <InputLabel id="proposal-select-label">Select a proposal</InputLabel>
      <Select
        label="Select a proposal"
        labelId="proposal-select-label"
        id="proposal-select"
      // value={proposal}
      // onChange={handleChange}
      >
        <MenuItem value={0}></MenuItem>
        <MenuItem value={1}>Proposal 1</MenuItem>
        <MenuItem value={2}>Proposal 2</MenuItem>
        <MenuItem value={3}>Proposal 3</MenuItem>
      </Select>
      <br />
      <Button variant="contained">Vote</Button>
    </FormControl>
  );
}

export default Vote;
