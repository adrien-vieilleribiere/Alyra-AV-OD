import React, { useEffect, useState } from "react";
import useEth from "../contexts/EthContext/useEth";
import { Box } from '@mui/material';
function GetWinner() {
  let { state: { contract, accounts, proposals } } = useEth();
  const [winner, setWinner] = useState(0);
  useEffect(() => {
    (async function () {
      console.log("PROPS STATR", proposals);
      const getWinningProp = parseInt(await contract.methods.winningProposalID().call({ from: accounts[0] }));
      console.log("WIINNING3", getWinningProp);
      if (getWinningProp > 0) {
        const bestProposalDescription = proposals.filter(prop => parseInt(prop.id) === getWinningProp);
        console.log("bp", bestProposalDescription);
        if (bestProposalDescription.length > 0) {
          setWinner(bestProposalDescription[0].description);
        }

      }
    })();
  },);

  return (
    <Box sx={{ minHeigth: "3rem" }}>
      <p>And the winner proposal is: {winner} !!!</p>
      <div class="firework"></div>
    </Box>
  );
}
export default GetWinner;
