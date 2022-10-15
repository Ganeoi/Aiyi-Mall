<template>
  <div class="comment-info">
    <div class="info-header">
      <div class="title">用户评价</div>
      <div class="more">
        <a href="#">更多
          <img src="~assets/img/common/black-arrow-right.jpg" alt="">
        </a>
      </div>
    </div>
    <div class="content" v-if="Object.keys(commentInfo).length !==0">
      <div class="user-info">
        <img :src="commentInfo.user.avatar" alt="">
        <span class="user-name">{{commentInfo.user.uname}}</span>
      </div>
      <div class="info-detail">
        <p>{{commentInfo.content}}</p>
        <div class="info-other">
          <span class="date">{{commentInfo.created | showDate}}</span>
          <span>{{commentInfo.style}}</span>
        </div>
        <div class="info-imgs">
          <img :src="item" v-for="(item, index) in commentInfo.images" :key="index" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { formatDate } from 'common/utils';

  export default {
    name: "DetailCommentInfo",
    props: {
      commentInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: {
      formatDate
    },
    filters: {
      // 使用过滤器对时间戳进行转换
      showDate(value) {
        // 1.将时间戳转成Date对象 (因为时间戳里面的单位是秒，我们需要转换为毫秒的单位)
        const date = new Date(value * 1000)

        // 2，将date进行格式化
        return formatDate(date, 'yyyy-MM-dd')
      }
    }
  }
</script>

<style scoped>
 .comment-info {
  padding: 0 15px;
  border-bottom: 5px solid #f2f5f8;
 }
 .info-header {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  font-size: 14px;
  border-bottom: 1px solid #e2e4e6;
 }
 .title {
  font-size: 16px;
 }
 .more {
  padding: 1px 5px;
  border-radius: 3px;
  line-height: center;
  background-color: #f7f8fa;
 }
 .more img {
  width: 15px;
  height: 15px;
  position: relative;
  top: 2px;
 }
 .user-info {
  display: flex;
  padding: 10px 0;
 }
 .user-info img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
 }
 .user-name {
  margin-left: 10px;
  /* 让文字与图片中线对于对齐显示 */
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;
 }
 .info-detail p{
  font-size: 14px;
  color: #777;
 }
 .info-other {
  padding: 10px 0;
  font-size: 12px;
  color: #999;
 }
 .info-other .date {
  margin-right: 5px;
 }
 .info-imgs{
  display: flex;
 }
 .info-imgs img {
  width: 95px;
  height: 100px;
 }
</style>