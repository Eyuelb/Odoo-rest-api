/** @jsxImportSource theme-ui */




export const SingleProduct = ({ props }) => {

    const { id, name, imageMid, listPrice, productPreviousPrice, productQuantity } = props

    return (
        <div className="flex flex-col ">
            <div
                sx={{
                    borderRadius: '35px',
                    boxShadow: t => `0px 1px 11px 0px ${t.colors.text}`,
                }}>
                <div className="">
                    <div className="relative h-62 w-full lg:mb-0 mb-3">
                        <div className="absolute flex flex-col top-0 right-0 p-3">
                            <button className="transition ease-in duration-300 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div className='w-full h-full flex items-center justify-center'>
                            <img
                                sx={{
                                    width: "50%"
                                }}
                                src="/images/Che_Logo.png"
                                alt="Just a flower"
                                className=" object-fill rounded-2xl"
                            />
                        </div>

                    </div>
                    <div className="flex-auto justify-evenly p-2">
                        <div className="flex flex-wrap ">
                            <div className="w-full flex-none text-sm flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-secondary whitespace-nowrap mr-3">4.60</span>
                            </div>
                            <div className="flex items-center w-full justify-between min-w-0 ">
                                <h2 className="text-lg mr-auto cursor-pointer truncate ">
                                    {name}
                                </h2>

                            </div>
                        </div>
                        <div className="text-xl font-semibold mt-1">${listPrice}</div>

                        <div className="flex p-4 pb-2 border-t"></div>
                        <div className="flex space-x-2 text-sm font-medium justify-center">
                            <button className="transition ease-in duration-300 inline-flex items-centertext-sm font-medium mb-2 md:mb-0 px-5 py-2 hover:shadow-lg tracking-wider rounded-full  "
                                sx={{
                                    bg: "button"
                                }}>
                                <span>Add Cart</span>
                            </button>
                            <button className="transition ease-in duration-300  hover:shadow-lg rounded-full w-9 h-9 text-center p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


// <div key={index} className="border-t border-gray-200 pt-4">
//     <div className="flex flex-row space-x-4 animate-pulse">
//         <div className="w-24 h-24 rounded-md bg-gray-200"></div>
//         <div className="flex flex-col justify-center space-y-2">
//             <div className="h-6 w-40 bg-gray-200 rounded-md"></div>
//             <div className="h-6 w-32 bg-gray-200 rounded-md"></div>
//         </div>
//     </div>
// </div>
export const SingleProductLoadingSkeleton = () => {
    return (
        <div className="flex flex-col animate-pulse">
            <div
                sx={{
                    borderRadius: '35px',
                    boxShadow: t => `0px 1px 11px 0px ${t.colors.text}`,
                }}>
                <div className="">
                    <div className="relative h-62 w-full lg:mb-0 mb-3">
                        <div className="absolute flex flex-col top-0 right-0 p-3">
                            <button className="transition ease-in duration-300 rounded-full flex flex-row space-x-4 animate-pulse" disabled>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div className='w-full h-full flex flex-row space-x-4 animate-pulse p-1'>
                            <div
                                sx={{
                                    width: "100%",
                                    height: "252px",
                                    borderRadius: '35px',
                                }}
                                className="bg-gray-200 rounded-2xl "
                            >
                            </div>
                        </div>

                    </div>
                    <div className="flex-auto justify-evenly p-2">
                        <div className="flex flex-wrap ">
                            <div className="w-full flex-none text-sm flex items-center space-y-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-secondary whitespace-nowrap mr-3"></span>
                            </div>
                            <div
                                sx={{
                                    width: "100%",
                                    height: "70px",
                                    borderRadius: '35px',
                                }}
                                className="flex items-center p-1 justify-between min-w-0 rounded-md">
                                <div

                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: '35px',
                                    }}
                                    className="h-full w-full bg-gray-200 rounded-md"></div>
                            </div>
                        </div>
                        <div className="flex flex-wrap ">
                            <div
                                sx={{
                                    width: "100%",
                                    height: "70px",
                                    borderRadius: '35px',
                                }}
                                className="flex items-center w-full h-14 p-1 justify-between min-w-0 rounded-md">
                                <div
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: '35px',
                                    }}
                                    className="h-full w-full bg-gray-200 rounded-md"></div>
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}
