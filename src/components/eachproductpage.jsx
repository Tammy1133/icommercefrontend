import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "./navbar";
import soap2 from "../utils/soap4.jpg";
import { Footer } from "./footer";

import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { EachProduct } from "./eachproduct";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart, increaseQuantity } from "../redux/actions/cart";
import axios from "axios";

export const EachProductPage = () => {
  const params = useParams();
  const [pageData, setPageData] = useState([]);
  const [otherData, setOtherData] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [skincareProducts, setSkincareProducts] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
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
  const getProduct = () => {
    const data = skincareProducts.find((item) => {
      return item.id === parseInt(params.id);
    });
    console.log(data);

    setPageData(data);
  };
  const getOtherProducts = () => {
    const pageData = skincareProducts.find((item) => {
      return item.id === parseInt(params.id);
    });
    const data = skincareProducts.filter((item) => {
      return item.category === pageData.category;
    });
    const without = data.filter((item) => {
      return item.id !== pageData.id;
    });

    setOtherData(without);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getProduct();
    getOtherProducts();
  }, [params]);
  const dispatch = useDispatch();
  useEffect(() => {
    getProduct();
    getOtherProducts();
  }, [skincareProducts]);

  const cartItemsFromRedux = useSelector((state) => state.cart.cart);

  const handleAddToCart = (id) => {
    const exists = cartItemsFromRedux.find((item) => {
      return item.id === parseInt(params.id);
    });

    if (!exists && quantity > 0) {
      dispatch(AddToCart({ ...pageData, quantity: quantity }));
    } else if (quantity > 0) {
      // find and remove
      dispatch(increaseQuantity({ ...pageData, quantity: quantity }));
    }
  };

  return (
    <div>
      <Navbar></Navbar>

      {!loading ? (
        <div>
          <div className="relative w-screen z-40 mt-[84px]">
            <img
              src={soap2}
              alt=""
              className=" absolute top-0 h-[25vh] sm:h-[30vh]  w-screen object-cover brightness-50"
            />
            <div className="relative w-screen flex h-[25vh] sm:h-[30vh] justify-center flex-col ">
              <h3 className="text-white capitalize pt-4 font-bold ml-3 text-2xl md:text-3xl">
                {params.name} Product
              </h3>
              <div className="mt-2 text-white text-xl">
                <a
                  style={{ textDecoration: "none" }}
                  className="text-xl ml-3 text-white cursor-pointer  "
                >
                  Home
                </a>{" "}
                /
                <a
                  style={{ textDecoration: "none" }}
                  className="text-xl ml-3 text-white cursor-pointer  "
                >
                  Product
                </a>{" "}
                /
                <a
                  style={{ textDecoration: "none" }}
                  className="text-xl ml-3  capitalize text-white cursor-not-allowed "
                >
                  {params.id}
                </a>
              </div>
            </div>
          </div>
          <div className="flex-col  md:flex-row flex items-center md:items-start   mt-[100px] px-6 justify-between">
            <div className="left flex justify-center w-[100vw]  md:w-[40vw] ">
              <img
                src={pageData?.image.replace(/^["'](.*)["']$/, "$1")}
                alt=""
                className="h-[300px] w-[310px] 
           object-fill md:sticky"
              />
            </div>
            <div className="right md:w-[60vw] md:ml-[30px] mt-[50px] md:mt-[0]">
              <h3 className="text-2xl">{pageData?.name}</h3>
              <h1 className="font-bold">
                ₦
                {pageData?.price?.toString()?.length >= 5 &&
                  `${pageData?.price?.toString().slice(0, 2)},${pageData?.price
                    ?.toString()
                    ?.slice(2)}`}
              </h1>
              <p>{pageData?.description}</p>
              <div className="sm:flex-row   flex items-center my-2 ">
                {!isAdded ? (
                  <button
                    onClick={() => {
                      handleAddToCart(params.id);
                      setIsAdded(true);
                    }}
                    className="uppercase flex items-center bg-slate-900 pb-2 text-white px-2 rounded-lg mt-2"
                  >
                    <h1
                      className="text-sm pt-3"
                      onClick={() => {
                        // dispatch(AddToCart(item));
                      }}
                    >
                      Add to cart
                    </h1>
                    <i className="bi bi-cart4 text-xl  ml-2 pt-1 cursor-pointer"></i>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      // handleAddToCart(params.id);
                    }}
                    className="uppercase flex items-center bg-slate-400 pb-2 text-white px-2 rounded-lg mt-2"
                  >
                    <h1
                      className="text-sm pt-3"
                      onClick={() => {
                        // dispatch(AddToCart(item));
                      }}
                    >
                      Added to cart
                    </h1>
                    {!isAdded && (
                      <i className="bi bi-cart4 text-xl  ml-2 pt-1 cursor-pointer"></i>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className=" ">
            <div className="mt-[50px] flex justify-between items-center pb-2 md:pb-5 relative">
              <h4 className="text-xl md:text-2xl  underline-offset-8 ml-[22px] font-bold">
                Related Products
              </h4>
            </div>

            <div className="px-3  ">
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={10}
                loop={true}
                // pagination={{
                //   clickable: true,
                // }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: true,
                }}
                modules={[Autoplay]}
                className="mySwiper"
              >
                {otherData?.map((item) => {
                  return (
                    <SwiperSlide>
                      <EachProduct item={item}></EachProduct>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      ) : (
        <div class="center-body">
          <div class="loader-circle-45"></div>
        </div>
      )}

      <div className="mt-[30px]"></div>
      <Footer></Footer>
    </div>
  );
};
