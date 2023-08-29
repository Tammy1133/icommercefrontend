import React, { useEffect } from "react";
import { Navbar } from "./navbar";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/actions/useractions";
import logo from "../utils/mylogo.png";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => {
    return state.user.user;
  });
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  return (
    user && (
      <div>
        <Navbar></Navbar>

        <div className="mt-[140px]">
          <div className="flex flex-col justify-center h-[60vh] items-center">
            <img src={logo} alt="" className="w-[100px]" />
            <h4 className="text-center mt-4 font-semibold">
              Welcome to your profile ({user.username})
            </h4>
            <div className="flex flex-col mt-2">
              <button
                className="bg-cyan-700 w-[300px]  py-2 px-3 rounded-xl text-white text-xl mr-3"
                onClick={() => {
                  navigate("/profile/orders");
                }}
              >
                Manage orders
              </button>
              <br />
              <button
                className="bg-cyan-700 w-[300px] py-2 px-3 rounded-xl text-white text-xl "
                onClick={() => {
                  dispatch(setUser(undefined));
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
