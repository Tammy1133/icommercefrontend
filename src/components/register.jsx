import React, { useEffect, useState } from "react";
import { Navbar } from "./navbar";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Footer } from "./footer";
import logo from "../utils/mylogo.png";

export const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [recoveryQuestion, setRecoveryQuestion] = useState(
    "what is your pet's name"
  );
  const [ranswer, setRanswer] = useState("");
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setTimeout(() => {
      if (error !== "") {
        setError("");
      }
    }, 3000);
  }, [error]);

  const register = async () => {
    setloading(true);
    try {
      if (!username) {
        throw new Error("Username required");
      }
      if (!password) {
        throw new Error("Password required");
      }
      if (!recoveryQuestion) {
        throw new Error("Recovery question required");
      }
      if (!ranswer) {
        throw new Error("Recovery Answer required");
      }
      if (!firstName) {
        throw new Error("First name required");
      }
      if (!lastName) {
        throw new Error("Last name required");
      }

      const response = await Axios.post(
        "https://icommercebackend.onrender.com/api/register",
        {
          username,
          password,
          last_name: lastName,
          first_name: firstName,
          answer: ranswer,
          question: recoveryQuestion,
        }
      );
      setError("Registered Successfully");
      console.log(response);

      setTimeout(() => {
        navigate("/login ");
      }, 1000);
      setloading(false);
    } catch (error) {
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
          Fill in your details to create an <br /> Icommerce account.
        </h2>
      </div>

      <div className="flex flex-col items-center p-3">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="mt-3 max-w-[95vw]  px-4 py-4 flex flex-col rounded-md sm:rounded-xl mb-[50px]  bg-slate-300  "
        >
          <h3 className="text-sm font-bold">First name</h3>
          <input
            type="text"
            className="border border-slate-500 px-2 py-2 rounded min-w-[260px] md:min-w-[400px] "
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <h3 className="text-sm font-bold mt-3">Last name</h3>
          <input
            type="text"
            className="border border-slate-500 px-2 py-2 rounded min-w-[260px] md:min-w-[400px] "
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          />
          <h3 className="text-sm font-bold mt-3">Username</h3>
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

          <h3 className="text-sm font-bold mt-3">Recovery Question</h3>
          <select
            name=""
            id=""
            onChange={(e) => {
              setRecoveryQuestion(e.target.value);
            }}
            className="py-2 px-2 custom-select"
          >
            <option value="what is your pet's name">
              what is your pet's name
            </option>
            <option value="what is your secondary school's name">
              what is your Mother's name
            </option>
            <option value="what is your best year">what is dream car</option>
            <option value="what is your best year">
              what is your favourite food
            </option>
          </select>
          <h3 className="text-sm font-bold mt-3">Answer</h3>
          <input
            type="text"
            className="border border-slate-500 px-2 py-2 rounded min-w-[260px] md:min-w-[400px] "
            placeholder="Enter recovery answer"
            value={ranswer}
            onChange={(e) => {
              setRanswer(e.target.value);
            }}
          />
          {!loading ? (
            <button
              type="submit"
              className="btn btn-primary mt-4"
              onClick={() => {
                register();
              }}
            >
              Register
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary mt-4"
              // onClick={() => {
              //   register();
              // }}
            >
              Loading...
            </button>
          )}
          <div className="min-[500px]:flex">
            <Button
              className="mt-4 w-[100%] sm:w-[50%] mr-4 !bg-[red] !outline-none !border-none !shadow-none"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
            <Button
              className="mt-4 w-[100%] sm:w-[50%] !bg-[red] !outline-none !border-none !shadow-none"
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
