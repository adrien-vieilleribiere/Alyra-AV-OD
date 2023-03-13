const actions = {
  init: "INIT",
  updateStep: "UPDATE_CURRENT_STEP",
  updateUserInfo: "UPDATE_USER_INFO"
};

const initialState = {
  artifact: null,
  web3: null,
  accounts: null,
  networkID: null,
  contract: null,

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
    // id?, desc, voteCount
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

    case actions.updateUserInfo:
      return { ...state, user: { ...state.user, ...data } };

    default:
      throw new Error("Undefined reducer action type");
  }
};

export { actions, initialState, reducer };
