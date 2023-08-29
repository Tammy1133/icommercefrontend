import { ActionTypes } from "../constants/action-types";

export const setdevotions = (data) => {
  return {
    type: ActionTypes.SET_DEVOTION_ITEMS,
    payload: data,
  };
};
