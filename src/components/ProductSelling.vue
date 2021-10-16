<template>
    <div class="product-selling">
        <h4>Sản phẩm bán chạy</h4>
        <div class="detail" style="display: flex" v-for="(item, key) in productDetail.sort(sortTypes.fn).slice(0,5)" :key="key">
            <!-- {{item.quantity_sold}} -->
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
</template>

<script>
import '../scss/ProductSelling.scss'
    export default {
        data() {
            return {
                sortTypes:{
                    fn: (a, b) => b.quantity_sold - a.quantity_sold
                },
            }
        },
        props:['productDetail'],
        filters : {
            filterPrice : function(data) {
                return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                // toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            }
        },
        methods:{
            // routerProduct(item){
            //     this.$router.push(`/purchase/${item.type}/${item.detail}/${item.id}`)
            //     this.$emit('routerProduct', item.id);
            // }
        }
    }
</script>

<style scoped>

</style>