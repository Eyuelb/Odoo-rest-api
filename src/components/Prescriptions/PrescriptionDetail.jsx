import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import SearchBar from "../SearchBar/Searchbar";
import AdminTable from "../Table/Table";
import "./prescriptions.scss";
import { Link } from "react-router-dom";
import { Button, Image, Space, Input, Table, InputNumber } from "antd";
import Modal from "react-modal";
import React, { useState, useEffect } from "react";
import AuthService from "../../Services/auth.service";
import { LinkOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import authService from "../../Services/auth.service";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const PrescriptionDetail = () => {
  const [random, setRandom] = useState();
  const [visible, setVisible] = useState(false);
  const [products, setProduscts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartItem, setCartItem] = useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [itemsFromCart, setItemsFromCart] = useState([]);
  const [prescription, setPrescription] = useState([]);

  //const history = useNavigate();
  const [searchparams] = useSearchParams();
  const location = useLocation();
  const data = location;

  console.log("Navigate", searchparams.get("id"));

  const fetchProducts = async (e) => {
    const response = await AuthService.getProductsFromDB();
    setProduscts(response);
    console.log("Products", products);
  };
  const searchProducts = (searchValue) => {
    if (searchValue === "") {
      fetchProducts();
      return products;
    } else {
      return products.filter((filteredUsers) =>
        filteredUsers.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  };
  const getPrescriptionById = async () => {
    const response = await AuthService.getPrescriptionById(
      searchparams.get("id")
    );
    setPrescription(response);
    console.log("PresriptionById", response);
  };
  const approvePrescription = async (e) => {
    const response = await authService.approvePrescription(
      searchparams.get("id")
    );
    if (response) {
      window.alert("Prescription Approved");
    }
  };
  const declinePrescription = async (e) => {
    const response = await authService.declinePrescription(
      searchparams.get("id")
    );
    if (response) {
      window.alert("Prescription Declined");
    }
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
    var items = JSON.parse(localStorage.getItem("cart"));
    setItemsFromCart(items);
  };

  const onQuantityChange = (value, itemName) => {
    console.log("changed", value, itemName);
    const items = JSON.parse(window.localStorage.getItem("cart"));

    var item = items.find((item) => item.productName === itemName);
    //console.log("Items from local", item);

    // for (const i in items) {
    //   if (items[i].productName === itemName) {
    //     console.log(items[i]);
    //     var item = items[i];
    //     return items[i];
    //   }
    // }
    if (item) {
      item.quantity = value;
    }
    //console.log("Updated Item", items);
    window.localStorage.setItem("cart", JSON.stringify(items));
  };

  let formateCartData = {
    productId: cartItem.id,
    productName: cartItem.name,
    productPrice: cartItem.listPrice,
    totalPrice: cartItem.listPrice,
    quantity: 1,
  };
  const addToCart = (cartProduct) => {
    const cart = window.localStorage.getItem("cart");

    if (cart === null) {
      window.localStorage.setItem("cart", JSON.stringify([cartProduct]));
    } else {
      const getCurrentCart = window.localStorage.getItem("cart");
      const currentCart = JSON.parse(getCurrentCart);

      currentCart.push(cartProduct);

      window.localStorage.setItem("cart", JSON.stringify(currentCart));
    }
  };
  //

  const removeFromCart = (itemId) => {
    const getCurrentCart = window.localStorage.getItem("cart");
    const currentCart = JSON.parse(getCurrentCart);
    const objWithIdIndex = currentCart.findIndex(
      (obj) => obj.productId === itemId
    );
    if (objWithIdIndex > -1) {
      currentCart.splice(objWithIdIndex, 1);
    }

    window.localStorage.setItem("cart", JSON.stringify(currentCart));
    var items = JSON.parse(localStorage.getItem("cart"));
    setItemsFromCart(items);
  };

  const putToCart = (record) => {
    console.log("Record====", record);
    setCartItem(record);
    addToCart(formateCartData);
    console.log("Cart Item", cartItem);
    //localStorage.setItem("cartData", JSON.stringify(formateCartData));
  };

  const createOrder = async (e) => {
    const items = JSON.parse(window.localStorage.getItem("cart"));
    const response = await AuthService.createOrder(Object.assign({}, items));
    if (response) {
      window.alert("Order Successfully Created!");
    } else {
      window.alert("Unable to Create Order!");
    }
  };
  const columns = [
    { title: "Product Name", dataIndex: "name" },
    { title: "Product Category", dataIndex: "defaultCode" },
    { title: "Unit Price", dataIndex: "listPrice" },
    { title: "Quantity", dataIndex: "qtyAvailable" },
    // {
    //   title: "Quantity",
    //   render: () => {
    //     return (
    //       <div>
    //         <Input className="w-24" placeholder="Enter Quantity"></Input>
    //       </div>
    //     );
    //   },
    // },

    {
      title: "Action",
      render: (record) => {
        return (
          <div>
            <button
              className="h-8 w-28 bg-transparent hover:bg-blue-500 text-blue hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={() => {
                putToCart(record);
              }}
            >
              Add To cart
            </button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    fetchProducts();
    getPrescriptionById();
    console.log("******", products);

    console.log("+++++++++++++", itemsFromCart);
  }, []);
  useEffect(() => {
    const searchedProducts = searchProducts(searchValue);
    setProduscts(searchedProducts);
    // const filteredProducts = filterProducts(filterValue);
    // setProducts(filteredProducts);
  }, [searchValue]);

  return (
    <div className="prescriptions">
      <Sidebar></Sidebar>
      <div className="prescriptionsContainer">
        <Navbar />
        <h6 class="font-medium text-center mt-4 leading-tight text-base  text-blue-600">
          Prescription Detail
        </h6>
        <div className="card flex">
          {/* <div className="m-auto ml-4">
            <SearchBar />
          </div> */}
          <div>
            {/* <Image
              preview={{
                visible: false,
              }}
              width={480}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            /> */}

            <img
              className="upload-img"
              src={prescription.picturePath}
              onError={(e) => (e.target.src = "images/no_image10.jpg")}
            />
            <div className="flex">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold px-2 py-2 ml-4 w-28 rounded-lg"
                style={{ margin: "6px" }}
                onClick={approvePrescription}
              >
                Approve
              </button>

              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 py-2 ml-4 w-28 rounded-lg"
                style={{ margin: "6px" }}
                onClick={declinePrescription}
              >
                Decline
              </button>
            </div>
          </div>
          <div className="w-full m-2">
            <div className="flex ">
              <div className=" mb-2 m-auto ml-2">
                <SearchBar
                  callback={(searchValue) => setSearchValue(searchValue)}
                />
              </div>
              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-2 ml-4 w-28 rounded-lg"
                  style={{ margin: "6px" }}
                  onClick={openModal}
                >
                  Cart
                </button>
              </div>
            </div>

            <div>
              <AdminTable data={products} columns={columns}></AdminTable>
            </div>
          </div>
          <div></div>
        </div>
        <div>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h6 class="font-medium text-center mt-4 leading-tight text-base  text-blue-600">
              Cart Items
            </h6>

            {itemsFromCart != null ? (
              <div>
                {itemsFromCart.map((item) => {
                  return (
                    <div className="flex">
                      <h2> {item.productName}</h2>
                      <InputNumber
                        min={1}
                        max={10}
                        defaultValue={1}
                        onChange={(event) =>
                          onQuantityChange(event, item.productName)
                        }
                      />
                      <MinusCircleOutlined
                        onClick={() => {
                          removeFromCart(item.productId);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>
                <p>The Cart is Empty.Please add Items to the cart!</p>
              </div>
            )}

            <div>
              <button
                className="bg-red-500 hover:bg-blue-700 text-white font-bold px-2 py-2 ml-4 w-28 rounded-lg"
                style={{ margin: "6px" }}
                onClick={closeModal}
              >
                cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-2 ml-4 w-28 rounded-lg"
                style={{ margin: "6px" }}
                onClick={createOrder}
              >
                Order
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};
export default PrescriptionDetail;
