<template>
    <div class="productD">
        <div class="card-group"  v-if="productDetail.length!==0">
            <div class="col-9 productD__left">
                <div class="productD__left__top">
                    <div class="col-6 productD__left__top__image">
                        <img :src="productDetail && productDetail[id].image"/>  
                    </div>
                    <div class="col-6 productD__left__top__info">
                        <h3 class="productD__left__top__info__title">
                            {{ productDetail && productDetail[$route.params.id].title}}
                        </h3>
                        <div class="productD__left__top__info__price">
                            Giá: 
                            <span class="productD__left__top__info__price__1">
                                {{ productDetail && productDetail[$route.params.id].price | filterPrice }} đ
                            </span>
                        </div>
                        <div class="productD__left__top__info__order">
                            <div class="productD__left__top__info__order__count"
                            >
                                <input 
                                    class="productD__left__top__info__order__count--change" 
                                    type="button" 
                                    value="-"
                                    @click="countDown()"
                                >
                                <input 
                                    class="productD__left__top__info__order__count--num" 
                                    type="text"
                                    v-model="count"
                                    @change="handleCount"
                                >
                                <input 
                                    class="productD__left__top__info__order__count--change" 
                                    type="button" 
                                    value="+"
                                    @click="countUp()"
                                >
                            </div>
                            <div 
                                class="productD__left__top__info__order__add"
                                @click="ADD_TO_CART({
                                    id : id, 
                                    title: productDetail[id].title, 
                                    price: productDetail[id].price,
                                    image: productDetail[id].image,
                                    count: count,
                                    name1: $route.params.name1,
                                    name2: $route.params.name2,

                                })"
                                
                            >Thêm vào giỏ hàng</div>
                        </div>
                                    <!-- name: $route.params.name, -->
                        <!-- <div class="productD__left__top__info__capacity">
                            <h1>Công dụng: </h1>
                        </div> -->
                    </div>
                </div>
                
                <md-tabs  class="productD__left__tab">
                    <md-tab id="tab-home" md-label="Mô tả">
                        <div v-if="productDetail[id].product_detail">
                            <div v-for="(item, key) in productDetail[id].product_detail && productDetail[id].product_detail.describe" :key="key">
                                <span style="font-size: 15px; font-weight: 600; color: black">{{item.title}}:</span>
                                <p>{{item.info}}</p>
                            </div>
                        </div>
                        <div v-else>
                            <p>Không có thông tin</p>
                        </div>
                    </md-tab>
                    <md-tab id="tab-pages" 
                            md-label="Hướng dẫn mua hàng và thanh toán"
                    >
                        <p style="font-size: 15px; font-weight: 600; color: black">Hướng dẫn mua hàng</p>
                        <p>{{productDetail[id].product_detail && productDetail[id].product_detail.tutorial.purchase}}</p>
                        <p style="font-size: 15px; font-weight: 600; color: black">Hướng dẫn thanh toán</p>
                        <p>{{productDetail[id].product_detail && productDetail[id].product_detail.tutorial.pay}}</p>
                    </md-tab>
                </md-tabs>
                <div class="productD__left__rate">
                    <p class="productD__left__rate__title">Đánh giá</p>
                    <div class="productD__left__rate__box">
                        <div class="col-3 productD__left__rate__box__left">
                            <span>SAO TRUNG BÌNH</span>
                            <div>
                            </div>
                        </div>
                        <div class="col-6 productD__left__rate__box__center">
                            <div>
                                <ul>
                                    <li>5 sao</li>
                                    <li>4 sao</li>
                                    <li>3 sao</li>
                                    <li>2 sao</li>
                                    <li>1 sao</li>  
                                </ul>
                            </div>
                        </div>
                        <div class="col-3 productD__left__rate__box__right">
                            <p class="productD__left__rate__box__right__show" v-if="showRate">
                                Đánh giá sao
                            </p>
                            <div>
                                <button class="productD__left__rate__box__right--submit" v-if="!showRate" @click="showRate=!showRate" >Đánh giá</button>
                                <button class="productD__left__rate__box__right--submit" v-if="showRate" @click="showRate=!showRate" >Gửi</button> 
                                <button class="productD__left__rate__box__right--cancel" v-if="showRate" @click="showRate=!showRate" >Hủy bỏ</button>
                            </div>
                            <div v-if="showRate">
                                <a-rate v-model="value" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="productD__left__same">
                        <p>Sản phẩm tương tự</p>
                        <!-- <div v-for="(item, key) in productDetail.filter(item => item.type == $route.params.name1)" :key="key">
                            <router-link style="text-decoration: none" :to="`/purchase/${product.name}/${item1.type}/${item1.detail}/${item1.id-1}`"> 
                                <img :src="item.image" alt="">
                                <p class="product__item__right__detail__name" :title="item.title">{{item.title}}{{item.title.length > 60 ? '...' : ''}}</p>
                                <p class="product__item__right__detail__price">Giá: {{ item.price | filterPrice }}đ</p>
                            </router-link>
                        </div> -->
                </div>
            </div>
            <div class="col-3 productD__right">
                <div class="productD__right__product">
                    <!-- <div> -->
                    <!-- <span class="productD__right__product__title">Sản phẩm</span> -->
                    <!-- </div> -->
                    <div  class="productD__right__product__body">
                        <h2>Sản phẩm</h2>
                        <MultiLevelMenu/>
                    </div>
                </div>
                <div class="productD__right">

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import MultiLevelMenu from '../components/MultiLevelMenu.vue'
import '../scss/ProductDetail.scss'
// import {API_URL} from '../.env.js'
// import axios from 'axios'
import {RepositoryFactory} from '../api/RepositoryFactory';
const PostsRepository = RepositoryFactory.communicationAPI('posts')
export default {
    name: "ProductDetail",
    components: {MultiLevelMenu},
    data() {
        return{ 
            productDetail: [],
            showRate: false,
            count: 1,
            id: Number(this.$route.params.id),
            value: 0
        }
    },
    computed: mapGetters(['product']),
    created(){
        // if (!this.count) return(this.count = 0, console.log(this.count)),
        // axios.get(`${API_URL}/productDetail`)
        //     .then(response => {
        //         this.productDetail = response.data,
        //         this.count = response.data[this.id].count
        //         console.log(this.productDetail);
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         this.errored = true
        //     })
        this.fetch()
        window.scrollTo(0,0)
    },
    filters : {
        filterPrice : function(data) {
            return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            // toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        }
    },
    // mutated(){
    //     this.value = 0
    // },
    methods: {
        ...mapMutations(['ADD_TO_CART']),
        // ADD_TO_CARD(id, title, price, count){
        //     let detail = Object.assign({id},{title}, {price}, {count});
        //     console.log(detail);
        // },
        handleCount(){
            if (!this.count || this.count == 0 || this.count % 1 !== 0) 
                return(
                    this.count = 1
                    // console.log(this.count)
                )
            else 
                return(
                    this.count = Number(this.count)
                    // console.log(this.count)
                )
        },
        countUp(){
            this.count = this.count + 1;
            // console.log(this.count);
        },
        countDown(){
            this.count === 1 ? this.count : this.count-=1
        },
        async fetch(){
            const {data} = await PostsRepository.getProductDetail();
            this.productDetail = data
        }
    }
}
</script>