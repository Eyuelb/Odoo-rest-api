import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import SearchBar from "../SearchBar/Searchbar";
import AdminTable from "../Table/Table";
import "./orders.scss";
import authService from "../../Services/auth.service";
import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { EyeOutlined } from "@ant-design/icons";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [mappedOrders, setMappedOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  const [searchValue, setSearchValue] = useState("");

  const switchButton = (orderStatus) => {
    if (orderStatus === "active" || "pending") return "Deactivate";
    else return "Activate";
  };

  // const filterOrder = (searchValue) => {
  //   if (searchValue === "") {
  //     fetchOrders();
  //     return mappedOrders;
  //   } else {
  //     return mappedOrders.filter((filteredOrders) =>
  //       filteredOrders.orderUniqueId.includes(searchValue)
  //     );
  //   }
  // };
  const columns = [
    { title: "Order Id", dataIndex: "id" },
    { title: "Ordered By", dataIndex: "orderedBy" },

    { title: "Ordered Products", dataIndex: "orderedProducts" },

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
                className="h-8 mr-2 w-28 bg-transparent hover:bg-blue-500 text-blue hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                style={{
                  textAlign: "center",

                  borderColor:
                    record.userStatus === "deactivated" ? "green" : "red",
                  color: record.userStatus === "deactivated" ? "green" : "red",
                }}
              >
                <div>{switchButton(record.orderStatus)}</div>
              </button>
              <EyeOutlined />
            </div>
          </>
        );
      },
    },
  ];

  const getUser = async (userId) => {
    const response = await authService.getUserById(userId);
    setCurrentUser(response);
    console.log("CurretnUser", response);
    return response;
  };

  const fetchOrders = async (e) => {
    const response = await authService.getOrders();
    setOrders(response);
    // console.log("=========Orders loop=========");

    // console.log("=========Orders length=========");
    // console.log(response.length);
    console.log("=========Orders=========");
    console.log(response);
  };

  const mapOrderedProducts = (orderedItems) => {
    //console.log("*******", orderedItems);
    const mappedProducts = orderedItems?.map((el) => {
      return {
        productName: el?.productName,
        quantity: el?.quantity,
      };
    });
    console.log("*******", mappedProducts);

    return mappedProducts;
  };
  const mapOrders = orders.map((el) => {
    const products = mapOrderedProducts(el?.orderedProduct?.orderedItems);
    // const user = getUser(el?.userId);
    return {
      id: el?.orderUniqueId,
      orderedBy: el?.userId,
      location: el?.location,
      orderStatus: el?.orderStatus,
      orderedProducts: products?.length,
    };
  });
  //setMappedOrders(mapOrders);

  //console.log("Mapped Data", mapOrders);
  useEffect(() => {
    fetchOrders();
    //getUser();
  }, []);
  useEffect(() => {
    //console.log("Search Value Changed");
    // filterUsersSync(searchValue).then((fusers) => {
    //   setUsers(fusers);
    // });
    //const filteredorder = filterOrder(searchValue);
    // setMappedOrders(filteredorder);
  }, [searchValue]);
  return (
    <div className="orders">
      <Sidebar></Sidebar>
      <div className="ordersContainer">
        <Navbar />
        <h6 class="font-medium text-center mt-4 leading-tight text-base  text-blue-600">
          Orders
        </h6>
        <div className="flex">
          <div className="m-auto ml-4">
            <SearchBar
            //callback={(searchValue) => setSearchValue(searchValue)}
            />
          </div>
        </div>

        <div className="orderTable">
          <AdminTable data={mapOrders} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default Orders;
