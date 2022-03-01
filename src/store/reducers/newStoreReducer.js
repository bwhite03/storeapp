import * as actions from "../actions/storeActions";

const storeDefaultState = {
  storeNumber: "",
  storeName: "",
  termCount: "",
  version: "",
  state: "",
  taxRate: "",
  groupId: "",
};

const newStoreReducer = (state = storeDefaultState, action) => {
  //debugger;
  switch (action.type) {
    case actions.UPDATE_FORM_STATE:
      const { name, value } = action;
      return { ...state, [name]: value };
    case actions.REFRESH:
      return storeDefaultState;
    default:
      return state;
  }
};

export default newStoreReducer;
