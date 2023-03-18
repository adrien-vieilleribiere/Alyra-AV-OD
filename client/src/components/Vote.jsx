import React, { useState } from "react";
import useEth from "../contexts/EthContext/useEth";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Typography,
  Box
} from '@mui/material';

function Vote() {
  const { state: { contract, accounts, proposals, user: { hasVoted } } } = useEth();
  const [selectedProposal, setSelectedProposal] = useState(0);
  const [validProposal, setValidProposal] = useState(false);
  // const [error, setError] = useState("")

  async function handleVoteChange(evt) {
    if (evt.target.value) {
      try {
        const trySetVote = await contract.methods.setVote(selectedProposal).call({ from: accounts[0] });;
        setSelectedProposal(evt.target.value);
        setValidProposal(true);
        // console.log("trySetVote", trySetVote);
      } catch (error) {
        setValidProposal(false);
        console.log(error);
        // setError(error);
      }
    }
  }

  async function setVote(evt) {
    if (validProposal) {
      await contract.methods.setVote(selectedProposal).send({ from: accounts[0] });
      setSelectedProposal(0);
      setValidProposal(false);
    }
  };

  return (
    <>

      <Box
        sx={{ p: 2, border: '1px solid grey', borderRadius: '10px' }}
      >
        <Typography variant="h6" component="h3" mb={2}>
          Vote for this poll
        </Typography>

        <FormControl fullWidth>
          <InputLabel id="proposal-select-label">Select a proposal</InputLabel>
          <Select
            label="Select a proposal"
            labelId="proposal-select-label"
            id="proposal-select"
            value={selectedProposal}
            onChange={handleVoteChange}
            disabled={hasVoted}
          >
            <MenuItem value={0}>Choose a proposal in the list</MenuItem>
            {proposals.map((proposal) =>
              <MenuItem value={proposal.id} key={proposal.id}>{proposal.description}</MenuItem>
            )}
          </Select>
          <br />
          <Button variant="contained" onClick={setVote} disabled={!validProposal || hasVoted}>Vote</Button>
        </FormControl>
        {hasVoted &&
          <Alert severity="info">You have already voted!</Alert>
        }
      </Box>
    </>
  );
}

export default Vote;
