import { productapi} from "@services";
export const getAllProductService = async (page, size,keyword) => {
  console.log("getAllProductService")
  console.log(keyword)
   let productName = (keyword != null && keyword != '')? `&name=${encodeURIComponent(keyword)}` : ''
  // let listprice = category ? `&listprice=${encodeURIComponent(10)}` : ''
  // let productBrand = brand ? `&productBrand=${encodeURIComponent(brand)}` : ''
  // let productPrice = price ? `&startPrice=${encodeURIComponent(price[0])}&endPrice=${encodeURIComponent(price[1])}` : ''
  console.log(productName)
  return await productapi
    .get(`/getall?page=${encodeURIComponent(page)}&size=${encodeURIComponent(size)}`+productName)
    .then((response) => {
      // console.log(response.data)
      return { data: response.data, status: response.status }
    }).catch((error) => {
      console.log(error)
      return error;
    })
};

export const getOneProductService = async (id) => {
  return await productapi
    .get(`/findById?id=${encodeURIComponent(id)}`)
    .then((response) => {
      //   console.log(response.data)
      return { data: response.data, status: response.status }
    }).catch((error) => {
      //  console.log(error.response)
      return { data: error.response.data, status: error.response.status };
    })
};
export const searchProductService = async (page,size,keyword) => {
  return await productapi
    .get(`/getall?page=${encodeURIComponent(page)}&size=${encodeURIComponent(size)}&name=${encodeURIComponent(keyword)}`)
    .then((response) => {
      //   console.log(response.data)
      return { data: response.data, status: response.status }
    }).catch((error) => {
      //  console.log(error.response)
      return { data: error.response.data, status: error.response.status };
    })
};
export const getMostSoldProductService = async (page, size) => {

 return await productapi
   .get(`/getall?page=${encodeURIComponent(page)}&size=${encodeURIComponent(size)}`)
   .then((response) => {
     // console.log(response.data)
     return { data: response.data, status: response.status }
   }).catch((error) => {
     console.log(error.response)
     return error;
   })
};

