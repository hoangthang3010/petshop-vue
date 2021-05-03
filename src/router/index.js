import Hompage from '../main/Homepage.vue'
import ProductDetail from '../components/ProductDetail.vue'
import Cart from '../components/Cart.vue'
import Product from '../main/Product.vue'
import SlideHomepage1 from '../components/SliderHomepage1.vue'
import Login from '../components/Login.vue'
import InfoUser from '../components/InfoUser.vue'
import Register from '../components/Register.vue'
// import CreateAccountUser from '../components/Create.vue'
// import Pagination from '../components/Pagination1.vue'

export const routes = [
    { path: '/', name: 'homepage', component: Hompage },
    { path: '/purchase/:name1/:name2/:id', component: ProductDetail},
    { path: '/cart', name: 'cart', component: Cart },
    { path: '/product', name: 'product', component: Product },
    { path: '/product/:id', name: 'product', component: Product },
    { path: '/product/:id1/:id', name: 'product', component: Product },
    { path: '/slide', name: 'slide', component: SlideHomepage1 },
    { path: '/user_login', name: 'userlogin', component: Login },
    { path: '/info_user', name: 'infouser', component: InfoUser },
    { path: '/register_user', name: 'register', component: Register }
    // { path: '/create_account_user', name: 'createaccountuser', component: CreateAccountUser }
    // { path: '/panigation', name: 'panigation', component: Pagination }
]