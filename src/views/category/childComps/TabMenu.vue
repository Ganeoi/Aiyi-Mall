<template>
    <scroll class="menu-scroll" ref="scroll-">
      <div id="tab-menu">
          <div class="menu-list">
            <div class="menu-list-item" 
                  v-for="(item, index) in category" 
                  :key="index"
                  :class="{active: index === currentIndex}"
                  @click="tabClick(index)">
              {{item.title}}
            </div>
          </div>
      </div>
    </scroll>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'

  export default {
    name: 'TabMenu',
    data() {
      return{
        currentIndex: 0
      }
    },
    props: {
      category: Array
    },
    components: {
      Scroll
    },
    actived() {
      this.$refs.scroll.refresh()
    },
    methods: {
      tabClick(index) {
        this.currentIndex = index
        this.$emit('tabMenuClick', index)
      }
    }
  }
</script>

<style scoped>
  #tab-menu {
    height: 100vh;
    background-color: #fff;
    text-align: center;
    position: relative;
    top: 0;
    /* padding-bottom: 1000px; */
  }
  .menu-scroll {
    position: absolute;
    top: 44px;
    bottom: 59px;
    left: 0;
    right: 0;
    overflow: hidden;
    /* height: calc(100% - 44px - 49px); */
  }
  .menu-list {
    width: 100px;
  }
  .menu-list-item {
    padding: 15px 0;
    font-size: 14px;
    color: var(--color-text);
    background-color: #f6f6f6;
  }
  .active {
    background-color: #fff;
    color: var(--color-tint);
    font-weight: 700;
    border-left: 3px solid var(--color-tint);
  }
</style>