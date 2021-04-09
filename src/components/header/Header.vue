<template>
  <div class="header">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div class="header__top" id="header1">
      <div class="header__top__left col-3">
        <router-link :to="'/'">
          <img class="header__top__left__image" src="https://dogily.vn/wp-content/uploads/2020/07/dogily-logo.png"/>  
        </router-link> 
      </div>
      <div class="header__top__mid col-6">
        <div class="header__top__mid__search col-8">
          <input class="header__top__mid__search__item" type="text"/>
        </div>
        <div class="header__top__mid__clientcare col-4">
          <a-icon class="col-5" style="fontSize: 60px; margin: auto" type="customer-service"  theme="twoTone" two-tone-color="#FFA500"/>
          <span class="header__top__mid__clientcare__title col-7">Hỗ trợ 
            khách hàng</span>
        </div>
      </div>
      <div class="header__top__right col-3">
        <router-link  
          class="header__top__right__cart col-6" 
          to="/card"
          style="text-decoration: none; color: black;"
        >
          <!-- <div> -->
            <a-icon class="header__top__right__cart__icon" type="shopping-cart" />
            <span class="header__top__right__cart__title">&nbsp;Giỏ hàng()</span>
            <!-- <md-button class="md-primary">Primary</md-button> -->
          <!-- </div> -->
        </router-link>
        <div class="header__top__right__login col-6">
          <a-icon style="fontSize: 30px"  type="user" />
          <span class="header__top__right__login__title">Đăng nhập</span>
        </div>
      </div>
    </div>
    <div class="header__bottom" v-on:scroll.passive="handleScroll">
      
    </div>
  </div>
</template>
<script>
import './Header.scss'
// import { Button } from 'ant-design-vue';
export default {
  methods:{
    // let mybutton = document.getElementById("header1");
    // window.onscroll = function() {scrollFunction()};
    handleScroll: function(e) {
      if ((e.target.scrollHeight-300) <= e.target.scrollTop) {
      alert('hihi');
      }
    }
  }
}
</script>