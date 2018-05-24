<template>
  <div class="ticketIn">
    <div class="nav">
      <van-nav-bar
        title="录入信息"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <!--<van-cell-group>-->
    <div class="form">
      <van-field
        v-model="ticketNum"
        label="订单编号"
        placeholder="请输入订单编号"
        required
      />
      <van-field
        v-model="shopName"
        label="店名"
        placeholder="请输入店名"
        required
      />
      <div class="van-cell van-cell--required van-field t_upload">
        <div class="van-cell__title">请上传图片</div>
        <div class="van-cell__value" style="text-align: left">
          <van-uploader :after-read="onRead">
            <van-icon name="photograph" />
          </van-uploader>
          <div class="pic">
            <img :src="imgbasesrc" alt="">
          </div>
        </div>
      </div>
      <van-button size="normal" @click="clickAdd" style="margin-left: 10px;line-height: 1rem;">添加商品</van-button>
      <div class='' v-for="index in goodsAll">
        <div class="unit">
          <van-field
            v-model="index.goodsName"
            label="品牌名称"
            placeholder="请输入名称"
            required
          />
          <van-field
            v-model="index.goodsPrice"
            label="合计金额"
            placeholder="输入总金额"
            required
          />
        </div>
      </div>

    </div>
    <!--</van-cell-group>-->
    <van-button size="large" @click="submitForm">提交</van-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {

      ticketNum:'',
      shopName:'',
      imgbasesrc:'',
      goodsAll:[{
        goodsName:'',
        goodsPrice:''
      }]

    }
  },
  created() {
  },
  mounted:function () {
      // axios.get(`http://yuki.llwell.net/api/vlist/item/${this.$route.query.ids}/false`).then(response => {
      //     response.data.forEach((item)=>{
      //       this.itemList.push(item);
      //     })
      // });
    },
  methods:{
    onClickLeft() {
      this.$router.push('/')
    },
    onRead(file) {
      // console.log(file)
      this.imgbasesrc = file.content;
    },
    clickAdd(){
      this.goodsAll.push({
        goodsName: '',
        goodsPrice: ''
      });
    },
    submitForm(){
      // if(){
      //
      // }else{
      //
      // }
      console.log(this.goodsAll)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .ticketIn{
    .nav{
      position: fixed;
      top: 0;
      width: 100%;
      height: 46px;
      z-index: 20;
    }
    /*border: 1px solid rebeccapurple;*/
    .form{
      margin-top: 50px;
      .t_upload{
        /*border: 1px solid red;*/
        height: 220px;
        img{
          height: 180px;
        }
      }
      .unit{
        display: flex;
        justify-content: space-between;;
      }
    }
  }
</style>
