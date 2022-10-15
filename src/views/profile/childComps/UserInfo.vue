<template>
  <div class="profile">
    <div id="user-info">
      <div class="user-icon">
        <img src="~assets/img/profile/user-icon.jpg" alt="">
      </div>
      <div class="log-info">
        <div class="login">登录/注册</div>
        <div class="phone">
          <span>
            <svg data-v-735ff1be="" fill="#fff" class="icon-mobile"><use data-v-735ff1be="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use></svg>
          </span>
          <div class="user-phone">
            <slot>暂无绑定手机号</slot>            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UserInfo'
  }
</script>

<style scoped>
  #user-info {
    display: flex;
    height: 100px;
    align-items: center;
    color: var(--color-background);
    background-color: #ff8198;
  }
  .user-icon {
    width: 70px;
    height: 70px;
    margin: 0 10px 0 20px;
  }
  .user-icon img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .login {
    font-size: 18px;
    margin-bottom: 5px;
  }
  .phone {
    position: relative;
    font-size: 12px;
  }
  .phone .icon-mobile{
    position: absolute;
    width: 12px;
    height: 18px;
    left: 0;
    top: 0px;
  }
  .phone .user-phone{
    margin-left: 19px;
  }
</style>