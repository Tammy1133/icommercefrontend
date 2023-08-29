import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import soap1 from "../utils/summer1.webp";
import soap2 from "../utils/summer2.webp";
import soap3 from "../utils/summer3.webp"; //
import soap4 from "../utils/summer4.webp";
import soap11 from "../utils/summer11.webp";
import soap22 from "../utils/summer22.webp";
import soap33 from "../utils/summer33.webp"; //
import soap44 from "../utils/summer44.webp";
import col1 from "../utils/col1.jpg";
import col2 from "../utils/col2.jpg";
import col3 from "../utils/col3.jpg";
import col4 from "../utils/col4.jpg";
import sub from "../utils/subbg.png";
import { Autoplay, Pagination, FreeMode, Navigation } from "swiper";

import "swiper/css/navigation";

import "swiper/css";
import "swiper/css/free-mode";

import { EachProduct } from "./eachproduct";

import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import "swiper/css/pagination";
import "swiper/css";
import axios from "axios";

export const Hero = () => {
  const navigate = useNavigate();
  const [skincareProducts, setSkincareProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllProducts = async () => {
    try {
      setLoading(true);

      const data = await axios.get(
        "https://icommercebackend.onrender.com/api/allproducts"
      );
      console.log(data);
      setSkincareProducts(data.data.products);

      // setErrorMessage("Product added successfully");
      setLoading(false);
    } catch (error) {
      console.log(error);
      // console.log(error);
      if (error.response) {
        // setErrorMessage(error.response.data); // Set server error message
      } else {
        // setErrorMessage(error.message); // Set client-side validation error message
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  return !loading ? (
    <div className="">
      <div className="">
        <Carousel fade pause={false} interval={3000}>
          <Carousel.Item>
            <img src={soap1} alt="" className="hidden md:block" />
            <img src={soap11} alt="" className=" md:hidden" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={soap2} alt="" className="hidden md:block" />
            <img src={soap22} alt="" className=" md:hidden" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={soap3} alt="" className="hidden md:block" />
            <img src={soap33} alt="" className=" md:hidden" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={soap4} alt="" className="hidden md:block" />
            <img src={soap44} alt="" className=" md:hidden" />
          </Carousel.Item>
        </Carousel>

        <div className="collections my-6 w-[85vw] mx-auto">
          <h4 className="uppercase text-center text-xl mt-5  mb-3 font-semibold">
            Our Collections
          </h4>
          <hr />

          <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  pt-4 pb-5 justify-around gap-3">
            <div className="relative">
              <img
                src={col1}
                alt=""
                className="hover:scale-[104%] hover:rounded-xl "
                style={{ transition: ".5s ease-in" }}
              />
              <div
                className="absolute  bottom-5  w-[100%] mx-auto"
                onClick={() => {
                  navigate("/category/face");
                }}
              >
                <div className="flex justify-center bg-white w-[90%] mx-auto py-1 uppercase font-bold cursor-pointer text-xs md:text-sm">
                  Skincare (face)
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src={col2}
                alt=""
                className="hover:scale-[104%] hover:rounded-xl "
                style={{ transition: ".5s ease-in" }}
              />
              <div
                className="absolute  bottom-5  w-[100%] mx-auto"
                onClick={() => {
                  navigate("/category/body");
                }}
              >
                <div className="flex justify-center bg-white w-[90%] mx-auto py-1 uppercase font-bold cursor-pointer text-xs md:text-sm">
                  Skincare (body)
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src={col3}
                alt=""
                className="hover:scale-[104%] hover:rounded-xl "
                style={{ transition: ".5s ease-in" }}
              />
              <div
                className="absolute  bottom-5  w-[100%] mx-auto"
                onClick={() => {
                  navigate("/category/nigerian");
                }}
              >
                <div className="flex justify-center bg-white w-[90%] mx-auto py-1 uppercase font-bold cursor-pointer text-xs md:text-sm">
                  Nigerian products
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src={col4}
                alt=""
                className="hover:scale-[104%] hover:rounded-xl "
                style={{ transition: ".5s ease-in" }}
              />
              <div
                className="absolute  bottom-5  w-[100%] mx-auto"
                onClick={() => {
                  navigate("/category/foreign");
                }}
              >
                <div className="flex justify-center bg-white w-[90%] mx-auto py-1 uppercase font-bold cursor-pointer text-xs md:text-sm">
                  Foreign products
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" ">
          <div className="mt-6 flex justify-between items-center pb-2 md:pb-5 relative">
            <h4 className="text-sm md:text-lg  underline-offset-8 ml-[22px] font-bold">
              SKINCARE (FACE)
            </h4>
            <button
              className="ml-[22px] md:ml-[0px]  mt-[-10px] mr-2 md:mr-6  px-2 text-xs md:text-base py-1  md:p-2  rounded-lg  text-black font-bold hover:shadow-2xl transition-all hover:scale-105 hover:-rotate-6   "
              onClick={() => {
                navigate(`/category/face`);
              }}
            >
              VIEW ALL
            </button>
          </div>

          <div className="px-3 mt-3">
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={10}
              loop={true}
              freeMode={true}
              navigation={true}
              modules={[Navigation, FreeMode]}
              className="mySwiper"
            >
              {skincareProducts.map((item) => {
                if (item.category.toUpperCase() === "FACE") {
                  return (
                    <SwiperSlide className="!mb-[40px]">
                      <EachProduct item={item}></EachProduct>
                    </SwiperSlide>
                  );
                }
              })}
            </Swiper>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 px-[30px]">
          <div
            className="border py-4 font-semibold text-xl text-center border-slate-600 flex items-center justify-center cursor-pointer"
            onClick={() => {
              navigate("/category/face");
            }}
          >
            SKINCARE (FACE)
          </div>
          <div
            className="border py-4 font-semibold text-xl text-center border-slate-600 flex items-center justify-center cursor-pointer"
            onClick={() => {
              navigate("/category/body");
            }}
          >
            SKINCARE (BODY)
          </div>
          <div
            className="border py-4 font-semibold text-xl text-center border-slate-600 flex items-center justify-center cursor-pointer"
            onClick={() => {
              navigate("/category/nigerian");
            }}
          >
            NIGERIAN PRODUCTS
          </div>
          <div
            className="border py-4 font-semibold text-xl text-center border-slate-600 flex items-center justify-center cursor-pointer"
            onClick={() => {
              navigate("/category/foreign");
            }}
          >
            FOREIGN PRODUCTS
          </div>
        </div>

        <div className=" ">
          <div className="mt-[60px] flex justify-between items-center pb-2 md:pb-5 relative">
            <h4 className="text-sm md:text-lg  underline-offset-8 ml-[22px] font-bold">
              SKINCARE (BODY)
            </h4>
            <button
              className="ml-[22px] md:ml-[0px]  mt-[-10px] mr-2 md:mr-6  px-2 text-xs md:text-base py-1  md:p-2  rounded-lg  text-black font-bold hover:shadow-2xl transition-all hover:scale-105 hover:-rotate-6 "
              onClick={() => {
                navigate(`/category/body`);
              }}
            >
              VIEW ALL
            </button>
          </div>

          <div className="px-3 mt-3">
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={10}
              loop={true}
              freeMode={true}
              navigation={true}
              modules={[Navigation, FreeMode]}
              className="mySwiper"
            >
              {skincareProducts.map((item) => {
                if (item.category.toUpperCase() === "BODY") {
                  return (
                    <SwiperSlide>
                      <EachProduct item={item}></EachProduct>
                    </SwiperSlide>
                  );
                }
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div class="center-body">
      <div class="loader-circle-45"></div>
    </div>
  );
};
