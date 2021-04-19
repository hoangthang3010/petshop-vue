<template>
    <div class="userlogin">
        <div class="userlogin__box">
            <h2 class="userlogin__box__title">Đăng nhập</h2>
            <!-- <div> -->
            <div class="userlogin__box__main">
                <p class="userlogin__box__main__title">Tên đăng nhập hoặc địa chỉ email *</p>
                <input class="userlogin__box__main--input" 
                    v-model="username" 
                    @change="handleUsername" 
                    type="text"
                >
                <p class="userlogin__box__main__title">Mật khẩu *</p>
                <input class="userlogin__box__main--input" 
                    @change="handlePassword()" 
                    v-model="password" 
                    type="text"
                >
                <!-- </div> -->
            </div>
            <div class="userlogin__box__memo">
                <input class="userlogin__box__memo--checkbox" type="checkbox" name="" id="">
                <span class="userlogin__box__memo__title">Ghi nhớ mật khẩu</span>
            </div>
            <div class="userlogin__box__login">
                <button 
                    class="userlogin__box__login--submit" 
                    @click="handleLogin({
                        username: username,
                        password: password
                    })"
                >
                    Đăng nhập
                </button>
                <p class="userlogin__box__login__forget">Quên mật khẩu?</p>
            </div>
        </div>
    </div>
</template>
<script>
import '../scss/Login.scss'
import { mapMutations} from 'vuex'
export default {
    data(){
        return{
            username: '',
            password: ''
        }
    },
    methods:{
        ...mapMutations(['handleLogin']),
        handleUsername(){
            console.log(this.username);
        },
        handlePassword(){console.log(this.password);
        },
        // handleLogin(){
            // for(let i=0; i<this.users.length; i++){
            //     if(this.users[i].username == this.username && this.users[i].password == this.password){
            //         return this.$router.push("/")
            //         // alert("Đăng nhập thành công")
            //     }
            // }
        // }
    },
}
</script>