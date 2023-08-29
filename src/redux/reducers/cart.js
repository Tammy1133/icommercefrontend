import { ActionTypes } from "../constants/action-types";

const initialState = {
  cart: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case ActionTypes.INCREASE_CART_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...action.payload,
            };
          }
          return item;
        }),
      };

    case ActionTypes.CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    case ActionTypes.DELETE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.filter((item) => {
          return item.id !== action.payload;
        }),
      };

    default:
      return state;
  }
};
