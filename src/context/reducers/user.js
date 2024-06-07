import {
  ADD_USER,
  REMOVE_USER,
  EDIT_USER,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from "../action/index";

const initialState = {
  users: [],
  followedUsers: [],
};

const saveState = (state) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem("state", serializedState);
};

const loadState = () => {
  const serializedState = localStorage.getItem("state");
  if (serializedState === null) {
    return initialState;
  }
  return JSON.parse(serializedState);
};

export const user = (state = loadState(), { payload, type }) => {
  let newState;
  switch (type) {
    case ADD_USER:
      newState = { ...state, users: [...state.users, payload] };
      saveState(newState);
      return newState;
    case REMOVE_USER:
      if (confirm("Are you sure?")) {
        newState = {
          ...state,
          users: state.users.filter((e) => e.id !== payload.id),
        };
        saveState(newState);
        return newState;
      }
      return state;
    case EDIT_USER:
      newState = {
        ...state,
        users: state.users.map((user) =>
          user.id === payload.id ? payload : user
        ),
      };
      saveState(newState);
      return newState;
    case FOLLOW_USER:
      if (!state.followedUsers.find((u) => u.id === payload.id)) {
        newState = {
          ...state,
          followedUsers: [...state.followedUsers, payload],
        };
        saveState(newState);
        return newState;
      }
      return state;
    case UNFOLLOW_USER:
      newState = {
        ...state,
        followedUsers: state.followedUsers.filter((u) => u.id !== payload.id),
      };
      saveState(newState);
      return newState;
    default:
      return state;
  }
};
