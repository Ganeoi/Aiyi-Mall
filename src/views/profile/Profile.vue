<template>
  <div id="profile">
    <nav-bar class="profile-nav"><div slot="center">我的</div></nav-bar>
    <user-info></user-info>
    <!-- purse钱包 -->
    <div class="purse">
      <div class="purse-item">
        <div class="number">
          <span>0.00</span>元
        </div>
        <div class="purse-info">我的余额</div>
      </div>
      <div class="purse-item">
        <div class="number">
          <span>0</span>个
        </div>
        <div class="purse-info">我的优惠</div>
      </div>
      <div class="purse-item">
        <div class="number">
          <span>0</span>分
        </div>
        <div class="purse-info">我的积分</div>
      </div>
    </div>
    <list-view :list-data="messageList"></list-view>
    <list-view :list-data="serviceList"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import UserInfo from './childComps/UserInfo'
  import ListView from './childComps/ListView'

  export default {
    name: 'Profile',
    components: {
      NavBar,
      UserInfo,
      ListView
    },
    data() {
      return {
        messageList:[
        {icon: '#order', iconColor: '#ff8198', info: '我的消息'},
        {icon: '#point', iconColor: '#fc7b53', info: '积分商城'},
        {icon: '#vip', iconColor: '#ffc636', info: '会员卡'}
        ],
        serviceList: [
          {icon: '#service', iconColor: '#ff8198', info: '我的购物车'},
          {icon: '#download', iconColor: '#ff8198', info: '下载购物APP'}
        ]
      }
    }
  }
</script>

<style scoped>
  #profile {
    background-color: #f2f2f2;
  }
  .profile-nav {
    color: #fff;
    background-color: var(--color-tint);
  }
  .purse {
    display: flex;
    height: 110px;
    text-align: center;
    /* background-color: #f2f2f2; */
    padding-bottom: 10px;
  }
  .purse-item {
    flex: 1;
    margin-right: 1px;
    padding: 18px;
    font-size: 13px;
    color: #666;
    background-color: #fff;
  }
  .purse-item:last-child {
    margin-right: 0;
  }
  .number {
    margin-bottom: 5px;
  }
  .number span {
    color: #ff5f3e;
    font-size: 24px;
    font-weight: 700;
  }
</style>