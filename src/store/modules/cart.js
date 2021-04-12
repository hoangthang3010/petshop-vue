
const cart = {
    state:{
        product:[],
        amount: 0
    },
    getters: {
        product: state => state.product,
        getTotal: state =>{
            let total = 0
            state.product.forEach(item => {
                total += item.count * item.price
            })
            return total;
        }
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
                        state.product[i].count += product1.count
                        a=1
                        break
                    }
                }
                if(a==0){
                    state.product = state.product.concat(product1);
                }
            }
        },
        countUp(state, id){
            console.log(id);
            console.log(state.product);
            for(let i = 0; i< state.product.length; i++){
                if (state.product[i].id === id){
                    state.product[i].count+=1
                }
            }
        },
        countDown(state, id){
            for(let i = 0; i< state.product.length; i++){
                if (state.product[i].id === id && state.product[i].count>1){
                    state.product[i].count-=1
                }
            }
        },
        handleCount(state, id){
            for(let i = 0; i< state.product.length; i++){
                if ((!state.product[i].count ||  state.product[i].count == 0 ||  state.product[i].count % 1 !== 0) && state.product[i].id === id) 
                    return(
                        state.product[i].count = 1
                    )
                else 
                    return(
                        state.product[i].count = Number( state.product[i].count)
                    )
            }
        },
        handleRemove(state, id){
            for(let i = 0; i< state.product.length; i++){
                    state.product.splice(id, 1)
            }
        }
    }
}
export default cart