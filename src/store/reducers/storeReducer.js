import * as actions from "../actions/storeActions";

const storeDefaultState = {
  stores: [],
  states: [],
  filteredStores: [],
  sortColumn: "",
  sortDirection: "asc",
  refresh: false,
  isEditing: false,
  editingRecord: {},
};

const storeReducer = (state = storeDefaultState, action) => {
  //debugger;
  switch (action.type) {
    case actions.SET_STORE:
      return {
        ...state,
        stores: action.stores,
        filteredStores: action.stores,
      };
    case actions.UPDATE_FILTERED:
      return { ...state, filteredStores: action.filteredStores };
    case actions.SET_SORT_COLUMN:
      return { ...state, sortColumn: action.sortColumn };
    case actions.SET_SORT_DIRECTION:
      return { ...state, sortDirection: action.sortDirection };
    case actions.REFRESH:
      return { ...state, refresh: !state.refresh };
    case actions.START_EDITING:
      return {
        ...state,
        isEditing: action.isEditing,
        editingRecord: action.editingRecord,
      };
    case actions.END_EDITING:
      return {
        ...state,
        isEditing: false,
        editingRecord: {},
        refresh: !state.refresh,
      };
    case actions.EDITING_CHANGE:
      const { name, value } = action;
      const editingRecord = { ...state.editingRecord, [name]: value };
      return { ...state, editingRecord: editingRecord };
    case actions.SET_STATES:
      return { ...state, states: action.states };
    case actions.FILTER_CHANGE:
      let filter = state.stores.filter((store) => {
        return store.storeName.includes(action.value);
      });
      if (action.value.length > 0) {
        state.filteredStores = filter;
      } else {
        state.filteredStores = state.stores;
      }
      return { ...state, filter };
    default:
      return state;
  }
};

export default storeReducer;
