// 配置映射表
import Vue from 'vue'
import VueRouter from 'vue-router'

// 对路由相应的文件进行懒加载
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')


// 1.安装插件
Vue.use(VueRouter)

// 2.1 创建映射表
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home, // 又在这里犯错哦, 这里component不用加‘s’
    meta: {show: true} //利用路由原信息 设置meta，用于控制页面是否显示 NavBar组件
  },
  {
    path: '/category', 
    component: Category,
    meta: {show: true}
  },
  {
    path: '/cart',
    component: Cart,
    meta: {show: true}
  },
  {
    path: '/profile',
    component: Profile,
    meta: {show: true}
  },
  {
    path: '/detail/:iid',// :iid 给路由动态绑定iid参数
    component: Detail
  }
]

// 2.创建路由对象 
const router = new VueRouter({
  routes,
  mode: 'history'
})

// 3.导出router
export default router