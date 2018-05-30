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
        :disabled="disabled"
      />
      <van-field
        v-model="mes.shopName"
        label="店名"
        placeholder="请输入店名"
        required
        :disabled="disabled"
      />
      <div class="van-cell van-cell--required van-field t_upload">
        <div class="van-cell__title">请上传图片</div>
        <div class="van-cell__value" style="text-align: left">
          <van-uploader :after-read="onRead" :class="picdisable">
            <van-icon name="photograph" />
          </van-uploader>
          <div class="pic">
            <img :src="mes.imgbasesrc" alt="">
          </div>
        </div>
      </div>
      <van-button size="normal" @click="clickAdd" style="margin-left: 10px;line-height: 1rem;">添加商品</van-button>
      <div class='' v-for="(item, index) in mes.goodsAll">
        <div class="unit">
          <van-field
            v-model="item.goodsName"
            label="品牌名称"
            placeholder="请输入名称"
            required
          />
          <van-field
            v-model="item.goodsPrice"
            label="合计金额"
            placeholder="输入总金额"
            required
          />
          <div :class="index==0?'':'none'" style="width:50px "> </div>
          <div :class="index==0?'none':'btnDelete'"  @click="onRemove(index)">×</div>
        </div>
      </div>
    </div>
    <!--</van-cell-group>-->
    <van-button size="large" @click="submitForm" >提交</van-button>
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
        disabled:false,
        picdisable:'',
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
        this.picdisable=''
        this.disabled=false
        if (this.$route.params.active==undefined){
          console.log('bianji');
          this.mes = this.$route.params
          this.disabled = true
          this.picdisable = 'none'
        } else{
          console.log('tianjia');
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
        if(file.content.length<=(100 * 1024)){
          console.log(1)
          this.mes.imgbasesrc = file.content;
        }else{
          console.log(2)
          let Orientation;
          let result = file.content;
          let img = new Image();
          img.src = result
          this.mes.imgbasesrc = this.compress(img,Orientation);

          console.log(img)
        }
        console.log(this.mes.imgbasesrc)
        // console.log('filesss',file.content.split(',')[1])
      },
      clickAdd(){
        // console.log(this.mes)
        this.mes.goodsAll.push({
          goodsName: '',
          goodsPrice: ''
        });
      },
      onRemove(index,row){
        console.log('shanchu',index)
        console.log(row)
        this.mes.goodsAll.splice(index,1);
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
      },
      compress(img,Orientation){
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext('2d');
    //瓦片canvas
    let tCanvas = document.createElement("canvas");
    let tctx = tCanvas.getContext("2d");
    let initSize = img.src.length;
    let width = img.width;
    let height = img.height;
    //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    let ratio;
    if ((ratio = width * height / 4000000) > 1) {
      console.log("大于400万像素")
      ratio = Math.sqrt(ratio);
      width /= ratio;
      height /= ratio;
    } else {
      ratio = 1;
    }
    canvas.width = width;
    canvas.height = height;
    //        铺底色
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //如果图片像素大于100万则使用瓦片绘制
    let count;
    if ((count = width * height / 1000000) > 1) {
      console.log("超过100W像素");
      count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
      //            计算每块瓦片的宽和高
      let nw = ~~(width / count);
      let nh = ~~(height / count);
      tCanvas.width = nw;
      tCanvas.height = nh;
      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
          ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
        }
      }
    } else {
      ctx.drawImage(img, 0, 0, width, height);
    }
    //进行最小压缩
    let ndata = canvas.toDataURL('image/jpeg', 0.3);
    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
    return ndata;
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
        .btnDelete{
          border-radius: 15px;
          padding: 2px 5px;
          background: #ccc;
          color: #fff;
          height: 17px;
          margin-top: 12px;
          margin-right: 5px;
        }
      }
    }
  }
</style>
