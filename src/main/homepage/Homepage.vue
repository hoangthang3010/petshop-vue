<template>
    <div style="background-color: #F5F8FD">
            <div class='homepage'>
                <div class="homepage__top">
                    <div class="homepage__top__left col-3">
                        
                    </div>
                    <div class="homepage__top__mid col-6">
                        <SliderHomepage :sliderImage ="sliderImage"/>
                    </div>
                    <div class="homepage__top__right col-3">
                        
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
import './Homepage.scss';
import axios from 'axios'
import Product from '../../components/product/Product.vue'
import SliderHomepage from '../../components/sliderHompage/SliderHomepage.vue'
export default {
    name: 'Homepage',
    components: {Product, SliderHomepage},
    data() {
        return{
            product: [],
            productDetail: [],
            bestselling: [],
            sliderImage: [
                {
                    image: "https://dogily.vn/wp-content/uploads/2019/11/Slider-02.jpg"
                },
                {
                    image: "https://dogily.vn/wp-content/uploads/2019/11/Slider-03.jpg"
                },
                {
                    image: "https://dogily.vn/wp-content/uploads/2019/11/Slider-01.jpg"
                }
            ]
        }
    },
    mounted () {
        axios.get('http://localhost:3005/bestselling')
            .then(response => {
                this.bestselling = response.data,
                console.log(response.data);
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
        axios.get('http://localhost:3005/ProductAll')
            .then(response => {
                this.product = response.data,
                console.log(response.data);
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
        axios.get('http://localhost:3005/productDetail')
            .then(response => {
                this.productDetail = response.data,
                console.log(response.data);
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
    }
}
</script>
