import { create } from 'zustand';
import {produce} from "immer";
import { getAllProductService} from "@services";
export const productMangerState = create(
  (set,get) => ({
    getAllProductloading: false,
    allProducts: [],
    getAllProductSuccess: false,
    getAllProductSuccessMessage: "",
    getAllProductError: false,
    getAllProductErrorMessage: "",
    getAllProductRequest: async (currentPage, itemsPerPage,keyword) => {
      set(produce((draft) => {
        draft.getAllProductloading = true;
      }));

      try {
        const response = await getAllProductService(currentPage, itemsPerPage,keyword);
        set(produce((draft) => {
          draft.getAllProductloading = false;
          draft.allProducts = response.data.products;
          draft.getAllProductSuccessMessage = "Success";
          draft.getAllProductSuccess = true;
        }));
      } catch (error) {
        console.log(error);
        set(produce((draft) => {
          draft.getAllProductloading = false;
          draft.getAllProductErrorMessage = error.response.data.message || error.response.data;
          draft.getAllProductError = true;
        }));
      }
    },


  }),
);


export const useAllProducts = () => productMangerState((state) => state.allProducts);
export const useGetAllProductloading = () => productMangerState((state) => state.getAllProductloading);
export const useGetAllProductSuccess = () => productMangerState((state) => state.getAllProductSuccess);
export const useGetAllProductSuccessMessage = () => productMangerState((state) => state.getAllProductSuccessMessage);
export const useGetAllProductError = () => productMangerState((state) => state.getAllProductError);
export const useGetAllProductErrorMessage = () => productMangerState((state) => state.getAllProductErrorMessage);


//functions - action

export const useGetAllProductRequest = () => productMangerState((state) => state.getAllProductRequest);
