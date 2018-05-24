<template>
<div class="main">
  <div class="top">
    <van-tabs v-model="activeTop" swipeable>
      <van-tab title="待处理">
        <div class="tabPane1">
          <van-card
            v-for="index in tabPaneOneData"
            :title="index.ticketNum"

            :price="index.ticketPrice"
            :thumb="index.img"
          >
            <div slot="footer">
              <van-button size="mini">修改</van-button>
              <van-button size="mini">删除</van-button>
            </div>
          </van-card>
        </div>
      </van-tab>
      <van-tab title="审批中">
        <div class="tabPane2">
          这是第二区
        </div>
      </van-tab>
      <van-tab title="已完成">
        <div class="tabPane3">
          这是第三区
        </div>
      </van-tab>
    </van-tabs>
  </div>
  <van-popup v-model="show">内容</van-popup>
  <div class="bottom">
    <van-tabbar v-model="activeBottom" @change="ticketIn">
      <van-tabbar-item icon="completed">票务状态</van-tabbar-item>
      <!--<router-link :to="{path:'/list'}">-->
        <van-tabbar-item icon="edit" >小票录入</van-tabbar-item>
      <!--</router-link>-->
      <van-tabbar-item icon="contact">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>

</div>
</template>

<script>

import axios from 'axios'
    export default{
        data(){
            return {
              // tabTitle:['待处理','审批中','已完成'],
              activeTop: 0,
              activeBottom: 0,
              imageURL:'http://ecc-product.oss-cn-beijing.aliyuncs.com/xcx/地图-icon@3x.png',
              number:9,
              tabPaneOneData:[{
                img:'http://ecc-product.oss-cn-beijing.aliyuncs.com/xcx/地图-icon@3x.png',
                ticketNum:'小票1号码154854247sdsfs',
                ticketPrice:'66.66'
              },{
                img:'http://ecc-product.oss-cn-beijing.aliyuncs.com/xcx/地图-icon@3x.png',
                ticketNum:'小票2号码154854247sdsfs',
                ticketPrice:'77.77'
              }],
              show: false
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
          ticketIn(active){
            // console.log('xiao',active)
            switch(active)
            {
              case 0:
                console.log('0')
                break;
              case 1:
                console.log('1')
                this.$router.push('/list')
                break;
              case 2:
                console.log('2')
                break;
              default:
                console.log('err')
            }
          }
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
    width: 100%;
    height: 100%;
    /*border: 1px solid chartreuse;*/
    .top{
        .van-tabs {
          /*border: 1px solid green;*/
          padding-bottom: 50px;

        }

    }
  }
</style>
