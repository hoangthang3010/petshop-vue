<template>
    <div style="background-color: #F5F8FD">
            <div class='homepage'>
                <div class="homepage__top" style="height: 330px">
                    <div class="homepage__top__left col-3" style="max-width: 300px">
                        <DropProduct/>
                    </div>
                    <!-- <div class="homepage__top__mid col-8"> -->
                        <SliderHomepage1/>
                    <!-- </div> -->
                    <!-- <div class="homepage__top__right col-2">
                        
                    </div> -->
                    <div class="col-3 plugin-like-page" style="max-width: 300px">
                        <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FPet-Shop-101051212340029&tabs=timeline&width=270&height=320&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=594051934729967" width="270" height="320" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                        <!-- <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FPet-Shop-101051212340029&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=true&show_facepile=true&appId=594051934729967" style="border:none;overflow:hidden; width: 100%" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe> -->
                    </div>
                </div>
                <!-- <br/> -->
                <div class='homepage__product'>
                    <div class="homepage__product__bestselling itemproduct__item__right" style="width: 100%;">
                        <div><span class="homepage__product__bestselling__title">SẢN PHẨM BÁN CHẠY</span></div>
                        <VueSlickCarousel 
                            v-bind="settings" 
                            v-if="bestSellerDetail.length > 0"
                            style="width: 91%; margin: auto;margin-top: 20px"
                        >
                            <div   
                                class="itemproduct__item__right__top__detail"
                                v-for="(item, key) in bestSellerDetail" :key="key"
                            >
                                <CardItems :item= item />
                            </div>
                        </VueSlickCarousel>
                    </div>
                    <ItemProduct 
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
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import axios from 'axios'
import {API_URL} from '../.env.js'
import ItemProduct from '../components/ItemProduct.vue'
import DropProduct from '../components/DropProduct.vue'
import CardItems from '../components/CardItems.vue'
// import SliderHomepage from '../components/SliderHomepage.vue'
import SliderHomepage1 from '../components/SliderHomepage1.vue'
import {RepositoryFactory} from '../api/RepositoryFactory';
const PostsRepository = RepositoryFactory.communicationAPI('posts')

export default {
    name: 'Homepage',
    components: {ItemProduct, SliderHomepage1, DropProduct, CardItems, VueSlickCarousel},
    data() {
        return{
            product: [],
            productDetail: [],
            bestselling: [],
            allOrder: [],
            bestSeller: [],
            // bestSellerDetail: [],
            increase: {
                fn: (a, b) => (b.total - a.total)
            },
            settings: {
                // "arrows": true,
                // "dots": true,
                // "centerMode": true,
                // "centerPadding": "20px",
                "rows": 1,
                "infinite": true,
                "slidesToShow": 5,
                "speed": 500,
                "autoplay": true,
                "autoplaySpeed": 2000,
                "pauseOnDotsHover": true,
                "pauseOnFocus": true,
                "pauseOnHover": true,
                "touchMove": true
            },
        }
    },
    computed:{
        bestSellerDetail(){
            let a = []
            this.bestSeller.map(item => {
                let b = this.productDetail.filter(item1 => item1.id == item.idProduct)
                a.push(b[0])
            })
            return a
        }
    },
    created () {
        window.scrollTo(0,0)
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
        this.getOrder()
    },
    methods:{
        async getOrder(){
            const {data} = await PostsRepository.getOrder();
            this.allOrder = data
            const newArr = this.allOrder.map(el => {return el.listProductOrder}).flat(2)
            const result = Object.values(newArr.reduce((acc,{idProduct, amount})=> {
                acc[idProduct] = acc[idProduct] || {idProduct: idProduct, total: 0};
                acc[idProduct].total += amount
                return acc
            }, {}))
            this.bestSeller = result.sort(this.increase.fn)
        },
    }
}
</script>
<style lang="scss">
    ._2hkj{
        ::-webkit-scrollbar {
            width: 4px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f1f1; 
        }
        ::-webkit-scrollbar-thumb {
            background: #ff6600;
            border-radius: 2px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: rgb(150, 60, 0); 
        }
    }
</style>
