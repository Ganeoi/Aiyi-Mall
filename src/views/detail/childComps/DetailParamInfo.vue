<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <h3>尺码说明</h3>
    <table class="size" 
           v-for="(table, index) in paramInfo.sizes" 
           :key="index">
      <tr v-for="(tr, indey) in table" :key="indey">
        <td v-for="(td, indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>
    <div class="disclaimer">"※ 以上尺寸为实物人工测量，因测量当时不同会有1-2cm误差，相关数据仅作参考，以收到实物为准。"</div>
    <h3>参数说明</h3>
    <table class="infos">
      <tr v-for="(info, index) in paramInfo.infos" :key="index">
        <td class="key">{{info.key}}</td> 
        <td class="value">{{info.value}}</td>
      </tr>
    </table>
    <div class="info-image" v-if="paramInfo.images.length !== 0">
      <img :src="paramInfo.images" alt="">
    </div>
  </div>
</template>

<script>

  export default {
    name: 'DetailParamInfo',
    props: {
      paramInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .param-info {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }
  .param-info h3 {
    padding: 10px 0;
    font-size: 16px;
  }
  .param-info table {
    width: 100%;
    border-collapse: collapse; /* 表格中相邻单元格共享边框 */
  }
  .param-info table tr {
    height: 42px;
  }
  .param-info table tr td {
    border-bottom: 1px solid rgba(100, 100, 100, .1);
  }
  .infos {
    border-top: 1px solid rgba(0, 0, 0, .1);
  }
  .infos .key {
    /* 设置框到户，为了防止当value的信息比较长时，会挤到key*/
    width: 60px;
  }
  .infos .value {
    color: #ff4868;
  }
  .info-image img {
    width: 100%;
  }
  .disclaimer {
    font-size: 12px;
    color: rgba(100, 100, 100, .7);
    padding: 5px 0 20px 0;
  }
</style>