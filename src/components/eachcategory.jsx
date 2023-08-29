import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "./navbar";
import soap2 from "../utils/soap3.jpg";

import { EachProduct } from "./eachproduct";
import { EachProduct2 } from "./eachproduct2";
import { Footer } from "./footer";
import axios from "axios";

export const Eachcategory = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const initialItemsToShow = 6;
  const itemsPerLoad = 6;
  const [itemsToShow, setItemsToShow] = useState(initialItemsToShow);
  const [skincareProducts, setSkincareProducts] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  const getAllProducts = async () => {
    try {
      setLoading(true);

      const data = await axios.get(
        "https://icommercebackend.onrender.com/api/allproducts"
      );
      console.log(data);
      setSkincareProducts(data.data.products);
      setLoading(false);

      // setErrorMessage("Product added successfully");
      // setLoading(false);
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

  const handleLoadMore = () => {
    setItemsToShow((prevItemsToShow) => prevItemsToShow + itemsPerLoad);
  };

  useEffect(() => {
    if (
      params.name.toUpperCase() !== "NIGERIAN" &&
      params.name.toUpperCase() !== "BODY" &&
      params.name.toUpperCase() !== "FACE" &&
      params.name.toUpperCase() !== "FOREIGN"
    ) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
  }, []);

  const getProducts = () => {
    console.log(skincareProducts);
    const data = skincareProducts.filter((item) => {
      return item.category.toUpperCase() === params.name.toUpperCase();
    });
    setPageData(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getProducts();
  }, [skincareProducts]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      {!loading ? (
        <div>
          <div className="relative w-screen  mt-[76px]">
            <img
              src={soap2}
              alt=""
              className=" absolute top-0 z-10 h-[25vh] sm:h-[40vh]  w-screen object-cover brightness-50"
            />
            <div className="relative w-screen z-20 flex h-[25vh] sm:h-[40vh] justify-center flex-col">
              <h3 className="text-white capitalize pt-4 font-bold ml-3 text-2xl md:text-3xl">
                {params.name} Category
              </h3>
              <div className="mt-2 text-white text-xl">
                <a
                  style={{ textDecoration: "none" }}
                  className="text-xl ml-3 text-white cursor-pointer  "
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Home
                </a>{" "}
                /
                <a
                  style={{ textDecoration: "none" }}
                  className="text-xl ml-3 text-white cursor-pointer  "
                >
                  Category
                </a>{" "}
                /
                <a
                  style={{ textDecoration: "none" }}
                  className="text-xl ml-3  capitalize text-white cursor-not-allowed "
                >
                  {params.name}
                </a>
              </div>
            </div>
          </div>

          {notFound ? (
            <div className="mt-[150px] ml-2 ">No Item for this category</div>
          ) : (
            <div className=" items-center grid grid-cols-2 min-[860px]:grid-cols-3 min-[1200px]:grid-cols-4 mt-[60px] sm:mt-[80px] mb-[60px]">
              {pageData?.slice(0, itemsToShow).map((item, index) => (
                <div className="mx-auto">
                  <EachProduct2 item={item}></EachProduct2>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-center my-5">
            {itemsToShow < pageData.length && (
              <button
                onClick={handleLoadMore}
                className="bg-black text-white rounded-lg py-2 px-3"
              >
                View More
              </button>
            )}
          </div>
        </div>
      ) : (
        <div class="center-body">
          <div class="loader-circle-45"></div>
        </div>
      )}

      <Footer></Footer>
    </div>
  );
};
