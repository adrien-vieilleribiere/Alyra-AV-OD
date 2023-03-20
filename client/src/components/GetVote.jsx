import React, { useState } from "react";
import useEth from "../contexts/EthContext/useEth";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Box,
  Typography
} from '@mui/material';

function GetVote() {
  const { state: { contract, accounts, voters, proposals } } = useEth();
  const [voterAddress, setVoterAddress] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [votedProposal, setVotedProposal] = useState(0);
  const [votedProposalDescription, setVotedProposalDescription] = useState("");

  async function voterSelectionHandle(evt) {
    setVoterAddress(evt.target.value);
    if (evt.target.value) {
      var tryAddVoter = await contract.methods.getVoter(evt.target.value).call({ from: accounts[0] });
      setHasVoted(tryAddVoter.hasVoted);
      setVotedProposal(tryAddVoter.votedProposalId);
      proposals.map(proposal => {
        console.log(proposal);
        if (proposal.id == tryAddVoter.votedProposalId) {
          setVotedProposalDescription(proposal.description);
        }
      });
    }
    else {
      setHasVoted(false);
      setVotedProposal(0)
    }
  }



  return (
    <>
      <Box
        sx={{ p: 2, border: '1px solid grey', borderRadius: '10px' }}
      >
        <Typography variant="h6" component="h3" mb={2}>
          Check votes by address
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="voter-select-label">Select a voter</InputLabel>
          <Select
            label="Select a voter"
            labelId="voter-select-label"
            id="voter-select"
            value={voterAddress}
            onChange={voterSelectionHandle}
          >
            <MenuItem key="emptySelection" value="">
              <em>Choose a Voter</em>
            </MenuItem>
            {voters ? voters.map((voter, index) => (
              <MenuItem key={index} value={voter.address}>{voter.address}</MenuItem>
            )) : null}
          </Select>
          <br />

          <p >{hasVoted
            ? <Alert severity="success">
              The address selected voted for proposal: "<b><em>{votedProposalDescription}</em></b>"
            </Alert>
            : (voterAddress ?
              <Alert severity="warning">The address selected didn't vote</Alert> : ""
            )}
          </p>
        </FormControl >
      </Box>
    </>
  );
}

export default GetVote;
