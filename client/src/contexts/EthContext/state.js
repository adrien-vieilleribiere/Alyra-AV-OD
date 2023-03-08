import { roles } from "../../helper/const";

const actions = {
  init: "INIT"
};

const initialState = {
  artifact: null,
  web3: null,
  accounts: null,
  networkID: null,
  contract: null,

  // Vote process step
  currentStep : 1,

  // Dapp user
  user : {
    connected: true,
    address: "0x123",
    role: roles.VOTER,
    hasVoted: false,
    proposals: []
  },

  // All proposals
  proposals: []
  
};

const reducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.init:
      return { ...state, ...data };
    default:
      throw new Error("Undefined reducer action type");
  }
};

export { actions, initialState, reducer };
