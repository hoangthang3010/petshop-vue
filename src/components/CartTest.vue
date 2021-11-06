<template>
  <div style="min-height: 400px; display: flex">
    <div class="cart" v-if="product.length > 0">
      <div class="cart__left col-8">
        <div class="cart__left__item">
          <div>
            <template>
              <p style="margin-bottom: 4px!important">{{ `Đã chọn ${selectedRowKeys.length} sản phẩm` }} {{listBill}}</p>
            </template>
            <a-table
              class="cart__left__item__table"
              style="border-bottom: 1px solid #dcdcdc"
              :row-selection="{
                selectedRowKeys: selectedRowKeys,
                selectedRows: selectedRows,
                onChange: onSelectChange,
              }"
              :columns="columns"
              :data-source="product"
              :scroll="{ y: 430 }"
              :pagination="false"
            >
              <div
                slot="nameproduct"
                class="cart__left__item__table__content"
                slot-scope="text, record"
              >
                <router-link
                  class="row"
                  style="text-decoration: none; color: black"
                  :to="`/purchase/${record.name1}/${record.name2}/${record.id}`"
                >
                  <img class="col-4" :src="record.image" alt="" />
                  <p
                    class="
                      cart__left__item__table__content__tr__link__title
                      col-8
                    "
                  >
                    {{ record.title }}
                  </p>
                </router-link>
              </div>
              <div
                class="cart__left__item__table__content row input-number"
                slot="count"
                slot-scope="text, record, key"
              >
                <input
                  class="cart__left__item__table__content__tr--change"
                  type="button"
                  value="-"
                  :disabled="record.count == 1"
                  @click="countDown(record.id)"
                />
                <input
                  class="cart__left__item__table__content__tr--num number"
                  type="number"
                  v-model="record.count"
                  @change="
                    handleCount({
                      id: record.id,
                      amount: productAll.filter(
                        (item) => item.id === record.id
                      )[0].product_amount,
                    })
                  "
                />
                <input
                  class="cart__left__item__table__content__tr--change"
                  type="button"
                  value="+"
                  :disabled="
                    record.count >=
                    productAll.filter((item) => item.id === record.id)[0]
                      .product_amount
                  "
                  @click="countUp(record.id)"
                />
                <!-- {{selectedRowKeys}}-{{key}} --
                                {{selectedRowKeys.indexOf(key)}} -->
                <p class="amount">
                  Còn
                  {{
                    productAll.filter((item) => item.id == record.id)[0]
                      .product_amount
                  }} sản phẩm
                </p>
                <p
                  v-if="selectedRowKeys.indexOf(key) < 0"
                  class="cart__left__item__table__content__tr--remove"
                  @click="handleRemove(key)"
                >
                  Xóa sản phẩm
                </p>
              </div>
              <div
                class="cart__left__item__table__content__tr"
                slot="price"
                slot-scope="text, record"
              >
                {{ (record.count * record.price) | filterPrice }} ₫
              </div>
            </a-table>
          </div>
          <div style="display: flex; justify-content: end; padding: 10px 50px">
            <span style="margin-right: 10px">Tổng tất cả: </span>
            <span>{{ getTotal1 | filterPrice }} ₫</span>
          </div>
          <div class="cart__left__item__back">
            <router-link style="text-decoration: none" to="/">
              <span class="cart__left__item__back--click">
                &nbsp; TIẾP TỤC XEM SẢN PHẨM</span
              >
            </router-link>
          </div>
        </div>
      </div>
      <div class="cart__right col-4">
        <p class="cart__right__title">Cộng giỏ hàng</p>
        <div class="cart__right__money">
          <div class="cart__right__money__provisional">
            <p class="cart__right__money__provisional__left col-6">Tạm tính</p>
            <p class="cart__right__money__provisional__right col-6">
              {{ productDel ? delSelectedRow : getTotal | filterPrice }} ₫
            </p>
          </div>
          <!-- {{productDel}} -->
          <div class="cart__right__money__total">
            <span class="cart__right__money__total__left col-6">Tổng</span>
            <span class="cart__right__money__total__right col-6"
              >{{
                productDel ? delSelectedRow : getTotal | filterPrice
              }}
              ₫</span
            >
          </div>
        </div>
        <p class="cart__right__pay" @click="PayOrder">
          THANH TOÁN
        </p>
      </div>
      <div class="form-pay" v-if="isShowBill">
        <h4 style="margin-bottom: 20px; font-weight: bold">Hóa đơn của bạn</h4>
        <div class="row">
          <div class="box-left col-6">
            <div :style="selectedRows.length > 7 ? 'overflowY: scroll; height: 312px;overflow-x: hidden; padding-right: 10px':''">
              <div class="row" v-for="(item, key) in selectedRows" :key="key">
                <span class="col-8">{{item.title}}</span>
                <div class="col-4">
                  <p>x{{item.count}}</p>
                  <p>{{item.price | filterPrice}} đ</p>
                </div>
              </div>
            </div>
            <hr/>
            <p style="text-align: right">Tổng: {{getTotal | filterPrice}} đ</p>
          </div>
          <div class="box-left col-6">
            <div>
              <p>Địa chỉ <span style="color: red">*</span>:</p>
              <input type="text" v-model="address" placeholder="Địa chi của bạn">
              <p>Số điện thoại người nhận <span style="color: red">*</span>:</p>
              <input type="number" v-model="numberphone" placeholder="Nhập số điện thoại">
            </div>
            <div>
              <p class="cart__right__pay" @click="onPayBill(selectedRows)">
                THANH TOÁN TIỀN MẶT
              </p>
              <hr />
              <div v-if="!paidFor">
                <!-- - ${{ product.price }} OB -->
                <h5>Thanh toán bằng Paypal</h5>
                <!-- <p>{{ product.description }}</p> -->
              </div>
              <div v-if="paidFor">
                <h1>Noice, you bought a beautiful lamp!</h1>
              </div>
              <div ref="paypal"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="overlay-pay" v-if="isShowBill" @click="isShowBill = false"></div>
    </div>
    <div class="cartNone" v-else>
      <font-awesome-icon :icon="['far', 'dizzy']" size="5x" />
      <span class="cartNone__title">Không có sản phẩm trong giỏ hàng</span>
      <router-link style="text-decoration: none" to="/">
        <span class="cart__left__item__back--click"
          >&larr;QUAY LẠI TRANG CHỦ</span
        >
      </router-link>
    </div>
  </div>
