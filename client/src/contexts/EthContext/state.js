import { roles } from "../../helper/const";

const actions = {
  // reset: "RESET",
  init: "INIT",
  updateCurrentStep: "UPDATE_CURRENT_STEP",
  updateUserInfo: "UPDATE_USER_INFO"
};

const initialState = {
  artifact: null,
  web3: null,
  accounts: null,
  networkID: null,
  contract: null,

  /* Smart contract Info */
  // Vote process step
  currentStep: null,

  // Vote process step
  deployBlock: null,

  // contract owner
  owner: null,

  /* Dapp user info */
  user: {
    connected: false,
    role: roles.NONE,
    hasVoted: false,
    proposals: []
  },

  /* Voters info 
    - init with all from deployment block
    - register to event
  */
  voters: [
    // address, hasVoted, votedProposalId 
    { // added for test
      address: "0xD5CaE5F93409A5bCc8DD057837EEbB741Fe5CF8C",
      hasVoted: false,
      votedProposalId: 0,
    }
  ],

  /* Proposals info 
    - init with all from deployment block
    - register to event
  */
  proposals: [
    // desc, voteCount
  ],

};

const reducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    // case actions.reset:
    //   return { ...state, ...initialState };

    case actions.init:
      return { ...state, ...data };

    case actions.updateCurrentStep:
      return { ...state, currentStep: data.newStep };

    case actions.updateUserInfo:
      return { ...state, user: { ...state.user , ...data } };

    default:
      throw new Error("Undefined reducer action type");
  }
};

export { actions, initialState, reducer };
