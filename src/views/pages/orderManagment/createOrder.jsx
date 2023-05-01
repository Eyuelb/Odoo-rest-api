/** @jsxImportSource theme-ui */

import React, { useState, useRef, Fragment } from 'react'
import { IconButton, Input } from 'theme-ui';
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useProducts } from '@stateManagment';
import { MdRestaurantMenu } from 'react-icons/md'
import { GiTakeMyMoney } from 'react-icons/gi'
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { TbTrash } from 'react-icons/tb'
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi'
import { useReactToPrint } from 'react-to-print';
import { CartSingleProduct, CartSingleProductLoadingSkeleton } from "@components"

import ReactPaginate from 'react-paginate';
export const CreateOrder = () => {
  const [pageOffset, setPageOffset] = useState(0);
  const [searchWord, setSearchWord] = useState("");
  const [keyWord, setKeyWord] = useState("");
  const itemsPerPage = 30; // set items per page
  const { products, totalPages, isGetAllProductLoading } = useProducts(pageOffset, itemsPerPage, keyWord);
  const handlePageChange = (event) => {
    typeof (event.selected) == "number" && setPageOffset(event.selected);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  };
  const handleSearch = () => {
    setPageOffset(0)
    console.log("searchWord")
    console.log(searchWord)
    setKeyWord(searchWord)
    console.log("clicked")
  };




  const componentRef = useRef();
  const [cart, setCart] = useState([])
  const [paymentMode, setPaymentMode] = useState('')

  const [total, setTotal] = useState(0)

  const [show, setShow] = useState(0)


  const addToCart = (productId) => {

    const found = cart.some(el => el.id === productId);

    if (found) {

      let newProd = products.filter((p) => p.id === productId)
      console.log(newProd)
      const newCart = cart.map(p =>
        p.id === productId
          ? { ...p, productQuantity: p.productQuantity += 1, listPrice: p.listPrice + newProd[0].listPrice }
          : p
      );

      let sum = newCart.reduce(function (acc, obj) { return acc + obj.listPrice; }, 0);
      setTotal(sum)

      setCart(newCart)

    } else {
      let newProd = products.filter((p) => p.id === productId)
      console.log(newProd)
      // newProd[0].productQuantity = 1
      setCart(() => [...cart, ...newProd])
    }
  }

  const increase = (productId) => {
    const newCart = cart.map(p =>
      p.id === productId
        ? { ...p, productQuantity: p.productQuantity += 1, listPrice: p.listPrice + p.listPrice }
        : p
    );
    let sum = newCart.reduce(function (acc, obj) { return acc + obj.listPrice; }, 0);
    setTotal(sum)
    setCart(newCart)
  }

  const decrease = (productId) => {
    let decProd = products.filter((p) => p.id === productId)
    console.log(decProd);
    const newCart = cart.map(p =>
      p.id === productId
        ? { ...p, productQuantity: p.productQuantity -= 1, listPrice: p.listPrice - decProd[0].listPrice }
        : p
    );

    const filtered = newCart.filter(p => p.productQuantity > 0)
    let sum = filtered.reduce(function (acc, obj) { return acc + obj.listPrice; }, 0);
    setTotal(sum)

    setCart(filtered)
  }


  const clearAll = () => {
    setCart([]);
    setPaymentMode(null)
  }

  const remove = (id) => {

    let newCart = cart.filter((p) => p.id !== id)
    setCart(newCart)
  }

  let formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
  });

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const printBill = () => {
    handlePrint()
  }

  return (


    <div
      className='w-full flex item-center flex-col overflow-auto'
      sx={{
        borderRadius: "36px",
        marginBottom: "25px",
        padding: "10px"

      }}
    >

      <div className="grid grid-cols-1 mb:grid-cols-2 tb:grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-2 w-full h-full">

        {/* Left side */}
        <div className="col-span-1 mb:col-span-1 tb:col-span-2 sm:col-span-2 md:col-span-4 h-full px-2">
          <div className="header flex items-baseline justify-between">
            <h2 className='font-semibold text-base text-gray-800 leading-3 whitespace-nowrap ' >Choose Category </h2>
          </div>
          {/* categories  */}
          <div className='flex pt-5 gap-3 overflow-auto categories'>
            <button className="card rounded-lg p-3 px-4 bg-white">
              <MdRestaurantMenu className='h-4 mx-auto' />
              <p className='text-gray-700 font-bold text-sm'>OTC</p>
            </button>





          </div>
          <div className='flex items-center justify-end w-full mt-3'>
            <div className="md:w-56 flex items-center flex-row"
              sx={{
                width: "23rem",
                boxShadow: t => `0px 1px 4px 0px ${t.colors.text}`,
                borderRadius: "4px",
              }}
            >
              <Input label="Type here"
                sx={{

                  height: "3rem"
                }}
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}

              />
              <IconButton
                sx={{
                  height: "3rem",
                  width: "4rem",
                  border: "1px solid",
                  borderRadius: "4px",
                  borderColor: "secondary"
                }}

                className='h-10 w-10'
                onClick={() => handleSearch()}
              >
                <MagnifyingGlassIcon className="h-6 w-6  text-inherit"
                  sx={{
                    height: "3rem",
                    width: "24px",
                    '&:hover': {
                      color: 'iconHover',
                    }
                  }} />
              </IconButton>
            </div>
          </div>
          {isGetAllProductLoading ? (
            <div className=" animated fadeIn faster  flex justify-center items-center flex-col py-5">
              <div className="container z-10">
                <div className="grid mt-8  gap-2 grid-cols-1 mb:grid-cols-1 tb:grid-cols-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5">
                  <Fragment>
                    {Array.from({ length: itemsPerPage }).map((_, index) => (
                      <div key={index}>
                        <CartSingleProductLoadingSkeleton />
                      </div>
                    ))}
                  </Fragment>
                </div>
              </div>
            </div>
          )
            :
            (
              <div className=" animated fadeIn faster  flex justify-center items-center flex-col py-5">
                <div className="container z-10">
                  <div className="grid mt-8  gap-2 grid-cols-1 mb:grid-cols-1 tb:grid-cols-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5">
                    {products.map((product, key) =>
                    (
                      <div key={key}>
                        <CartSingleProduct key={key} props={product} addToCart={addToCart} />
                      </div>
                    )
                    )}
                  </div>
                </div>
                <ReactPaginate
                  breakClassName="mx-2 my-1 "
                  breakLinkClassName="mx-2 my-1 "
                  breakLabel="..."
                  containerClassName="flex justify-center items-center mt-24"
                  nextClassName="mx-2 my-1 px-1 lg:px-2 xl:px-4 py-2 rounded-md border"
                  activeClassName="bg-navHover-500"
                  pageLinkClassName="mx-2 my-1 px-1 lg:px-2 xl:px-4 py-2 rounded-md border  "
                  pageCount={totalPages}
                  previousClassName="mx-2 my-1 px-1 lg:px-2 xl:px-4 py-2 rounded-md border"
                  onPageChange={handlePageChange}
                  forcePage={(page) => page}
                  renderOnZeroPageCount={null}
                  previousLabel="Previous"
                  nextLabel="Next"
                  pageClassName="page-item"
                // marginPagesDisplayed={2}
                // pageRangeDisplayed={5}

                />
              </div>
            )}

        </div>

        {/* Right Side */}
        <div className="col-span-1  sm:col-span-1 md:col-span-1 mt-7">
          <aside className="col-span-6 bg-white rounded-lg shadow-lg min-h-max px-3 py-4">
            {/* cart items  */}

            <div className="flex justify-between items-center py-2">
              <p className="font-bold text-base">Order</p>
              <button onClick={clearAll} className='font-bold text-gray-600 bg-slate-100 px-2 rounded-md'>clear all</button>
            </div>

            <div>
              {cart?.map((p, key) => (
                <div key={key} className="product flex flex-col md:flex-row justify-between items-center bg-slate-200 px-1 rounded-xl  gap-y-2 pb-3 my-2">
                  <div className="flex py-2 px-1 items-center">
                    <div className='ml-1 px-1'>
                      <p className='text-xs md:text-sm font-bold text-gray-500 py-2'>{p.name}</p>
                      <p className='font-semibold text-sm  md:text-base'>{formatCurrency.format(p.listPrice)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => decrease(p.id)} className=""> <FiMinusCircle className='text-xl md:text-2xl' /> </button>
                    <p className='font-bold'>{p.productQuantity}</p>
                    <button onClick={() => increase(p.id)} className=""> < FiPlusCircle className='text-xl md:text-2xl' /> </button>
                    <TbTrash className='mr-2 text-lg md:text-xl' onClick={() => remove(p.id)} />
                  </div>
                </div>
              ))}
            </div>
            {/* totals  */}
            <div className='py-5 bg-slate-100 px-2 rounded shadow-sm'>
              <div className="flex justify-between">
                <p className='font-bold text-sm'>Totals</p>
                <p className='font-bold text-sm'>{formatCurrency.format(total)}</p>
              </div>
            </div>
            {/* payment method */}
            {cart.length > 0 &&
              <h5 className='font-medium pt-2'>Payment Method</h5>
            }
            {cart.length > 0 &&
              <div className="flex justify-center gap-4 pt-2">
                <button
                  style={{ backgroundColor: paymentMode === "MPESA" && "red" }}
                  onClick={() => setPaymentMode("MPESA")}
                  className={`px-1 lg:px-4 bg-white border py-2 rounded  w-full flex flex-col lg:flex-row justify-around items-center hover:bg-slate-50`}>
                  <FaRegMoneyBillAlt className='text-lg' />
                  <p className='text-gray-500 font-bold text-xs uppercase'>m-pesa</p>
                </button>
                <button
                  style={{ backgroundColor: paymentMode === "CASH" && "red" }}
                  onClick={() => setPaymentMode("CASH")}
                  className={`px-1 lg:px-4 bg-white border py-2 rounded  w-full flex flex-col lg:flex-row justify-around items-center hover:bg-slate-50`}>
                  <GiTakeMyMoney className='text-lg' />
                  <p className='text-gray-500 font-bold text-xs uppercase '>Cash</p>
                </button>
              </div>}
            {/* print bill  */}
            {cart.length > 0 &&
              <button onClick={printBill} className="w-full mt-4 bg-green-400 rounded py-1 font-bold text-gray-700">
                Print bill
              </button>
            }
          </aside>

        </div>
      </div>

    </div>
  )
}