import * as actions from "../actions/storeActions";

const storeDefaultState = {
  stores: [],
};

const storeReducer = (state = storeDefaultState, action) => {
  debugger;
  switch (action.type) {
    case actions.SET_STORE:
      return { ...state, stores: action.stores };

    default:
      return state;
  }
};

export default storeReducer;
