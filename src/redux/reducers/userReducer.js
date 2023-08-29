import { ActionTypes } from "../constants/action-types";

const initialState = {
  user: undefined,
  token: undefined,
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ActionTypes.REMOVE_USER:
      return { ...state, user: undefined, token: undefined };
    default:
      return state;
  }
};
