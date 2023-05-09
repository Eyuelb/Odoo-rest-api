/** @jsxImportSource theme-ui */

export const OrderedProductTable = ({ singleorder,useSingleProduct }) => {

    const singleproduct = useSingleProduct(singleorder.productId)
    return (
        <>
            <td className="px-4 py-2"
                sx={{
                    '@media screen and (max-width: 1020px)': {
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems:"center",

                    },
                }}>
                <div className="md:hidden font-bold mr-3" sx={{
                    '@media screen and (min-width: 1020px)': {
                        display: "none",
                    },
                }}>
                    Image
                </div>
                <div>
                    <img className="w-24" src="/images/Che_Logo_html.png" alt="product image" />
                </div>

            </td>
            <td className="px-4 py-2"
                sx={{
                    '@media screen and (max-width: 1020px)': {
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",

                    },
                }}>
                <div className="md:hidden font-bold mr-3" sx={{
                    '@media screen and (min-width: 1020px)': {
                        display: "none",
                    },
                }}>
                    Name
                </div>
                {singleorder.productName}
            </td>
            <td className="px-4 py-2"
                sx={{
                    '@media screen and (max-width: 1020px)': {
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",

                    },
                }}>
                <div className="md:hidden font-bold mr-3" sx={{
                    '@media screen and (min-width: 1020px)': {
                        display: "none",
                    },
                }}>
                    Price
                </div>
                <div>
                    ${singleorder.productPrice}
                </div>

            </td>
            <td className="px-4 py-2"
                sx={{
                    '@media screen and (max-width: 1020px)': {
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",

                    },
                }}>
                <div className="md:hidden font-bold mr-3" sx={{
                    '@media screen and (min-width: 1020px)': {
                        display: "none",
                    },
                }}>
                    Quantity
                </div>
                <div>
                    {singleorder.quantity}
                </div>

            </td>

            <td className="px-4 py-2"
                sx={{
                    '@media screen and (max-width: 1020px)': {
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",

                    },
                }}>
                <div className="md:hidden font-bold mr-3" sx={{
                    '@media screen and (min-width: 1020px)': {
                        display: "none",
                    },
                }}>
                    Total Price
                </div>
                ${singleorder.totalPrice}
            </td>
            <td className="px-4 py-2"
                sx={{
                    '@media screen and (max-width: 1020px)': {
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",

                    },
                }}>
                <div className="md:hidden font-bold mr-3" sx={{
                    '@media screen and (min-width: 1020px)': {
                        display: "none",
                    },
                }}>
                    Availability
                </div>
                
                {(!!singleproduct) && (typeof singleproduct == "object") && !Array.isArray(singleproduct)?
                (singleproduct.qtyAvailable) == 0 ?
                <div className="p-5 flex items-center">
                    <p
                    sx={{
                        width:"100px",
                        padding:"1px",
                        borderRadius: "4px",
                        background: "rgb(255 87 26)",
                        color: "#fff",
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center"

                    }}
                    >
                        Not Availble
                    </p>
                </div>
                :
                <div className="p-5 flex items-center">
                <p
                sx={{
                    width:"100px",
                    padding:"1px",
                    borderRadius: "4px",
                    background: "rgb(0 190 84)",
                    color: "#fff",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center"

                }}
                >
                  Available
                </p>
            </div>
                :
                <div className="flex justify-end items-end flex-col space-y-2 bg-gray-200 rounded-2xl animate-pulse"
                    sx={{
                        width: "100%",
                        height: "40px",
                        borderRadius: '7px',
                        padding: "6px 5px"
                    }}
                >

                    <p className="text-base  font-semibold leading-4 text-left bg-gray-400"
                        sx={{
                            width: "65%",
                            height: "10px",
                            borderRadius: '13px',
                        }}
                    ></p>
                    <p className="text-base  font-semibold leading-4 text-left bg-gray-400"
                        sx={{
                            width: "50%",
                            height: "10px",
                            borderRadius: '13px',
                        }}
                    ></p>
                </div>}
            </td>
        </>
    );
};
