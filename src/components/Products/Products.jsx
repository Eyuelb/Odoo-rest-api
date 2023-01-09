import "./products.scss";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { Button, Drawer } from "antd";
import React, { useState, useEffect } from "react";
import Search from "antd/lib/transfer/search";
import SearchBar from "../SearchBar/Searchbar";
import AdminTable from "../Table/Table";
import authService from "../../Services/auth.service";
import Menu from "antd/lib/menu";
import "antd/lib/menu/style/css";
import Dropdown from "antd/lib/dropdown";
import "antd/lib/dropdown/style/css";
import Icon from "antd/lib/icon";
import "antd/lib/icon/style/css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const columns = [
    { title: "Product ID", dataIndex: "id" },
    { title: "Product Name", dataIndex: "name" },
    { title: "Product Category", dataIndex: "categName" },
    { title: "Internal Reference", dataIndex: "defaultCode" },
    { title: "Unit Price", dataIndex: "listPrice" },
    { title: "Quantity", dataIndex: "qtyAvailable" },
  ];

  const fetchProducts = async (e) => {
    const response = await authService.getProductsFromDB();
    setProducts(response);
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

  const filterProducts = (values) => {
    console.log("fileterKey", values);
    const selected = parseInt(values.key);
    setFilterValue(values);
    if (selected === 5) {
      fetchProducts();
      return products;
    }
    const categoryMap = {
      1: "Miscillaneous",
      2: "ENT",
      3: "OTC",
      4: "Equipment",
    };
    const selectedCategory = categoryMap[selected];
    //console.log("Selected Category", selectedCategory);
    const filteredEvents = products.filter((filteredProducts) =>
      filteredProducts.categ_id[1]
        .toLowerCase()
        .includes(selectedCategory.toLowerCase())
    );
    setProducts(filteredEvents);
  };
  console.log("Products", products);
  // const formatData = products.map(
  //   ({ id, name, default_code, categ_id, list_price, qty_available }) => {
  //     return { id, name, default_code, categ_id, list_price, qty_available };
  //   }
  // );

  // const formatProductData = products.map((el) => {
  //   const categId = el.categ_id[0];
  //   const categName = el.categ_id[1];
  //   return {
  //     categId,
  //     categName,
  //     id: el.id,
  //     name: el.name,
  //     default_code: el.default_code,
  //     list_price: el.list_price + " Br",
  //     qty_available: el.qty_available,
  //   };
  // });

  //console.log("formated Data", formatData);
  //console.log("Mapped Data", formatProductData);
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const searchedProducts = searchProducts(searchValue);
    setProducts(searchedProducts);
    // const filteredProducts = filterProducts(filterValue);
    // setProducts(filteredProducts);
  }, [searchValue]);

  const menu = (
    <Menu onClick={filterProducts}>
      <Menu.Item key="1">Category: Miscillaneous</Menu.Item>
      <Menu.Item key="2">Category: ENT</Menu.Item>
      <Menu.Item key="3">Category: OTC</Menu.Item>
      <Menu.Item key="4">Category: Equipment</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="5">Clear Filter</Menu.Item>
    </Menu>
  );
  return (
    <div className="products">
      <Sidebar></Sidebar>
      <div className="productsContainer">
        <Navbar />
        <h6 class="font-medium text-center mt-4 leading-tight text-base  text-blue-600">
          Products
        </h6>

        <div className="flex">
          <div className="m-auto ml-4">
            <SearchBar
              callback={(searchValue) => setSearchValue(searchValue)}
            />
          </div>
          <div>
            <Dropdown className="filter mr-4 w-28 rounded-lg" overlay={menu}>
              {/* <a className="ant-dropdown-link" href="#">
              Filter By <Icon type="down" />
            </a> */}
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Filter By <Icon type="down" href="#" />
              </button>
            </Dropdown>
          </div>
        </div>
        <div></div>
        <div className="productTable">
          <AdminTable data={products} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default Products;
