<template>
  <div class="cart-list">
    <div v-for="(item, index) in cartList" :key="index">
      <cart-list-item :product="item"/>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import CartListItem from './CartListItem';

  export default {
    name: 'CartList',
    components: {
      CartListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    }
  }
</script>