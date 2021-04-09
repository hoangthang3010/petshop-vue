import Hompage from '../main/Homepage.vue'
import ProductDetail from '../components/ProductDetail.vue'
import Cart from '../components/Cart.vue'

export const routes = [
    { path: '/', name: 'homepage', component: Hompage },
    { path: '/purchase/:name/:name1/:name2/:id', component: ProductDetail},
    { path: '/cart', name: 'product', component: Cart }
]