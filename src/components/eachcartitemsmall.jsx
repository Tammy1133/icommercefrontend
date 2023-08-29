import React from "react";
import { useDispatch } from "react-redux";
import { deleteCartItem, increaseQuantity } from "../redux/actions/cart";
import soap4 from "../utils/soap4.jpg";

export const EachcartitemSmall = ({ item }) => {
  const dispatch = useDispatch();

  const increaseQuantityfunc = () => {
    dispatch(increaseQuantity({ ...item, quantity: item.quantity + 1 }));
  };
  const decreaseQuantityfunc = () => {
    if (item.quantity > 1) {
      dispatch(increaseQuantity({ ...item, quantity: item.quantity - 1 }));
    } else {
      dispatch(deleteCartItem(item.id));
    }
  };
  const price = item.quantity * item.price;
  return (
    <div>
      <div className="mt-8 flex items-center justify-around  border-b-2 pb-4 border-slate-200">
        <img
          src={item?.image.replace(/^["'](.*)["']$/, "$1")}
          alt=""
          className="h-[70px] mr-2"
        />
        <div className="">
          <h3 className="text-sm font-semibold">{item.name}</h3>

          <div className="flex items-center">
            <div className="flex items-center  border border-slate-200 rounded-lg h-[30px]">
              <button
                className="  flex items-center px-2 text-xl text-black mr-3"
                onClick={() => {
                  increaseQuantityfunc();
                }}
              >
                +
              </button>
              <h2 className="text-sm pt-2">{item.quantity}</h2>
              <button
                className="  flex items-center px-2  text-xl text-black ml-3"
                onClick={() => {
                  decreaseQuantityfunc();
                }}
              >
                -
              </button>
            </div>
            <p className=" ml-2 text-sm">₦{price.toLocaleString()}</p>
          </div>
        </div>
        <div
          className="flex items-center justify-center h-[25px] w-[25px] border-2 border-slate-400  font-bold p-2 rounded-md hover:cursor-pointer hover:scale-[104%] transition"
          onClick={() => {
            dispatch(deleteCartItem(item.id));
          }}
        >
          <p className="p-2 text-slate-800 text-lg">×</p>
        </div>
      </div>
    </div>
  );
};
