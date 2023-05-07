import React,{useEffect,useState} from 'react';
import { create } from 'zustand';
import {produce} from "immer";
import { getAllOrdersService,getOneOrderService,getOrderByUserIdService,getUserInfofindByIdService } from "@services";

export const orderManagerStore = create((set, get) => ({
  orders: '',
  singleorder: [],
  orderContainer:[],
  totalItems:0,
  totalPages:0,
  getAllOrdersSuccessMessage: "",
  getAllOrdersSuccess: false,
  getAllOrdersErrorMessage: "",
  getAllOrdersError: false,
  getOneOrderSuccessMessage: "",
  getOneOrderSuccess: false,
  getOneOrderErrorMessage: "",
  getOneOrderError: false,
  userorder: [],
  getUserOrderSuccessMessage: "",
  getUserOrderSuccess: false,
  getUserOrderErrorMessage: "",
  getUserOrderError: false,
  userInfo: [],
  getUserInfoSuccessMessage: "",
  getUserInforSuccess: false,
  getUserInfoErrorMessage: "",
  getUserInfoError: false,
  isGetAllOrderLoading: false,
  isGetOneOrderLoading: false,
  isGetUserOrderLoading: false,
  isGetUserInfoLoading: false,
  getAllOrdersRequest: async () => {
    set(
      produce((draft) => {
        draft.isGetAllOrderLoading = true;
      })
    );
    try {
        const response = await getAllOrdersService();
        set(
          produce((draft) => {
            draft.isGetAllOrderLoading = false;
            draft.orders = response.data;
            draft.getAllOrdersSuccessMessage = "Orders fetched successfully.";
            draft.getAllOrdersSuccess = true;
          })
        );
    //   // Check if the orders list has already been fetched for this page

    //   const orderIndex = get().orderContainer.findIndex((order) => order.ordersId === page);
    //   if (orderIndex !== -1 && keyword == '') {
    //     // Orders list already exists, use it
    //     set(
    //       produce((draft) => {
    //         draft.isGetAllOrderLoading = false;
    //         draft.orders = get().orderContainer[orderIndex].ordersList;
    //         draft.getAllOrdersSuccessMessage = "Orders fetched successfully.";
    //         draft.getAllOrdersSuccess = true;
    //       })
    //     );
    //   } else {
    //     // Orders list does not exist, fetch it from API
    //     console.log(keyword)
    //     const response = await getAllOrdersService(page, size,keyword);
    //     set(
    //       produce((draft) => {
    //         draft.isGetAllOrderLoading = false;
    //         draft.orders = response.data.orders;
    //         draft.totalItems = response.data.totalItems;
    //         draft.totalPages = response.data.totalPages;
    //         draft.getAllOrdersSuccessMessage = "Orders fetched successfully.";
    //         draft.getAllOrdersSuccess = true;
    //       })
    //     );
    //     // Add the fetched orders list to the order container
    //     set(
    //       produce((draft) => {
    //         draft.orderContainer.push({
    //           ordersId: page,
    //           ordersList: response.data.orders
    //         });
    //       })
    //     );
    //   }
    } catch (error) {
      console.log(error);
      set(
        produce((draft) => {
          draft.isGetAllOrderLoading = false;
          draft.isGetAllOrderLoading = false;
          draft.getAllOrdersErrorMessage = "Failed to fetch orders.";
          draft.getAllOrdersError = true;
        })
      );
    }
  },
  getOneOrdersRequest: async (id) => {
    set(produce((draft) => {
      draft.isGetOneOrderLoading = true;
      draft.isGetUserOrderLoading = true;
      draft.isGetUserInfoLoading = true;
    }));
    try {
      const response = await getOneOrderService(id);
      set(produce((draft) => {
        draft.isGetOneOrderLoading = false;
        draft.singleorder = response.data;
        draft.getOneOrderSuccessMessage = "Order feched successfully.";
        draft.getOneOrderSuccess = true;
      }));
      const response2 = await getUserInfofindByIdService(response.data.userId);
      set(produce((draft) => {
        draft.isGetUserInfoLoading = false;
        draft.userInfo = response2.data;
        draft.getUserInfoSuccessMessage = "Orderd user info successfully fetched";
        draft.getUserInforSuccess = true;
      }));

      const response3 = await getOrderByUserIdService(response.data.userId);
      set(produce((draft) => {
        draft.isGetUserOrderLoading = false;
        draft.userorders = response3.data;
        draft.getUserOrderSuccessMessage = "Order feched successfully.";
        draft.getUserOrderSuccess = true;
      }));

    } catch (error) {
      console.log(error);
      set(produce((draft) => {
        draft.isGetOneOrderLoading = false;
        draft.getOneOrderErrorMessage = "Failed to feched order.";
        draft.getOneOrderError = true;
        draft.isGetUserInfoLoading = false;
        draft.getUserInfoErrorMessage = "Failed to feched orderd user info.";
        draft.getUserInfoError = true;
        draft.isGetUserOrderLoading = false;
        draft.getUserOrderErrorMessage = "Failed to feched order.";
        draft.getUserOrderError = true;
      }));
    }
  },
  getUserOrdersRequest: async (id) => {
    set(produce((draft) => {
      draft.isGetOneOrderLoading = true;
    }));
    try {
      const response = await getOrderByUserIdService(id);
      set(produce((draft) => {
        draft.isGetUserOrderLoading = false;
        draft.userorders = response.data;
        draft.getUserOrderSuccessMessage = "Order feched successfully.";
        draft.getUserOrderSuccess = true;
      }));
    } catch (error) {
      console.log(error);
      set(produce((draft) => {
        draft.isGetUserOrderLoading = false;
        draft.getUserOrderErrorMessage = "Failed to feched order.";
        draft.getUserOrderError = true;
      }));
    }
  },
  orderManagerStateCleaner: () => {
    set(produce((draft) => {
      draft.getAllOrdersSuccessMessage = "";
      draft.getAllOrdersSuccess = false;
      draft.getAllOrdersErrorMessage = "";
      draft.getAllOrdersError = false;
      draft.getOneOrderSuccessMessage = "";
      draft.getOneOrderSuccess = false;
      draft.getOneOrderErrorMessage = "";
      draft.getOneOrderError = false;
      draft.isGetAllOrderLoading = false;
      draft.isGetOneOrderLoading = false;

    }))
  },
})) 



