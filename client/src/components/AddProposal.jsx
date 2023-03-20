
import React, { useState } from "react";
import useEth from "../contexts/EthContext/useEth";
import {
  TextField,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function AddProposal() {

  const { state: { contract, accounts } } = useEth();
  const [proposalDescription, setProposalDescription] = useState("");
  const [descriptionIsValid, setDescriptionIsValid] = useState(false);
  // const [error, setError] = useState("")

  async function handleDescriptionChange(evt) {
    setProposalDescription(evt.target.value);
    if (evt.target.value) {
      try {
        await contract.methods.addProposal(evt.target.value).call({ from: accounts[0] });
        setDescriptionIsValid(true);
      } catch (error) {
        setDescriptionIsValid(false);
        console.log(error);
        // setError(error);
      }
    }
    else {
      setDescriptionIsValid(false);
    }
  }

  async function registerProposal(evt) {
    if (descriptionIsValid) {
      await contract.methods.addProposal(proposalDescription).send({ from: accounts[0] });
      setProposalDescription("");
      setDescriptionIsValid(false);
    }
  };

  return (
    [
      <TextField fullWidth id="addProposal" value={proposalDescription} label="Proposal description" variant="outlined" onChange={handleDescriptionChange} error={!descriptionIsValid} />,
      <Button variant="contained" size='large' title='Add' onClick={registerProposal} disabled={!descriptionIsValid}>
        <AddIcon></AddIcon>
      </Button>
    ]
  );
}

export default AddProposal;
