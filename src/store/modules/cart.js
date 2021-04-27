import { notification } from 'ant-design-vue';
import { vm } from '@/main'
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
                const key = `1`;
                return(
                    console.log(11212),
                    // alert('hi'),
                    state.product = state.product.concat(product1),
                    notification.success({ 
                        message: 'Sản phẩm đã được thêm vào giỏ hàng', 
                        description: '',
                        btn: h => {
                            return h(
                              'a-button',
                              {
                                props: {
                                  type: 'primary',
                                  size: 'small',
                                },
                                on: {
                                  click: () => notification.close(key, vm.$router.push('/cart')),
                                },
                              },
                              'Đến giỏ hàng',
                            );
                        },
                        style: {
                            width: '400px',
                            marginLeft: `${380 - 400}px`,
                            marginTop: `75px`,
                            marginBottom: '-50px'
                        },
                        key,
                        onClose: close,
                        duration: 2,
                    })               
                )
            }
            else{
                let a = 0;
                for(let i = 0; i< state.product.length; i++){
                    if (state.product[i].id === product1.id){
                        const key = `2`;
                        state.product[i].count += product1.count
                        a=1
                        notification.info({
                            message: 'Sản phẩm đã có trong giỏ hàng', 
                            description: `Số lượng sản phẩm này trong giỏ hàng tăng lên ${state.product[i].count}`,
                            btn: h => {
                                return h(
                                  'a-button',
                                  {
                                    props: {
                                      type: 'primary',
                                      size: 'small',
                                    },
                                    on: {
                                      click: () => notification.close(key, vm.$router.push('/cart')),
                                    },
                                  },
                                  'Đến giỏ hàng',
                                );
                            },
                            style: {
                                width: '450px',
                                marginLeft: `${380 - 450}px`,
                                marginTop: `75px`,
                                marginBottom: '-50px'
                            },
                            key,
                            onClose: close,
                            duration: 3,
                        })
                        break
                    }
                }
                if(a==0){
                    // const key = `open${Date.now()}`;
                    const key = `1`
                    state.product = state.product.concat(product1),
                    notification.success({ 
                        message: 'Sản phẩm đã được thêm vào giỏ hàng', 
                        description: '',
                        btn: h => {
                            return h(
                              'a-button',
                              {
                                props: {
                                  type: 'primary',
                                  size: 'small',
                                },
                                on: {
                                  click: () => notification.close(key, vm.$router.push('/cart')),
                                },
                              },
                              'Đến giỏ hàng',
                            );
                        },
                        style: {
                            width: '400px',
                            marginLeft: `${380 - 400}px`,
                            marginTop: `75px`,
                            marginBottom: '-50px'
                        },
                        key,
                        onClose: close,
                        duration: 2,
                    })  
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
                    return state.product.splice(id, 1)
            }
        }
    }
}
export default cart