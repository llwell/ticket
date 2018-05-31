<template>
  <div class="Personage">
    <div class="nav">
      <van-nav-bar
        title="个人中心"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"

      />
    </div>
    <div class="wrap">
      <div class="content">
        <div class="mes">
          <img :src="mes.headimgurl" alt="">
          <div class="p">{{mes.nickname}}</div>
        </div>
        <div class="code" ref="qrcode" id="qrcode" v-if="mes.qrcode">
          <!--<img :src="mes.code" alt="" >-->
        </div>
        <div class="refresh" @click="onRefresh">
          点我更新二维码
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import QRCode from 'qrcodejs2'
  import axios from 'axios'
  import global from "../global/global";
  import { Toast } from 'vant';
  export default {
    data() {
      return {
        mes:{
          headimgurl:'',
          nickname:'',
          code:'',
          content:'',
          qrcode:true
        }
      }
    },
    created() {
    },
    methods:{
      onClickLeft() {
        this.$router.push('/')
      },
      onClickRight() {
        console.log('按钮在这里')
        this.$router.push('/test')
      },
      onRefresh(){
        console.log('刷新二维码');
        var _this = this;
        global.Ajax('Ticket/Users',global.getToken(),'UpdateQRCoder',{"token": global.getToken()})
          .then(function (response) {
            _this.mes.qrcode=false
            console.log(_this.mes)
            setTimeout(function () {
              _this.mes.qrcode=true
              setTimeout(function () {
                _this.qrcode('这里是更新二维码');
              },0)
            },0)

            // _this.mes.code = response.data.url
            // _this.$nextTick (function () {
              // _this.qrcode('caicaiciaicai');
              // qrcode.clear();
            // var childList = document.getElementById('qrcode').childNodes;
            // console.log(childList)
            // if (childList.length>=1){
            //   for (let i = 0;i <= childList.length; i ++) {
            //     document.getElementById('qrcode').removeChild(childList[i]);
            //     console.log(childList)
            //   }
            //   _this.qrcode('new content');
            // }
            // childList.length =1;

            // })

          })
          .catch(function (error) {
            console.log(error);
          });
      },
      getMes(){
        this.mes =this.$route.params
      },
      qrcode (content) {
        let qrcode = new QRCode('qrcode', {
          width: 215,
          height: 215, // 高度
          text: content // 二维码内容
          // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
          // background: '#f0f'
          // foreground: '#ff0'
        })
        console.log('[[po',qrcode)
      },
    },
    mounted:function () {
      // console.log("mounted",this.$route.params)
      this.getMes();
      this.$nextTick (function () {
        this.qrcode(this.$route.params.content);
      })
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .Personage{
    height: 100%;
    background: #7e916a;
    .nav{
      position: fixed;
      top: 0;
      width: 100%;
      height: 46px;
      z-index: 20;
    }
    .wrap{

      /*border: 1px solid red;*/
      height: 100%;
      /*margin: 50px;*/
      padding-top: 50px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      /*height: calc(100% - 100px);*/
      .content{
        /*border: 1px solid blue;*/
        background: #fff;
        width: 280px;
        height: 420px;
        border-radius: 10px;
        box-shadow: 2px 2px 5px #657455;
        .mes{
          margin: 15px;
          margin-bottom: 5px;
          height: 110px;
          display: flex;
          justify-content: space-between;
          /*position: relative;*/
          /*top: 0;*/
          img{
            width: 100px;
            height: 100px;
            border-radius: 50px;
            border: 1px solid #7e916a;
          }
          .p{
            width: 140px;
            color: #777;
            font-size: 20px;
            display: flex;
            align-items: center;
            /*position: absolute;*/
            /*right: 90px;*/
            /*top: 70px;*/
          }
        }
        .code{
          padding: 15px;
          padding-top: 0;
          img{
            width: 100%;
            /*height: 100px;*/
          }
        }
        .refresh{
          font-size: 14px;
          color: #517cff;
        }
      }
    }

  }


</style>
