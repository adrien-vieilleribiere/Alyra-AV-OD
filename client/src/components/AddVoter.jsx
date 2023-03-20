import React, { useEffect, useState } from "react";
import useEth from "../contexts/EthContext/useEth";
import {
  Box,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function AddVoter() {
  const { state: { contract, accounts, web3 } } = useEth();
  const [voterAddress, setVoterAddress] = useState("");
  const [addressIsValid, setAddressIsValid] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  //const [error, setError] = useState("")

  useEffect(() => {
    if (alertVisible) {
      setTimeout(() => {
        setAlertVisible(false);
      }, 5000);
    }

  }, [alertVisible])

  async function handleVoterAddressChange(evt) {
    setVoterAddress(evt.target.value);
    if (evt.target.value) {
      if (web3.utils.isAddress(evt.target.value)) {
        try {
          await contract.methods.addVoter(evt.target.value).call({ from: accounts[0] });
          setAddressIsValid(true);
        } catch (error) {
          setAddressIsValid(false);
          console.log(error);
          //setError(error);
        }
      }
      else {
        setAddressIsValid(false);
      }
    }
  }

  async function registerVoter(evt) {
    console.log("voterAddress", voterAddress);
    if (addressIsValid) {
      await contract.methods.addVoter(voterAddress).send({ from: accounts[0] })
      setVoterAddress("");
      setAlertVisible(true);
      setAlertContent({ severity: "success", msg: "Address added" })
    }
  };

  return (
    [
      <>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          '& > :not(style)': { m: 1 },
        }}>
          <TextField
            fullWidth
            value={voterAddress}
            label="Voter address"
            variant="outlined"
            onChange={handleVoterAddressChange}
            error={!addressIsValid}
          />
          <Button variant="contained" size='large' title='Add' onClick={registerVoter} disabled={!addressIsValid}>
            <AddIcon></AddIcon>
          </Button>
        </Box>

        {alertVisible &&
          <Alert severity={alertContent.severity}>{alertContent.msg}</Alert>
        }
      </>
    ]
  );
}

export default AddVoter;
