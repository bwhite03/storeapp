import { createStore, applyMiddleware } from "redux";
import combineReducer from "./reducers/combineReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  combineReducer,
  composeWithDevTools(applyMiddleware())
);

export default store;
