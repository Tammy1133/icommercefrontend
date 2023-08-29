import React, { useEffect, useState } from "react";
import { Navbar } from "./navbar";

import { EachProduct2 } from "./eachproduct2";
import soap2 from "../utils/soap3.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Search = () => {
  const [skincareProducts, setSkincareProducts] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [loading, setLoading] = useState(true);
  console.log(skincareProducts);

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
  const [productName, setProductName] = useState("");
  const [pageData, setPageData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();

  const getSearchResult = () => {
    const result = skincareProducts.filter((product) => {
      return product.name.toLowerCase().includes(productName.toLowerCase());
    });
    setSearchResult(result);
  };

  useEffect(() => {
    getSearchResult();
    console.log(searchResult);
  }, [productName]);
  useEffect(() => {
    if (productName.length === 0) {
      setSearchResult([]);
    }
  }, [productName]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar></Navbar>
      {!loading ? (
        <div>
          <div className="pt-[20px] ">
            <div className="relative w-screen  mt-[76px] mb-4">
              <img
                src={soap2}
                alt=""
                className=" absolute top-0 z-10 h-[25vh] sm:h-[40vh]  w-screen object-cover brightness-50"
              />
              <div className="relative w-screen z-20 flex h-[25vh] sm:h-[40vh] justify-center flex-col">
                <h3 className="text-white capitalize pt-4 font-bold ml-3 text-2xl md:text-3xl">
                  Search Page
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
                    Search
                  </a>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <form action="" className=" ">
                <input
                  value={productName}
                  onChange={(e) => {
                    setProductName(e.target.value);
                  }}
                  type="text"
                  placeholder="Enter product name "
                  className="border-2 border-slate-600 min-w-[240px] rounded-md py-2 px-2 placeholder:!text-black"
                />
                <button className="bg-[red] h-full text-white ml-3 rounded-lg px-3">
                  Search
                </button>
              </form>
            </div>
          </div>

          {productName.length > 0 && searchResult.length === 0 ? (
            <div>
              <h1 className="text-xl font-thin  text-slate-600 mt-5 text-center">
                No result found
              </h1>
            </div>
          ) : (
            <div className="items-center grid grid-cols-2 min-[860px]:grid-cols-3 min-[1200px]:grid-cols-4 mt-[60px] sm:mt-[80px] mb-[60px]">
              {searchResult?.map((item, index) => (
                <div className="mx-auto" key={index}>
                  <EachProduct2 item={item}></EachProduct2>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div class="center-body">
          <div class="loader-circle-45"></div>
        </div>
      )}
    </div>
  );
};
