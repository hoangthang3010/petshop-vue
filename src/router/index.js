import Hompage from '../main/Homepage.vue'
import ProductDetail from '../components/ProductDetail.vue'
import Cart from '../components/Cart.vue'
import Product from '../main/Product.vue'
import SlideHomepage1 from '../components/SliderHomepage1.vue'
// import Pagination from '../components/Pagination1.vue'

export const routes = [
    { path: '/', name: 'homepage', component: Hompage },
    { path: '/purchase/:name1/:name2/:id', component: ProductDetail},
    { path: '/cart', name: 'cart', component: Cart },
    { path: '/product', name: 'product', component: Product },
    { path: '/slide', name: 'slide', component: SlideHomepage1 },
    // { path: '/panigation', name: 'panigation', component: Pagination }
]