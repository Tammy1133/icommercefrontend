import { combineReducers } from "redux";
import { usersReducer } from "./userReducer";
import { cartReducer } from "./cart";

// import { setCurrentUser } from "../reducers/accountReducer";

export const reducers = combineReducers({
  cart: cartReducer,
  user: usersReducer,
});
