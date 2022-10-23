import "./products.scss";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { Button, Drawer } from "antd";
import React, { useState } from "react";

const Products = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
    console.log(open);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>

      <div className="products">
        <Sidebar></Sidebar>
        <div className="productsContainer">
          <Navbar />
          <p>Products</p>
          <Button type="primary" onClick={showDrawer}>
            Open
          </Button>
        </div>
      </div>
    </>
  );
};

export default Products;
