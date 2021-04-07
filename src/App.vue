<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/header/Header.vue'
import './App.scss'
export default {
  name: 'App',
  components: {
    Header
  }
}</script>

<style>
</style>
