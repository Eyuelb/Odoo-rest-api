import React,{useEffect,useState} from 'react';
import { create } from 'zustand';
import {produce} from "immer";
import { 
  getAllOrdersService,
  getOneOrderService,
  getOrderByUserIdService,
  getUserInfofindByIdService,
  updateOrderStatusService 
} from "@services";
import { toast,ToastContainer } from 'react-toastify'; // then this

export const orderManagerStore = create((set, get) => ({
  orders: '',
  orderContainer:[],
  totalItems:0,
  totalPages:0,
  getAllOrdersSuccessMessage: "",
  getAllOrdersSuccess: false,
  getAllOrdersErrorMessage: "",
  getAllOrdersError: false,

  singleorder: [],
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

  updateOrderStatusSuccessMessage: "",
  updateOrderStatusSuccess: false,
  updateOrderStatusErrorMessage: "",
  updateOrderStatusError: false,

  isGetAllOrderLoading: false,
  isGetOneOrderLoading: false,
  isGetUserOrderLoading: false,
  isGetUserInfoLoading: false,
  isUpdateOrderStatusLoading: false,
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
      //console.log(error);
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
      if (response.status !== 200) {
        // return Error('Bad Gateway: Server acting as a gateway received an invalid response');
        set(produce((draft) => {
          draft.isGetOneOrderLoading = false;
          draft.getOneOrderErrorMessage = "Failed to feched order.";
          draft.getOneOrderError = true;
       }));
       }
      set(produce((draft) => {
        draft.isGetOneOrderLoading = false;
        draft.singleorder = response.data;
        draft.getOneOrderSuccessMessage = "Order feched successfully.";
        draft.getOneOrderSuccess = true;
      }));
      const response2 = await getUserInfofindByIdService(response.data.userId);
      if (response2.status !== 200) {
       // return Error('Bad Gateway: Server acting as a gateway received an invalid response');
       set(produce((draft) => {
        draft.isGetUserInfoLoading = false;
        draft.getUserInfoErrorMessage = "Failed to feched orderd user info.";
        draft.getUserInfoError = true;
      }));
      }
      set(produce((draft) => {
        draft.isGetUserInfoLoading = false;
        draft.userInfo = response2.data;
        draft.getUserInfoSuccessMessage = "Orderd user info successfully fetched";
        draft.getUserInforSuccess = true;
      }));

      const response3 = await getOrderByUserIdService(response.data.userId);
      if (response3.status !== 200) {
        // return Error('Bad Gateway: Server acting as a gateway received an invalid response');
        set(produce((draft) => {
         draft.isGetUserOrderLoading = false;
         draft.getUserOrderErrorMessage = "Failed to feched user order.";
         draft.getUserOrderError = true;
       }));
       }
      set(produce((draft) => {
        draft.isGetUserOrderLoading = false;
        draft.userorders = response3.data;
        draft.getUserOrderSuccessMessage = "Order feched successfully.";
        draft.getUserOrderSuccess = true;
      }));

    } catch (error) {
      //console.log(error);
      set(produce((draft) => {
        draft.isGetOneOrderLoading = false;
        draft.getOneOrderErrorMessage = "Failed to feched order.";
        draft.getOneOrderError = true;
        draft.isGetUserInfoLoading = false;
        draft.getUserInfoErrorMessage = "Failed to feched orderd user info.";
        draft.getUserInfoError = true;
        draft.isGetUserOrderLoading = false;
        draft.getUserOrderErrorMessage = "Failed to feched user order.";
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
      //console.log(error);
      set(produce((draft) => {
        draft.isGetUserOrderLoading = false;
        draft.getUserOrderErrorMessage = "Failed to feched order.";
        draft.getUserOrderError = true;
      }));
    }
  },
  updateOrderStatusRequest: async (id,status) => {
    set( ((draft) => {
      draft.isUpdateOrderStatusLoading = true;
    }));
    try {
      const response = await updateOrderStatusService(id,status);
      set(produce((draft) => {
        draft.isUpdateOrderStatusLoading = false;
        draft.userorders = response.data;
        draft.updateOrderStatusSuccessMessage = "Order update successfully.";
        draft.updateOrderStatusSuccess = true;
      }));
    } catch (error) {
      //console.log(error);
      set(produce((draft) => {
        draft.isUpdateOrderStatusLoading = false;
        draft.updateOrderStatusErrorMessage = "Failed to update order.";
        draft.updateOrderStatusError = true;
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
      draft.getUserOrderSuccessMessage = "";
      draft.getUserOrderSuccess = false;
      draft.getUserOrderErrorMessage = "";
      draft.getUserOrderError = false;
      draft.getUserInfoSuccessMessage = "";
      draft.getUserInforSuccess = false;
      draft.getUserInfoErrorMessage = "";
      draft.getUserInfoError = false;
      draft.updateOrderStatusSuccessMessage = "";
      draft.updateOrderStatusSuccess = false;
      draft.updateOrderStatusErrorMessage = "";
      draft.updateOrderStatusError = false;
      draft.isGetAllOrderLoading = false;
      draft.isGetOneOrderLoading = false;
      draft.isGetUserOrderLoading = false;
      draft.isGetUserInfoLoading = false;
      draft.isUpdateOrderStatusLoading = false;

    }))
  //  console.log(get())
  },
})) 



// Custom hook to access the orders state
export const useOrders = () => {
  const orders = orderManagerStore((state) => state.orders);
  const isGetAllOrderLoading = orderManagerStore((state) => state.isGetAllOrderLoading);
  const getAllOrdersRequest = orderManagerStore((state) => state.getAllOrdersRequest)
  const getAllOrdersError = orderManagerStore((state) => state.getAllOrdersError);
  const getAllOrdersErrorMessage = orderManagerStore((state) => state.getAllOrdersErrorMessage);
  const orderManagerStateCleaner = orderManagerStore((state) => state.orderManagerStateCleaner);

  useEffect(() => {
    getAllOrdersRequest();   
  }, []);

  useEffect(() => {
    if (getAllOrdersError) {
			toast.error(getAllOrdersErrorMessage, {
				// Set to 5sec
				position: toast.POSITION.BOTTOM_RIGHT, autoClose: 5000
			})
      orderManagerStateCleaner()
		}

    return () => {

    }

  }, [getAllOrdersError]);

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




  const getOneOrderError = orderManagerStore((state) => state.getOneOrderError);
  const getOneOrderErrorMessage = orderManagerStore((state) => state.getOneOrderErrorMessage);
  const getUserOrderError = orderManagerStore((state) => state.getUserOrderError);
  const getUserOrderErrorMessage = orderManagerStore((state) => state.getUserOrderErrorMessage);
  const getUserInfoError = orderManagerStore((state) => state.getUserInfoError);
  const getUserInfoErrorMessage = orderManagerStore((state) => state.getUserInfoErrorMessage);
  const orderManagerStateCleaner = orderManagerStore((state) => state.orderManagerStateCleaner);


  useEffect(() => {
    getOneOrdersRequest(id);
    return () => {}
  }, []);
  useEffect(() => {
    if (getOneOrderError) {
			toast.error(getOneOrderErrorMessage, {
				// Set to 5sec
				position: toast.POSITION.BOTTOM_RIGHT, autoClose: 5000
			})
      orderManagerStateCleaner()
		}
    if (getUserOrderError) {
			toast.error(getUserOrderErrorMessage, {
				// Set to 5sec
				position: toast.POSITION.BOTTOM_RIGHT, autoClose: 5000
			})
      orderManagerStateCleaner()
		}
    if (getUserInfoError) {
			toast.error(getUserInfoErrorMessage, {
				// Set to 5sec
				position: toast.POSITION.BOTTOM_RIGHT, autoClose: 5000
			})
      orderManagerStateCleaner()
		}
    return () => {

    }

  }, [getOneOrderError,getUserOrderError,getUserInfoError]);
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

export const useUpdateOrderStatus = () => {
  const isUpdateOrderStatusLoading = orderManagerStore((state) => state.isUpdateOrderStatusLoading);
  const updateOrderStatusRequest = orderManagerStore(
    (state) => state.updateOrderStatusRequest
  );


  useEffect(() => {
    updateOrderStatusRequest();   

  }, [updateOrderStatusRequest]);

  return { isUpdateOrderStatusLoading };
};