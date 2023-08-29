import React, { useEffect, useState } from "react";
import { Navbar } from "./navbar";
import shopping from "../utils/shopping.jpg";
import { Hero } from "./hero";
import { Sections } from "./sections";
import { Footer } from "./footer";

export const Main = () => {
  // const navigate = useNavigate();
  // const [showDetails, setShowDetails] = useState(true);

  return (
    <div>
      <Navbar></Navbar>
      <div className="mt-[80px]">
        <Hero></Hero>
      </div>
      <Footer></Footer>

      {/* {showDetails && (
        <div className="fixed top-0 h-screen w-screen bg-[#000000a7] z-[10000] flex items-center justify-center ">
          <div className="bg-white rounded-xl py-4 px-14   relative">
            <div className="absolute top-3 right-2">
              <button
                onClick={() => {
                  setShowDetails(false);
                }}
              >
                ❌
              </button>
            </div>
            <div className="flex items-center justify-center">
              <h5 className="mt-[20px] font-medium text-center">
                Admin username is
              </h5>
              <p className="!font-bold underline text-xl pt-[13px] ml-2 underline-offset-2 ">
                admin
              </p>
            </div>
            <div className="flex items-center justify-center">
              <h5 className="mt-[20px] font-medium">Admin password is</h5>
              <p className="!font-bold underline text-xl pt-[13px] ml-2 underline-offset-2">
                password
              </p>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Main;

// Change countup on small screen
