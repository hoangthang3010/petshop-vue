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
                    @click="handleLogin()"
                >
                    Đăng nhập
                </button>
                
                    <!-- @click="handleCreateAccountUser()" -->
                <router-link to="/create_account_user">
                    <button 
                        class="userlogin__box__login--submit" 
                    >
                        Đăng kí
                    </button>
                </router-link>
                <p class="userlogin__box__login__forget">Quên mật khẩu?</p>
            </div>
        </div>
    </div>
</template>
<script>
import '../scss/Login.scss'
// import { mapMutations} from 'vuex'
import axios from 'axios'
import {API_URL} from '../.env.js'
export default {
    data(){
        return{
            users: [],
            username: '',
            password: '',
            checkUser: ''
        }
    },
    methods:{
        // ...mapMutations(['handleLogin']),
        handleUsername(){
            console.log(this.username);
        },
        handlePassword(){console.log(this.password);
        },
        handleLogin(){
            for(let i=0; i<this.users.length; i++){
                if((this.users[i].username == this.username || this.users[i].email == this.username) && this.users[i].password == this.password){
                    return (
                        this.$bus.emit('increaseCounter', this.users[i].fullname),
                        this.checkUser = i,
                        this.$router.push("/info_user"),
                        alert("Đăng nhập thành công"),
                        sessionStorage.setItem('id', this.users[i].id)
                        // sessionStorage.setItem('username',this.users[i].username),
                        // sessionStorage.setItem('role',this.users[i].role),
                        // sessionStorage.setItem('fullname',this.users[i].fullname),
                        // sessionStorage.setItem('email',this.users[i].email),
                        // sessionStorage.setItem('phonenumber',this.users[i].phonenumber),
                        // sessionStorage.setItem('birthday',this.users[i].birthday),
                        // sessionStorage.setItem('old',this.users[i].old),
                        // sessionStorage.setItem('sex',this.users[i].sex)
                    )
                }
                else if((this.users[i].username == this.username || this.users[i].email == this.username) && this.users[i].password !== this.password){
                    return( 
                        alert("Mật khẩu sai"),
                        this.checkUser = i
                    )
                }
                else if((this.users[i].username !== this.username || this.users[i].email !== this.username) && this.users[i].password == this.password){
                    return(
                        alert("Tên đăng nhập/email sai"),
                        this.checkUser = i
                    )
                }
                else this.checkUser = ''
            }
            if (this.checkUser === '') {
                alert("Tên đăng nhập/email và mật khẩu sai")
                
            }       
        }
    },
    mounted () {
        axios.get(`${API_URL}/account`)
            .then(response => {
                this.users = response.data
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
    }
}
</script>