<template>
  <div class="toast" v-show="isShow">
    {{message}}
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    props: {
      // message: {
      //   type: String,
      //   default: ''
      // },
      // isShow: {
      //   type: Boolean,
      //   default: false
      // }
    },
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      // 弹窗的显示隐藏
      showToast(message, duration=1500) { //设置duration
        this.isShow = true,
        this.message = message,

        setTimeout(() => {
          this.isShow = false,
          this.message = ''
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, .6);
    font-size: 13px;
    color: #fff;
    padding: 8px 10px;
  }
</style>