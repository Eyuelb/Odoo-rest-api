/** @jsxImportSource theme-ui */

import { CaduceusStaffIcon, UserProfileIcon } from '@components';


export const PageLoading = () => {
    return (
        <div className="flex flex-col justify-center items-center "
            sx={{
                height: "88vh"
            }}>
            <div className="flex flex-col items-center mb-8">
                <div  >
                    <CaduceusStaffIcon {...{ className: "animate-pulse h-40 w-30 mr-3 text-inherit" }} />

                </div>
                <h2 className="font-bold">Loading..</h2>
            </div>
        </div>
    );
}
export const SingleProductLoadingSkeleton = () => {
    return (
        <div className="flex flex-col animate-pulse">
            <div
                sx={{
                    borderRadius: '13px',
                    boxShadow: t => `0px 1px 11px 0px ${t.colors.text}`,
                }}>
                <div>
                    <div className="relative w-full lg:mb-0 mb-3">
                        <div className="absolute flex flex-col top-0 right-0 p-3">
                            <button className="transition ease-in duration-300 rounded-full flex flex-row space-x-4 animate-pulse" disabled>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div className='w-full h-full flex flex-row space-x-4  p-1'>
                            <div
                                sx={{
                                    width: "100%",
                                    height: "120px",
                                    borderRadius: '13px',
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
                                    height: "35px",
                                    borderRadius: '13px',
                                }}
                                className="flex items-center p-1 justify-between min-w-0 rounded-md">
                                <div

                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    className="h-full w-full bg-gray-200 rounded-md"></div>
                            </div>
                        </div>
                        <div className="flex flex-wrap ">
                            <div
                                sx={{
                                    width: "100%",
                                    height: "35px",
                                    borderRadius: '13px',
                                }}
                                className="flex items-center w-full h-14 p-1 justify-between min-w-0 rounded-md">
                                <div
                                    sx={{
                                        width: "100%",
                                        height: "100%",
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
export const CartSingleProductLoadingSkeleton = () => {
    return (
        <div className="flex flex-col animate-pulse">
            <div
                sx={{
                    borderRadius: '13px',
                    boxShadow: t => `0px 1px 11px 0px ${t.colors.text}`,
                }}>
                <div>
                    <div className="relative w-full lg:mb-0 mb-3">
                        <div className="absolute flex flex-col top-0 right-0 p-3">
                            <button className="transition ease-in duration-300 rounded-full flex flex-row space-x-4 animate-pulse" disabled>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div className='w-full h-full flex flex-row space-x-4  p-1'>
                            <div
                                sx={{
                                    width: "100%",
                                    height: "120px",
                                    borderRadius: '13px',
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
                                    height: "35px",
                                    borderRadius: '13px',
                                }}
                                className="flex items-center p-1 justify-between min-w-0 rounded-md">
                                <div

                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    className="h-full w-full bg-gray-200 rounded-md"></div>
                            </div>
                        </div>
                        <div className="flex flex-wrap ">
                            <div
                                sx={{
                                    width: "100%",
                                    height: "35px",
                                    borderRadius: '13px',
                                }}
                                className="flex items-center w-full h-14 p-1 justify-between min-w-0 rounded-md">
                                <div
                                    sx={{
                                        width: "100%",
                                        height: "100%",
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
export const OrderPageUserInfoLoading = () => {
    return (
        <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 animate-pulse">
            <div className="flex  md:w-48 lg:w-52 flex-col justify-start items-start flex-shrink-0">
                <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b">

                    <UserProfileIcon {...{ className: " h-20 w-20 mr-3 text-inherit" }} />


                    <div className="flex  justify-end items-end flex-col space-y-2 bg-gray-300 rounded-2xl "
                        sx={{
                            width: "100%",
                            height: "40px",
                            borderRadius: '7px',
                            padding: "6px 5px"
                        }}
                    >

                        <p className="text-base  font-semibold leading-4 text-left bg-gray-400"
                            sx={{
                                width: "60%",
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
                    </div>
                </div>

                <div className="flex justify-center md:justify-start items-center space-x-5 py-4 border-b w-full">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 7L12 13L21 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex justify-end items-end flex-col space-y-2 bg-gray-200 rounded-2xl "
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
                    </div>
                </div>
            </div>
            <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                    <div className="flex w-64 justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                        <div className="flex justify-end items-end flex-col space-y-2 bg-gray-300 rounded-2xl "
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
                        </div>
                        <div className="flex justify-end items-end flex-col space-y-2 bg-gray-00 rounded-2xl"
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
                        </div>

                    </div>
                    <div className="flex w-64 justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                        <div className="flex justify-end items-end flex-col space-y-2 bg-gray-300 rounded-2xl "
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
                        </div>
                        <div className="flex justify-end items-end flex-col space-y-2 bg-gray-300 rounded-2xl"
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
                        </div>
                    </div>
                </div>
                <div className="flex w-full p-6 mt-5 justify-center items-center md:justify-start md:items-start bg-gray-300 rounded-2xl ">
                    <div className="flex w-full h-full justify-end items-end flex-col space-y-2  rounded-2xl "
                        sx={{
                            borderRadius: '7px',
                            padding: "6px 5px",
                           
                        }}
                    >

                        <p className="text-base  font-semibold leading-4 text-left bg-gray-400"
                            sx={{
                                width: "100%",
                                height: "20px",
                                borderRadius: '13px',
                            }}
                        ></p>
                        <p className="text-base  font-semibold leading-4 text-left bg-gray-400"
                            sx={{
                                width: "100%",
                                height: "20px",
                                borderRadius: '13px',
                            }}
                        ></p>
                                                <p className="text-base  font-semibold leading-4 text-left bg-gray-400"
                            sx={{
                                width: "100%",
                                height: "20px",
                                borderRadius: '13px',
                            }}
                        ></p>
                        <p className="text-base  font-semibold leading-4 text-left bg-gray-400"
                            sx={{
                                width: "100%",
                                height: "20px",
                                borderRadius: '13px',
                            }}
                        ></p>
                    </div>
                    <div className="flex w-full h-full justify-end items-end flex-col space-y-2  rounded-2xl "
                        sx={{
                            borderRadius: '7px',
                            padding: "6px 5px",
                           
                        }}
                    >

                        <p className="text-base  font-semibold leading-4 text-left bg-gray-400"
                            sx={{
                                width: "100%",
                                height: "20px",
                                borderRadius: '13px',
                            }}
                        ></p>
                        <p className="text-base  font-semibold leading-4 text-left bg-gray-400"
                            sx={{
                                width: "100%",
                                height: "20px",
                                borderRadius: '13px',
                            }}
                        ></p>
                                                <p className="text-base  font-semibold leading-4 text-left bg-gray-400"
                            sx={{
                                width: "100%",
                                height: "20px",
                                borderRadius: '13px',
                            }}
                        ></p>
                        <p className="text-base  font-semibold leading-4 text-left bg-gray-400"
                            sx={{
                                width: "100%",
                                height: "20px",
                                borderRadius: '13px',
                            }}
                        ></p>
                    </div>
                    <div className="flex w-full h-full justify-end items-end flex-col space-y-2  rounded-2xl "
                        sx={{
                            borderRadius: '7px',
                            padding: "6px 5px",
                            
                        }}
                    >

                        <p className="text-base  font-semibold leading-4 text-left bg-gray-400"
                            sx={{
                                width: "100%",
                                height: "20px",
                                borderRadius: '13px',
                            }}
                        ></p>
                        <p className="text-base  font-semibold leading-4 text-left bg-gray-400"
                            sx={{
                                width: "100%",
                                height: "20px",
                                borderRadius: '13px',
                            }}
                        ></p>
                                                <p className="text-base  font-semibold leading-4 text-left bg-gray-400"
                            sx={{
                                width: "100%",
                                height: "20px",
                                borderRadius: '13px',
                            }}
                        ></p>
                        <p className="text-base  font-semibold leading-4 text-left bg-gray-400"
                            sx={{
                                width: "100%",
                                height: "20px",
                                borderRadius: '13px',
                            }}
                        ></p>
                    </div>
                    <div className="flex w-full h-full justify-end items-end flex-col space-y-2  rounded-2xl "
                        sx={{
                            borderRadius: '7px',
                            padding: "6px 5px",
                         
                        }}
                    >

                        <p className="text-base  font-semibold leading-4 text-left bg-gray-400"
                            sx={{
                                width: "100%",
                                height: "20px",
                                borderRadius: '13px',
                            }}
                        ></p>
                        <p className="text-base  font-semibold leading-4 text-left bg-gray-400"
                            sx={{
                                width: "100%",
                                height: "20px",
                                borderRadius: '13px',
                            }}
                        ></p>
                        <p className="text-base  font-semibold leading-4 text-left bg-gray-400"
                            sx={{
                                width: "100%",
                                height: "20px",
                                borderRadius: '13px',
                            }}
                        ></p>
                        <p className="text-base  font-semibold leading-4 text-left bg-gray-400"
                            sx={{
                                width: "100%",
                                height: "20px",
                                borderRadius: '13px',
                            }}
                        ></p>
                    </div>
                </div>
            </div>
        </div>
    );
}