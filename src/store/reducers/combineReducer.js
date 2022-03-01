import { combineReducers } from "redux";
import storeReducer from "./storeReducer";
import newStoreReducer from "./newStoreReducer";
import userReducer from "./userReducer";

export default combineReducers({
  storeReducer,
  newStoreReducer,
  userReducer,
});
