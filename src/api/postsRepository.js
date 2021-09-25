import Repository from './Repository'
const account = "/account"
// const productAll = "/productAll"
const productDetail = "/productDetail"
const rateProduct = '/rateProduct'
export default {
    getAccount(){
        return Repository.get(`${account}`);
    },
    getAccountId(accountId){
        return Repository.get( `${account}/${accountId}`)
    },
    getRateProduct(){
        return Repository.get( `${rateProduct}`)
    },
    createAccount(payload){
        return Repository. post(`${account}`, payload)
    },
    updateAccount(accountId, payload){
        return Repository.put(`${account}/${accountId}`, payload)
    },
    deteleAccount(accountId){
        return Repository.delete(`${account}/${accountId}`)
    },
    getProductDetail(){
        return Repository.get(`${productDetail}`);
    },
    getProductDetailId(productDetailId){
        return Repository.get( `${productDetail}/${productDetailId}`)
    },
    createProductDetail(payload){
        return Repository. post(`${productDetail}`, payload)
    },
    updateProductDetail(productDetailId, payload){
        return Repository.put(`${productDetail}/${productDetailId}`, payload)
    },
    deteleProductDetail(productDetailId){
        return Repository.delete(`${productDetail}/${productDetailId}`)
    } 

}
// const productApi = {
//   fetchProductApi: (params) => {
//     const url=`/${params}`
//     return axiosClient.get(url)
//   },
//   fetchCategoryApi: (params) => {
//     const url=`/${params}`
//     return axiosClient.get(url)
//   },
//   fetchProductApiById: (id) => {
//     const url=`/product/${id}`
//     return axiosClient.get(url)
//   },
//   fetchAccountApi: () => {
//     const url='/account'
//     return axiosClient.get(url)
//   },
// }

// export default productApi
