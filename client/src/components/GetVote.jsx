import React, { useState } from "react";
import useEth from "../contexts/EthContext/useEth";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
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
        ? <Alert severity="success">{votedProposalDescription}</Alert>
        : (voterAddress ? <Alert severity="warning">The voter didn't vote</Alert> : "")}
      </p>
    </FormControl >

  );
}

export default GetVote;
