<template>
  <div id="app">
    <Header style="margin-top: -150px"/>
    <BackToTop/>
    <router-view style="margin-top: 150px"/>
  </div>
</template>

<script>
import Header from './layout/Header.vue'
import '../src/scss/App.scss'
import BackToTop from './components/BackToTop.vue'
export default {
  name: 'App',
  components: {
    Header,
    BackToTop
  }
}
</script>

<style>
</style>
