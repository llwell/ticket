<template>
  <div class="Test">
    <div class="nav">
      <van-nav-bar
        title="test"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"


      />
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        a:''
      }
    },
    created() {
    },
    methods:{
      onClickLeft() {
        this.$router.push('/Personage')
      },
      onClickRight() {
        console.log('按钮在这里')
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
  .Test{
    height: 100%;
    background: #fffe78;
    .nav{
      position: fixed;
      top: 0;
      width: 100%;
      height: 46px;
      z-index: 20;
    }


  }


</style>
