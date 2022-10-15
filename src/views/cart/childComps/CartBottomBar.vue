<template>
  <div class="bottom-bar">
    <div class="select-all">
      <select-button class="bottom-select" :is-select="isSelectAll" @click.native="clickSelectAll"/>
      <span>全选</span>
    </div>
    <div class="calculate">合计:
      <span>￥</span>
      <span class="price">{{totalPrice}}</span>
    </div>
    <div class="goToBuy" @click="buyClick">去结算({{totalCount}})</div>
  </div>
</template>

<script>
  import SelectButton from './SelectButton'
  import { mapGetters } from 'vuex';

  export default {
    name: 'CartBottomBar',
    components: {
      SelectButton
    },
    computed: {
      ...mapGetters(['cartList', 'cartLength']),
      // 计算选中商品的总价格
      totalPrice() {
        return this.cartList.filter(item => { // item为cartList中的每一个元素
          return item.selected // 筛选出被选中的商品(即item.selected 为true的商品)
        }).reduce((preValue, item) => { // 对选出的商品进行 reduce函数处理，默认值为0，返回被选中商品总价格
          return preValue + item.price * item.count
        }, 0).toFixed(2) // 保留两位小数
      },
      // 计算选中商品的总数量
      totalCount() {
        return this.cartList.filter(item => {
          return item.selected
        }).reduce((preValue, item) => {
          return preValue + item.count
        }, 0)
      },
      // 根据购物车中商品的选中状态，改变全选按钮的状态
      isSelectAll() {
        // 1.设置默认情况(购物车中最初状态没有商品)，不选中、
        if(this.cartLength === 0) return false;

        // 2.判断购物车中的商品是否被全选中(多种判断方法)
        // 2.1 使用filter高阶函数判断
        // 实现思路: 先筛选是否有 没有被选中的商品，如果有 则长度不为0(true)，再取反(false), 把结果返回 改变isSelect
        // return !(this.cartList.filter(item => !item.selected).length)
        
        // 2.2 使用find高阶函数实现
        // 实现思路：先查找cartList中 是否有不被选中的，如果有则为true，再取反，为false
        // return !this.cartList.find(item => !item.selected)

        // 2.3 使用普通遍历实现
        for(let item of this.cartList) {
          if(!item.selected) {
            return false
          }
        }
        return true
      }
    },
    methods: {
      // 监听全选按钮的点击，控制全部商品的选中状态
      clickSelectAll() {
        // // 判断：可以直接根据上面的 isSelectAll 进行判断
        // // 如果全部商品被选中，点击一次，则全部状态改变为不被选中
        // // 如果全部/有一个不被选中，点击一次，则全部状态改变为被选中
        // // 使用forEach，全部符合时成立
        // if(this.isSelectAll) { // 全部选中的情况
        //   this.cartList.forEach(item => item.selected = false)
        // } else { // 有不被选中的情况
        //   this.cartList.forEach(item => item.selected = true)
        // }

        // 涉及到修改store中selected数据的状态，所以把该方法抽取到action中操作
        this.$store.dispatch('selectAll', this.isSelectAll)
      },
      buyClick() { // 如果没有商品被选中，点击去购买时，显示弹窗
        // if(!this.isSelectAll) {
        //   this.$toast.showToast('请选择购买商品')
        // }
        if(this.cartLength != 0 && this.cartList.filter(item => item.selected).length === 0 || this.cartLength === 0){
          this.$toast.showToast('请选择购买商品')
        }

      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    height: 36px;
    line-height: 36px;
    font-size: 15px;
    background-color: #fff;
    border-top: 1px solid #eee;
    z-index: 99;
  }
  .select-all {
    display: flex;
    align-items: center;
    width: 70px;
  }
  .select-all span {
    height: 30px;
    line-height: 33px;
  }
  .bottom-select {
    margin: 0 3px 0 8px;
  }
  .calculate {
    position: absolute;
    right: 100px;
  }
  .calculate span {
    font-size: 13px;
    color: #ff4800;
  }
  .calculate .price {
    font-size: 16px;
    font-weight: 700;
  }
  .goToBuy {
    position:absolute;
    right: 0;
    width: 90px;
    text-align: center;
    color: #fff;
    background-color: #ff8198;
    border-radius: 18px;
  }
</style>