// Custom hook to access the orders state
export const useOrders = () => {
  const orders = orderManagerStore((state) => state.orders);
  const isGetAllOrderLoading = orderManagerStore((state) => state.isGetAllOrderLoading);
  const getAllOrdersRequest = orderManagerStore(
    (state) => state.getAllOrdersRequest
  );


  useEffect(() => {
    getAllOrdersRequest();   

  }, [getAllOrdersRequest]);

  return { orders,isGetAllOrderLoading };
};

// Custom hook to access the singleorder state
export const useSingleOrder = (id) => {
  const getOneOrdersRequest = orderManagerStore(state => state.getOneOrdersRequest);
  const singleorder = orderManagerStore(state => state.singleorder);
  const isGetOneOrderLoading = orderManagerStore((state) => state.isGetOneOrderLoading);
  const userInfo = orderManagerStore(state => state.userInfo);
  const isGetUserInfoLoading = orderManagerStore((state) => state.isGetUserInfoLoading);
  const userorders = orderManagerStore(state => state.userorders);
  const isGetUserOrderLoading = orderManagerStore((state) => state.isGetUserOrderLoading);
  useEffect(() => {
    getOneOrdersRequest(id);
    return () => {}
  }, []);
  //console.log(userInfo)
  return {
    singleorder,
    isGetOneOrderLoading,
    userInfo,
    isGetUserInfoLoading,
    userorders,
    isGetUserOrderLoading
  };
}
// export const useUserOrders = (id) => {
//   const userorders = orderManagerStore(state => state.userorders);
//   const getUserOrdersRequest = orderManagerStore(state => state.getUserOrdersRequest);
//   const isGetUserOrderLoading = orderManagerStore((state) => state.isGetUserOrderLoading);

//   useEffect(() => {
//     getUserOrdersRequest(id);
//     return () => {}
//   }, []);

//   return {userorders,isGetUserOrderLoading};
// }