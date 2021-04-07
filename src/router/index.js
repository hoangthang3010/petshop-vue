import Hompage from '../main/homepage/Homepage.vue'
import ProductDetail from '../components/productDetail/ProductDetail.vue'

export const routes = [
    { path: '/', name: 'homepage', component: Hompage },
    {path: '/purchase/:name/:name1/:name2/:id', component: ProductDetail}
    // { path: '/product', name: 'product', component: Product }
]