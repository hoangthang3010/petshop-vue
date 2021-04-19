<template>
    <div class="itemproduct">
        <div class="itemproduct__title"
            @click="product.display=!product.display">
            <span class="product__title__name">{{product.title}}</span>
        </div>
        <div 
            class="itemproduct__item" 
            v-for="(item, key) in product.type"
            :key="key"
            v-show="product.display"
        >
            <div class="itemproduct__item__left col-2">
                <ul>
                    <li>{{item.title}}</li>
                    
                    <!-- <div style="display:none">
                        {{
                            product1 = productDetail.filter(item1 =>item1.detail  === item.name)
                        }}
                    </div> -->
                </ul>
            </div>
            <hr />
            <div class="itemproduct__item__right col-10">
                <VueSlickCarousel 
                    v-bind="settings" 
                    v-if="productDetail.length > 0"
                    style="width: 98%; margin: auto"
                >
                    <div    
                        class="itemproduct__item__right__top__detail"
                        v-for="(item1,key) in productDetail.filter(item1 =>item1.detail  === item.name)" 
                        :key="key"
                    >
                        <img :src="item1.image" alt="">
                        <router-link :to="`/purchase/${item1.type}/${item1.detail}/${item1.id-1}`"> 
                            <p class="itemproduct__item__right__top__detail__name" :title="item1.title">{{item1.title}}</p>
                        </router-link>
                        <p class="itemproduct__item__right__top__detail__price">Giá: {{ item1.price | filterPrice }} ₫</p>
                        
                    </div>
                </VueSlickCarousel>
                <!-- <div class="product__item__right__top">
                    <div    
                        class="product__item__right__top__detail col-2"
                        v-for="(item1,key) in productDetail.filter(item1 =>item1.detail  === item.name)" 
                        :key="key"
                    >
                        <router-link style="text-decoration: none" :to="`/purchase/${product.name}/${item1.type}/${item1.detail}/${item1.id-1}`"> 
                            <img :src="item1.image" alt="">
                            <p class="product__item__right__top__detail__name" :title="item1.title">{{item1.title}}{{item1.title.length > 60 ? '...' : ''}}</p>
                            <p class="product__item__right__top__detail__price">Giá: {{ item1.price | filterPrice }} ₫</p>
                        </router-link>
                    </div>
                </div> -->
                <!-- <paginate
                    v-model="page"
                    class="product__item__right__pani"
                    :page-count="product1.length / 6"
                    
                    :page-range="3"
                    :margin-pages="2"
                    :click-handler="clickCallback"
                    :prev-text="'Prev'"
                    :next-text="'Next'"
                    :container-class="pagination"
                    :page-class="'page-item'"
                >
                    <span slot="prevContent">Changed previous button</span>
                    <span slot="nextContent">Changed next button</span>
                    <span slot="breakViewContent">
                        <svg width="16" height="4" viewBox="0 0 16 4">
                        <circle fill="#999999" cx="2" cy="2" r="2" />
                        <circle fill="#999999" cx="8" cy="2" r="2" />
                        <circle fill="#999999" cx="14" cy="2" r="2" />
                        </svg>
                    </span>
                </paginate> -->
            </div>
        </div>
    </div>
</template>
<script>
import '../scss/ItemProduct.scss'
// import Paginate from 'vuejs-paginate'
// import Vue from 'vue'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
// Vue.component('paginate', Paginate)
export default {
    name: "ItemProduct",
    props:['product', 'productDetail'],
    components: { VueSlickCarousel },
    data() {
        return {
            settings: {
                // "arrows": true,
                // "dots": true,
                // "centerMode": true,
                // "centerPadding": "20px",
                "focusOnSelect": true,
                "infinite": true,
                "slidesToShow": 5,
                "speed": 500,
                "autoplay": true,
                "autoplaySpeed": 2000,
                "pauseOnDotsHover": true,
                "pauseOnFocus": true,
                "pauseOnHover": true,
                "touchMove": true
            }
        }
    },
    // data(){
        // display
    // },
    // methods:{
    //     clickCallback (pageNum) => {
    //         console.log(pageNum)
    //         }
    // }
    filters : {
        filterPrice : function(data) {
            return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            // toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        }
    }
}
</script>