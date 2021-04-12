<template>
    <div style="background-color: #F5F8FD">
            <div class='homepage'>
                <div class="homepage__top">
                    <div class="homepage__top__left col-2">
                        <DropProduct/>
                    </div>
                    <div class="homepage__top__mid col-8">
                        <SliderHomepage/>
                    </div>
                    <div class="homepage__top__right col-2">
                        
                    </div>
                </div>
                <!-- <br/> -->
                <div class='homepage__product'>
                    <div class='homepage__product__bestselling'>
                        <span class="homepage__product__bestselling__title">SẢN PHẨM BÁN CHẠY</span>
                    </div>
                    <Product 
                        v-for="product in product"
                        :key='product.id'
                        :product ="product"
                        :productDetail ="productDetail"
                    />
                </div>
            </div>
        </div>
</template>
<script>

// import { ref } from 'vue'
import '../scss/Homepage.scss'
import axios from 'axios'
import {API_URL} from '../.env.js'
import Product from '../components/Product.vue'
import DropProduct from '../components/DropProduct.vue'
import SliderHomepage from '../components/SliderHomepage.vue'
export default {
    name: 'Homepage',
    components: {Product, SliderHomepage, DropProduct},
    data() {
        return{
            product: [],
            productDetail: [],
            bestselling: [],
        }
    },
    mounted () {
        axios.get(API_URL)
            .then(response => {
                this.bestselling = response.data
                // console.log(response.data);
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
        axios.get(`${API_URL}/ProductAll`)
            .then(response => {
                this.product = response.data
                // console.log(response.data);
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
        axios.get(`${API_URL}/productDetail`)
            .then(response => {
                this.productDetail = response.data
                // console.log(response.data);
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
    }
}
</script>
