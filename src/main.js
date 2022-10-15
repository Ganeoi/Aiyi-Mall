import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入toast组件
import toast from 'components/common/toast'

// 导入fastclick插件
import FastClick from 'fastclick'

// 导入图片懒加载插件
import VueLazyLoad from 'vue-lazyload'


Vue.config.productionTip = false

// 创建vue实例，作为事件总线 赋值给$bus
Vue.prototype.$bus = new Vue()

// 安装toast组件
// 此时，在启动main.js入口文件时，就会调用toast中的install函数）
Vue.use(toast)

// 调用fastclick中的attach函数
FastClick.attach(document.body)

// 安装vue-lazyload插件
Vue.use(VueLazyLoad, {
  loading: require('assets/img/common/placeholder.png'), // 设置图片正在加载时的占位图片
  preload: 0.8
})


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
