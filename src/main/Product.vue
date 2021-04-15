<template>
    <div class="product">
        <div class="product__left col-3">
            <!-- <p @click="filterAll('')">Tất cả</p>
            <p @click="filterType('food_cat')">Đồ ăn cho mèo</p> -->
            <MultiLevelMenu @type="typeFilter" />
            <hr />
            <div class="product__left__filterprice">
                <p class="product__left__filterprice__title">LỌC THEO GIÁ</p>
                    <!-- style="margin-top: 50px; margin-bottom: 20px" -->
                <SliderRange 
                    :priceMax ="priceMax" 
                    :priceMin ="priceMin" 
                    piecewise: false
                    @rePriceMax ="rePriceMax"
                    @rePriceMin ="rePriceMin"
                />
                <!-- <p class="product__left__filterprice__price">
                    Giá từ: {{repriceMin | filterPrice}}đ - {{repriceMax | filterPrice}}đ
                </p> -->
                <button 
                    class="product__left__filterprice--submit"
                    style="float: right" 
                    @click="filterPrice()"
                >
                    Lọc
                </button><br/><br/>
            </div>
            <div class="product__left__filterprice__sort">
                <p class="product__left__filterprice__title">SẮP XẾP</p>
            </div>
        </div>
        <div class="product__right col-9 row" v-if="productAll.length>0">
            <!-- <p>{{name}}</p> --> 
            <div 
                class="product__right__item col-3"
                v-for="(item, key) in productAll" 
                :key="key"
            >
                <img :src="item.image"/>
                <router-link 
                    :to="`/purchase/${item.type}/${item.detail}/${key}`"
                    style="text-decoration: none"
                > 
                    <p class="product__right__item__name" :title="item.title">{{item.title}}</p>
                </router-link>
                <p class="product__right__item__price" :title="item.price">{{item.price | filterPrice}}đ</p>
            </div>
        </div>
        <div class="product__right col-9 row" v-else>
            <div 
                class="product__right__item col-3"
                v-for="(item, key) in productDetail" 
                :key="key"
            >
                <img :src="item.image"/>
                <router-link 
                    :to="`/purchase/${item.type}/${item.detail}/${key}`"
                    style="text-decoration: none"
                > 
                    <p class="product__right__item__name" :title="item.title">{{item.title}}</p>
                </router-link>
                <p class="product__right__item__price" :title="item.price">{{item.price | filterPrice}}đ</p>
            </div>
            <!-- <Panigation :productAll ="productDetail"/> -->
        </div>

    </div>
</template>
<script>
import '../scss/Product.scss'
import axios from 'axios'
import {API_URL} from '../.env.js'
import MultiLevelMenu from '../components/MultiLevelMenu.vue'
import SliderRange from '../components/SliderRange.vue'
export default {
    name: "Product",
    components: {MultiLevelMenu, SliderRange},
    data() {
        return{
            product: [],
            productDetail: [],
            productAll: [],
            name: null,
            repriceMax: 0,
            repriceMin: 0
        }
    },
    computed: {
        priceMax: function () {
            let max = 0
            if (this.productAll.length !== 0 ){
                for (let i = 1; i < this.productAll.length; i++){
                    if (max < this.productAll[i].price)
                        max = this.productAll[i].price;
                    }
                return max
            }
            else{
                for (let i = 1; i < this.productDetail.length; i++){
                    if (max < this.productDetail[i].price)
                        max = this.productDetail[i].price;
                    }
                return max
            }
        },
        priceMin: function () {
            if (this.productAll.length !== 0 ){
                let min = this.productAll[0].price
                for (let i = 1; i < this.productAll.length; i++){
                    if (min > this.productAll[i].price)
                        min = this.productAll[i].price;}
                return min
            }
            else{
                let min = this.productDetail[0].price
                for (let i = 1; i < this.productDetail.length; i++){
                    if (min > this.productDetail[i].price)
                        min = this.productDetail[i].price;}
                return min
            }
        },
    },
    methods:{
        typeFilter: function(type){
            console.log(type);
            this.name = type
            this.productAll = this.productDetail.filter((item) => item.detail === type || item.type === type)
        },
        rePriceMax: function(rePriceMax){
            this.repriceMax = rePriceMax
            // return rePriceMax(rePriceMax)
        },
        rePriceMin: function(rePriceMin){
            this.repriceMin = rePriceMin
        },
        filterPrice(){
            this.productAll = this.productDetail.filter((item) => item.price >= this.repriceMin && item.price <= this.repriceMax && (item.detail === this.name || item.type === this.name) )
        }
    },
    mounted () {
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
    },
    filters : {
        filterPrice : function(data) {
            return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        // filterProduct: function(data){
        //     return data.filter((item) => item.price > this.repriceMin && item.price < this.repriceMax)
        // }
    }
    
}
</script>