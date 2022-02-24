import { createStore, applyMiddleware, compose } from "redux";
import combineReducer from "./reducers/combineReducer";

export const store = createStore(
  combineReducer,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
