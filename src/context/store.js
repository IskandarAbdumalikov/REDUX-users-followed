import { legacy_createStore, combineReducers } from "redux";
import { user } from "./reducers/user";

const rootReducer = combineReducers({
  user,
});

const loadState = () => {
  const serializedState = localStorage.getItem("state");
  if (serializedState === null) {
    return undefined;
  }
  return JSON.parse(serializedState);
};

const saveState = (state) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem("state", serializedState);
};

const persistedState = loadState();

const store = legacy_createStore(rootReducer, persistedState);

store.subscribe(() => {
  saveState(store.getState());
});

export { store };
