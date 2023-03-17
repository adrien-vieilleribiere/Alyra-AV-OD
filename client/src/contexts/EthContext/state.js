const actions = {
  init: "INIT",
  updateStep: "UPDATE_STEP",
  updateUserInfo: "UPDATE_USER_INFO",
  addVoter: "ADD_VOTER",
  addProposal: "ADD_PROPOSAL",
  addVote: "ADD_VOTE"
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
    //   votedProposalId: 0,
    // }
  ],

  // All proposals
  proposals: [
    // structure: id?, desc, voteCount
    // {
    //   id: 0,
    //   submitter: 0x
    //   description: "bla bla",
    //   voteCount: 0,
    // }
  ],

  // All votes
  votes: [
    // {
    //   voter: 0x
    //   proposalId: 1,
    // }
  ]

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
      return { ...state, voters: [...state.voters, data] };

    case actions.addProposal:
      return { ...state, proposals: [...state.proposals, data] };

    case actions.addVote:
      return { ...state, votes: [...state.votes, data] };


    default:
      throw new Error("Undefined reducer action type");
  }
};

export { actions, initialState, reducer };