</template>
<script>
const columns = [
  {
    title: "Sản phẩm",
    key: "title",
    scopedSlots: { customRender: "nameproduct" },
    width: "50%",
  },
  {
    title: "Số lượng",
    dataIndex: "count",
    key: "count",
    scopedSlots: { customRender: "count" },
    width: 140,
  },
  {
    title: "Tính tiền",
    dataIndex: "price",
    scopedSlots: { customRender: "price" },
  },
];

import "../scss/CartTest.scss";
import { mapGetters, mapMutations } from "vuex";
import { RepositoryFactory } from "../api/RepositoryFactory";
const PostsRepository = RepositoryFactory.communicationAPI("posts");
export default {
    data() {
        return {
        //   data,
            columns,
            selectedRowKeys: [], // Check here to configure the default column
            selectedRows: [],
            loaded: false,
            paidFor: false,
            productAll: [],
            product1: {
                price: 777.77,
                description: "leg lamp from that one movie",
                img: "./assets/lamp.jpg"
            },
            idUser: sessionStorage.getItem('id'),
            bill: [],
            isShowBill: false,
            address: '',
            numberphone: '',
            allWarehouse: []
        };
    },
    filters: {
        filterPrice: function (data) {
        return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        // toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        },
    },
    created() {
        this.getProductDetail();
        this.getWarehouse()
        if (this.product.length > 0) window.scrollTo(0, 130);
        else window.scrollTo(0, 0);
    },
    computed: {
        ...mapGetters(["product", "getTotal1", "productDel", "selectedRowState"]),
        getTotal() {
          let total = 0;
          this.selectedRows.forEach((item) => {
              total += item.count * item.price;
          });
          return total;
        },
        listProductOrder(){
          let a= []
          this.selectedRows.map(item =>{
            a.push({"idProduct":item.id, "price": item.price, "amount": item.count})
          })
          return a
        }
    },
    mounted() {
    },
    beforeUpdate(){
      let time = new Date()
      this.bill = {
        "idUser": this.idUser,
        "statusOrder": "unconfirmed",
        "listProductOrder": this.listProductOrder, 
        "total": this.getTotal,
        "dateOrder": time,
        "address": this.address,
        "numberphone": this.numberphone
      }
    },
    methods: {
    //    ,'onSelectChange'
    ...mapMutations([
      "countUp",
      "countDown",
      "handleCount",
      "handleRemove",
      "onPayBill1",
    ]),
    PayOrder(){
      if(!this.idUser){
        this.$notification['error']({
            message: 'Bạn chưa đăng nhập',
            description:
            'Vui lòng đăng nhập để đặt hàng',
            duration: 2,
            style: {
                top: `75px`,
                marginBottom: '10px'
            },
        });
      }
      else if(this.idUser && !this.selectedRowKeys.length){
        this.$notification['error']({
            message: 'Bạn chưa chọn sản phẩm nào',
            description:
            'Vui lòng chọn sản  phẩm để thanh toán',
            duration: 2,
            style: {
                top: `75px`,
                marginBottom: '10px'
            },
        });
      }
      else{
        const script = document.createElement("script");
        script.src =
        "https://www.paypal.com/sdk/js?client-id=AdAe7P9QznTR2CulihLRIXY_NfydldNW6nWLtIe9URlvi0hDYxAK7imFklM76Q2sBzJBrsuv-X_Nqe39";
        script.addEventListener("load", this.setLoaded);
        document.body.appendChild(script);
        this.isShowBill = true
      }
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    },
    onPayBill(a) {
      if(this.numberphone && this.address){
        let b = Object.assign(this.bill,{"typePay": "cash"})
        // console.log(b);
        this.createOrder(b)

        this.productAll.forEach(item =>{
          this.listProductOrder.forEach(elem =>{
            if(item.id == elem.idProduct){
              const newCount = item.product_amount - elem.amount
              const newQuantitySold = item.quantity_sold + elem.amount
              const newElem = {
                ...item,
                product_amount: newCount,
                quantity_sold: newQuantitySold
              }
              this.updateProductDetail(item.id, newElem)
            }
          })
        })
        this.allWarehouse.forEach(item => {
          this.listProductOrder.forEach(elem =>{
            if(item.idProduct == elem.idProduct){
                const b = {
                    ...item,
                    listExportGoods: item.listExportGoods.concat({
                        id: [...Array(30)].map(() => Math.random().toString(36)[2]).join(''),
                        count: Number(elem.amount),
                        time: new Date()
                    })
                }
                this.updateWarehouseId(item.id, b)
            }
          })
        })

        this.selectedRows = [];
        this.selectedRowKeys = [];
        this.onPayBill1(a);
        this.$router.push("/info_user/order")
      }
      else{
        this.$notification['error']({
            message: 'Vui lòng điền đầy đủ thông tin',
            description:
            'Vui lòng đăng nhập để đặt hàng',
            duration: 2,
            style: {
                top: `75px`,
                marginBottom: '10px'
            },
        });
      }
    },
    // handleRemove(){}
    setLoaded: function() {
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            if(this.numberphone && this.address){
              return actions.order.create({
                purchase_units: [
                  {
                    description: "Bạn đã mua hàng từ PetShop",
                    amount: {
                      currency_code: "USD",
                      value: Math.round(this.getTotal/23000)
                    }
                  }
                ]
              });
            }
            else{
              this.$notification['error']({
                  message: 'Vui lòng điền đủ thông tin',
                  description:
                  'Vui lòng đăng nhập để đặt hàng',
                  duration: 2,
                  style: {
                      top: `75px`,
                      marginBottom: '10px'
                  },
              });
            }
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.paidFor = true;
            console.log(order);
            let b = Object.assign(this.bill,{"typePay": "paypal"})
            this.createOrder(b)
            this.productAll.forEach(item =>{
              this.listProductOrder.forEach(elem =>{
                if(item.id == elem.idProduct){
                  const newCount = item.product_amount - elem.amount
                  const newQuantitySold = item.quantity_sold + elem.amount
                  const newElem = {
                    ...item,
                    product_amount: newCount,
                    quantity_sold: newQuantitySold
                  }
                  this.updateProductDetail(item.id, newElem)
                }
              })
            })
            this.allWarehouse.forEach(item => {
              this.listProductOrder.forEach(elem =>{
                if(item.idProduct == elem.idProduct){
                    const b = {
                        ...item,
                        listExportGoods: item.listExportGoods.concat({
                            id: [...Array(30)].map(() => Math.random().toString(36)[2]).join(''),
                            count: Number(elem.amount),
                            time: new Date()
                        })
                    }
                    this.updateWarehouseId(item.id, b)
                }
              })
            })
            
            this.onPayBill1(this.selectedRows);
            this.selectedRows = [];
            this.selectedRowKeys = []
            this.$router.push("/info_user/order")
          },
          onError: err => {
            console.log(err);
          }
        })
        .render(this.$refs.paypal);
    },
    async getProductDetail() {
      const { data } = await PostsRepository.getProductDetail();
      this.productAll = data;
    },
    async createOrder(payload) {
      const { data } = await PostsRepository.createOrder(payload);
      this.bill = data;
    },
    async updateProductDetail(id,payload) {
      const { data } = await PostsRepository.updateProductDetail(id,payload);
      this.productAll = data;
    },
    async getWarehouse(){
        const {data} = await PostsRepository.getWarehouse();
        this.allWarehouse = data
    },
    async updateWarehouseId(id, payload){
        const {data} = await PostsRepository.updateWarehouseId(id, payload);
        this.allWarehouse = data
    },
  },
};
</script>
