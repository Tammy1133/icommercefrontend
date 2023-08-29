import React, { useEffect } from "react";
import { useState } from "react";
import { Navbar } from "./navbar";
import logo from "../utils/mylogo.png";
import { Footer } from "./footer";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Axios from "axios";

export const Passwordrecovery = () => {
  const [showUsername, setShowUsername] = useState(true);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (error !== "") {
        setError("");
      }
    }, 3000);
  }, [error]);

  const verifyUsername = async () => {
    try {
      setLoading(true);
      if (!username) {
        throw new Error("Please provide a username");
      }

      const response = await Axios.post(
        "https://icommercebackend.onrender.com/api/password-recovery-request",
        {
          username,
        }
      );
      setError(response.data.message);
      setQuestion(response.data.question.toUpperCase());
      setTimeout(() => {
        setShowUsername(false);
        setShowQuestion(true);
      }, 1000);
      setLoading(false);
    } catch (error) {
      setError(error?.response?.data || error?.message);
      setLoading(false);
    }
  };
  const verifyAnswer = async () => {
    try {
      setLoading(true);
      if (!answer) {
        throw new Error("Please provide your recovery answer ");
      }

      const response = await Axios.post(
        "https://icommercebackend.onrender.com/api/password-recovery-answer",
        {
          answer,
          username,
        }
      );
      setToken(response.data.token);

      setError(response.data.message);

      setTimeout(() => {
        setShowQuestion(false);
        setShowPassword(true);
      }, 1000);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error?.response?.data || error?.message);
      setLoading(false);
    }
  };
  const changePassword = async () => {
    try {
      setLoading(true);
      if (newpassword.length < 6) {
        throw new Error("Password should be at least 6 characters");
      }
      if (newpassword !== confirmpassword) {
        throw new Error("Passwords do not match");
      }
      console.log(token);

      const response = await Axios.put(
        "https://icommercebackend.onrender.com/api/change-password",
        {
          password: newpassword,
          username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setError(response.data.message);

      setLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
      setError(error?.response?.data || error?.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <Navbar></Navbar>

        <div className="flex flex-col items-center mt-[130px] p-3">
          <img src={logo} alt="" className="w-[100px]" />
          <h2 className="text-lg font-semibold mt-3">Welcome to Icommerce</h2>
          <h2 className="text-lg font-normal mt-2 text-center">
            Fill in your deatails and answer the questions to recover your
            <br /> Icommerce account.
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
            {showUsername && (
              <div>
                <h3 className="text-sm font-bold">Username</h3>
                <input
                  type="text"
                  className="border border-slate-500 px-2 py-2 rounded w-full min-w-[260px] md:min-w-[400px] "
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />

                {!loading ? (
                  <button
                    type="submit"
                    className="btn btn-primary mt-4 w-full"
                    onClick={() => {
                      verifyUsername();
                    }}
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-secondary mt-4 w-full cursor-not-allowed"
                    // onClick={() => {
                    //   verifyUsername();
                    // }}
                  >
                    Loading...
                  </button>
                )}
              </div>
            )}
            {showQuestion && (
              <div>
                <h3 className="text-sm font-bold">{question}</h3>
                <input
                  type="text"
                  className="border border-slate-500 px-2 w-full py-2 rounded min-w-[260px] md:min-w-[400px] "
                  placeholder="Enter your answer"
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                  }}
                />

                {!loading ? (
                  <button
                    type="submit"
                    className="btn btn-primary mt-4 w-full"
                    onClick={() => {
                      verifyAnswer();
                    }}
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-secondary mt-4 w-full cursor-not-allowed"
                    // onClick={() => {}}
                  >
                    Loading...
                  </button>
                )}
              </div>
            )}
            {showPassword && (
              <div>
                <h3 className="text-sm font-bold">New Password</h3>
                <input
                  type="password"
                  className="border border-slate-500 px-2 w-full py-2 rounded min-w-[260px] md:min-w-[400px] "
                  placeholder="New Password"
                  value={newpassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
                <h3 className="text-sm font-bold mt-3">Confirm New Password</h3>
                <input
                  type="password"
                  className="border border-slate-500 px-2 w-full py-2 rounded min-w-[260px] md:min-w-[400px] "
                  placeholder="Confirm New Password"
                  value={confirmpassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />

                {loading ? (
                  <button
                    type="submit"
                    className="btn btn-primary mt-4 w-full cursor-not-allowed"
                    // onClick={() => {
                    //   changePassword();
                    // }}
                  >
                    Loading...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary mt-4 w-full"
                    onClick={() => {
                      changePassword();
                    }}
                  >
                    Submit
                  </button>
                )}
              </div>
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
                className="mt-4 w-[100%] sm:w-[50%]  !bg-[red] !outline-none !border-none !shadow-none"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
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
    </div>
  );
};
