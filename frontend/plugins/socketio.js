import Vue from 'vue'
import store from './../store'
import VueSocketio from 'vue-socket.io'
Vue.use(VueSocketio, 'http://localhost:4333', store)
