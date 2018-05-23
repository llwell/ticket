<template>


<div class="main">
  <van-tabs v-model="active">
    <van-tab v-for="index in 3" :title="tabTitle[index-1]">
      内容 {{ index }}
    </van-tab>
  </van-tabs>
</div>
</template>

<script>

import axios from 'axios'
    export default{
        data(){
            return {
              tabTitle:['待处理','审批中','已完成'],
              active: 2
            }
        },
        mounted:function () {
          // axios.get("http://yuki.llwell.net/api/vlist/entry/1/false").then(response => {
          //     response.data.forEach((item)=>{
          //       this.unitList.push(item);
          //     })
          // });
        },
        methods: {
          // listClick(ids,list_inner_img){
          //     this.$router.push({
          //       name: 'list',
          //       params: {
          //         ids:ids,
          //         list_inner_img:list_inner_img,
          //       }
          //     })
          // }
        }
    }
</script>

<style scoped lang="less">
  .main{
    background: aquamarine;
  }
</style>
