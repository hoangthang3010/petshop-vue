<template>
    <div class="cart">
        <div class="cart__left col-8">
            <div class="cart__left__item">
                <table class="cart__left__item__table">
                    <tr class="cart__left__item__table__title row">
                        <th class="cart__left__item__table__title__th col-6">Sản phẩm</th>
                        <th class="cart__left__item__table__title__th col-2">Giá</th>
                        <th class="cart__left__item__table__title__th col-2">Số lượng</th>
                        <th class="cart__left__item__table__title__th col-2">Tạm tính</th>
                    </tr>
                    <tr 
                        class="cart__left__item__table__content row" 
                        v-for="(item, key) in product"
                        :key="key"
                    >
                        <td class="cart__left__item__table__content__tr col-6">
                            <router-link 
                                style="text-decoration: none; color: black"
                                class="cart__left__item__table__content__tr__link" 
                                :to="`/purchase/${item.name}/${item.name1}/${item.name2}/${item.id}`"
                            >
                                <img class="col-4" :src="item.image" alt="">
                                <p class="cart__left__item__table__content__tr__link__title col-8">{{item.title}}</p>
                            </router-link>
                        </td>
                        <td class="cart__left__item__table__content__tr col-2">{{item.price | filterPrice}}đ</td>
                        <td class="cart__left__item__table__content__tr col-2">{{item.count}}</td>
                        <td class="cart__left__item__table__content__tr col-2">{{item.count * item.price | filterPrice}}đ</td>
                    </tr>
                </table>
                <router-link style="text-decoration: none" to="/">
                    <div class="cart__left__item__back">
                        <span class="cart__left__item__back--click">&larr;	TIẾP TỤC XEM SẢN PHẨM</span>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="cart__right col-4">
            <p class="cart__right__title">Cộng giỏ hàng</p>
            <div class="cart__right__money">
                <div class="cart__right__money__provisional">
                    <p class="cart__right__money__provisional__left col-6">Tạm tính</p>
                    <p class="cart__right__money__provisional__right col-6">2.000.000đ</p>
                </div>
                <div class="cart__right__money__total">
                    <span class="cart__right__money__total__left col-6">Tổng</span>
                    <span class="cart__right__money__total__right col-6">2.000.000đ</span>
                </div>
            </div>
            <p class="cart__right__pay">TIẾN HÀNH THANH TOÁN</p>
        </div>
    </div>
</template>
<script>
import '../scss/Cart.scss'
import { mapGetters } from 'vuex'
export default {
    name: "Cart",
    computed: mapGetters(['product']),
    data() {
        return{
            total: 0
        }
    },
    filters : {
        filterPrice : function(data) {
            return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            // toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        }
    },
    watch:{
        // getTotal() {
        //     const res = product1.reduce((prev,item) =>{
        //         return prev + (item.price * item.count)
        //     },0)
        //     this.total = res
        // }
    }
    
    
}
</script>