import { roles } from "../../helper/const";

const actions = {
  init: "INIT",
  updateCurrentStep: "UPDATE_CURRENT_STEP",
};

const initialState = {
  artifact: null,
  web3: null,
  accounts: null,
  networkID: null,
  contract: null,

  // Vote process step
  currentStep: 0,

  // Dapp user
  user: {
    connected: true,
    address: "0x123",
    role: roles.OWNER,
    // role: roles.VOTER,
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

    case actions.updateCurrentStep:
      return { ...state, currentStep: parseInt(data.newWstate) };

    default:
      throw new Error("Undefined reducer action type");
  }
};

export { actions, initialState, reducer };
