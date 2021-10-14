<template>
    <div class="infouser__body__right col-9">
        <div class="infouser__body__right__title">
            <h4>Đơn hàng</h4>
            <p>Tát cả các đơn hàng của tôi</p>
        </div>  
        <hr/>
        <div class="sale-user">
            <div class="sale-unconfirmed">
                <h5>Đơn hàng chưa xác nhận</h5>
                <div class="empty" v-if="listOrder.filter(item => item.statusOrder == 'unconfirmed').length==0">
                    Không có đơn nào
                </div>
                <div 
                    class="row"
                    v-for="(item, key) in listOrder.filter(item => item.statusOrder == 'unconfirmed')" 
                    :key="key"
                >
                    <p class="col-2 title-right-bill">Đơn hàng số {{key+1}}</p>
                    <div class="left-bill col-6">
                        <div v-for="(productOrder,key) in item.listProductOrder" :key="key">
                            <div>
                                <img :src="productDetail.filter(item1 => item1.id == productOrder.idProduct)[0].image" alt="">
                            </div>
                            <div>
                                <span class="title-product">{{productDetail.filter(item1 => item1.id == productOrder.idProduct)[0].title}}</span>
                            </div>
                            <div>
                                <p class="count-product">x{{productOrder.amount}}</p>
                                <p>{{productOrder.price*productOrder.amount | filterPrice}}đ</p>
                            </div>
                        </div>
                        <hr/>
                        <div class="total-bill">
                            <span>Tổng: {{item.total | filterPrice}}đ</span>
                        </div>
                    </div>
                    <div class="right-bill col-4">
                        <div>
                            <span class="title-right-bill">Phương thức thanh toán: </span>
                            <span>{{item.typePay == "cash" ? "Tiền mặt" : "Paypal"}}</span>
                        </div>
                        <div>
                            <span class="title-right-bill">Thời gian: </span>
                            <span>{{item.dateOrder.slice(8,10)}}-{{item.dateOrder.slice(5,7)}}-{{item.dateOrder.slice(0,4)}}</span>
                        </div>
                        <div>
                            <span class="title-right-bill">Địa chỉ giao hàng: </span>
                            <span>{{item.address}}</span>
                        </div>
                        <input type="button" value="Hủy đơn hàng" @click="onCancelOrer(item.id, item)">
                    </div>
                </div>
            </div>
            <div class="sale-unconfirmed">
                <h5>Đơn hàng đã xác nhận</h5>
                <!-- {{listOrder.filter(item => item.statusOrder == "confirmed")}} -->
                <div class="empty" v-if="listOrder.filter(item => item.statusOrder == 'confirmed').length==0">
                    Không có đơn nào
                </div>
                <div 
                    class="row"
                    v-for="(item, key) in listOrder.filter(item => item.statusOrder == 'confirmed')" 
                    :key="key"
                >
                    <p class="col-2 title-right-bill">Đơn hàng số {{key+1}}</p>
                    <div class="left-bill col-6">
                        <div v-for="(productOrder,key) in item.listProductOrder" :key="key">
                            <div>
                                <img :src="productDetail.filter(item1 => item1.id == productOrder.idProduct)[0].image" alt="">
                            </div>
                            <div>
                                <span class="title-product">{{productDetail.filter(item1 => item1.id == productOrder.idProduct)[0].title}}</span>
                            </div>
                            <div>
                                <p class="count-product">x{{productOrder.amount}}</p>
                                <p>{{productOrder.price*productOrder.amount | filterPrice}}đ</p>
                            </div>
                        </div>
                        <hr/>
                        <div class="total-bill">
                            <span>Tổng: {{item.total | filterPrice}}đ</span>
                        </div>
                    </div>
                    <div class="right-bill col-4">
                        <div>
                            <span class="title-right-bill">Phương thức thanh toán: </span>
                            <span>{{item.typePay == "cash" ? "Tiền mặt" : "Paypal"}}</span>
                        </div>
                        <div>
                            <span class="title-right-bill">Thời gian: </span>
                            <span>{{item.dateOrder.slice(8,10)}}-{{item.dateOrder.slice(5,7)}}-{{item.dateOrder.slice(0,4)}}</span>
                        </div>
                        <div>
                            <span class="title-right-bill">Địa chỉ giao hàng: </span>
                            <span>{{item.address}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sale-unconfirmed">
                <h5>Đơn hàng đã giao</h5> 
                <!-- {{listOrder.filter(item => item.statusOrder == "done")}} -->
                <div class="empty" v-if="listOrder.filter(item => item.statusOrder == 'done').length==0">
                    Không có đơn nào
                </div>
                <div 
                    class="row"
                    v-for="(item, key) in listOrder.filter(item => item.statusOrder == 'done')" 
                    :key="key"
                >
                    <p class="col-2 title-right-bill">Đơn hàng số {{key+1}}</p>
                    <div class="left-bill col-6">
                        <div v-for="(productOrder,key) in item.listProductOrder" :key="key">
                            <div>
                                <img :src="productDetail.filter(item1 => item1.id == productOrder.idProduct)[0].image" alt="">
                            </div>
                            <div>
                                <span class="title-product">{{productDetail.filter(item1 => item1.id == productOrder.idProduct)[0].title}}</span>
                            </div>
                            <div>
                                <p class="count-product">x{{productOrder.amount}}</p>
                                <p>{{productOrder.price*productOrder.amount | filterPrice}}đ</p>
                            </div>
                        </div>
                        <hr/>
                        <div class="total-bill">
                            <span>Tổng: {{item.total | filterPrice}}đ</span>
                        </div>
                    </div>
                    <div class="right-bill col-4">
                        <div>
                            <span class="title-right-bill">Phương thức thanh toán: </span>
                            <span>{{item.typePay == "cash" ? "Tiền mặt" : "Paypal"}}</span>
                        </div>
                        <div>
                            <span class="title-right-bill">Thời gian: </span>
                            <span>{{item.dateOrder.slice(8,10)}}-{{item.dateOrder.slice(5,7)}}-{{item.dateOrder.slice(0,4)}}</span>
                        </div>
                        <div>
                            <span class="title-right-bill">Địa chỉ giao hàng: </span>
                            <span>{{item.address}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        <!-- {{listOrder}} -->
    </div>
</template>
<script>
import '../scss/SaleUser.scss'
import {RepositoryFactory} from '../api/RepositoryFactory';
const PostsRepository = RepositoryFactory.communicationAPI('posts')
export default {
    data() {
        return {
            listOrder: [],
            idUser: sessionStorage.getItem('id'),
            productDetail: []
        }
    },
    created(){
        this.getOrder()
        this.getProductDetail()
    },
    filters : {
        filterPrice : function(data) {
            return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            // toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        }
    },
    methods:{
        onCancelOrer(id, listOrder){
            this.productDetail.forEach(item =>{
                listOrder.listProductOrder.forEach(elem =>{
                    if(item.id == elem.idProduct){
                    const newCount = item.product_amount + elem.amount
                    const newQuantitySold = item.quantity_sold - elem.amount
                    const newElem = {
                        ...item,
                        product_amount: newCount,
                        quantity_sold: newQuantitySold
                    }
                    this.updateProductDetail(item.id, newElem)
                    }
                })
            })
            this.deleteOrder(id)
            this.getOrder()
            this.getProductDetail()
        },
        async getOrder(){
            const {data} = await PostsRepository.getOrder();
            this.listOrder = data.filter(item => item.idUser == this.idUser)
            console.log(data);
        },
        async getProductDetail(){
            const {data} = await PostsRepository.getProductDetail();
            this.productDetail = data
        },
        async deleteOrder(id){
            const {data} = await PostsRepository.deteleOrder(id);
            this.listOrder = data
        },
        async updateProductDetail(id,payload) {
            const { data } = await PostsRepository.updateProductDetail(id,payload);
            this.productDetail = data;
        },
    }
}
</script>

<style scoped>

</style>