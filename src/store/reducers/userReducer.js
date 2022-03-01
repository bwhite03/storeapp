import * as actions from "../actions/storeActions";

const userDefaultState = {
  users: [],
  filteredUsers: [],
  sortDirection: "asc",
  sortColumn: "",
  isEditing: false,
  editingRecord: {},
  refresh: false,
};

const userReducer = (state = userDefaultState, action) => {
  switch (action.type) {
    case actions.SET_USERS:
      return { ...state, users: action.users, filteredUsers: action.users };
    case actions.START_EDITING:
      return {
        ...state,
        isEditing: action.isEditing,
        editingRecord: action.editingRecord,
      };
    case actions.EDITING_CHANGE:
      const { name, value } = action;
      const editingRecord = { ...state.editingRecord, [name]: value };
      return { ...state, editingRecord: editingRecord };
    case actions.END_EDITING:
      return {
        ...state,
        isEditing: action.isEditing,
        editingRecord: action.editingRecord,
      };
    case actions.REFRESH:
      return { ...state, refresh: !state.refresh };
    case actions.SET_SORT_USERS:
      return {
        ...state,
        filteredUsers: action.filteredUsers,
        sortColumn: action.sortColumn,
      };
    case actions.SET_SORT_COLUMN:
      return {
        ...state,
        sortColumn: action.sortColumn,
      };
    case actions.SET_SORT_DIRECTION:
      return { ...state, sortDirection: action.sortDirection };
    default:
      return state;
  }
};

export default userReducer;
