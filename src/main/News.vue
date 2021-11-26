<template>
    <div class="news">
        <div>
            <h2>Tin tức</h2>
            <div class="body row">
                <div class="left col-9">
                    <div v-for="item in newsAll" :key="item">
                        <div class="news-item row">
                            <div class="col-5">
                                <img :src="item.content.slice(item.content.indexOf('src') + 5,item.content.indexOf('alt=')-2)" alt="">
                            </div>
                            <div class="col-7">
                                <router-link :to="`newsdetail/${item.id}`">
                                    <h5>{{item.title}}</h5>
                                </router-link>
                                <div class="content" v-html="item.content.slice(item.content.indexOf('p>')+2,item.content.indexOf('/p>')-1)"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="product-selling right col-3">
                    <h4>Tin tức mới nhất</h4>
                    <div v-for="(item, key) in newsAll.slice(0,5)" :key="key">
                        <div class="detail">
                            <img :src="item.content.slice(item.content.indexOf('src') + 5,item.content.indexOf('alt=')-2)" alt="">
                            <div class="left">
                                <router-link :to="`newsdetail/${item.id}`">
                                    <p class="title">{{item.title}}</p>
                                </router-link>
                                <!-- <p class="price" :style="item.sale ? 'text-decoration:line-through; color: gray; font-size: 12px':''">{{item.price | filterPrice }}đ</p>
                                <p class="pricesale" v-if="item.sale">{{item.price - (item.price * item.sale) / 100 | filterPrice }}đ</p> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '../scss/News.scss'
import '../scss/ProductSelling.scss'
import {RepositoryFactory} from '../api/RepositoryFactory';
const PostsRepository = RepositoryFactory.communicationAPI('posts')
export default {
    data(){
        return{
            newsAll: [],
            sort:{
                fn: (a, b) => {
                    var n1 = a.time.toLowerCase() 
                    var n2 = b.time.toLowerCase()
                    if (n1 < n2){return 1}
                    if (n1 > n2){return -1}
                    return 0
                }
            },
        }
    },
    created(){
        this.getNews()
    },
    methods:{
        async getNews(){
            const {data} = await PostsRepository.getNews();
            this.newsAll = data.sort(this.sort.fn)
            // this.newsAllHot = 
        },
    }
}
</script>

<style scoped>

</style>