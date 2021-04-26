<template>
  <div style="position: fixed; z-index: 100; width:100%;">
    <div id="app" class="header">
      <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> -->
      <div class="header__top" id="header1" :style="`margin-top: ${-height}px`"  v-show="!visible">
        <div class="header__top__left col-3">
          <router-link :to="'/'">
            <img class="header__top__left__image" src="https://jandpet.com.vn/wp-content/uploads/2018/07/JPet-logo-01.png"/>  
          </router-link> 
        </div>
        <div class="header__top__mid col-6">
          <div class="header__top__mid__search col-8">
            <input class="header__top__mid__search__item" type="text"/>
          </div>
          <div class="header__top__mid__clientcare col-4">
            <font-awesome-icon 
              class="header__top__mid__clientcare__icon"
              :icon="['fas', 'headset']" 
              size="4x" 
              color="orange"
            />
            <!-- <a-icon class="col-5" style="fontSize: 60px; margin: auto" type="customer-service"  theme="twoTone" two-tone-color="#FFA500"/> -->
            <span class="header__top__mid__clientcare__title col-8">Hỗ trợ 
              khách hàng</span>
          </div>
        </div>
        <div class="header__top__right col-3">
          <router-link 
            class="header__top__right__cart col-5" 
            to="/cart"
            style="text-decoration: none; color: black;"
          >
            <!-- <div> -->
              <font-awesome-icon :icon="['fas', 'shopping-cart']" size="2x" />
              <!-- <a-icon class="header__top__right__cart__icon" type="shopping-cart" /> -->
              <!-- &nbsp; -->
              <span class="header__top__right__cart__title">Giỏ hàng({{product.length}})</span>
              <!-- <md-button class="md-primary">Primary</md-button> -->
            <!-- </div> -->
          </router-link>
          <router-link
            v-if="fullname"
            class="header__top__right__login col-7"
            to="/info_user"
            style="text-decoration: none; color: black;"
          >
            <font-awesome-icon :icon="['fas', 'user']" size="2x" />
            <!-- <a-icon style="fontSize: 30px"  type="user" /> -->
            <span class="header__top__right__login__title">{{fullname}}</span>
          </router-link>
          <router-link
            v-else
            class="header__top__right__login col-6"
            to="/user_login"
            style="text-decoration: none; color: black;"
          >
            <font-awesome-icon :icon="['fas', 'user']" size="2x" />
            <!-- <a-icon style="fontSize: 30px"  type="user" /> -->
            <span class="header__top__right__login__title">Đăng nhập</span>
          </router-link>
        </div>
      </div>
      <div class="header__bottom">
        <!-- <div class="header__bottom__"></div> -->
        <div class="header__bottom__menu">
          <router-link style="background-color: orange" :to="'/'" v-show="visible">
             <font-awesome-icon :icon="['fas', 'home']" style="color: white; background-color: orange" size="3x" />
          </router-link> 
          <ul class="header__bottom__menu__ul">
            <li class="header__bottom__menu__ul__li">GIỚI THIỆU</li>
            <router-link style="text-decoration: none" to="/product/all">
              <li class="header__bottom__menu__ul__li">SẢN PHẨM</li>
            </router-link>
            <router-link style="text-decoration: none" to="/panigation">
            <li class="header__bottom__menu__ul__li">TIN TỨC</li>
            </router-link>
            <li class="header__bottom__menu__ul__li">LIÊN HỆ</li>
            <li class="header__bottom__menu__ul__li">VIDEO</li>
          </ul>
          <router-link
            class="header__bottom__menu__cart"
            v-show="visible"  
            to="/cart"
            style="text-decoration: none;"
          >
              <font-awesome-icon :icon="['fas', 'shopping-cart']" color="white" size="3x" />
              <span class="header__bottom__menu__cart__title">&nbsp;Giỏ hàng({{product.length}})</span>
          </router-link>
        </div>
      </div>
    </div>
    <!-- <div class="headerhide" v-show="visible">
    
    </div> -->
  </div>
</template>
<script>
import '../scss/Header.scss'
// import Vue from 'vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Header',
  data () {
    return {
      height: 0,
      visible: false,
      fullname: sessionStorage.getItem('fullname')
    }
  },
  created(){
    this.$bus.on('increaseCounter', value => {
                this.fullname = value
            })
  },
  computed: mapGetters(['product']),
  methods: {
    scrollListener: function () {
      // console.log(window.scrollY);
      if( window.scrollY <=100)this.height = window.scrollY
      this.visible = window.scrollY > 100
      // if (window.scrollY> 100) return 
    },
  },
  mounted: function () {
    window.addEventListener('scroll', this.scrollListener)
  },
  beforeDestroy: function () {
    window.removeEventListener('scroll', this.scrollListener)
  }
}
</script>