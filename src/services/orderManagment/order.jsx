import { orderapi} from "@services";
export const getAllOrdersService = async () => {

  return await orderapi
    .get(`/listAll`)
    .then((response) => {
   //   console.log(response.data)
        return {data:response.data,status:response.status}
    }).catch((error) =>{
      //console.log(error.response.status)
      return {data:error.response.data,status:error.response.status};
    })
};

export const getOneOrderService = async (id) => {
  return await orderapi
    .get(`/findById?id=${encodeURIComponent(id)}`)
    .then((response) => {
      //   console.log(response.data)
      return { data: response.data, status: response.status }
    }).catch((error) => {
      //  console.log(error.response)
      return { data: error.response.data, status: error.response.status };
    })
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


