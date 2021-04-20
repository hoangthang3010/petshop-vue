
// import axios from 'axios'
// import {API_URL} from '../../.env.js'
// const login = {
//     state:{
//         users: [],
//         user:[],
//         amount: 0
//     },
//     getters: {
//         product: state => state.product,
//         getTotal: state =>{
//             let total = 0
//             state.product.forEach(item => {
//                 total += item.count * item.price
//             })
//             return total;
//         }
//     },
//     mutations:{
//         handleLogin(state, info){
//             for(let i=0; i<state.users.length; i++){
//                 if(state.users[i].username == info.username && state.users[i].password == info.password){
//                     return this.$router.push("/")
//                     // alert("Đăng nhập thành công")
//                 }
//             }
//         },
//     },
//     mounted () {
//         axios.get(`${API_URL}/account`)
//             .then(response => {
//                 this.state.users = response.data
//                 console.log(response.data);
//             })
//             .catch(error => {
//                 console.log(error)
//                 this.errored = true
//             })
//     }
// }
// export default login