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
    <div class="content">

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
        this.$router.push('/')
      },
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
    .nav{
      position: fixed;
      top: 0;
      width: 100%;
      height: 46px;
      z-index: 20;
    }
  }


</style>
