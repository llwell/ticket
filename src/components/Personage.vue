<template>
  <div class="Personage">
    <div class="nav">
      <van-nav-bar
        title="个人中心"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"

        right-text="我就是按钮"
        @click-right="onClickRight"
      />
    </div>
    <div class="wrap">
      <div class="content">
        <div class="mes">
          <img :src="headPortrait" alt="">
          <div class="p">{{name}}</div>
        </div>

        <div class="code">
          <img :src="code" alt="">
        </div>
        <div class="refresh" @click="onRefresh">
          点我更新二维码
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        headPortrait:'http://ecc-product.oss-cn-beijing.aliyuncs.com/test/photo.png',
        name:'你的名字',
        code:'http://ecc-product.oss-cn-beijing.aliyuncs.com/test/code.png'
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
        console.log('刷新二维码')
      }
    },
    mounted:function () {
      // axios.get(`http://yuki.llwell.net/api/vlist/video/${this.$route.query.ids}/true`).then(response => {
      //     console.log(response)
      //     response.data.goods.forEach((item)=>{
      //       this.playItemList.push(item);
      //     })
      //     this.title = response.data.video_title;
      // });
      //   console.log(this.video)
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
