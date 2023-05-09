/** @jsxImportSource theme-ui */

import { useState, Fragment } from 'react';
import { IconButton, Input } from 'theme-ui';
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import ReactPaginate from 'react-paginate';
import { useProducts, useChangeProductVisibilityRequest } from '@stateManagment';
import { SingleProduct, SingleProductLoadingSkeleton } from "@components"



export const ManageProducts = () => {
    const [pageOffset, setPageOffset] = useState(0);
    const [searchWord, setSearchWord] = useState("");
    const [keyWord, setKeyWord] = useState("");
    const itemsPerPage = 30; // set items per page
    const { products, totalPages, isGetAllProductLoading } = useProducts(pageOffset, itemsPerPage, keyWord);
    const changeProductVisibilityHandler = useChangeProductVisibilityRequest();
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
    return (
        <div className='shadow-lg'
        sx={{
            width: "100%",
            height: "100%",
            background: "card",
            padding:"10px",
            borderRadius: "13px",

            }}>
            <div
                className='flex items-center justify-end'
                sx={{
                    width: "100%",
                    height: "100%",
                    padding:"10px"

                }}
            >
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
                                        <SingleProductLoadingSkeleton />
                                    </div>
                                ))}
                            </Fragment>
                        </div>
                    </div>
                </div>
            ) :
            !!(products) && Array.isArray(products) && products.length > 0 ?
                <div className=" animated fadeIn faster  flex justify-center items-center flex-col py-5">
                    <div className="container z-10">
                        <div className="grid mt-8 gap-3 grid-cols-1 mb:grid-cols-1 tb:grid-cols-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5">
                            {products.map((product, key) =>
                            (
                                <div key={key}>
                                    <SingleProduct key={key} props={product} action={changeProductVisibilityHandler} />
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
                </div>:
                <div className="p-2 w-full "
                    sx={{
                        
                        borderRadius: "13px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent:"center"

                    }}>
                    <div
                        sx={{
                            borderRadius: "13px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent:"center",
                            width:"80%",
                            border:"1px"

                        }}>
                        <p>
                            No products found!
                        </p>
                    </div>


                </div>
            }

        </div>
    )

}