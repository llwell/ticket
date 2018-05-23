<template>


     <!--  <router-link to="/list/1">Go to list1</router-link><br>
      <router-link to="/list/2">Go to list2</router-link><br> -->

<div class="home">
  <div class="top">
    <div class="image">
      <img src="../assets/image/banner.png" height="540" width="1125" alt="">
    </div>
  </div>
  <div class="other">
    <div class="content">
      <div class="title">
        <div class="leftbg"></div>
        <div class="vtitle">视频分类</div>
        <div class="rightbg"></div>
      </div>
      <div class="list" >

        <div class="unit" v-for="(item,index) in unitList" >
          <router-link :to="{path:'/List',query: {ids:item.ids,list_inner_img:item.list_inner_img,list_text_s:item.list_text_s,list_text_p:item.list_text_p}}">
          <div class="top">
            <img :src="item.list_img" alt="">
          </div>
          <div class="bottom">
            <h3>{{item.list_text_p}}</h3>
            <div class="p">{{item.list_text_s}}</div>
          </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
    export default{
        data(){
            return {
                unitList: []
            }
        },
        mounted:function () {
          axios.get("http://yuki.llwell.net/api/vlist/entry/1/false").then(response => {
              response.data.forEach((item)=>{
                this.unitList.push(item);
              })
          });
        },
        methods: {
          listClick(ids,list_inner_img){
              this.$router.push({
                name: 'list',
                params: {
                  ids:ids,
                  list_inner_img:list_inner_img,
                }
              })
          }
        }
    }
</script>

<style scoped lang="less">
  .home{
    background: url(../assets/image/bg.jpeg) no-repeat 0 0 ;
        background-size: 100% 100%;
        padding-bottom: 20px;
    .top{
      width: 375px;
      height: 180px;
      position:relative;
      text-align: center;
      .image{
        width:100%;
        height:100%;
        img{
          width:100%;
          height:100%;
        }
      }
    }
    .other{
      margin: 0 7px;
      // background:#ccc;
      // opacity: 0.2;
      // border:1px solid red;
      .content{
        background: rgba(119, 119, 119, 0.2);
        .title{
          height:50px;
          .vtitle{
            font-size: 18px;
            color: #ffffff;
            height: 50px;
            line-height: 50px;
            width: 26%;
            float: left;
            text-align: center;
          }
          .leftbg{
            background: url(../assets/image/leftbg.png) no-repeat right;
            width: 37%;
            height: 50px;
            float: left;
            background-size: 56px 31px;
          }
          .rightbg{
            background: url(../assets/image/rightbg.png) no-repeat left;
            width: 37%;
            height: 50px;
            float: left;
            background-size: 56px 31px;
          }
        }
        .list{
          padding: 0 2px;
          overflow:hidden;
          .unit{
            width:173px;
            height:200px;
            background:#fff;
            float:left;
            margin-bottom: 10px;
            border-bottom-right-radius: 10px;
            border-bottom-left-radius: 10px;
            .top{
              width:100%;
              height:110px;
              img{
                width:100%;
                height:100%;
              }
            }
            .bottom{
              text-align:center;
              h3{
                font-size:18px;
                margin-top:5px;
              }
              .p{
                width:103px;
                font-size:14px;
                color: #B1B1B1;
                margin: 5px auto 0 ;
              }
            }
          }
          .unit:nth-child(2n) {
            float: right;
          }
        }
      }
    }
  }
</style>