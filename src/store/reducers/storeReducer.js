import * as actions from "../actions/storeActions";

const storeDefaultState = {
  stores: [],
  filteredStores: [],
  sortColumn: "",
  sortDirection: "asc",
  refresh: false,
};

const storeReducer = (state = storeDefaultState, action) => {
  //debugger;
  switch (action.type) {
    case actions.SET_STORE:
      return { ...state, stores: action.stores, filteredStores: action.stores };
    case actions.UPDATE_FILTERED:
      return { ...state, filteredStores: action.filteredStores };
    case actions.SET_SORT_COLUMN:
      return { ...state, sortColumn: action.sortColumn };
    case actions.SET_SORT_DIRECTION:
      return { ...state, sortDirection: action.sortDirection };
    case actions.REFRESH:
      return { ...state, refresh: !state.refresh };
    default:
      return state;
  }
};

export default storeReducer;
