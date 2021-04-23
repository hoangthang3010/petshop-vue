<template>
    <div class="creaccuser">
        <h3 class="creaccuser__title">Đăng kí tài khoản</h3>
        <tr class="infouser__body__right__bottom__info row">
            <td class="infouser__body__right__bottom__info__ileft col-4">Tên đăng nhập</td>
            <td class="infouser__body__right__bottom__info__iright col-8">
                <input v-model="account.username" class="infouser__body__right__bottom__info__iright--input" type="text">
            </td>
        </tr>
        <tr class="infouser__body__right__bottom__info row">
            <td class="infouser__body__right__bottom__info__ileft col-4">Tên</td>
            <td class="infouser__body__right__bottom__info__iright col-8">
                <input v-model="account.fullname" class="infouser__body__right__bottom__info__iright--input" type="text">
            </td>
        </tr>
        <tr class="infouser__body__right__bottom__info row">
            <td class="infouser__body__right__bottom__info__ileft col-4">Email</td>
            <td class="infouser__body__right__bottom__info__iright col-8">
                <input v-model="account.email" class="infouser__body__right__bottom__info__iright--input" type="text">
            </td>
        </tr>
        <tr class="infouser__body__right__bottom__info row">
            <td class="infouser__body__right__bottom__info__ileft col-4">Số điện thoại</td>
            <td class="infouser__body__right__bottom__info__iright col-8">
                <input v-model="account.phonenumber" class="infouser__body__right__bottom__info__iright--input" type="text">
            </td>
        </tr>
        <tr class="infouser__body__right__bottom__info row">
            <td class="infouser__body__right__bottom__info__ileft col-4">Giới tính</td>
            <td class="infouser__body__right__bottom__info__iright col-8">
                <div class="infouser__body__right__bottom__info__iright--radio">
                    <input type="radio" name="sex" id="orther" v-model="account.sex" value="2"><label for="orther">Khác</label>
                    <input type="radio" name="sex" id="male" v-model="account.sex" value="0"><label for="male">Nam</label>
                    <input type="radio" name="sex" id="female" v-model="account.sex" value="1"><label for="female">Nữ</label>
                </div>&nbsp;
            </td>
        </tr>
        <tr class="infouser__body__right__bottom__info row">
            <td class="infouser__body__right__bottom__info__ileft col-4">Ngày sinh</td>
            <td class="infouser__body__right__bottom__info__iright col-8">
                    <!-- <select class="selcect" id="cars">
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
                    </select> -->
            </td>
        </tr>
        <tr class="infouser__body__right__bottom__info row">
            <td class="infouser__body__right__bottom__info__ileft col-4">Mật khẩu</td>
            <td class="infouser__body__right__bottom__info__iright col-8">
                <input v-model="account.password" class="infouser__body__right__bottom__info__iright--input" type="text">
            </td>
        </tr>
        <tr class="infouser__body__right__bottom__info row">
            <td class="infouser__body__right__bottom__info__ileft col-4">Nhập lại mật khẩu</td>
            <td class="infouser__body__right__bottom__info__iright col-8">
                <input v-model="account.repassword" class="infouser__body__right__bottom__info__iright--input" type="text">
            </td>
        </tr>
        <tr>
            <td><button @click="creaccuser">Tạo</button></td>
            <td><button>Hủy</button></td>
        </tr>
    </div>
</template>
<script>
import {RepositoryFactory} from '../api/RepositoryFactory';
const PostsRepository = RepositoryFactory.communicationAPI('posts')
export default {
    data(){
        return{
            account: {
                sex: '',
                fullname: '',
                username: '',
                birthday: '',
                email: '',
                phonenumber: '',
                password: '',
                repassword: ''
            }
        }
    },
    // created(){
    //     this.fetch()
    // },
    methods:{
        creaccuser(){
            // console.log(this.account);
            this.createAccount()
        },
        async createAccount(){
            const {data} = await PostsRepository.createAccount(this.account);
            this.productDetail = data
        }
    }
}
</script>
<style scoped lang="scss">
.creaccuser{
    padding-top: 20px;
    width: 30%;
    margin: auto;
    &__title{
        border-left: 1px solid rgb(208, 208, 208);
        padding: 8px 0px;
        text-align: center;
        background-color: orange;
        color: white;
    }
}
</style>