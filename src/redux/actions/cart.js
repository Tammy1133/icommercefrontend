import { ActionTypes } from "../constants/action-types";

export const AddToCart = (item) => {
  return {
    type: ActionTypes.ADD_TO_CART,
    payload: item,
  };
};

export const increaseQuantity = (newitem) => {
  return {
    type: ActionTypes.INCREASE_CART_QUANTITY,
    payload: newitem,
  };
};
export const increaseQuantityInCart = (id) => {
  return {
    type: ActionTypes.INCREASE_CART_QUANTITY_IN_CART,
    payload: id,
  };
};
export const decreaseQuantity = (name) => {
  return {
    type: ActionTypes.DECREASE_CART_QUANTITY,
    payload: name,
  };
};

export const deleteCartItem = (id) => {
  return {
    type: ActionTypes.DELETE_CART_ITEM,
    payload: id,
  };
};
export const clearCart = () => {
  return {
    type: ActionTypes.CLEAR_CART,
  };
};
