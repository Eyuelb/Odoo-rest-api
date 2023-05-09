import { productapi} from "@services";
export const getAllProductService = async (page, size,keyword) => {
  //console.log("getAllProductService")
  //console.log(keyword)
   let productName = (keyword != null && keyword != '')? `&name=${encodeURIComponent(keyword)}` : ''
  // let listprice = category ? `&listprice=${encodeURIComponent(10)}` : ''
  // let productBrand = brand ? `&productBrand=${encodeURIComponent(brand)}` : ''
  // let productPrice = price ? `&startPrice=${encodeURIComponent(price[0])}&endPrice=${encodeURIComponent(price[1])}` : ''
 // console.log(productName)

  try{
    const response = await productapi.get(`/getall?page=${encodeURIComponent(page)}&size=${encodeURIComponent(size)}`+productName)
    return response
  }
  catch(error){
    return error.response;
  }
};

export const getOneProductService = async (id) => {

  try{
    const response = await productapi.get(`/findById?id=${encodeURIComponent(id)}`)
    return response
  }
  catch(error){
    return error.response;
  }
};
export const searchProductService = async (page,size,keyword) => {
    try{
      const response = await productapi.get(`/getall?page=${encodeURIComponent(page)}&size=${encodeURIComponent(size)}&name=${encodeURIComponent(keyword)}`)
      return response
    }
    catch(error){
      return error;
    }
};
export const getMostSoldProductService = async (page, size) => {

   try{
    const response = await productapi.get(`/getall?page=${encodeURIComponent(page)}&size=${encodeURIComponent(size)}`)
    return response
  }
  catch(error){
    return error.response;
  }
};

export const changeProductVisibilityService = async (id) => {
  try{
    const response = await productapi.put(`/visibility?id=${encodeURIComponent(id)}`)
    return response
  }
  catch(error){
    return error.response;
  }

 };