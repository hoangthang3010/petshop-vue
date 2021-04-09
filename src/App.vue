<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from './layout/Header.vue'
import '../src/scss/App.scss'
export default {
  name: 'App',
  components: {
    Header
  }
}</script>

<style>
</style>
