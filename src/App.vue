<template>
  <div id="app">
    <!-- 防止被销毁，不保存detail组件的状态 -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <!-- v-show 进入详情页时，不显示NavBar组件 -->
    <main-tab-bar v-show="$route.meta.show"/>
    <icon></icon>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabbar/MainTabBar'

  // 使用svg标签
  import Icon from 'components/content/Icon/Icon'
  import SvgIcon from 'components/content/Icon/svg'

  export default {
    name: 'app',
    components: {
      MainTabBar,
      Icon,
      SvgIcon
    }
  }
</script>

<style>
  @import 'assets/css/base.css';
</style>
