/** @jsxImportSource theme-ui */

import React, { useState, useRef, Fragment } from 'react'
import { IconButton, Input } from 'theme-ui';
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useProducts,useCart,useAddToCart,useRemoveFromCart,useIncreaseCartQuantity,useDecreaseCartQuantity,useClearCart } from '@stateManagment';
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


  const { cart, isAddToCartLoading, totalPrice } = useCart();  
  const addToCart = useAddToCart();
  const removeFromCart = useRemoveFromCart();
  const increaseCartQuantity = useIncreaseCartQuantity();
  const decreaseCartQuantity = useDecreaseCartQuantity();
  const clearCart = useClearCart()



  let formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
  });
  const clearAll = () => {
    setCart([]);
    setPaymentMode(null)
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

          <div className='w-full p-4'>
          <div className='w-full p-4 shadow-lg'
          sx={{
            borderRadius: "13px",
            background:"card"
          }}>
          <div className="header flex items-baseline justify-between">
            <h2 className='font-semibold text-base  leading-3 whitespace-nowrap ' >Choose Category </h2>
          </div>
          {/* categories  */}
          <div className='flex pt-5 gap-3 overflow-auto categories'>
            <button className="card rounded-lg p-3 px-4 ">
              <MdRestaurantMenu className='h-4 mx-auto' />
              <p className=' font-bold text-sm'>OTC</p>
            </button>
          </div>
          </div>
          <div className='flex items-center justify-end w-full mt-3 '>
            <div className="md:w-56 flex items-center flex-row"
              sx={{
                width: "23rem",
                // boxShadow: t => `0px 1px 4px 0px ${t.colors.text}`,
                borderRadius: "4px",
                background:"card"
              }}
            >
              <Input 
                className='shadow-lg'
                label="Type here"
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

                className='h-10 w-10 shadow-lg'
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
          <aside className="col-span-6 rounded-lg shadow-lg min-h-max px-3 py-4"
          sx={{
            // boxShadow: t => `0px 1px 4px 0px ${t.colors.text}`,
            borderRadius: "13px",
            background:"card"
          }}>
            {/* cart items  */}

            <div className="flex justify-between items-center py-2">
              <p className="font-bold text-base">Order</p>
              <button onClick={clearCart} className='font-bold px-2 rounded-md'>clear all</button>
            </div>

            <div>
              {cart?.map(({productId,productName,productQuantity,productPrice,productTotalPrice}, key) => (
                <div key={key} className="product flex flex-col md:flex-row justify-between items-center px-1 rounded-xl  gap-y-2 pb-3 my-2">
                  <div className="flex py-2 px-1 items-center">
                    <div className='ml-1 px-1'>
                      <p className='text-xs md:text-sm font-bold py-2'>{productName}</p>
                      <p className='font-semibold text-sm  md:text-base'>{formatCurrency.format(productTotalPrice)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => decreaseCartQuantity(productId,1)} className=""> <FiMinusCircle className='text-xl md:text-2xl' /> </button>
                    <p className='font-bold'>{productQuantity}</p>
                    <button onClick={() => increaseCartQuantity(productId,1)} className=""> < FiPlusCircle className='text-xl md:text-2xl' /> </button>
                    <TbTrash className='mr-2 text-lg md:text-xl' onClick={() => removeFromCart(productId)} />
                  </div>
                </div>
              ))}
            </div>
            {/* totals  */}
            <div className='py-5 px-2 rounded shadow-sm'>
              <div className="flex justify-between">
                <p className='font-bold text-sm'>Totals</p>
                <p className='font-bold text-sm'>{formatCurrency.format(totalPrice)}</p>
              </div>
            </div>

          </aside>

        </div>
      </div>

    </div>
  )
}