const actions = {
  init: "INIT",
  updateStep: "UPDATE_STEP",
  updateUserInfo: "UPDATE_USER_INFO",
  addVoter: "ADD_VOTER",
  addProposal: "ADD_PROPOSAL",
  addVote: "ADD_VOTE",
  updateVoteCounts: "UPDATE_VOTE_COUNT"
};

const initialState = {
  artifact: null,
  web3: null,
  accounts: null,
  networkID: null,
  contract: null,
  txhash: null,
  deployTx: null,
  deployBlock: null,

  // Vote process step
  step: 0,

  // contract owner
  owner: null,

  // Dapp user
  user: {
    isConnected: false,
    isOwner: false,
    isVoter: false,
    hasVoted: false,
    proposals: []
  },

  // All voters
  voters: [
    // structure: address, hasVoted, votedProposalId 
    // {
    //   address: "0x...",
    //   hasVoted: false,
    //   votedProposalId: 0, [NOT USED]
    //   txHash: "0x...",
    // }
  ],

  // All proposals
  proposals: [
    // structure: id?, desc, voteCount
    // {
    //   id: 0,
    //   submitter: 0x
    //   description: "bla bla",
    //   voteCount: 0, [NOT USED]
    //   txHash: "0x...",
    // }
  ],

  // All votes
  votes: [
    // {
    //   voter: 0x
    //   proposalId: 1,
    //   txHash: "0x...",
    // }
  ],


};

const reducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.init:
      return { ...state, ...data };

    case actions.updateStep:
      return { ...state, step: data };

    case actions.updateUserInfo:
      return { ...state, user: { ...state.user, ...data } };

    case actions.addVoter:
      const foundVoter = state.voters.filter(voter => voter.txHash === data.txHash);
      if (foundVoter.length === 0) {
        return { ...state, voters: [...state.voters, data] };
      }
      return { ...state }

    case actions.addProposal:
      const foundProp = state.proposals.filter(proposal => proposal.txHash === data.txHash);
      if (foundProp.length === 0) {
        return { ...state, proposals: [...state.proposals, data] };
      }
      return { ...state }

    case actions.addVote:
      const foundVote = state.votes.filter(vote => vote.txHash === data.txHash);
      if (foundVote.length === 0) {

        const voters = state.voters.map((voter) => {
          if (voter.address === data.voter) {
            voter.hasVoted = true;
            voter.votedProposalId = data.proposalId;
          }
          return voter;
        });

        return {
          ...state,
          votes: [...state.votes, data],
          voters: voters,
        };
      }
      return { ...state }

    case actions.updateVoteCounts:
      return {
        ...state,
        proposals: data
      };


    default:
      throw new Error("Undefined reducer action type");
  }
};

export { actions, initialState, reducer };
