/** @jsxImportSource theme-ui */



export const OrderedProductTable = ({ singleorder}) => {

   // console.log(singleorder)

    return (
        <div
            className="flex items-center space-x-4 mb-6 p-3 font-bold"
            sx={{
                borderBottom: "solid 1px"
            }}
        >
            
            <img className="w-24" src="/images/Che_Logo_html.png" alt="product image" />
            <div className="flex-grow">
                <h3 className="text-lg ">{singleorder.productName}</h3>
                <div className="flex justify-between items-center">
                    <p className="">${singleorder.productPrice}</p>
                    <p className="">Qty: {singleorder.quantity}</p>
                    <p className="">Total: ${singleorder.totalPrice}</p>
                </div>
            </div>
        </div>
    )

} 