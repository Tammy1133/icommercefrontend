import React, { useEffect, useState } from "react";
import { Navbar } from "./navbar";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/actions/cart";
import { Eachcartitem } from "./eachcartitem";
import Button from "react-bootstrap/Button";
import { EachcartitemSmall } from "./eachcartitemsmall";
import { useNavigate } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import axios from "axios";
import { Footer } from "./footer";

export const Cart = () => {
  const [cartitems, setCartItems] = useState([]);
  const [total, setTotal] = useState([]);
  const cartItemsFromRedux = useSelector((state) => state.cart.cart);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [skincareProducts, setSkincareProducts] = useState([]);
  const [isAdded, setIsAdded] = useState(false);

  const getAllProducts = async () => {
    try {
      // setLoading(true);

      const data = await axios.get(
        "https://icommercebackend.onrender.com/api/allproducts"
      );
      console.log(data);
      setSkincareProducts(data.data.products);

      // setErrorMessage("Product added successfully");
      // setLoading(false);
    } catch (error) {
      console.log(error);
      // console.log(error);
      if (error.response) {
        // setErrorMessage(error.response.data); // Set server error message
      } else {
        // setErrorMessage(error.message); // Set client-side validation error message
      }
      // setLoading(false);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  const user = useSelector((state) => {
    return state.user.user;
  });
  const addOrderToUser = async () => {
    try {
      const data = await axios.put(
        "https://icommercebackend.onrender.com/api/addordertouser",
        {
          id: user.id,
          item: cartItemsFromRedux,
          total: total,
        }
      );
      console.log(data);
      setErrorMessage("Product added successfully");
      // navigate("/profile/orders");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data); // Set server error message
      }
    }
  };
  const addOrder = async () => {
    try {
      const data = await axios.post(
        "https://icommercebackend.onrender.com/api/addorder",
        {
          id: user.id,
          item: cartItemsFromRedux,
          total: total,
        }
      );
      console.log(data);
      setErrorMessage("Product added successfully");
      // navigate("/profile/orders");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data); // Set server error message
      }
    }
  };

  const navigate = useNavigate();
  const handlePaystackSuccessAction = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    addOrder();
    addOrderToUser();
    navigate("/profile/orders");
    console.log(reference);
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };
  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: total * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: "pk_test_80cb0e9433c79c3b53e3b83bc15ea2956d848b35",
  };
  const componentProps = {
    ...config,
    text: "Checkout",
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    setCartItems(cartItemsFromRedux);
  }, [cartItemsFromRedux]);

  const dispatch = useDispatch();

  const getTotal = () => {
    const totalnumber = cartitems.reduce(
      (x, item) => x + item.quantity * item.price,
      0
    );
    setTotal(totalnumber);
  };

  useEffect(() => {
    getTotal();
  }, [cartitems]);

  return (
    <div>
      <Navbar></Navbar>

      <div className="mt-4 md:hidden p-3">
        <h3 className="text-center text-sm font-semibold">Cart items</h3>

        {cartitems.length === 0 ? (
          <div className="mt-5 font-bold text-xl">Your Cart is empty</div>
        ) : (
          <div className="pt-4 pb-7">
            {cartitems.map((item, key) => {
              return (
                <EachcartitemSmall key={key} item={item}></EachcartitemSmall>
              );
            })}

            <Button
              variant="danger"
              className="my-5 w-full"
              onClick={() => {
                dispatch(clearCart());
              }}
            >
              Clear cart
            </Button>

            <div className="h-[1px] rounded-md w-full bg-slate-300 mt-[25px]"></div>

            <div className="font-bold flex justify-between mt-[35px]">
              <p>SubTotal:</p> <p>₦{total.toLocaleString()}</p>
            </div>
            <div className="h-[1px] rounded-md w-full bg-slate-300 mt-[25px]"></div>
            <div className="">
              <form action=" " className="mt-3">
                <label htmlFor="">Enter email</label> <br />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Enter email to checkout"
                  className="border-[1px] mt-2 placeholder:text-black placeholder:font-semibold border-slate-300 rounded-lg w-full py-2 pl-3"
                />
              </form>
            </div>
            {user ? (
              <div className="">
                {emailRegex.test(email) ? (
                  <Button variant="primary" className="mt-4 w-full">
                    <PaystackButton {...componentProps} className="w-full" />
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    className="mt-4 w-full !cursor-not-allowed"
                  >
                    Checkout
                  </Button>
                )}
              </div>
            ) : (
              <Button
                variant="secondary"
                className="mt-4 w-full !cursor-not-allowed"
              >
                Login to checkout
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="hidden md:flex flex-col h-screen justify-center items-center w-screen">
        <p>This page is not available of large screens</p>
        <br />
        <p>
          Click{" "}
          <span
            className="font-bold text-xl cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            here
          </span>{" "}
          to go back to home
        </p>
      </div>

      <Footer></Footer>
    </div>
  );
};
