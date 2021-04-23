<template>
    <div class="infouser">
        <div class="infouser__body">
            <div class="infouser__body__left col-3">
                <div class="infouser__body__left__profile">
                    <img class="col-3" src="ádaSD" alt="dsdf"/>
                    <div class="col-9">
                        <h4>hoangthang3010</h4>
                        <p>Sửa hồ sơ</p>
                    </div>
                </div>
                <hr/>
                <div>Tài khoản của tôi</div>
                <div>Đơn mua</div>
                <div>Thông báo</div>
                <button @click="del">Đăng xuất</button>
            </div>
            <div class="infouser__body__right col-9">
                <div class="infouser__body__right__title">
                    <h4>Hồ Sơ Của Tôi</h4>
                    <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                </div>  
                <hr/>
                <div class="infouser__body__right__bottom">
                    <div class="col-8">
                        <tr class="infouser__body__right__bottom__info row">
                            <td class="infouser__body__right__bottom__info__ileft col-3">Tên đăng nhập</td>
                            <td class="infouser__body__right__bottom__info__iright col-9">
                                <input v-model="user.username" class="infouser__body__right__bottom__info__iright--input" type="text">
                            </td>
                        </tr>
                        <tr class="infouser__body__right__bottom__info row">
                            <td class="infouser__body__right__bottom__info__ileft col-3">Tên</td>
                            <td class="infouser__body__right__bottom__info__iright col-9">
                                <input v-model="user.fullname" class="infouser__body__right__bottom__info__iright--input" type="text">
                            </td>
                        </tr>
                        <tr class="infouser__body__right__bottom__info row">
                            <td class="infouser__body__right__bottom__info__ileft col-3">Email</td>
                            <td class="infouser__body__right__bottom__info__iright col-9">
                                <input v-model="user.email" class="infouser__body__right__bottom__info__iright--input" type="text">
                            </td>
                        </tr>
                        <tr class="infouser__body__right__bottom__info row">
                            <td class="infouser__body__right__bottom__info__ileft col-3">Số điện thoại</td>
                            <td class="infouser__body__right__bottom__info__iright col-9">
                                <input v-model="user.phonenumber" class="infouser__body__right__bottom__info__iright--input" type="text">
                            </td>
                        </tr>
                        <tr class="infouser__body__right__bottom__info row">
                            <td class="infouser__body__right__bottom__info__ileft col-3">Giới tính</td>
                            <td class="infouser__body__right__bottom__info__iright col-9">
                                <div class="infouser__body__right__bottom__info__iright--radio">
                                    <input type="radio" name="sex" id="orther" v-model="user.sex" value="2"><label for="orther">Khác</label>
                                    <input type="radio" name="sex" id="male" v-model="user.sex" value="0"><label for="male">Nam</label>
                                    <input type="radio" name="sex" id="female" v-model="user.sex" value="1"><label for="female">Nữ</label>
                                </div>&nbsp;
                            </td>
                        </tr>
                        <tr class="infouser__body__right__bottom__info row">
                            <td class="infouser__body__right__bottom__info__ileft col-3">Ngày sinh</td>
                            <td class="infouser__body__right__bottom__info__iright col-9">
                                    <select class="selcect" id="cars">
                                        <option :value="user.birthday.slice(-10,-8)">{{user.birthday.slice(-10,-8)}}</option>
                                        <option  v-for="(index, key) in 31" :key="key" :value="index">{{index}}</option>
                                    </select>
                                    <select id="cars">
                                        <option :value="user.birthday.slice(-7,-5)">{{user.birthday.slice(-7,-5)}}</option>
                                        <option  v-for="(index, key) in 12" :key="key" :value="index">{{index}}</option>
                                    </select>
                                    <select id="cars">
                                        <option :value="user.birthday.slice(-4)">{{user.birthday.slice(-4)}}</option>
                                        <option v-for="(index, key) in date.getFullYear()" :key="key" :value="index">{{index}}</option>
                                    </select>
                            </td>
                        </tr>
                    </div>
                    <div class="infouser__body__right__bottom__image col-4">
                        <!-- <div class="infouser__body__right__bottom__"> -->
                            <div class="infouser__body__right__bottom__image__avatar">
                                <img src="sdfgsdf" alt="sdfsdf">
                            </div>
                            <button>Chọn ảnh</button>
                        <!-- </div> -->
                    </div>
                </div>
                <button @click="saveInfo">Lưu</button>
            </div>
        </div>
    </div>
</template>
<script>
import '../scss/InfoUser.scss'
import {RepositoryFactory} from '../api/RepositoryFactory';
const PostsRepository = RepositoryFactory.communicationAPI('posts')
export default {
    data(){
        return{
            user: [],
            id: sessionStorage.getItem('id'),
            date: new Date(),
        }
    },
    methods:{
        del(){
            this.$router.push("/"),
            this.$bus.emit('increaseCounter', null),
            sessionStorage.removeItem('id')
        },
        saveInfo(){
            // for(let i=-, i< )
            this.$bus.emit('increaseCounter', this.user.fullname),
            this.fetchUpdateAccount()
        },
        async fetch(){
            const {data} = await PostsRepository.getAccountId(this.id);
            this.user = data
            console.log(this.user);
        },
        async fetchUpdateAccount(){
            const {data} = await PostsRepository.updateAccount(this.id, this.user);
            this.user = data
            console.log(this.user);
        }
    },
    created(){
        this.fetch()
    },
}
</script>