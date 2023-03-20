import React, { useEffect, useState } from "react";
import { Box, List, ListItem, Chip, Avatar, Typography } from '@mui/material';
import { Fireworks } from '@fireworks-js/react'
import useEth from "../contexts/EthContext/useEth";

function GetWinner() {

  let { state: { contract, accounts, proposals, actions, dispatch } } = useEth();
  const [winner, setWinner] = useState(0);
  const [updateProposals, setUpdateProposals] = useState(true);
  const [sortProposals, setSortProposals] = useState(true);
  const [updatedProposals, setUpdatedProposals] = useState([]);
  const [sortedProposals, setSortedProposals] = useState([]);
  const [orderedItems, setOrderedItems] = useState([]);
  var weightedProposals = [];
  var orderedProposals = null;





  useEffect(() => {
    (async function () {
      const getWinningProp = parseInt(await contract.methods.winningProposalID().call({ from: accounts[0] }));
      if (getWinningProp > 0) {
        const bestProposalDescription = proposals.filter(prop => parseInt(prop.id) === getWinningProp);
        console.log("bp", bestProposalDescription);
        if (bestProposalDescription.length > 0) {
          setWinner(bestProposalDescription[0].description);
        }
      }
      if (proposals.length > 0 && updateProposals) {
        weightedProposals = await proposals.map(async (localProposal) => {
          let getProp = await contract.methods.getOneProposal(localProposal.id).call({ from: accounts[0] });
          localProposal.voteCount = parseInt(getProp.voteCount);
          return localProposal;
        });
        setUpdatedProposals(await weightedProposals);
        // 


        Promise.all(weightedProposals).then((values) => {
          //console.log("values:", values);
          orderedProposals = values.sort(
            (a, b) => a.voteCount < b.voteCount ? 1 : -1);
          // console.log("sorted", orderedProposals);
          if (actions) {
            dispatch({
              type: actions.updateVoteCounts,
              data: orderedProposals
            });
            setUpdateProposals(false);
            setSortProposals(false);
            setSortedProposals(orderedProposals)
          }
          if (orderedProposals.length) {
            setOrderedItems(orderedProposals.map((sortedProp) =>
              <ListItem key={"prop" + sortedProp.id}>
                <Chip
                  key={"prop" + sortedProp.id}
                  label={sortedProp.description}
                  avatar={<Avatar>{sortedProp.voteCount}</Avatar>}
                ></Chip>
              </ListItem>));
            setSortProposals(false);
          }
        });

      }

    })();
  }, [updateProposals, proposals, sortedProposals, setSortProposals]);

  return (
    <Box >
      <Box
        sx={{ p: 2, border: '1px solid grey', borderRadius: '10px' }}
      >
        <Typography variant="h6" component="h3">
          Winning proposal
        </Typography>
        <Typography variant="subtitle1">
          And the winner proposal is: "<b><em>{winner}</em></b>" !!!
        </Typography>
      </Box>
      <Box
        mt={2}
        sx={{ p: 2, border: '1px solid grey', borderRadius: '10px' }}
      >
        <Typography variant="h6" component="h3">
          Detailed results
        </Typography>
        <Typography variant="subtitle1">
          Proposals with their respective number of votes.
        </Typography>
        <List>
          {orderedItems}
        </List>

        <Fireworks
          options={{
            rocketsPoint: {
              min: 0,
              max: 100
            }
          }}
          style={{
            top: "40%",
            left: "30%",
            //   width: '100%',
            //   height: '100%',
            position: 'fixed',
            //   background: '#000'
          }}
        /></Box>

    </Box >
  );
}
export default GetWinner;
