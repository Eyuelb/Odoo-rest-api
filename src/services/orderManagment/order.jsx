import { orderapi} from "@services";
export const getAllOrdersService = async () => {
  try{
    const response = await orderapi.get(`/listAll`)
    return response
  }
  catch(error){
    return error.response;
  }

};

export const getOneOrderService = async (id) => {
  try{
    const response = await orderapi.get(`/findById?id=${encodeURIComponent(id)}`)
    return response
  }
  catch(error){
    return error.response;
  }

};
export const getOrderByUserIdService = async (id) => {
  try{
    const response = await orderapi.get(`/findByuserId?userId=${encodeURIComponent(id)}`)
    return response
  }
  catch(error){
    return error.response;
  }

};
export const searchOrderService = async (page,size,keyword) => {
  return await orderapi
    .get(`/getall?page=${encodeURIComponent(page)}&size=${encodeURIComponent(size)}&name=${encodeURIComponent(keyword)}`)
    .then((response) => {
      //   console.log(response.data)
      return { data: response.data, status: response.status }
    }).catch((error) => {
      //  console.log(error.response)
      return { data: error.response.data, status: error.response.status };
    })


};


export const updateOrderStatusService = async (orderId,status) => {
  try{
    const response = await orderapi.put(`/statusupdate`, {
      orderId: orderId,
      status: status,
    })
    return response
  }
  catch(error){
    return error.response;
  }
};