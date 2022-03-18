import { combineReducers, createStore } from "redux";
import { caseReducer } from "./reducers";

const rootReducer = combineReducers({
  case: caseReducer,
});

export const RootStore = createStore(rootReducer);
