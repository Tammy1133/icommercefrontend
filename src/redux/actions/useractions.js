import { ActionTypes } from "../constants/action-types";

export const setUser = (data) => {
  return {
    type: ActionTypes.SET_USER,
    payload: data,
  };
};
export const removeUser = () => {
  return {
    type: ActionTypes.REMOVE_USER,
    // payload: data,
  };
};
