<template>
    <div class="product-selling">
        <h4>Sản phẩm bán chạy</h4>
        <!-- {{bestSeller}} -->
        <div v-for="(elem, key) in bestSeller.slice(0,5)" :key="key">
            <div class="detail" style="display: flex" v-for="(item, key) in productDetail.filter(item => item.id == elem.idProduct)" :key="key">
                <!-- {{item.quantity_sold}} -->
                <!-- {{elem.total}} -->
                <img :src="item.image" alt="">
                <div class="left">
                    <router-link :to="`/purchase/${item.type}/${item.detail}/${item.id}`">
                        <p class="title">{{item.title}}</p>
                    </router-link>
                    <!-- @click="routerProduct(item)" -->
                    <!-- `text-decoration: ${ item.sale ? 'line-through' : ''}` -->
                    <p class="price" :style="item.sale ? 'text-decoration:line-through; color: gray; font-size: 12px':''">{{item.price | filterPrice }}đ</p>
                    <p class="pricesale" v-if="item.sale">{{item.price - (item.price * item.sale) / 100 | filterPrice }}đ</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '../scss/ProductSelling.scss'
import {RepositoryFactory} from '../api/RepositoryFactory';
const PostsRepository = RepositoryFactory.communicationAPI('posts')
    export default {
        data() {
            return {
                sortTypes:{
                    fn: (a, b) => b.quantity_sold - a.quantity_sold
                },
                allOrder: [],
                bestSeller: [],
                increase: {
                    fn: (a, b) => (b.total - a.total)
                },
            }
        },
        props:['productDetail'],
        created(){
            this.getOrder()
        },
        filters : {
            filterPrice : function(data) {
                return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
        },
        methods:{
            // routerProduct(item){
            //     this.$router.push(`/purchase/${item.type}/${item.detail}/${item.id}`)
            //     this.$emit('routerProduct', item.id);
            // }
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

<style scoped>

</style>