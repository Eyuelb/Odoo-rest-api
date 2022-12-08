import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import SearchBar from "../SearchBar/Searchbar";
import AdminTable from "../Table/Table";
import "./orders.scss";
import authService from "../../Services/auth.service";
import React, { useState, useEffect } from "react";
const Orders = () => {
  const [orders, setOrders] = useState([]);

  const switchButton = (orderStatus) => {
    if (orderStatus === "active" || "pending") return "Deactivate";
    else return "Activate";
  };
  const columns = [
    { title: "Order Id", dataIndex: "id" },
    { title: "Ordered By", dataIndex: "orderedBy" },
    { title: "Ordered Products", dataIndex: "productName" },
    { title: "Ordered Quantity", dataIndex: "orderedQuantity" },
    { title: "Location", dataIndex: "location" },
    { title: "Order Status", dataIndex: "orderStatus" },
    { title: "Total Price", dataIndex: "totalPrice" },
    {
      title: "Action",
      render: (record) => {
        return (
          <>
            <div>
              <button
                className="h-8 w-28 bg-transparent hover:bg-blue-500 text-blue hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                style={{
                  textAlign: "center",

                  borderColor:
                    record.userStatus === "deactivated" ? "green" : "red",
                  color: record.userStatus === "deactivated" ? "green" : "red",
                }}
              >
                <div>{switchButton(record.orderStatus)}</div>
              </button>
            </div>
          </>
        );
      },
    },
  ];

  const fetchOrders = async (e) => {
    const response = await authService.getOrders();
    setOrders(response);
    //console.log("=========Orders=========");
    //console.log(response);
  };

  const mapOrders = orders.map((el) => {
    const productName = el.productId.name;
    const orderedBy = el.userId.fullName;
    return {
      id: el.id,
      productName,
      orderedBy,
      orderedQuantity: el.quantity,
      location: el.location,
      orderStatus: el.userStatus,
      totalPrice: el.totalPrice,
    };
  });

  console.log("Mapped Data", mapOrders);
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="orders">
      <Sidebar></Sidebar>
      <div className="ordersContainer">
        <Navbar />
        <p>Orders</p>
        <div className="mb-10 p-4">
          <SearchBar />
        </div>
        <div className="orderTable">
          <AdminTable data={mapOrders} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default Orders;
