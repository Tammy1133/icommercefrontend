import React, { useEffect, useState } from "react";
import "../css/main.css";
import { Sling as Hamburger } from "hamburger-react";
import { useNavigate } from "react-router-dom";
import logo from "../utils/mylogo.png";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import { Eachcartitem } from "./eachcartitem";
import { clearCart } from "../redux/actions/cart";
import cart from "../utils/cart.png";
import { PaystackButton } from "react-paystack";
import axios from "axios";

export const Navbar = (props) => {
  console.log(props?.isAdmin);
  const [isOpen, setIsopen] = useState(false);
  const [cartitems, setCartItems] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [email, setEmail] = useState("");
  const cartItemsFromRedux = useSelector((state) => state.cart.cart);
  const [errorMessage, setErrorMessage] = useState("");
  const user = useSelector((state) => {
    return state.user.user;
  });
  console.log(cartItemsFromRedux);
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

  useEffect(() => {
    setCartItems(cartItemsFromRedux);
  }, [cartItemsFromRedux]);
  const [total, setTotal] = useState(0);

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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  console.log(user);
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

  return (
    <div className="fixed w-screen top-0 z-[5000]">
      <div className="bg-[red] text-white text-center py-2 text-xs md:text-base pr-2">
        Admin username= "admin" || Admin password= "password" || testuser
        username= "testuser" || testuser password= "password"
      </div>
      <div className=" py-1 z-50 px-1 sm:px-3 flex bg-white justify-between items-center shadow-xl ">
        <div className="flex items-center" onClick={() => navigate("/")}>
          <div className="flex  items-center relative cursor-pointer">
            <img
              src={logo}
              alt=""
              className=" fade-in-tl h-[30px] mt-2 sm:mt-0 sm:h-[40px]  object-cover  z-50 absolute top-0 left-0"
              // loading="lazy"
            />
            <h4 className="text-md sm:text-2xl font-bold  logo text-slate-700 pt-1 z-10 ml-[25px] md:ml-[33px] mt-1">
              Icommerce
            </h4>
          </div>
        </div>

        <div className="right flex items-center mt-2 mr-7">
          {props?.isAdmin === false ||
            (props?.isAdmin === undefined && (
              <div
                className="flex items-center font-bold mr-4 text-xl  transition-all cursor-pointer hover:scale-105"
                onClick={() => {
                  navigate("/search");
                }}
              >
                <i className="bi bi-search mt-[-7px] mr-1 text-xl sm:text-base text-[red] font-bold"></i>
                <h3 className="logo text-lg font-bold text-slate-700 hidden sm:block">
                  Search
                </h3>
              </div>
            ))}
          {user ? (
            <div
              onClick={() => {
                navigate("/profile");
              }}
              className="flex  font-bold hover:!text-[red] cursor-pointer hover:scale-105"
            >
              <i className="bi bi-person-fill  text-3xl mt-[-8px] sm:mt-[0px] sm:text-xl mr-1 text-[red]"></i>
              <h4 className="text-lg  logo font-bold text-slate-700 hidden sm:block">
                {user?.username?.charAt(0)?.toUpperCase() +
                  user?.username?.slice(1)?.toLowerCase()}
              </h4>
            </div>
          ) : (
            <div
              onClick={() => {
                navigate("/login");
              }}
              className="flex  font-bold hover:!text-[red] cursor-pointer hover:scale-105"
            >
              <i className="bi bi-person-fill  text-3xl mt-[-8px] sm:mt-[0px] sm:text-xl mr-1 text-[red]"></i>
              <h4 className="text-lg  logo font-bold text-slate-700 hidden sm:block">
                Login
              </h4>
            </div>
          )}

          {props?.isAdmin === false ||
            (props?.isAdmin === undefined && (
              <div className="hidden md:block ml-[10px] sm:ml-[30px] mt-[-10px]">
                <div
                  className="flex cursor-pointer hover:text-yellow-400 font-bold text-slate-700"
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  <img src={cart} alt="" className="h-[27px]" />
                  <div className="bg-[red] h-[20px] w-[20px] flex justify-center items-center rounded-full text-white ml-[-4px] mb-2 hover:scale-[106%] transition-all">
                    <p className=" text-sm hover:scale-[106%]  transition-all">
                      {cartitems.length}
                    </p>
                  </div>
                </div>
              </div>
            ))}

          {props?.isAdmin === false ||
            (props?.isAdmin === undefined && (
              <div className=" md:hidden ml-[10px] sm:ml-[30px] mt-[-10px]">
                <div
                  className="flex cursor-pointer hover:text-yellow-400 font-bold text-slate-700  transition-all hover:scale-[103%]"
                  onClick={() => {
                    navigate("/cart");
                  }}
                >
                  <img src={cart} alt="" className="h-[27px]" />
                  <div className="bg-[red] h-[20px] w-[20px] flex justify-center items-center rounded-full text-white ml-[-4px] mb-2 hover:scale-[106%] transition-all">
                    <p className=" text-sm hover:scale-[106%]  transition-all">
                      {cartitems.length}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="hidden md:block">
        <Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <h3>Cart</h3>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="mt-10 text-lg font-bold">Cart Items</div>
            <div className="w-full mt-3 bg-slate-300 h-[2px]"></div>
            {cartitems.length === 0 ? (
              <div className="mt-5 font-bold text-xl">Your Cart is empty</div>
            ) : (
              <div className="pt-4 pb-7">
                {cartitems.map((item, key) => {
                  return <Eachcartitem key={key} item={item}></Eachcartitem>;
                })}
                <div className="flex justify-between">
                  <Button
                    variant="danger"
                    className="mt-5 w-full"
                    onClick={() => {
                      dispatch(clearCart());
                    }}
                  >
                    Clear cart
                  </Button>
                </div>

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
                        <PaystackButton {...componentProps} />
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
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </div>
  );
};
