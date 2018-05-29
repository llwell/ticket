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
        v-model="mes.ticketNum"
        label="订单编号"
        placeholder="请输入订单编号"
        required
      />
      <van-field
        v-model="mes.shopName"
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
            <img :src="mes.imgbasesrc" alt="">
          </div>
        </div>
      </div>
      <van-button size="normal" @click="clickAdd" style="margin-left: 10px;line-height: 1rem;">添加商品</van-button>
      <div class='' v-for="index in mes.goodsAll">
        <div class="unit">
          <van-field
            v-model="index.goodsName"
            label="品牌名称"
            placeholder="请输入名称"
            required
          />
          <van-field class="borBotGray"
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
  import { Toast } from 'vant';
  import axios from 'axios'
  import global from '../global/global'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        mes:{
          ticketNum:'',
          shopName:'',
          imgbasesrc:'',
          goodsAll:[{
            goodsName:'',
            goodsPrice:''
          }]
        }
      }
    },
    created() {
    },
    mounted:function () {
      console.log(this.$route.params)
        this.getEditMes();
//      console.log('~~~')
//      console.log(this.$route.params)
      // axios.get(`http://yuki.llwell.net/api/vlist/item/${this.$route.query.ids}/false`).then(response => {
      //     response.data.forEach((item)=>{
      //       this.itemList.push(item);
      //     })
      // });
    },
    methods:{
      getEditMes(){
        this.mes={}
        if (this.$route.params.active==undefined){
          this.mes = this.$route.params
        } else{
          this.mes={
            ticketNum:'',
            shopName:'',
            imgbasesrc:'',
            goodsAll:[{
              goodsName:'',
              goodsPrice:''
            }]
          }
        }
      },
      onClickLeft() {
        this.$router.push('/')
      },
      onRead(file) {
        // console.log(file)
        this.mes.imgbasesrc = file.content;
        // console.log('filesss',file.content.split(',')[1])
      },
      clickAdd(){
        // console.log(this.mes)
        this.mes.goodsAll.push({
          goodsName: '',
          goodsPrice: ''
        });
      },

      submitForm(){
        if(this.ifGoodsAllNull()&& this.ifMesNull()){
          console.log('都填了 可以发送请求')
          console.log(this.mes)
          //请求拿到 所有状态数据
          //  json 格式内 Home等外层名称，只作为页面所需接口存放的容器，并非接口字段
          var _this = this;
          let params = {
                        ...this.mes,
                        'token':global.getToken(),
                        'state':this.$route.params.state?this.$route.params.state:'',

                      }
                      console.log('==',params)
          global.Ajax('Ticket/Ticket',global.getToken(),'InsertTicket',params)
            .then(function (response) {
              if(response.success) {
                // console.log('提交', response)
                Toast.success('提交成功');
                _this.$router.push('/')
              }else{
                global.checkApiToken(response.msg.code);
                Toast('出错信息：'+response.msg.code+' '+response.msg.msg);
              }

            })
            .catch(function (error) {
              console.log(error);
            });
        }else{
          // console.log('请填入完整信息')
          Toast('请填入完整信息');
        }
      },
      ifGoodsAllNull(){
        let returns = true;
        this.mes.goodsAll.forEach((item)=>{
          if (item.goodsName==''||item.goodsPrice==''){
            returns = false;
          } else{
            //return true;
          }
        });
        return returns;
      },
      ifMesNull(){
        let returnMes = true;
        for(let item in this.mes){
          if (this.mes[item]=='') {
            returnMes =  false;
          }else{
            // return true;
          }
        }
        return returnMes;
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
      .borBotGray{
        border-bottom:1px solid #f5efef ;
      }
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
        justify-content: space-between;
      }
    }
  }
</style>
