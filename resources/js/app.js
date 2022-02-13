/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import router from './router.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuetify from './plugins/vuetify.js'
import MenuBar from './components/MenuBar.vue'
Vue.use(VueAxios, axios)

const app = new Vue({
  router,
  el: '#app',
  vuetify: Vuetify,
  components: {
    MenuBar
  },
});
