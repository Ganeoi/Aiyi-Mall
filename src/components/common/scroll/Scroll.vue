<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
      <!-- 注意：使用于Dom局部滚动时，需要给实现滚动的父盒子设置固定高度（可以把scroll组件作为父盒子，设置高度） -->
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';

  export default {
    name: 'Scroll',
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        dafault: false
      }
    },
    data() {
      return {
        scroll: null,
      }
    },
    mounted() {
      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        // 使用BScroll插件后，必须设置click：true，wrapper内的非原生点击标签，才能被点击（如div，span）
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      // 2.实时监听滚动位置
      if(this.probeType === 2 || this.probeType ===3) { //判断 probeType是否为2/3时才监听滚动，可以提高一点性能
        this.scroll.on('scroll', (position) => {
          // 把scroll事件和position 传到父组件中
          this.$emit('scroll', position)
        })
      }

      // 3.监听scroll滚动到底部
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      /**
       * 封装函数
      */
      // 一键返回顶部
      scrollTo(x, y, time=500) {
        // 使用逻辑与：&& 
        this.scroll && this.scroll.scrollTo(x, y, time) // 添加判断 this.scroll的条件，预防scroll未加载成功 导致的scroll中的scrollTo方法找不到
      },
      // 实时刷新scroll
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      // 完成上拉加载更多
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>