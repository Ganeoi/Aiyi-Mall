// 配置文件路径别名
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // 'src': '@', // 默认设置
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}