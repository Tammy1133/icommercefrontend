import React from "react";
import bg from "../utils/bluetexd.jpg";

export const Footer = () => {
  return (
    <div className="relative w-screen bg-slate-900 mt-28">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-white p-3 sm:p-5 gap-y-6">
        <div className="sm:pr-[25px]">
          <div className="font-bold">CONTACT US</div>

          <div className="mt-3 ">
            Greenville plaza. No. 15, block 20. Admiralty way, Lekki Phase 1,
            Lagos.
          </div>
          <div className="mt-1 ">Call Us : 0700COMMERCE</div>
          <div className="mt-1 ">Email : info@icommerce.ng</div>
        </div>

        <div className="">
          <div className="font-bold">MORE ON ICOMMERCE</div>

          <div className="mt-3  cursor-pointer hover:text-[red] hover:scale-[103%] transition-all">
            Icommerce Cares
          </div>
          <div className="mt-1  cursor-pointer hover:text-[red] hover:scale-[103%] transition-all">
            Shopping And Delivery
          </div>
          <div className="mt-1  cursor-pointer hover:text-[red] hover:scale-[103%] transition-all">
            Our Stores
          </div>
          <div className="mt-1  cursor-pointer hover:text-[red] hover:scale-[103%] transition-all">
            Terms Of Service
          </div>
          <div className="mt-1  cursor-pointer hover:text-[red] hover:scale-[103%] transition-all">
            Refund Policy
          </div>
          <div className="mt-1  cursor-pointer hover:text-[red] hover:scale-[103%] transition-all">
            Frequently Asked Questions
          </div>
        </div>

        <div className="">
          <div className="font-bold"> ICOMMERCE TIPS AND TRENDS</div>
          <div className="capitalize mt-3 ">
            Join our exclusive community to enjoy latest updates on niche
            fragrance, skincare, and makeup brands.
          </div>

          <input
            type="text"
            placeholder="Enter Email Address"
            className="px-3 w-[70%]  py-2 mt-3 placeholder:text-black focus:!border-none active:!border-none bg-white"
          />
          <br />

          <button className="bg-[red] mt-3 text-white rounded-lg px-3 py-2">
            Subscribe
          </button>
        </div>
      </div>

      <div className="pb-14 pt-5 text-center text-white ">
        Copyright &copy; Tammy
        <br />
        All Rights Reserved Icommerce International Limited
      </div>
    </div>
  );
};
