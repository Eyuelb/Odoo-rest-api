import React,{useEffect,useState} from 'react';
import { create } from 'zustand';
import {produce} from "immer";
import { getAllProductService,getOneProductService } from "@services";

export const productManagerStore = create((set, get) => ({
  products: [],
  singleproduct: [],
  productContainer:[],
  totalItems:0,
  totalPages:0,
  getAllProductSuccessMessage: "",
  getAllProductSuccess: false,
  getAllProductErrorMessage: "",
  getAllProductError: false,
  getOneProductSuccessMessage: "",
  getOneProductSuccess: false,
  getOneProductErrorMessage: "",
  getOneProductError: false,
  isGetAllProductLoading: false,
  isGetOneProductLoading: false,
  getAllProductsRequest: async (page, size,keyword) => {
    console.log(keyword)
    set(
      produce((draft) => {
        draft.isGetAllProductLoading = true;
      })
    );
    try {
      // Check if the products list has already been fetched for this page

      const productIndex = get().productContainer.findIndex((product) => product.productsId === page);
      if (productIndex !== -1 && keyword == '') {
        // Products list already exists, use it
        set(
          produce((draft) => {
            draft.isGetAllProductLoading = false;
            draft.products = get().productContainer[productIndex].productsList;
            draft.getAllProductSuccessMessage = "Products fetched successfully.";
            draft.getAllProductSuccess = true;
          })
        );
      } else {
        // Products list does not exist, fetch it from API
        console.log(keyword)
        const response = await getAllProductService(page, size,keyword);
        set(
          produce((draft) => {
            draft.isGetAllProductLoading = false;
            draft.products = response.data.products;
            draft.totalItems = response.data.totalItems;
            draft.totalPages = response.data.totalPages;
            draft.getAllProductSuccessMessage = "Products fetched successfully.";
            draft.getAllProductSuccess = true;
          })
        );
        // Add the fetched products list to the product container
        set(
          produce((draft) => {
            draft.productContainer.push({
              productsId: page,
              productsList: response.data.products
            });
          })
        );
      }
    } catch (error) {
      console.log(error);
      set(
        produce((draft) => {
          draft.isGetAllProductLoading = false;
          draft.isGetAllProductLoading = false;
          draft.getAllProductErrorMessage = "Failed to fetch products.";
          draft.getAllProductError = true;
        })
      );
    }
    console.log(get().productContainer)
  },
  getOneProductsRequest: async (id) => {
    set(produce((draft) => {
      draft.isGetOneProductLoading = true;
    }));
    try {
      const response = await getOneProductService(id);
      set(produce((draft) => {
        draft.isGetOneProductLoading = false;
        draft.singleproduct = response.data;
        draft.getOneProductSuccessMessage = "Product feched successfully.";
        draft.getOneProductSuccess = true;
      }));
    } catch (error) {
      console.log(error);
      set(produce((draft) => {
        draft.isGetOneProductLoading = false;
        draft.getOneProductErrorMessage = "Failed to feched product.";
        draft.getOneProductError = true;
      }));
    }
  },
  productManagerStateCleaner: () => {
    set(produce((draft) => {
      draft.getAllProductSuccessMessage = "";
      draft.getAllProductSuccess = false;
      draft.getAllProductErrorMessage = "";
      draft.getAllProductError = false;
      draft.getOneProductSuccessMessage = "";
      draft.getOneProductSuccess = false;
      draft.getOneProductErrorMessage = "";
      draft.getOneProductError = false;
      draft.isGetAllProductLoading = false;
      draft.isGetOneProductLoading = false;

    }))
  },
})) 



// Custom hook to access the products state
export const useProducts = (page, size, keyword) => {
  const products = productManagerStore((state) => state.products);
  const totalPages = productManagerStore((state) => state.totalPages);
  const totalItems = productManagerStore((state) => state.totalItems);
  const isGetAllProductLoading = productManagerStore((state) => state.isGetAllProductLoading);
  const getAllProductsRequest = productManagerStore(
    (state) => state.getAllProductsRequest
  );


  useEffect(() => {
    if(keyword != ''){
      productManagerStore.setState((state)=>({
        ...state,
        products : []
      }))
    }
    getAllProductsRequest(page, size,keyword);
   // keyword =! ''&&totalPages > page+1&&getAllProductsRequest(page+1, size);
   

  }, [getAllProductsRequest, page, size,keyword]);

  return { products, totalPages, totalItems ,isGetAllProductLoading };
};

// Custom hook to access the singleproduct state
export const useSingleProduct = (id) => {
  const singleproduct = productManagerStore(state => state.singleproduct);
  const getOneProductsRequest = productManagerStore(state => state.getOneProductsRequest);

  useEffect(() => {
    getOneProductsRequest(id);
  }, [getOneProductsRequest, id]);

  return singleproduct;
}
