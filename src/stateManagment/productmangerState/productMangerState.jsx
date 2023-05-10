import React,{useEffect,useState} from 'react';
import { toast } from 'react-toastify'; // then this
import { create } from 'zustand';
import {produce} from "immer";
import { getAllProductService,getOneProductService,changeProductVisibilityService } from "@services";

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
  changeProductvisibilitySuccessMessage: "",
  changeProductvisibilitySuccess: false,
  changeProductvisibilityErrorMessage: "",
  changeProductvisibilityError: false,
  isGetAllProductLoading: false,
  isGetOneProductLoading: false,
  isChangeProductvisibilityLoading: false,
  refresh:false,
  getAllProductsRequest: async (page, size,keyword,refresh) => {
    //console.log(keyword)
    set(
      produce((draft) => {
        draft.isGetAllProductLoading = true;
      })
    );
    try {
      // Check if the products list has already been fetched for this page

      const productIndex = get().productContainer.findIndex((product) => product.productsId === page);
      if (productIndex !== -1 && keyword == '' && refresh == false) {
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
       // console.log(keyword)
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
      //console.log(error);
      set(
        produce((draft) => {
          draft.isGetAllProductLoading = false;
          draft.isGetAllProductLoading = false;
          draft.getAllProductErrorMessage = "Failed to fetch products.";
          draft.getAllProductError = true;
        })
      );
    }
   // console.log(get().productContainer)
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
      //console.log(error);
      set(produce((draft) => {
        draft.isGetOneProductLoading = false;
        draft.getOneProductErrorMessage = "Failed to feched product.";
        draft.getOneProductError = true;
      }));
    }
  },
  changeProductVisibilityRequest: async (id) => {
    set(produce((draft) => {
      draft.isChangeProductvisibilityLoading = true;
    }));
    try {
      const response = await changeProductVisibilityService(id);
      set(produce((draft) => {
        draft.isChangeProductvisibilityLoading = false;
        draft.changeProductvisibilitySuccessMessage = "Product visibility changed successfully.";
        draft.changeProductvisibilitySuccess = true;
        draft.refresh = true;
      }));
    } catch (error) {
      //console.log(error);
      set(produce((draft) => {
        draft.isChangeProductvisibilityLoading = false;
        draft.changeProductvisibilityErrorMessage = "Failed to change product visibility.";
        draft.changeProductvisibilityError = true;
      }));
    }
  },
  productManagerStateCleaner: () => {
    set(produce((draft) => {
      draft.getAllProductSuccess = false;
      draft.getAllProductErrorMessage = "";
      draft.getAllProductError = false;
      draft.getOneProductSuccessMessage = "";
      draft.getOneProductSuccess = false;
      draft.getOneProductErrorMessage = "";
      draft.getOneProductError = false;
      draft.changeProductvisibilitySuccessMessage = "";
      draft.changeProductvisibilitySuccess = false;
      draft.changeProductvisibilityErrorMessage = "";
      draft.changeProductvisibilityError = false;
      draft.isGetAllProductLoading = false;
      draft.isGetOneProductLoading = false;
      draft.isChangeProductvisibilityLoading = false;
      draft.refresh = false;
    }))
  },
})) 



// Custom hook to access the products state
export const useProducts = (page, size, keyword) => {
  const products = productManagerStore((state) => state.products);
  const totalPages = productManagerStore((state) => state.totalPages);
  const totalItems = productManagerStore((state) => state.totalItems);
  const isGetAllProductLoading = productManagerStore((state) => state.isGetAllProductLoading);
  const refresh = productManagerStore((state) => state.refresh);
  const getAllProductsRequest = productManagerStore((state) => state.getAllProductsRequest);
  const productManagerStateCleaner = productManagerStore((state) => state.productManagerStateCleaner);
  useEffect(() => {
    if (keyword !== '') {
      productManagerStore.setState((state) => ({
        ...state,
        products: []
      }));
    }

    if (refresh) {
      productManagerStateCleaner();
    }
    getAllProductsRequest(page, size, keyword,refresh);

  }, [page, size, keyword, refresh]);



  return { products, totalPages, totalItems, isGetAllProductLoading };
};


// Custom hook to access the singleproduct state
export const useSingleProduct = (id) => {
  const singleproduct = productManagerStore(state => state.singleproduct);
  const getOneProductsRequest = productManagerStore(state => state.getOneProductsRequest);

  useEffect(() => {
    getOneProductsRequest(id);
    return () => {}
  }, []);

  return singleproduct;
}


export const useChangeProductVisibilityRequest = () => {

  const changeProductVisibilityRequest = productManagerStore(state => state.changeProductVisibilityRequest);
  const changeProductvisibilitySuccess = productManagerStore((state) => state.changeProductvisibilitySuccess);
  const changeProductvisibilitySuccessMessage = productManagerStore((state) => state.changeProductvisibilitySuccessMessage);
  const changeProductvisibilityError = productManagerStore((state) => state.changeProductvisibilityError);
  const changeProductvisibilityErrorMessage = productManagerStore((state) => state.changeProductvisibilityErrorMessage);
  const productManagerStateCleaner = productManagerStore((state) => state.productManagerStateCleaner);

  useEffect(() => {

    if (changeProductvisibilitySuccess) {
			toast.success(changeProductvisibilitySuccessMessage, {
				// Set to 5sec
				position: toast.POSITION.BOTTOM_RIGHT, autoClose: 5000
			})
      productManagerStateCleaner()
		}
    if (changeProductvisibilityError) {
			toast.error(changeProductvisibilityErrorMessage, {
				// Set to 5sec
				position: toast.POSITION.BOTTOM_RIGHT, autoClose: 5000
			})
      productManagerStateCleaner()
		}

    return () => {

    }

  }, [changeProductvisibilitySuccess,changeProductvisibilityError]);
  return changeProductVisibilityRequest;

}