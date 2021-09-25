<template>
    <div class="productD">
        <div class="card-group"  v-if="productDetail.length!==0">
            <div class="col-9 productD__left" style="padding-bottom: 40px">
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
                        <p style="font-size: 15px; font-weight: 600; color: black; margin-bottom: 10px !important">Hướng dẫn mua hàng</p>
                        <!-- <p>{{productDetail[id].product_detail && productDetail[id].product_detail.tutorial.purchase}}</p> -->
                        <p style="font-size: 13px;line-height: 20px; margin-bottom: 5px !important">Quý khách truy cập website của chúng tôi xem sản phẩm và lựa chọn sản phẩm cần mua. - Nhấn nút "Thêm vào giỏ hàng" để đưa sản phẩm vào giỏ hàng. - Sau khi đã hoàn tất việc chọn hàng, quý khách vào giỏ hàng để xem (biểu tượng giỏ hàng ngoài cùng bên phải topbar). - Chuyển tới trang thanh toán. - Nhập đầy đủ thông tin cá nhân và thông tin thanh toán vào biểu mẫu. -Kết thúc đơn hàng, quý khách vui lòng chờ nhân viên của chúng tôi điện thoại lại để chốt đơn.</p>
                        <p style="font-size: 15px; font-weight: 600; color: black; margin-bottom: 10px !important">Hướng dẫn thanh toán</p>
                        <!-- <p>{{productDetail[id].product_detail && productDetail[id].product_detail.tutorial.pay}}</p> -->
                        <p style="font-size: 13px;line-height: 20px; margin-bottom: 5px  !important">Hiện tại, chúng tôi mới chỉ cung cấp 2 hình thức thanh toán: (1). nhận hàng thanh toán và (2). thanh toán chuyển khoản. - 1. Quý khách đặt hàng và được nhân viên xác nhận qua cuộc gọi trực tiếp. Qua đó, chúng tôi gửi hàng về cho quý khách thông qua dịch vụ ship COD. Quý khách nhận hàng, kiểm tra hàng và thanh toán trực tiếp cho nhân viên bưu phát. - 2: Quý khách chuyển khoản trước cho chúng tôi qua tài khoản nhân hàng, và chúng tôi sẽ gửi chuyển phát nhanh cho quý khách:</p>
                    </md-tab>
                </md-tabs>
                <div class="productD__left__rate">
                    <p class="productD__left__rate__title">Đánh giá</p>
                    <div class="productD__left__rate__box">
                        <div class="col-3 productD__left__rate__box__left">
                            <span>SAO TRUNG BÌNH</span>
                            <a-rate class="rate-tb" v-model="totalStar" />
                            <!-- <p>{{totalStar}}</p> -->
                            <div>
                            </div>
                        </div>
                        <div class="col-6 productD__left__rate__box__center">
                            <div>
                                <ul>
                                    <li class="row">
                                        <span class="col-2">5 sao</span>
                                        <span class="col-7">
                                            <span class="ratio-star" :style="`width: ${fiveStar.length*100/totalRate.length ? fiveStar.length*100/totalRate.length : 0}%`"></span>
                                        </span>
                                        <span class="col-3">{{fiveStar.length}} đánh giá</span>
                                    </li>
                                    <li class="row">
                                        <span class="col-2">4 sao</span>
                                        <span class="col-7">
                                            <span class="ratio-star" :style="`width: ${fourStar.length*100/totalRate.length ? fourStar.length*100/totalRate.length : 0}%`"></span>
                                        </span>
                                         <!-- > 0 ? fourStar.length : 0 -->
                                        <span class="col-3">{{fourStar.length}} đánh giá</span>
                                    </li>
                                    <li class="row">
                                        <span class="col-2">3 sao</span>
                                        <span class="col-7">
                                            <span class="ratio-star" :style="`width: ${threeStar.length*100/totalRate.length ? threeStar.length*100/totalRate.length : 0}%`"></span>
                                        </span>
                                        <span class="col-3">{{threeStar.length}} đánh giá</span>
                                    </li>
                                    <li class="row">
                                        <span class="col-2">2 sao</span>
                                        <span class="col-7">
                                            <span class="ratio-star" :style="`width: ${twoStar.length*100/totalRate.length ? twoStar.length*100/totalRate.length : 0}%`"></span>
                                        </span>
                                        <span class="col-3">{{twoStar.length}} đánh giá</span>
                                    </li>
                                    <li class="row">
                                        <span class="col-2">1 sao</span>
                                        <span class="col-7">
                                            <span class="ratio-star" :style="`width: ${oneStar.length*100/totalRate.length ? oneStar.length*100/totalRate.length : 0}%`"></span>
                                        </span>
                                         <!-- > 0 ? oneStar.length : 0 -->
                                        <span class="col-3">{{oneStar.length}} đánh giá</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-3 productD__left__rate__box__right">
                            <p class="productD__left__rate__box__right__show" v-if="showRate">
                                Đánh giá sao
                            </p>
                            <div v-if="showRate" style="margin-bottom: 8px">
                                <a-rate v-model="value" />
                            </div>
                            <div>
                                <button class="productD__left__rate__box__right--submit" v-if="!showRate" @click="showRate=!showRate" >Đánh giá</button>
                                <button class="productD__left__rate__box__right--submit" v-if="showRate" @click="showRate=!showRate" >Gửi</button> 
                                <button class="productD__left__rate__box__right--cancel" v-if="showRate" @click="onCancelRate" >Hủy bỏ</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="productD__left__sale itemproduct__item__right" style="width: 100%; margin-top: 20px">
                        <p style="font-size: 14px; font-weight: bold">Sản phẩm đang khuyến mãi</p>
                        <VueSlickCarousel 
                            v-bind="settings" 
                            v-if="productDetail.length > 0"
                            style="width: 91%; margin: auto"
                        >
                            <div   
                                class="itemproduct__item__right__top__detail"
                                v-for="(item, key) in productDetail.filter(item => item.sale > 0)" :key="key">
                                <!-- {{item}} -->
                                <!-- <router-link style="text-decoration: none" :to="`/purchase/${product.name}/${item1.type}/${item1.detail}/${item1.id-1}`">  -->
                                    <!-- <img :src="item.image" alt="">
                                    <p class="product__item__right__detail__name" :title="item.title">{{item.title}}{{item.title.length > 60 ? '...' : ''}}</p>
                                    <p class="product__item__right__detail__price">Giá: {{ item.price | filterPrice }}đ</p> -->
                                    
                                    <CardItems :item= item />
                                <!-- </router-link> -->
                            </div>
                        </VueSlickCarousel>
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
import CardItems from './CardItems.vue'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
// import {API_URL} from '../.env.js'
// import axios from 'axios'
import {RepositoryFactory} from '../api/RepositoryFactory';
const PostsRepository = RepositoryFactory.communicationAPI('posts')
export default {
    name: "ProductDetail",
    components: {MultiLevelMenu, CardItems, VueSlickCarousel },
    data() {
        return{ 
            productDetail: [],
            showRate: false,
            count: 1,
            id: '',
            // id: Number(this.$route.params.id),
            value: 0,
            totalStar: '',
            fiveStar: [],
            fourStar: [],
            threeStar: [],
            twoStar: [],
            oneStar: [],
            totalRate: [],
            settings: {
                // "arrows": true,
                // "dots": true,
                // "centerMode": true,
                // "centerPadding": "20px",
                "focusOnSelect": true,
                "infinite": true,
                "slidesToShow": 4,
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
    computed: {
        ...mapGetters(['product']),
          
    },
    created(){
        this.fetch()
        this.fetchRateProduct()
        this.id = Number(this.$route.params.id)
        window.scrollTo(0,0)
    },
    filters : {
        filterPrice : function(data) {
            return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            // toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        }
    },
    updated(){
        if(this.id != this.$route.params.id){
            window.scrollTo(0,0),
            this.fetchRateProduct(),
            this.$forceUpdate()
        }
        //      window.scrollTo(0,0)
            this.id = Number(this.$route.params.id)
    },
    mounted(){},
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
        onCancelRate(){
            this.value = 0;
            this.showRate = false
        },
        async fetch(){
            const {data} = await PostsRepository.getProductDetail();
            this.productDetail = data
            // console.log(data);
        },
        async fetchRateProduct(){
            const {data} = await PostsRepository.getRateProduct();
            this.totalRate = data.filter(item => item.productId == this.$route.params.id)
            if(this.totalRate.length>0){
                this.oneStar = this.totalRate.filter(item => item.star == 1)
                this.twoStar = this.totalRate.filter(item => item.star == 2)
                this.threeStar = this.totalRate.filter(item => item.star == 3)
                this.fourStar = this.totalRate.filter(item => item.star == 4)
                this.fiveStar = this.totalRate.filter(item => item.star == 5)
                this.totalStar = (this.oneStar.length + 2*this.twoStar.length + 3*this.threeStar.length + 4*this.fourStar.length + 5*this.fiveStar.length) / this.totalRate.length
            }
            else{
                this.oneStar  = []
                this.twoStar = []
                this.threeStar = []
                this.fourStar = []
                this.fiveStar = []
                this.totalStar =  []
                this.totalRate = []
            }
            // console.log(this.totalStar);
            // console.log(this.$route.params.id);
        },
    }
}
</script>