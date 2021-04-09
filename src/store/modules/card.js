
const card = {
    state:{
        product:[],
        amount: 0
    },
    getters: {
        product: state => state.product
    },
    mutations:{
        ADD_TO_CARD(state, product){
            state.product === product ? state.product : state.product = state.product.concat(product)
            console.log(state.product);
        }
    }
}
export default card