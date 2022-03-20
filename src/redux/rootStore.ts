import { combineReducers, createStore } from "redux";
import { caseReducer, configurationsReducer } from "./reducers";

const rootReducer = combineReducers({
  case: caseReducer,
  configurations: configurationsReducer
});

export const RootStore = createStore(rootReducer);
