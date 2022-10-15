// 创建Toast插件

import Toast from './Toast'

// 一、创建obj对象
const obj = {}

// 在启动项目进行初始化的时候，就把这个对象里面的内容创建完成
obj.install = function(Vue) {
  // 1.创建插件构造器
  const toastConstructor = Vue.extend(Toast)

  // 2.通过new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastConstructor()

  // 3.将组件对象，手动挂载到某一个元素上（这里自定义一个div）
  toast.$mount(document.createElement('div'))

  // 4.toast.$el 对应的就是这个div，把div添加到body中(添加到body中，才能在页面中展示toast中的内容)
  document.body.appendChild(toast.$el)

  // 5.把toast组件添加到vue的原型中
  Vue.prototype.$toast = toast;

}

// 二、导出，并在main.js文件中进行导入 安装
export default obj