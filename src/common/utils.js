// 封装函数工具

// 封装防抖函数
export function debounce (func, delay) {
  let timer = null; // time用于记录有没有定时器，用控制事件的触发
  return function (...args) { // args用于接收refresh传进来的参数
    if (timer) { clearTimeout(timer) } // 如果 timer存在则清空定时器，否则往下执行
    timer = setTimeout(() => { // 如果不存在timer，就创建新的定时器
      func.apply(this, args) // 利用apply()，让this的指针从指向window指向 refresh
    }, delay)
  }
}

// 封装时间戳格式化函数
export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) { // substr 对字符串进行截取
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length); // 对日期时间进行补 ‘0’
}