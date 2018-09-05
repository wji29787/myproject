// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router';
import axios from 'axios';
import '../../assets/css/base.css';
import layer from '../../components/v-layer'
Vue.config.productionTip = false ;
axios.defaults.baseURL='http://192.168.95.252:3000';
axios.defaults.headers['Access-Control-Allow-Origin']='*';
Vue.prototype.$http=axios;
Vue.use(layer);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
