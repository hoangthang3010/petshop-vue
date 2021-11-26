<template>
    <div class="news news-detail">
        <div>
            <div class="body row">
                <div class="left col-9">
                    <h1>{{newsId.title}}</h1>
                    <p>Đã đăng ngày {{newsId.time.slice(8,10)+'-'+newsId.time.slice(5,7)+'-'+newsId.time.slice(0,4)}} bởi ADMIN</p>
                    <div class="content-detail" v-html="newsId.content"></div> 
                </div>
                <div class="product-selling right col-3">
                    <h4>Tin tức mới nhất</h4>
                    <div v-for="(item, key) in newsAll.slice(0,5)" :key="key">
                        <div class="detail">
                            <img :src="item.content.slice(item.content.indexOf('src') + 5,item.content.indexOf('alt=')-2)" alt="">
                            <div class="left">
                                <router-link :to="`/newsdetail/${item.id}`">
                                    <p class="title">{{item.title}}</p>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <h4>Sản phẩm</h4>
                    <MultiLevelMenu/>
                     <ProductSelling :productDetail="productDetail"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '../scss/News.scss'
import '../scss/NewsDetail.scss'
import '../scss/ProductSelling.scss'
import MultiLevelMenu from '../components/MultiLevelMenu.vue'
import ProductSelling from '../components/ProductSelling.vue'
import {RepositoryFactory} from '../api/RepositoryFactory';
const PostsRepository = RepositoryFactory.communicationAPI('posts')
export default {
    components: {MultiLevelMenu, ProductSelling},
    data() {
        return {
            id: this.$route.params.id,
            newsAll: [],
            newsId: [],
            sort:{
                fn: (a, b) => {
                    var n1 = a.time.toLowerCase() 
                    var n2 = b.time.toLowerCase()
                    if (n1 < n2){return 1}
                    if (n1 > n2){return -1}
                    return 0
                }
            },
            productDetail: []
        }
    },
    created(){
        this.getNews()
        this.getProductDetail()
    },
    watch:{
        $route(){
            this.id = this.$route.params.id,
            this.getNews()
            window.scrollTo(0,0)
        }
    },
    methods:{
        async getNews(){
            const {data} = await PostsRepository.getNews();
            this.newsAll = data.sort(this.sort.fn)

            const a = data.filter(item => item.id == this.id)[0]
            this.newsId = {
                ...a,
                // "time": new Date(a.time)
            }
            console.log(data);
        },
        async getProductDetail(){
            const {data} = await PostsRepository.getProductDetail();
            this.productDetail = data
        },
    }
}
</script>

<style scoped>

</style>