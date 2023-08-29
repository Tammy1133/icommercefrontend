import React, { useEffect, useState } from "react";
import { Navbar } from "./navbar";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/actions/useractions";
import logo from "../utils/mylogo.png";
import { Footer } from "./footer";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  useEffect(() => {
    setTimeout(() => {
      if (error !== "") {
        setError("");
      }
    }, 3000);
  }, [error]);
  const user = useSelector((state) => {
    return state.user.user;
  });

  useEffect(() => {
    if (user) {
      if (user.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, []);
  const [loading, setloading] = useState(false);

  const login = async () => {
    try {
      setloading(true);
      if (!username) {
        throw new Error("Please provide a username");
      }
      if (!password) {
        throw new Error("Please provide a username");
      }
      const response = await Axios.post(
        "https://icommercebackend.onrender.com/api/login",
        {
          username,
          password,
        }
      );
      console.log(response);
      setError("Logged in successfully");
      dispatch(
        setUser({
          id: response.data.id,
          username: response.data.username,
          token: response.data.token,
          isAdmin: response.data.isAdmin,
          orders: response.data.orders,
        })
      );
      if (response.data.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
      console.log(response);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
      setError(error?.response?.data || error?.message);
    }
  };

  return (
    <div>
      <Navbar></Navbar>

      <div className="flex flex-col items-center mt-[130px] p-3">
        <img src={logo} alt="" className="w-[100px]" />
        <h2 className="text-lg font-semibold mt-3">Welcome to Icommerce</h2>
        <h2 className="text-lg font-normal mt-2 text-center">
          Type your username to log in with your <br /> Icommerce account.
        </h2>
      </div>

      <div className="flex flex-col items-center p-3">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="mt-3 px-3 sm:px-4 py-4 flex flex-col rounded-xl mb-[50px]  bg-slate-300  "
        >
          <h3 className="text-sm font-bold">Username</h3>
          <input
            type="text"
            className="border border-slate-500 px-2 py-2 rounded min-w-[260px] md:min-w-[400px] "
            placeholder="Enter your username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          <h3 className="text-sm font-bold mt-3">Password</h3>
          <input
            type="password"
            className="border border-slate-500 px-2 py-2 rounded "
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {!loading ? (
            <button
              type="submit"
              className="btn btn-primary mt-4"
              onClick={() => {
                login();
              }}
            >
              Submit
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary mt-4"
              // onClick={() => {
              //   login();
              // }}
            >
              Loading ...
            </button>
          )}
          <div className="min-[500px]:flex">
            <Button
              className="mt-4 w-[100%] sm:w-[50%] mr-4 !bg-[red] !outline-none !border-none !shadow-none"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </Button>
            <Button
              className="mt-4 w-[100%] sm:w-[50%]  !bg-[red] !outline-none !border-none !shadow-none"
              onClick={() => {
                navigate("/forgot");
              }}
            >
              Forgot password
            </Button>
          </div>
        </form>
        <div className="text-lg font-semibold">
          For further support, you may visit the Help Center or contact our
          customer service team.
        </div>
      </div>

      {error !== "" && (
        <div className="fixed bottom-[30px] right-4 text-lg text-white bg-[red] py-2 rounded-md px-5 z-40">
          {error}
        </div>
      )}

      <Footer></Footer>
    </div>
  );
};
