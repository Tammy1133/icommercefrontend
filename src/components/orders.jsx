import React, { useEffect, useState } from "react";
import { Navbar } from "./navbar";
import axios from "axios";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

export const Orders = () => {
  const user = useSelector((state) => {
    return state?.user?.user;
  });
  console.log(user);
  const [loading, setLoading] = useState(true);

  const [allOrders, setAllOrders] = useState([]);
  const getAllOrders = async () => {
    try {
      setLoading(true);

      const data = await axios.post(
        "https://icommercebackend.onrender.com/api/alluserorders",
        {
          id: user.id,
        }
      );

      setAllOrders(data.data.orders);
      // setErrorMessage("Product added successfully");
      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };
  useEffect(() => {
    getAllOrders();
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar></Navbar>

      {loading ? (
        <div class="center-body2">
          <div class="loader-circle-45"></div>
        </div>
      ) : (
        <div className="mt-[140px] sm:!px-7  ">
          <div>
            <h3 className="text-center font-semibold text-xl uppercase">
              All Orders
            </h3>
            <div className="!overflow-x-scroll px-3">
              <Table
                striped
                bordered
                hover
                variant=""
                className="mt-7 !overflow-x-scroll"
              >
                <thead>
                  <tr>
                    <th className="min-w-[50px] text-center !text-[red]">#</th>
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
                  {allOrders?.map((item, index) => {
                    return (
                      <tr>
                        <td className=" font-semibold w-[50px] text-center !pt-[19px]">
                          {index + 1}
                        </td>
                        <td className=" font-semibold min-w-[200px] !pt-[19px]">
                          {user.username}
                        </td>
                        <td className=" font-semibold min-w-[200px] !pt-[19px]">
                          ₦ {item.total}
                        </td>
                        <td className=" font-semibold min-w-[200px] !pt-[10px] pl-6 px-4 sm:px-0 mb-2 ">
                          {item?.products?.map((item) => {
                            return (
                              <div>
                                {item?.name && item?.name} (
                                {item?.quantity && item.quantity})
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
        </div>
      )}
    </div>
  );
};
