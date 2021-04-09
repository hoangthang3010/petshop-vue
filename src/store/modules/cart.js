
const cart = {
    state:{
        product:[],
        amount: 0
    },
    getters: {
        product: state => state.product
    },
    mutations:{
        ADD_TO_CART(state, product1){ 
            if (state.product.length === 0){ 
                return state.product = state.product.concat(product1); 
            }
            else {
                for(let i = 0; i< state.product.length; i++){
                    if (state.product[i].id === product1.id){
                        break
                    }
                    else state.product = state.product.concat(product1);
                    break
                }
            }
            console.log(state.product);
            console.log(product1);
        }
    }
}
export default cart