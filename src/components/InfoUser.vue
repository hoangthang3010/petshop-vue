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
                                <input v-model="username" class="infouser__body__right__bottom__info__iright--input" type="text">
                            </td>
                        </tr>
                        <tr class="infouser__body__right__bottom__info row">
                            <td class="infouser__body__right__bottom__info__ileft col-3">Tên</td>
                            <td class="infouser__body__right__bottom__info__iright col-9">
                                <input v-model="fullname" class="infouser__body__right__bottom__info__iright--input" type="text">
                            </td>
                        </tr>
                        <tr class="infouser__body__right__bottom__info row">
                            <td class="infouser__body__right__bottom__info__ileft col-3">Email</td>
                            <td class="infouser__body__right__bottom__info__iright col-9">
                                <input v-model="email" class="infouser__body__right__bottom__info__iright--input" type="text">
                            </td>
                        </tr>
                        <tr class="infouser__body__right__bottom__info row">
                            <td class="infouser__body__right__bottom__info__ileft col-3">Số điện thoại</td>
                            <td class="infouser__body__right__bottom__info__iright col-9">
                                <input v-model="phonenumber" class="infouser__body__right__bottom__info__iright--input" type="text">
                            </td>
                        </tr>
                        <tr class="infouser__body__right__bottom__info row">
                            <td class="infouser__body__right__bottom__info__ileft col-3">Giới tính</td>
                            <td class="infouser__body__right__bottom__info__iright col-9">
                                <div class="infouser__body__right__bottom__info__iright--radio">
                                    <input type="radio" name="sex" id="orther" >Khác &nbsp;
                                    <input type="radio" name="sex" id="male">Nam &nbsp;
                                    <input type="radio" name="sex" id="female">Nữ &nbsp;
                                </div>&nbsp;
                            </td>
                        </tr>
                        <tr class="infouser__body__right__bottom__info row">
                            <td class="infouser__body__right__bottom__info__ileft col-3">Ngày sinh</td>
                            <td class="infouser__body__right__bottom__info__iright col-9"></td>
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
            </div>
        </div>
    </div>
</template>
<script>
import '../scss/InfoUser.scss'
export default {
    data(){
        return{
            username: sessionStorage.getItem('username'),
            fullname: sessionStorage.getItem('fullname'),
            email: sessionStorage.getItem('email'),
            phonenumber: sessionStorage.getItem('phonenumber'),
        }
    },
    methods:{
        del(){
        this.$router.push("/"),
        this.$bus.emit('increaseCounter', null),
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('fullname');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('phonenumber');
        sessionStorage.removeItem('birthday');
        sessionStorage.removeItem('old');
        sessionStorage.removeItem('sex');
        sessionStorage.removeItem('picture');
        }
    }
}
</script>