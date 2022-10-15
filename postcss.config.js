module.exports = {
  plugins: {
    autoprefixer: {},
    // px-to-vw相关配置
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 可视窗口的宽度，对应的是我们设计稿的宽度
      viewportHeight: 667, // 视口的高度，对应的是设计稿的高度（也可以不适配）
      unitPrecision: 5, // 指定`px` 转换为视口单位值时的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视口单位，建议使用vw（还有一个是vh）
      minPixelValue: 1, // 小于或等于`1px`的不转换为视口单位
      selectorBlackList: ['ignore'], // 指定不需要转换的类，添加了class=‘ignore’的类不进行转换
      mediaQuery: false, // 是否允许在媒体查询中转换`px`
      // exclude: [/components.vue/] // 指定不需要转换的文件，必须是以正则的形式写
    }
  }
}
