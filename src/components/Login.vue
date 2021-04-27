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
                    class="userlogin__box__login--sign_in" 
                    @click="handleLogin()"
                >
                    Đăng nhập
                </button>
                
                    <!-- @click="handleCreateAccountUser()" -->
                <router-link to="/create_account_user">
                    <button 
                        class="userlogin__box__login--sign_up" 
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
// import axios from 'axios'
// import {API_URL} from '../.env.js'
import {RepositoryFactory} from '../api/RepositoryFactory';
const PostsRepository = RepositoryFactory.communicationAPI('posts')
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
                        this.$notification['success']({
                            message: 'Đăng nhập thành công',
                            description:
                            `Chào ${this.username}`,
                            duration: 2,
                            style: {
                                marginTop: `75px`,
                                marginBottom: '-50px'
                            },
                        }),
                        sessionStorage.setItem('id', this.users[i].id)
                    )
                }
                // else if((this.users[i].username == this.username || this.users[i].email == this.username) && this.users[i].password !== this.password){
                //     return( 
                //         this.$notification['error']({
                //             message: 'Mật khẩu sai',
                //             description:
                //             'Vui lòng nhập lại mật khẩu.',
                //             duration: 2,
                //             style: {
                //                 marginTop: `75px`,
                //                 marginBottom: '-50px'
                //             },
                //         }),
                //         this.checkUser = i
                //     )
                // }
                // else if((this.users[i].username !== this.username || this.users[i].email !== this.username) && this.users[i].password === this.password){
                //     return(
                //         this.$notification['error']({
                //             message: 'Tên đăng nhập/email hoặc mật khẩu sai',
                //             description:
                //             '',
                //             duration: 2,
                //             style: {
                //                 marginTop: `75px`,
                //                 marginBottom: '-50px'
                //             },
                //         }),
                //         this.checkUser = i
                //     )
                // }
                else this.checkUser = ''
            }
            if (this.checkUser === '') {
                this.$notification['error']({
                    message: 'Tên đăng nhập/email hoặc mật khẩu sai',
                    description:
                    'Vui lòng nhập lại tên đăng nhập/email hoặc mật khẩu',
                    duration: 2,
                    style: {
                        marginTop: `75px`,
                        marginBottom: '-50px'
                    },
                });
            }       
        },
        async fetchAccount(){
            const {data} = await PostsRepository.getAccount();
            this.users = data
        }
    },
    created(){
        this.fetchAccount()
    },
}
</script>


                        // sessionStorage.setItem('username',this.users[i].username),
                        // sessionStorage.setItem('role',this.users[i].role),
                        // sessionStorage.setItem('fullname',this.users[i].fullname),
                        // sessionStorage.setItem('email',this.users[i].email),
                        // sessionStorage.setItem('phonenumber',this.users[i].phonenumber),
                        // sessionStorage.setItem('birthday',this.users[i].birthday),
                        // sessionStorage.setItem('old',this.users[i].old),
                        // sessionStorage.setItem('sex',this.users[i].sex)