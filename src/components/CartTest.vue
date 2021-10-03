<template>
    <div>
        <div class="cart" v-if="product.length>0">
            <div class="cart__left col-8">
                <div class="cart__left__item">
                    <div> 
                        <template>
                            {{ `Đã chọn ${selectedRowKeys.length} sản phẩm` }}
                        </template>
                        <a-table 
                            class="cart__left__item__table"
                            style="border-bottom: 1px solid #DCDCDC"
                            :row-selection="{ selectedRowKeys: selectedRowKeys, 
                            selectedRows: selectedRows, 
                            onChange: onSelectChange 
                            }"
                            :columns="columns" 
                            :data-source="product"
                            :scroll="{ y: 430 }"
                            :pagination = false
                        >
                            <div slot="nameproduct" class="cart__left__item__table__content" slot-scope="text, record">
                                <router-link 
                                class="row"
                                    style="text-decoration: none; color: black"
                                    :to="`/purchase/${record.name1}/${record.name2}/${record.id}`"
                                >
                                    <img class="col-4" :src="record.image" alt="">
                                    <p class="cart__left__item__table__content__tr__link__title col-8">{{record.title}}</p>
                                </router-link>
                            </div>
                            <div class="cart__left__item__table__content row input-number" 
                                slot="count" 
                                slot-scope="text, record, key"
                            >
                                <input 
                                    class="cart__left__item__table__content__tr--change" 
                                    type="button" 
                                    value="-"
                                    @click="countDown(record.id)"
                                >
                                <input 
                                    class="cart__left__item__table__content__tr--num number" 
                                    type="text"
                                    v-model="record.count"
                                    @change="handleCount(record.id)"
                                >
                                <input 
                                    class="cart__left__item__table__content__tr--change" 
                                    type="button" 
                                    value="+"
                                    @click="countUp(record.id)"
                                >

                                <p 
                                    class="cart__left__item__table__content__tr--remove"
                                    @click="handleRemove(key)"
                                >Xóa sản phẩm</p>
                            </div>
                            <div class="cart__left__item__table__content__tr" slot="price" slot-scope="text, record">
                                {{record.count * record.price | filterPrice}} ₫
                            </div>
                        </a-table>
                    </div>
                    <div style="display: flex; justify-content: end; padding: 10px 50px">
                        <span style="margin-right: 10px">Tổng tất cả: </span>
                        <span>{{getTotal1 | filterPrice}} ₫</span>
                    </div>
                    <div class="cart__left__item__back">
                        <router-link style="text-decoration: none" to="/">
                            <span class="cart__left__item__back--click"> &nbsp;	TIẾP TỤC XEM SẢN PHẨM</span>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="cart__right col-4">
                <p class="cart__right__title">Cộng giỏ hàng</p>
                <div class="cart__right__money">
                    <div class="cart__right__money__provisional">
                        <p class="cart__right__money__provisional__left col-6">Tạm tính</p>
                        <p class="cart__right__money__provisional__right col-6">{{getTotal | filterPrice}} ₫</p>
                    </div>
                    <div class="cart__right__money__total">
                        <span class="cart__right__money__total__left col-6">Tổng</span>
                        <span class="cart__right__money__total__right col-6">{{getTotal | filterPrice}} ₫</span>
                    </div>
                </div>
                <p class="cart__right__pay">TIẾN HÀNH THANH TOÁN</p>
            </div>
        </div>
        <div class="cartNone" v-else>
            <font-awesome-icon :icon="['far', 'dizzy']" size="5x" />
            <span class="cartNone__title">Không có sản phẩm trong giỏ hàng</span>
            <router-link style="text-decoration: none" to="/">
                <span class="cart__left__item__back--click">&larr;QUAY LẠI TRANG CHỦ</span>
            </router-link>
        </div>
    </div>
</template>
<script>
const columns = [
  {
    title: 'Sản phẩm',
    key: 'title',
    scopedSlots: { customRender: 'nameproduct' },
    width: '55%'
  },
  {
    title: 'Số lượng',
    dataIndex: 'count',
    key: 'count',
    scopedSlots: { customRender: 'count' },
    width: 120,
  },
  {
    title: 'Tính tiền',
    dataIndex: 'price',
    scopedSlots: { customRender: 'price' },
  }
];

import '../scss/CartTest.scss'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
    //   data,
      columns,
    //   selectedRowKeys: [], // Check here to configure the default column
    };
  },
    filters : {
        filterPrice : function(data) {
            return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            // toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        }
    },
    created(){
        
        //         setTimeout(() => {
        // this.selectedRowKeys = []
        //         }, 1000);
        // console.log(this.selectedRowKeys);
        window.scrollTo(0,120)
    },
  computed: {
    ...mapGetters(['product', 'getTotal', 'selectedRowKeys', 'getTotal1']),
    // hasSelected() {
    //   return this.selectedRowKeys.length > 0;
    // },
  },
  methods: {
    ...mapMutations(['countUp', 'countDown', 'handleCount', 'handleRemove','onSelectChange']),
    // onSelectChange(selectedRowKeys) {
    //   this.selectedRowKeys = selectedRowKeys;
    // },
  },
  beforeDestroy(){
       this.selectedRowKeys = []
  }
//   destroyed
};
</script>
