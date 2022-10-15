<template>
  <div class='select-btn' :class="{'select': isSelect}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: 'SelectButton',
    props: {
      isSelect: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .select-btn {
    position: relative;
    top: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    overflow: hidden;
  }
  .select-btn img {
    position: absolute;
    top: -1px;
  }
  .select {
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>