
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
            // state.product = state.product.concat(product1); 
            // // for(let i = 0; i< state.product.length; i++){
            //     if( state.product.id.indexOf(product1.id, 'id')) {
            //         console.log(1);
            //     // }
            //         // console.log(i);
            //         // console.log(state.product.indexOf(i));
            // }
            if (state.product.length === 0){ 
                return state.product = state.product.concat(product1); 
            }
            else{
                let a = 0;
                for(let i = 0; i< state.product.length; i++){
                    if (state.product[i].id === product1.id){
                        a=1
                        break
                    }
                }
                if(a==0){
                    state.product = state.product.concat(product1);
                    console.log(2);
                    // break
                }
            }
            // else{
            //     state.product = state.product.concat(product1);
            //     console.log(2);
            //     // break
            // }
        }
    }
}
export default cart