import { combineReducers } from "redux";
import storeReducer from "./storeReducer";
import newStoreReducer from "./newStoreReducer";

export default combineReducers({
  storeReducer,
  newStoreReducer,
});
