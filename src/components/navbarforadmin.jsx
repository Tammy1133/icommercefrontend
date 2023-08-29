import React, { useEffect, useState } from "react";
import "../css/main.css";

import { Sling as Hamburger } from "hamburger-react";
import logo from "../utils/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser, setUser } from "../redux/actions/useractions";

export const NavbarForAdmin = () => {
  const [isOpen, setIsopen] = useState(false);

  const handleBarclose = () => {
    setIsopen(!isOpen);
  };
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {}, [isOpen]);
  const dispatch = useDispatch();

  return (
    <div className="  min-w-screen max-w-screen fixed z-[90] ">
      <div
        className="  flex mynav items-center  w-[100%] 
          px-6  "
      >
        <div className="flex items-center cursor-pointer w-full justify-between ">
          {/* <h1 className="text-4xl md:text-5xl font-semibold text-white">
            BRAND.
          </h1> */}
          <div className="flex items-center" onClick={() => navigate("/")}>
            <img
              src={logo}
              alt=""
              className=" fade-in-tl  w-[120px] md:w-[130px] object-cover"
              // loading="lazy"
            />
          </div>
          <div className="md:hidden">
            <Hamburger
              color="white"
              toggled={isOpen}
              toggle={() => {
                setIsopen(!isOpen);
              }}
            />
          </div>
          <div className="hidden md:flex items-center justify-between mr-12">
            <a
              onClick={() => {
                dispatch(removeUser(""));
                navigate("/");
              }}
              className=" text-blue-50 no-underline hover:text-blue-300 pr-6"
            >
              Logout
            </a>
          </div>
        </div>
      </div>

      <div
        className={`bi  ${
          !isOpen && "hidden"
        }  md:hidden  absolute mynavext z-[50]   max-w-screen px-10 py-5  ${
          isOpen && "fade-in "
        }
          `}
      >
        <div className=" mt-6 my-2 flex flex-col  w-full ">
          <a
            onClick={() => {
              dispatch(removeUser(""));
              navigate("/");
            }}
            className=" text-blue-50 no-underline hover:text-blue-300 text-xl"
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};
