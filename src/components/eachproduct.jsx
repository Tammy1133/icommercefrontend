import React, { useEffect, useState } from "react";
import soap5 from "../utils/soap5.jpeg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart, increaseQuantity } from "../redux/actions/cart";

export const EachProduct = (item) => {
  const [isAdded, setIsAdded] = useState(false);

  // console.log(item);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItemsFromRedux = useSelector((state) => state.cart.cart);

  const handleAddToCart = (id) => {
    const exists = cartItemsFromRedux.find((item) => item.id === id);

    console.log(cartItemsFromRedux);
    console.log(id);
    console.log(quantity);
    if (!exists && quantity > 0) {
      dispatch(AddToCart({ ...item.item, quantity: quantity }));
    } else if (quantity > 0) {
      // find and remove
      dispatch(increaseQuantity({ ...item.item, quantity: quantity }));
    }
  };
  return (
    <div className="hover:cursor-grab transition-all hover:scale-[103%] p-2 sm:p-3   w-[200px] max-[639px]:w-[240px]  min-[640px]:w-[280px] border-2 border-slate-200 mb-3">
      <div className="">
        <img
          src={item.item?.image.replace(/^["'](.*)["']$/, "$1")}
          alt=""
          className="object-cover w-[200px] max-[639px]:w-[240px]  min-[640px]:w-[280px]"
        />

        <div className="mt-2  min-[640px]:text-left ">
          <p
            className="text-xs md:text-sm font-bold cursor-pointer"
            onClick={() => {
              navigate(`/product/${item.item.id}`);
            }}
          >
            {item.item.name.slice(0)}
          </p>
          <p className="font-bold mt-2"> ₦{item.item.price.toLocaleString()}</p>
          {/* <p className="text-sm">Buy from 3 and get 1% off</p> */}

          <div className="sm:flex-row   flex items-center ">
            {/* <button className="py-2 px-2 font-bold bg-yellow-500 rounded-2xl text-black text-sm mt-2 sm:mt-0">
            Add to cart </button> */}
            <button
              onClick={() => {
                handleAddToCart(item.item.id);
                setIsAdded(true);
              }}
              className=" w-full flex uppercase   pb-[2px] items-center justify-center h-full bg-slate-900 text-white px-2 rounded-lg mt-2"
            >
              <h1 className="text-[10px] pt-[10px] transition-all">
                {isAdded ? "Added to cart" : "Add to cart"}
              </h1>
              {!isAdded && (
                <i className="bi bi-cart4 text-[15px]  ml-2  cursor-pointer"></i>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
