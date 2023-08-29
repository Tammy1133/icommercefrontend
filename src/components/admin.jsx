import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Navbar } from "./navbar";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [toBeShown, setToBeShown] = useState("ALL");
  const [image, setimage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Body");
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [allProducts, setAllproducts] = useState([]);
  const [bodyProducts, setbodyproducts] = useState();
  const [faceProducts, setfaceproducts] = useState([]);
  const [nigerianProducts, setnigerianproducts] = useState([]);
  const [foreignProducts, setforeignproducts] = useState([]);
  const [modalDescription, setModalDescription] = useState("");
  const [allOrders, setAllOrders] = useState([]);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const navigate = useNavigate();

  const user = useSelector((state) => {
    return state?.user?.user?.token;
  });

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }, [errorMessage]);
  useEffect(() => {
    setbodyproducts(
      allProducts.filter((item) => {
        return item.category.toUpperCase() === "BODY";
      })
    );
    setfaceproducts(
      allProducts.filter((item) => {
        return item.category.toUpperCase() === "FACE";
      })
    );
    setnigerianproducts(
      allProducts.filter((item) => {
        return item.category.toUpperCase() === "NIGERIAN";
      })
    );
    setforeignproducts(
      allProducts.filter((item) => {
        return item.category.toUpperCase() === "FOREIGN";
      })
    );
  }, [allProducts]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setimage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };
  const validiateAdmin = async () => {
    try {
      const data = await axios.get(
        "https://icommercebackend.onrender.com/api/validate-admin",
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        }
      );
      console.log(data);
      setIsAdmin(true);
    } catch (error) {
      setIsAdmin(false);
      navigate("/");
    }
  };
  const getAllProducts = async () => {
    try {
      setLoading(true);

      const data = await axios.get(
        "https://icommercebackend.onrender.com/api/allproducts"
      );
      console.log(data);
      setAllproducts(data.data.products);

      // setErrorMessage("Product added successfully");
      setLoading(false);
    } catch (error) {
      // console.log(error);
      if (error.response) {
        setErrorMessage(error.response.data); // Set server error message
      } else {
        setErrorMessage(error.message); // Set client-side validation error message
      }
      setLoading(false);
    }
  };
  const getAllOrders = async () => {
    try {
      setLoading(true);

      const data = await axios.get(
        "https://icommercebackend.onrender.com/api/allorders"
      );
      console.log(data);
      setAllOrders(data.data);
      // setErrorMessage("Product added successfully");
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response) {
        setErrorMessage(error.response.data); // Set server error message
      } else {
        setErrorMessage(error.message); // Set client-side validation error message
      }
      setLoading(false);
    }
  };
  const addProduct = async () => {
    try {
      setLoading(true);
      if (!name) {
        throw new Error("Product name is required");
      }
      if (!price) {
        throw new Error("Product price is required");
      }
      if (!description) {
        throw new Error("Product description is required");
      }
      if (!image) {
        throw new Error("Product image is required");
      }
      if (!category) {
        throw new Error("Category is required");
      }
      const data = await axios.post(
        "https://icommercebackend.onrender.com/api/addproduct",
        {
          name,
          price,
          description,
          image,
          category,
        }
      );
      console.log(data);
      setErrorMessage("Product added successfully");
      setLoading(false);
      getAllProducts();
      // window.scroll(0, 0);
    } catch (error) {
      // console.log(error);
      if (error.response) {
        setErrorMessage(error.response.data); // Set server error message
      } else {
        setErrorMessage(error.message); // Set client-side validation error message
      }
      setLoading(false);
      // window.scroll(0, 0);
    }
  };

  const editProduct = async () => {
    try {
      setEditLoading(true);
      if (!editingId) {
        throw new Error("Editing id is required");
      }
      if (!name) {
        throw new Error("Product name is required");
      }
      if (!price) {
        throw new Error("Product price is required");
      }
      if (!description) {
        throw new Error("Product description is required");
      }
      if (!image) {
        throw new Error("Product image is required");
      }
      if (!category) {
        throw new Error("Category is required");
      }
      const data = await axios.put(
        "https://icommercebackend.onrender.com/api/editproduct",
        {
          name,
          price,
          description,
          image,
          category,
          id: editingId,
        }
      );
      setName("");
      setPrice("");
      setCategory("");
      setimage("");
      setDescription("");
      setEditingId("");
      console.log(data);
      setErrorMessage("Product Updated successfully");
      setShow2(false);
      setEditLoading(false);
      getAllProducts();
    } catch (error) {
      // console.log(error);
      if (error.response) {
        setErrorMessage(error.response.data); // Set server error message
      } else {
        setErrorMessage(error.message); // Set client-side validation error message
      }
      setEditLoading(false);
    }
  };
  const deleteProduct = async (id) => {
    try {
      setDeleting(true);

      const data = await axios.delete(
        `https://icommercebackend.onrender.com/api/deleteproduct/${id}`
      );

      setErrorMessage("Product Deleted successfully");
      setDeleting(false);
      getAllProducts();
    } catch (error) {
      // console.log(error);
      if (error.response) {
        setErrorMessage(error.response.data); // Set server error message
      } else {
        setErrorMessage(error.message); // Set client-side validation error message
      }
      setDeleting(false);
    }
  };

  useEffect(() => {
    getAllProducts();
    validiateAdmin();
    getAllOrders();
  }, []);

  return (
    isAdmin && (
      <div>
        <Navbar isAdmin={true}></Navbar>
        {!loading ? (
          <div>
            <div className="below hidden sm:block">
              <div className="left">
                <div className="bg-[#eee1ffbb]  pt-[120px]  h-screen fixed left-0 w-[20vw] pl-[13px] lg:pl-[40px]">
                  <div
                    className="flex   items-center  font-bold cursor-pointer mt-3 hover:text-[red] transition-all hover:scale-105"
                    onClick={() => {
                      setToBeShown("ALL");
                    }}
                  >
                    <i class="bi bi-bookmark-check-fill mr-3 text-[20px]"></i>
                    <h2 className="text-[15px] md:text-[20px] pt-2 logo pr-2">
                      All products
                    </h2>
                  </div>

                  <div
                    className="flex   items-center  font-bold cursor-pointer mt-3 hover:text-[red] transition-all hover:scale-105"
                    onClick={() => {
                      setToBeShown("FACE");
                    }}
                  >
                    <i class="bi bi-emoji-sunglasses-fill mr-3 text-[20px]"></i>
                    <h2 className="text-[15px] md:text-[20px] pt-2 logo ">
                      Skincare (Face)
                    </h2>
                  </div>
                  <div
                    className="flex   items-center  font-bold cursor-pointer mt-3 hover:text-[red] transition-all hover:scale-105"
                    onClick={() => {
                      setToBeShown("BODY");
                    }}
                  >
                    <i class="bi bi-emoji-heart-eyes-fill mr-3 text-[20px]"></i>
                    <h2 className="text-[15px] md:text-[20px] pt-2 logo ">
                      Skincare (Body)
                    </h2>
                  </div>
                  <div
                    className="flex   items-center  font-bold cursor-pointer mt-3 hover:text-[red] transition-all hover:scale-105"
                    onClick={() => {
                      setToBeShown("NIGERIAN");
                    }}
                  >
                    <i class="bi bi-incognito mr-3 text-[20px]"></i>
                    <h2 className="text-[15px] md:text-[20px] pt-2 logo ">
                      Nigerian products
                    </h2>
                  </div>
                  <div
                    className="flex   items-center  font-bold cursor-pointer mt-3 hover:text-[red] transition-all hover:scale-105"
                    onClick={() => {
                      setToBeShown("FOREIGN");
                    }}
                  >
                    <i class="bi bi-basket-fill mr-3 text-[20px]"></i>
                    <h2
                      className="text-[15px] md:text-[20px] pt-2 logo 
         "
                    >
                      Foreign products
                    </h2>
                  </div>
                  <div
                    className="flex items-center  font-bold cursor-pointer mt-3 hover:text-[red] transition-all hover:scale-105"
                    onClick={() => {
                      setToBeShown("ORDERS");
                    }}
                  >
                    <i class="bi bi-bag-check-fill mr-3 text-[20px]"></i>
                    <h2 className="text-[15px] md:text-[20px] pt-2 logo hover:text-[red] transition-all hover:scale-105">
                      Orders
                    </h2>
                  </div>
                  <div
                    className="flex   items-center  font-bold cursor-pointer mt-3 hover:text-[red] transition-all hover:scale-105"
                    onClick={() => {
                      setToBeShown("ADD");
                    }}
                  >
                    <i class="bi bi-patch-plus mr-3 text-[20px]"></i>
                    <h2 className="text-[15px] md:text-[20px] pt-2 logo hover:text-[red] transition-all hover:scale-105">
                      Add product
                    </h2>
                  </div>
                  <div
                    className="flex   items-center  font-bold cursor-pointer mt-3 hover:text-[red] transition-all hover:scale-105"
                    onClick={() => {
                      setToBeShown("REVIEWS");
                    }}
                  >
                    <i class="bi bi-basket-fill mr-3 text-[20px]"></i>
                    <h2 className="text-[15px] md:text-[20px] pt-2 logo hover:text-[red] transition-all hover:scale-105">
                      Reviews
                    </h2>
                  </div>
                </div>
              </div>
              <div className="right pl-[20vw] pt-[150px] bg-slate-100 min-h-screen pb-[25px]">
                <div className="pl-[5vw] pr-[5vw]">
                  {toBeShown === "ALL" && (
                    <div>
                      <h3 className="text-center font-semibold text-xl uppercase">
                        All Products
                      </h3>
                      <div className="!overflow-x-scroll ">
                        <Table
                          striped
                          bordered
                          hover
                          variant=""
                          className="mt-7 !overflow-x-scroll"
                        >
                          <thead>
                            <tr>
                              <th className="min-w-[50px] text-center !text-[red]">
                                #
                              </th>
                              <th className="min-w-[200px]  !text-[red] text-center">
                                Name
                              </th>
                              <th className="min-w-[200px]  !text-[red] text-center">
                                Price
                              </th>
                              <th className="min-w-[200px]  !text-[red] text-center">
                                Category
                              </th>
                              <th className="min-w-[200px]  !text-[red] text-center">
                                Image
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {allProducts.map((item, index) => {
                              return (
                                <tr>
                                  <td className=" font-semibold w-[50px] text-center !pt-[27px]">
                                    {index + 1}
                                  </td>
                                  <td className=" font-semibold min-w-[200px] !pt-[27px]">
                                    {item.name}
                                  </td>
                                  <td className=" font-semibold min-w-[200px] !pt-[27px]">
                                    {item.price}
                                  </td>
                                  <td className=" font-semibold min-w-[200px] !pt-[27px]">
                                    {item.category}
                                  </td>
                                  <td className="  font-semibold min-w-[200px] text-center cursor-pointer  transition hover:text-[blue]">
                                    <div className="flex justify-center">
                                      <img
                                        src={item.image.replace(
                                          /^["'](.*)["']$/,
                                          "$1"
                                        )}
                                        alt=""
                                        className="h-[60px] w-[120px] object-contain"
                                      />
                                    </div>
                                  </td>

                                  <td
                                    className=" text-[red] !pt-[27px] font-semibold min-w-[200px] text-center cursor-pointer  transition hover:text-[blue]"
                                    onClick={() => {
                                      setModalDescription(item.description);
                                      handleShow();
                                    }}
                                  >
                                    View Description
                                  </td>
                                  <td
                                    onClick={() => {
                                      handleShow2();
                                      console.log(item);
                                      setName(item.name);
                                      setPrice(item.price);
                                      setCategory(item.category);
                                      setimage(item.image);
                                      setDescription(item.description);
                                      setEditingId(item.id);
                                    }}
                                    className=" !bg-[blue] !pt-[27px]  !text-[white] font-semibold min-w-[200px] text-center cursor-pointer  transition hover:text-[blue]"
                                  >
                                    Edit
                                  </td>
                                  <td
                                    className=" !bg-[red] !pt-[27px]  !text-[white] font-semibold min-w-[200px] text-center cursor-pointer  transition hover:text-[blue]"
                                    onClick={() => {
                                      console.log(item.id);
                                      setDeletingId(item.id);
                                      deleteProduct(item.id);
                                    }}
                                  >
                                    {deleting && item.id === deletingId
                                      ? "Deleting..."
                                      : "Delete"}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  )}
                  {toBeShown === "ORDERS" && (
                    <div>
                      <h3 className="text-center font-semibold text-xl uppercase">
                        All Products
                      </h3>
                      <div className="!overflow-x-scroll ">
                        <Table
                          striped
                          bordered
                          hover
                          variant=""
                          className="mt-7 !overflow-x-scroll"
                        >
                          <thead>
                            <tr>
                              <th className="min-w-[50px] text-center !text-[red]">
                                #
                              </th>
                              <th className="min-w-[200px]  !text-[red] text-center">
                                Username
                              </th>
                              <th className="min-w-[200px]  !text-[red] text-center">
                                Total
                              </th>
                              <th className="min-w-[200px]  !text-[red] text-center">
                                Product
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {allOrders.map((item, index) => {
                              return (
                                <tr>
                                  <td className=" font-semibold w-[50px] text-center !pt-[23px]">
                                    {index + 1}
                                  </td>
                                  <td className=" font-semibold min-w-[200px] !pt-[23px]">
                                    {item.user.username}
                                  </td>
                                  <td className=" font-semibold min-w-[200px] !pt-[23px]">
                                    ₦{item.total}
                                  </td>
                                  <td className=" font-semibold min-w-[200px] !pt-[15px] pl-6 ">
                                    {item.product.map((item) => {
                                      return (
                                        <div>
                                          {item.name} ({item.quantity})
                                        </div>
                                      );
                                    })}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  )}
                  {toBeShown === "FACE" && (
                    <div>
                      {" "}
                      <div>
                        <h3 className="text-center font-semibold text-xl uppercase">
                          Face Products
                        </h3>
                        <div className="!overflow-x-scroll ">
                          <Table
                            striped
                            bordered
                            hover
                            variant=""
                            className="mt-7 !overflow-x-scroll"
                          >
                            <thead>
                              <tr>
                                <th className="min-w-[50px] text-center !text-[red]">
                                  #
                                </th>
                                <th className="min-w-[200px]  !text-[red] text-center">
                                  Name
                                </th>
                                <th className="min-w-[200px]  !text-[red] text-center">
                                  Price
                                </th>
                                <th className="min-w-[200px]  !text-[red] text-center">
                                  Category
                                </th>
                                <th className="min-w-[200px]  !text-[red] text-center">
                                  Image
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {faceProducts.map((item, index) => {
                                return (
                                  <tr>
                                    <td className=" font-semibold w-[50px] text-center !pt-[27px]">
                                      {index + 1}
                                    </td>
                                    <td className=" font-semibold min-w-[200px] !pt-[27px]">
                                      {item.name}
                                    </td>
                                    <td className=" font-semibold min-w-[200px] !pt-[27px]">
                                      {item.price}
                                    </td>
                                    <td className=" font-semibold min-w-[200px] !pt-[27px]">
                                      {item.category}
                                    </td>
                                    <td className="  font-semibold min-w-[200px] text-center cursor-pointer  transition hover:text-[blue]">
                                      <div className="flex justify-center">
                                        <img
                                          src={item.image}
                                          alt=""
                                          className="h-[60px] w-[120px] object-contain"
                                        />
                                      </div>
                                    </td>

                                    <td
                                      className=" text-[red] !pt-[27px] font-semibold min-w-[200px] text-center cursor-pointer  transition hover:text-[blue]"
                                      onClick={() => {
                                        setModalDescription(item.description);
                                        handleShow();
                                      }}
                                    >
                                      View Description
                                    </td>
                                    <td
                                      onClick={() => {
                                        console.log(item);
                                        handleShow2();
                                        setName(item.name);
                                        setPrice(item.price);
                                        setCategory(item.category);
                                        setimage(item.image);
                                        setDescription(item.description);
                                        setEditingId(item.id);
                                      }}
                                      className=" !bg-[blue] !pt-[27px]  !text-[white] font-semibold min-w-[200px] text-center cursor-pointer  transition hover:text-[blue]"
                                    >
                                      Edit
                                    </td>
                                    <td
                                      className=" !bg-[red] !pt-[27px]  !text-[white] font-semibold min-w-[200px] text-center cursor-pointer  transition hover:text-[blue]"
                                      onClick={() => {
                                        console.log(item.id);
                                        setDeletingId(item.id);
                                        deleteProduct(item.id);
                                      }}
                                    >
                                      {deleting && item.id === deletingId
                                        ? "Deleting..."
                                        : "Delete"}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  )}
                  {toBeShown === "BODY" && (
                    <div>
                      {" "}
                      <div>
                        <h3 className="text-center font-semibold text-xl uppercase">
                          Body Products
                        </h3>
                        <div className="!overflow-x-scroll ">
                          <Table
                            striped
                            bordered
                            hover
                            variant=""
                            className="mt-7 !overflow-x-scroll"
                          >
                            <thead>
                              <tr>
                                <th className="min-w-[50px] text-center !text-[red]">
                                  #
                                </th>
                                <th className="min-w-[200px]  !text-[red] text-center">
                                  Name
                                </th>
                                <th className="min-w-[200px]  !text-[red] text-center">
                                  Price
                                </th>
                                <th className="min-w-[200px]  !text-[red] text-center">
                                  Category
                                </th>
                                <th className="min-w-[200px]  !text-[red] text-center">
                                  Image
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {bodyProducts.map((item, index) => {
                                return (
                                  <tr>
                                    <td className=" font-semibold w-[50px] text-center !pt-[27px]">
                                      {index + 1}
                                    </td>
                                    <td className=" font-semibold min-w-[200px] !pt-[27px]">
                                      {item.name}
                                    </td>
                                    <td className=" font-semibold min-w-[200px] !pt-[27px]">
                                      {item.price}
                                    </td>
                                    <td className=" font-semibold min-w-[200px] !pt-[27px]">
                                      {item.category}
                                    </td>
                                    <td className="  font-semibold min-w-[200px] text-center cursor-pointer  transition hover:text-[blue]">
                                      <div className="flex justify-center">
                                        <img
                                          src={item.image}
                                          alt=""
                                          className="h-[60px] w-[120px] object-contain"
                                        />
                                      </div>
                                    </td>

                                    <td
                                      className=" text-[red] !pt-[27px] font-semibold min-w-[200px] text-center cursor-pointer  transition hover:text-[blue]"
                                      onClick={() => {
                                        setModalDescription(item.description);
                                        handleShow();
                                      }}
                                    >
                                      View Description
                                    </td>
                                    <td
                                      onClick={() => {
                                        handleShow2();
                                        setName(item.name);
                                        setPrice(item.price);
                                        setCategory(item.category);
                                        setimage(item.image);
                                        setDescription(item.description);
                                        setEditingId(item.id);
                                      }}
                                      className=" !bg-[blue] !pt-[27px]  !text-[white] font-semibold min-w-[200px] text-center cursor-pointer  transition hover:text-[blue]"
                                    >
                                      Edit
                                    </td>
                                    <td
                                      className=" !bg-[red] !pt-[27px]  !text-[white] font-semibold min-w-[200px] text-center cursor-pointer  transition hover:text-[blue]"
                                      onClick={() => {
                                        console.log(item.id);
                                        setDeletingId(item.id);
                                        deleteProduct(item.id);
                                      }}
                                    >
                                      {deleting && item.id === deletingId
                                        ? "Deleting..."
                                        : "Delete"}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  )}
                  {toBeShown === "NIGERIAN" && (
                    <div>
                      {" "}
                      <div>
                        <h3 className="text-center font-semibold text-xl uppercase">
                          Nigerian Products
                        </h3>
                        <div className="!overflow-x-scroll ">
                          <Table
                            striped
                            bordered
                            hover
                            variant=""
                            className="mt-7 !overflow-x-scroll"
                          >
                            <thead>
                              <tr>
                                <th className="min-w-[50px] text-center !text-[red]">
                                  #
                                </th>
                                <th className="min-w-[200px]  !text-[red] text-center">
                                  Name
                                </th>
                                <th className="min-w-[200px]  !text-[red] text-center">
                                  Price
                                </th>
                                <th className="min-w-[200px]  !text-[red] text-center">
                                  Category
                                </th>
                                <th className="min-w-[200px]  !text-[red] text-center">
                                  Image
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {nigerianProducts.map((item, index) => {
                                return (
                                  <tr>
                                    <td className=" font-semibold w-[50px] text-center !pt-[27px]">
                                      {index + 1}
                                    </td>
                                    <td className=" font-semibold min-w-[200px] !pt-[27px]">
                                      {item.name}
                                    </td>
                                    <td className=" font-semibold min-w-[200px] !pt-[27px]">
                                      {item.price}
                                    </td>
                                    <td className=" font-semibold min-w-[200px] !pt-[27px]">
                                      {item.category}
                                    </td>
                                    <td className="  font-semibold min-w-[200px] text-center cursor-pointer  transition hover:text-[blue]">
                                      <div className="flex justify-center">
                                        <img
                                          src={item.image}
                                          alt=""
                                          className="h-[60px] w-[120px] object-contain"
                                        />
                                      </div>
                                    </td>

                                    <td
                                      className=" text-[red] !pt-[27px] font-semibold min-w-[200px] text-center cursor-pointer  transition hover:text-[blue]"
                                      onClick={() => {
                                        setModalDescription(item.description);
                                        handleShow();
                                      }}
                                    >
                                      View Description
                                    </td>
                                    <td
                                      onClick={() => {
                                        handleShow2();
                                        setName(item.name);
                                        setPrice(item.price);
                                        setCategory(item.category);
                                        setimage(item.image);
                                        setDescription(item.description);
                                        setEditingId(item.id);
                                      }}
                                      className=" !bg-[blue] !pt-[27px]  !text-[white] font-semibold min-w-[200px] text-center cursor-pointer  transition hover:text-[blue]"
                                    >
                                      Edit
                                    </td>
                                    <td
                                      className=" !bg-[red] !pt-[27px]  !text-[white] font-semibold min-w-[200px] text-center cursor-pointer  transition hover:text-[blue]"
                                      onClick={() => {
                                        console.log(item.id);
                                        setDeletingId(item.id);
                                        deleteProduct(item.id);
                                      }}
                                    >
                                      {deleting && item.id === deletingId
                                        ? "Deleting..."
                                        : "Delete"}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  )}
                  {toBeShown === "FOREIGN" && (
                    <div>
                      {" "}
                      <div>
                        <h3 className="text-center font-semibold text-xl uppercase">
                          Foreign Products
                        </h3>
                        <div className="!overflow-x-scroll ">
                          <Table
                            striped
                            bordered
                            hover
                            variant=""
                            className="mt-7 !overflow-x-scroll"
                          >
                            <thead>
                              <tr>
                                <th className="min-w-[50px] text-center !text-[red]">
                                  #
                                </th>
                                <th className="min-w-[200px]  !text-[red] text-center">
                                  Name
                                </th>
                                <th className="min-w-[200px]  !text-[red] text-center">
                                  Price
                                </th>
                                <th className="min-w-[200px]  !text-[red] text-center">
                                  Category
                                </th>
                                <th className="min-w-[200px]  !text-[red] text-center">
                                  Image
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {foreignProducts.map((item, index) => {
                                return (
                                  <tr>
                                    <td className=" font-semibold w-[50px] text-center !pt-[27px]">
                                      {index + 1}
                                    </td>
                                    <td className=" font-semibold min-w-[200px] !pt-[27px]">
                                      {item.name}
                                    </td>
                                    <td className=" font-semibold min-w-[200px] !pt-[27px]">
                                      {item.price}
                                    </td>
                                    <td className=" font-semibold min-w-[200px] !pt-[27px]">
                                      {item.category}
                                    </td>
                                    <td className="  font-semibold min-w-[200px] text-center cursor-pointer  transition hover:text-[blue]">
                                      <div className="flex justify-center">
                                        <img
                                          src={item.image}
                                          alt=""
                                          className="h-[60px] w-[120px] object-contain"
                                        />
                                      </div>
                                    </td>

                                    <td
                                      className=" text-[red] !pt-[27px] font-semibold min-w-[200px] text-center cursor-pointer  transition hover:text-[blue]"
                                      onClick={() => {
                                        setModalDescription(item.description);
                                        handleShow();
                                      }}
                                    >
                                      View Description
                                    </td>
                                    <td
                                      onClick={() => {
                                        console.log(item);
                                        handleShow2();
                                        setName(item.name);
                                        setPrice(item.price);
                                        setCategory(item.category);

                                        setimage(
                                          item.image.replace(
                                            /^["'](.*)["']$/,
                                            "$1"
                                          )
                                        );
                                        setDescription(item.description);
                                        setEditingId(item.id);
                                      }}
                                      className=" !bg-[blue] !pt-[27px]  !text-[white] font-semibold min-w-[200px] text-center cursor-pointer  transition hover:text-[blue]"
                                    >
                                      Edit
                                    </td>
                                    <td
                                      className=" !bg-[red] !pt-[27px]  !text-[white] font-semibold min-w-[200px] text-center cursor-pointer  transition hover:text-[blue]"
                                      onClick={() => {
                                        console.log(item.id);
                                        setDeletingId(item.id);
                                        deleteProduct(item.id);
                                      }}
                                    >
                                      {deleting && item.id === deletingId
                                        ? "Deleting..."
                                        : "Delete"}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  )}
                  {toBeShown === "ADD" && (
                    <div>
                      <div className="w-full bg-white pb-8 shadow-xl rounded-xl">
                        <div className="border-b-2 border-[#eee1ffbb]">
                          <h2 className="text-lg font-semibold pt-2 pl-2">
                            Product Information
                          </h2>
                        </div>
                        <form
                          className="p-3"
                          onSubmit={(e) => {
                            e.preventDefault();
                            addProduct();
                          }}
                        >
                          <div>
                            <label htmlFor="" className="font-semibold">
                              Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              onChange={(e) => setName(e.target.value)}
                              value={name}
                              placeholder="Product Name"
                              className="border-2 rounded-lg border-[#eee1ffbb] w-full py-2 pl-2 mt-2 placeholder:font-semibold placeholder:text-base focus:border-[red] focus:placeholder:text-[red] "
                            />
                          </div>
                          <div className="mt-3">
                            <label htmlFor="" className="font-semibold">
                              Price
                            </label>
                            <input
                              value={price}
                              type="number"
                              onChange={(e) => {
                                setPrice(e.target.value);
                              }}
                              placeholder="Product price"
                              className="border-2 rounded-lg border-[#eee1ffbb] w-full py-2 pl-2 mt-2 placeholder:font-semibold placeholder:text-base focus:border-[red] focus:placeholder:text-[red] "
                            />
                          </div>
                          <div className="mt-3">
                            <label htmlFor="" className="font-semibold">
                              Category
                            </label>
                            <select
                              value={category}
                              onChange={(e) => {
                                setCategory(e.target.value);
                              }}
                              name=""
                              id=""
                              className="border-2 !font-semibold rounded-lg mt-2 border-[#eee1ffbb] text-[#9ca3af]"
                            >
                              <option
                                className="!font-semibold placeholder:!font-semibold"
                                value="Body"
                              >
                                Body
                              </option>
                              <option
                                className="!font-semibold placeholder:!font-semibold"
                                value="Face"
                              >
                                Face
                              </option>
                              <option
                                className="!font-semibold placeholder:!font-semibold"
                                value="Nigerian"
                              >
                                Nigerian
                              </option>
                              <option
                                className="!font-semibold placeholder:!font-semibold"
                                value="Foreign"
                              >
                                Foreign
                              </option>
                            </select>
                          </div>
                        </form>
                      </div>

                      <div className="mt-4 bg-white p-4 rounded-md shadow-xl">
                        <label htmlFor="" className="font-semibold mb-2">
                          Product Image
                        </label>
                        <div className="w-200 h-200 bg-gray-100 p-4 border rounded-md flex flex-col justify-center items-center relative">
                          <label htmlFor="fileInput" className="cursor-pointer">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="h-10 w-10 text-gray-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                            <span className="mt-2 text-sm ml-[-50px] text-gray-600">
                              Upload Product Image
                            </span>
                            <input
                              id="fileInput"
                              type="file"
                              className="sr-only"
                              onChange={handleImageUpload}
                            />
                          </label>
                          {image && (
                            <img
                              src={image}
                              alt="Uploaded Product"
                              className="absolute inset-0 w-full h-full object-cover rounded-md"
                            />
                          )}
                        </div>

                        {image !== "" && (
                          <button
                            className="mt-3 bg-[red] py-2 px-3 text-sm rounded-md text-white"
                            onClick={() => {
                              setimage("");
                            }}
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="mt-4 bg-white p-4 rounded-md shadow-xl">
                        <div>
                          <label htmlFor="" className="font-semibold">
                            Product Description
                          </label>
                          <textarea
                            value={description}
                            onChange={(e) => {
                              setDescription(e.target.value);
                            }}
                            type="text"
                            placeholder="Write something about your lovely product here"
                            className="border-2 rounded-lg border-[#eee1ffbb] w-full py-2 pl-2 mt-2 placeholder:font-semibold placeholder:text-base focus:outline-none  focus:!border-[red] focus:placeholder:text-[red] h-[200px] "
                          />
                        </div>
                      </div>

                      <div className="my-[30px] ml-3">
                        {!loading ? (
                          <button
                            className="bg-[red] py-2 px-3 text-white rounded-xl"
                            onClick={(e) => {
                              e.preventDefault();
                              addProduct();
                            }}
                          >
                            Add Product
                          </button>
                        ) : (
                          <button className="bg-slate-400 py-2 px-3 text-white rounded-xl">
                            Loading...
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                  {toBeShown === "REVIEWS" && (
                    <h5 className="font-semibold">No reviews yet</h5>
                  )}
                </div>
              </div>

              <div className="edit-modal">
                <Modal show={show2} onHide={handleClose2}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      <p className="font-semibold text-xl">Edit Product</p>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form action="">
                      <div>
                        <label htmlFor="" className="font-semibold">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          placeholder="Product Name"
                          className="border-2 rounded-lg border-[#eee1ffbb] w-full py-2 pl-2 mt-2 placeholder:font-semibold placeholder:text-base focus:border-[red] focus:placeholder:text-[red] "
                        />
                      </div>
                      <div className="mt-3">
                        <label htmlFor="" className="font-semibold">
                          Price
                        </label>
                        <input
                          value={price}
                          type="number"
                          onChange={(e) => {
                            setPrice(e.target.value);
                          }}
                          placeholder="Product price"
                          className="border-2 rounded-lg border-[#eee1ffbb] w-full py-2 pl-2 mt-2 placeholder:font-semibold placeholder:text-base focus:border-[red] focus:placeholder:text-[red] "
                        />
                      </div>
                      <div className="mt-3">
                        <label htmlFor="" className="font-semibold">
                          Category
                        </label>
                        <select
                          value={category}
                          onChange={(e) => {
                            setCategory(e.target.value);
                          }}
                          name=""
                          id=""
                          className="border-2 !font-semibold rounded-lg mt-2 border-[#eee1ffbb] text-[#9ca3af]"
                        >
                          <option
                            className="!font-semibold placeholder:!font-semibold"
                            value="Body"
                          >
                            Body
                          </option>
                          <option
                            className="!font-semibold placeholder:!font-semibold"
                            value="Face"
                          >
                            Face
                          </option>
                          <option
                            className="!font-semibold placeholder:!font-semibold"
                            value="Nigerian"
                          >
                            Nigerian
                          </option>
                          <option
                            className="!font-semibold placeholder:!font-semibold"
                            value="Foreign"
                          >
                            Foreign
                          </option>
                        </select>
                        <div className="mt-3 bg-white  rounded-md shadow-xl">
                          <label htmlFor="" className="font-semibold mb-2">
                            Product Image
                          </label>
                          <div className="w-200 h-200 bg-gray-100 p-4 border rounded-md flex flex-col justify-center items-center relative">
                            <label
                              htmlFor="fileInput"
                              className="cursor-pointer"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="h-10 w-10 text-gray-500 ml-[50px]"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                              </svg>
                              <span className="mt-2 text-sm  text-gray-600">
                                Upload Product Image
                              </span>
                              <input
                                id="fileInput"
                                type="file"
                                className="sr-only"
                                onChange={handleImageUpload}
                              />
                            </label>
                            {image && (
                              <img
                                src={image.replace(/^["'](.*)["']$/, "$1")}
                                alt="Uploaded Product"
                                className="absolute inset-0 w-full h-full object-cover rounded-md"
                              />
                            )}
                          </div>

                          {image !== "" && (
                            <button
                              className="mt-3 ml-2 mb-2 bg-[red] py-2 px-3 text-sm rounded-md text-white"
                              onClick={() => {
                                setimage("");
                              }}
                            >
                              Remove
                            </button>
                          )}
                        </div>

                        <div className="mt-4 bg-white p-4 rounded-md shadow-xl">
                          <div>
                            <label htmlFor="" className="font-semibold">
                              Product Description
                            </label>
                            <textarea
                              value={description}
                              onChange={(e) => {
                                setDescription(e.target.value);
                              }}
                              type="text"
                              placeholder="Write something about your lovely product here"
                              className="border-2 rounded-lg border-[#eee1ffbb] w-full py-2 pl-2 mt-2 placeholder:font-semibold placeholder:text-base focus:outline-none  focus:!border-[red] focus:placeholder:text-[red] h-[200px] "
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        editProduct();
                      }}
                    >
                      {editLoading ? "Loading..." : "Save Changes"}
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    <p className="font-semibold text-xl">Description</p>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalDescription}</Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            <div className=" sm:hidden flex flex-col h-screen justify-center items-center w-screen">
              <p className="">This page is not available of large screens</p>
              <br />
              <p>
                Click{" "}
                <span
                  className="font-bold text-xl cursor-pointer"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  here
                </span>{" "}
                to go back to home
              </p>
            </div>
            {errorMessage !== "" && (
              <div>
                <div className=" fixed bottom-[25px] ml-[25vw] right-[20px] bg-slate-800 py-3 px-6 text-xl text-white rounded-lg">
                  {errorMessage}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div class="center-body">
            <div class="loader-circle-45"></div>
          </div>
        )}
      </div>
    )
  );
};
