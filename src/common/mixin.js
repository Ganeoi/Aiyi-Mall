// 注意：methods中的参数/变量不能抽出来，进行混入；
// 如果非要混入，可以将该参数抽到一个函数中，把该函数抽取到混入中的methods中，再在原来使用该参数的地方调用这个函数
// 如果是生命周期里的参数/变量可以进行 抽取
// 混入的使用，提高组件间重复代码的复用

import {debounce} from 'common/utils'

// 组件也可以混入
import BackTop from 'components/content/backTop/BackTop'

// 变量的混入
// import {POP, NEW, SELL} from './const'

// 1.监听图片的加载完成，进行refresh刷新
export const imageLoadMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    const newRefresh = debounce(this.$refs.scroll.refresh, 100)

    this.itemImgListener = () => {
      newRefresh()
    }

    this.$bus.$on('itemImgLoad', this.itemImgListener)
  }
}

// 2.backTop 回到顶部按钮的显示隐藏（首页和详情页和分类页使用）
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
     isShowBackTop: false 
    }
  },
  methods: {
    topClick() { // 回到顶部
      this.$refs.scroll.scrollTo(0,0,500)
    }
  }
}

// 混入的使用
// 需要使用的组件中
// 1.导入 import { backTopMixin } from 'mixin.js'
// 2.使用 :
// export default { 
//     mixins: [backTopMixin] 
//  }