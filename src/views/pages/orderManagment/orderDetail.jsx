/** @jsxImportSource theme-ui */

import { useParams } from "react-router-dom"
import { useSingleOrder } from '@stateManagment';
import { PageLoading,OrderPageUserInfoLoading, UserProfileIcon,Table } from '@components';


export const OrderDetail = () => {

    const orders = []
    const { id } = useParams();

    const { 
        singleorder,
        isGetOneOrderLoading,
        userInfo,
        isGetUserInfoLoading,
        userorders,
        isGetUserOrderLoading } = useSingleOrder(id);

    const TableConfiguration = [
        {
          TableTittle: 'User Order List',
          defaultSortOrder: 'asc',
          defaultSortColumn: 'orderUniqueId',
          rowsPerPage: 10,
          searchKeys: ['orderUniqueId'],
          ColumnsData: [
            { key: 'id', headerTitle: 'ID', },
            { key: 'orderUniqueId', headerTitle: 'Order ID', action: [] },
            { key: 'quantity', headerTitle: 'Quantity', action: [] },
            {
              key: 'orderStatus', headerTitle: 'Order Status', action: []
              , customTextReplacment: {
                "pending": "Active",
                "deleted": "Suspended"
              },
              customTextColor: {
                "pending": "rgb(187 247 208 /1)",
                "deleted": "rgb(254 215 170 /1)"
              }
            },
          ],
          ClassData: [
            {
              for: 'table', class: 'w-full overflow-hidden ',
              sx: {
              //  boxShadow: t => `0px 1px 11px 0px ${t.colors.text}`,
              
              }
            }, // add shadow-md to create a shadow effect
    
    
            {
              for: 'thead', class: '',
              sx: {
                bg: "secondary",
                fontWeight: "700",
    
              }
            },
            {
              for: 'tr', class: ` `,
              sx:
              {
    
                '&:hover':
                {
                  color: 'black',
                  bg: "secondary"
                }
              }
            },
            { for: 'th', class: 'text-left py-2 px-4 tracking-wider' },
            { for: 'tbody', class: '' },
            { for: 'td', class: 'text-left py-2 px-4 boarder whitespace-no-wrap',
            sx:{
              borderBottomWidth:"1px"
            }
          
          },
            { for: 'tfoot', class: 'px-4 py-3 flex justify-end sm:px-6' },
          ]
    
        }
      ]





    return (
        <div>
            {isGetOneOrderLoading ?
                <PageLoading />
                : (!!singleorder.orderedProduct) && (typeof singleorder.orderedProduct == "object") ? <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">

                    <div className="flex justify-start item-start space-y-2 flex-col">
                        <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9">Order #{singleorder?.id}</h1>
                        <p className="text-base font-medium leading-6">21st Mart 2021 at 10:34 PM</p>
                    </div>
                    <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                            <div className="p-6 w-full shadow-lg"
                                sx={{
                                    background: "card",
                                    borderRadius: "13px"
                                }}>
                                <h2 className="text-xl font-bold mb-4">Customer’s Cart</h2>
                                {Object.keys(singleorder.orderedProduct).map((key) => (
                                    <div key={key}
                                        className="flex items-center space-x-4 mb-6 p-3 font-bold"
                                        sx={{
                                            borderBottom: "solid 1px"
                                        }}
                                    >
                                        <img className="w-24" src="/images/Che_Logo_html.png" alt="product image" />
                                        <div className="flex-grow">
                                            <h3 className="text-lg ">{singleorder.orderedProduct[key].productName}</h3>
                                            <div className="flex justify-between items-center">
                                                <p className="">${singleorder.orderedProduct[key].productPrice}</p>
                                                <p className="">Qty: {singleorder.orderedProduct[key].quantity}</p>
                                                <p className="">Total: ${singleorder.orderedProduct[key].totalPrice}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div
                                className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full space-y-6 shadow-lg"
                                sx={{
                                    background: "card",
                                    borderRadius: "13px"
                                }}
                            >
                                <h3 className="text-xl font-bold leading-5">Summary</h3>
                                <div className="flex justify-center items-center w-full space-y-4 flex-col border-b pb-4">
                                    <div className="flex justify-between w-full">
                                        <p className="text-base  leading-4">Subtotal</p>
                                        <p className="text-base  leading-4 ">${Object.values(singleorder.orderedProduct).reduce((total, item) => total + item.totalPrice, 0)}</p>
                                    </div>
                                    {/* <div className="flex justify-between items-center w-full">
                                        <p className="text-base  leading-4 ">Discount <span className=" p-1 text-xs font-medium  leading-3 ">STUDENT</span></p>
                                        <p className="text-base  leading-4 ">-$28.00 (50%)</p>
                                    </div> */}
                                    <div className="flex justify-between items-center w-full">
                                        <p className="text-base">Shipping</p>
                                        <p className="text-base">$100.00</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-base font-bold leading-4">Total</p>
                                    <p className="text-base font-bold leading-4">${Object.values(singleorder.orderedProduct).reduce((total, item) => total + item.totalPrice, 0) + 100}</p>
                                </div>
                            </div>
                            {/* <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Shipping</h3>
                                <div className="flex justify-between items-start w-full">
                                    <div className="flex justify-center items-center space-x-4">
                                        <div className="w-8 h-8">
                                            <img className="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                                        </div>
                                        <div className="flex flex-col justify-start items-center">
                                            <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">DPD Delivery<br /><span className="font-normal">Delivery with 24 Hours</span></p>
                                        </div>
                                    </div>
                                    <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">$8.00</p>
                                </div>
                                <div className="w-full flex justify-center items-center">
                                    <button className="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">View Carrier Details</button>
                                </div>
                            </div> */}

                            <div
                                className="w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col"
                                sx={{
                                    background: "card",
                                    borderRadius: "13px"
                                }}
                            >
                                <h2 className="text-xl font-semibold leading-5">Customer Information</h2>
                                {isGetUserInfoLoading?<OrderPageUserInfoLoading/>:
                                (!!userInfo) && (typeof userInfo == "object")?<div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                                    <div className="flex flex-col justify-start items-start flex-shrink-0">
                                        <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b">

                                            <UserProfileIcon {...{ className: " h-20 w-20 mr-3 text-inherit" }} />


                                            <div className="flex justify-start items-start flex-col space-y-2">
                                                <p className="text-base  font-semibold leading-4 text-left">David Kent</p>
                                            </div>
                                        </div>

                                        <div className="flex justify-center md:justify-start items-center space-x-4 py-4 border-b w-full">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M3 7L12 13L21 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <p className="cursor-pointer text-sm leading-5 ">david89@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                                        <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                                            <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                                <p className="text-base font-semibold leading-4 text-center md:text-left">Shipping Address</p>
                                                <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5">180 North King Street, Northhampton MA 1060</p>
                                            </div>
                                            <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                                                <p className="text-basefont-semibold leading-4 text-center md:text-left">Billing Address</p>
                                                <p className="w-48 lg:w-fullxl:w-48 text-center md:text-left text-sm leading-5">180 North King Street, Northhampton MA 1060</p>
                                            </div>
                                        </div>
                                        <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                                         <Table TableConfiguration={TableConfiguration} data={!!(userorders) && Array.isArray(userorders) && userorders.length > 0 ?userorders:[]} tableLoading={isGetUserOrderLoading} />
                                        </div>
                                    </div>
                                </div>:<OrderPageUserInfoLoading/>}
                            </div>
                            
                        </div>
                    </div>

                </div> :
                    <div>

                        Error on Feching Order
                    </div>
            }
        </div>
    )



}