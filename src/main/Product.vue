<template>
    <div class="product">
        <div class="product__left col-3">
            <p @click="filterAll('')">Tất cả</p>
            <p @click="filterType('food_cat')">Đồ ăn cho mèo</p>
        </div>
        <div class="product__right col-9 row" v-if="productAll.length>0">
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
                <p class="product__right__item__price" :title="item.price">{{item.price}}</p>
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
                <p class="product__right__item__price" :title="item.price">{{item.price}}</p>
            </div>
            <!-- <Panigation :productAll ="productDetail"/> -->
        </div>
    </div>
</template>
<script>
import '../scss/Product.scss'
import axios from 'axios'
import {API_URL} from '../.env.js'
export default {
    name: "Product",
    data() {
        return{
            product: [],
            productDetail: [],
            productAll: []
        }
    },
    methods:{
        filterAll(){
            this.productAll = this.productDetail
        },
        filterType(index){
            console.log(index);
            this.productAll = this.productDetail.filter((item) => item.detail === index)
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
    }
    
}
</script>