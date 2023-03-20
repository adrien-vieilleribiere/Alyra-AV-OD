
import { useState, useEffect } from "react";
import useEth from "../contexts/EthContext/useEth";
import { Box, TextField, Button, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function AddProposal() {

  const { state: { contract, accounts } } = useEth();
  const [proposalDescription, setProposalDescription] = useState("");
  const [descriptionIsValid, setDescriptionIsValid] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  // const [error, setError] = useState("")

  useEffect(() => {
    if (alertVisible) {
      setTimeout(() => {
        setAlertVisible(false);
      }, 5000);
    }
  }, [alertVisible])

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
      setAlertVisible(true);
      setAlertContent({ severity: "success", msg: "Proposal added" })
    }
  };

  return (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        '& > :not(style)': { m: 1 },
      }}>
        <TextField fullWidth id="addProposal" value={proposalDescription} label="Proposal description" variant="outlined" onChange={handleDescriptionChange} error={!descriptionIsValid} />
        <Button variant="contained" size='large' title='Add' onClick={registerProposal} disabled={!descriptionIsValid}>
          <AddIcon></AddIcon>
        </Button>
      </Box>

      {alertVisible &&
        <Alert severity={alertContent.severity}>{alertContent.msg}</Alert>
      }

    </>
  );
}

export default AddProposal;
