<template>
  <div id="app">
    <Header style="margin-top: -150px;"/>
    <BackToTop/>
     
    <router-view style="margin-top: 150px"/>
  </div>
</template>

<script>
import Header from './layout/Header.vue'
import '../src/scss/App.scss'
import BackToTop from './components/BackToTop.vue'
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'App',
  components: {
    Header,
    BackToTop
  },
  // created(){
  //   window.scrollTo(0,0)
  // },
  mounted() {
    this.authAction();
  },
  computed: {
    ...mapGetters(["getUser", "isUserAuth"])
  },
  methods: {
    ...mapActions(["authAction"])
  }
}
</script>

<style>
</style>
