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
            <img :src="mes.imgbasesrc" alt="" id="ttt">
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
    <div class="" style="padding: 10px">
      <van-button size="large" @click="submitForm" >提交</van-button>
    </div>

  </div>
</template>

<script>
  import EXIF from  'exif-js';
  import { Toast } from 'vant';
  import axios from 'axios'
  import global from '../global/global'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        clickTIme:'',
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
      //console.log(this.$route.params)
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
          // console.log('bianji');
          this.mes = this.$route.params
          this.disabled = true
          this.picdisable = 'none'
        } else{
          // console.log('tianjia');
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

        //console.log(file)
        if(file.content.length<=(100 * 1024)){
          // console.log(1)
          this.mes.imgbasesrc = file.content;
        }else{
          console.log(2);
          var that = this;


          new Promise((resolve, reject)=>{
            this.mes.imgbasesrc = file.content;
            setTimeout(function () {
              resolve();
            },0)
            // console.log('111')
          }).then(()=>{
            // console.log('212')
            var _this = this;
            this.compress(file,0.5,function (results) {
              _this.mes.imgbasesrc = results;
            });
          })





        }
        //console.log(this.mes.imgbasesrc)
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
        this.mes.goodsAll.splice(index,1);
      },
      submitForm(){
        if(this.ifGoodsAllNull()&& this.ifMesNull()){
          console.log('都填了 可以发送请求')
          //console.log(this.mes)
          //请求拿到 所有状态数据
          //  json 格式内 Home等外层名称，只作为页面所需接口存放的容器，并非接口字段
          var _this = this;
          let params = {
            ...this.mes,
            'token':global.getToken(),
            'state':this.$route.params.state?this.$route.params.state:'',

          }
          // console.log('==',params)
          var nowTime = new Date().getTime();

          if(this.clickTIme !='' && (newTime-this.clickTIme<1000)){
            Toast('提交过于频繁，请稍后再试')
          }else{
            this.clickTIme = nowTime;
          }



          global.Ajax('Ticket/Ticket',global.getToken(),'InsertTicket',params)
            .then(function (response) {
              if(response.success) {
                // console.log('提交', response)
                Toast.success('提交成功');
                _this.$router.push('/')
              }else{
                global.checkApiToken(response.msg.code);
                global.showFailToast(response)
                // Toast('出错信息：'+response.msg.code+' '+response.msg.msg);
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
      compress(file, quality, callback) {

        compressImage();
        

        function compressImage() {
          var canvas = document.createElement('canvas');
          var ctx;
          var dataURI;
          var result;

          var myimage = document.getElementById("ttt");

          var Orientation;
          EXIF.getData(myimage, function() {
            Orientation = EXIF.getTag(myimage, 'Orientation');



            if (typeof myimage.naturalWidth == "undefined") {
// IE 6/7/8
            var i = new Image();
            i.src = myimage.src;
            canvas.width = i.width;
            canvas.height = i.height;
          }
          else {
// HTML5 browsers
            canvas.width = myimage.naturalWidth;
            canvas.height = myimage.naturalHeight;
          }
          console.log(Orientation);
          // Toast('这里是Orientation'+Orientation)
          switch (Orientation){
            case 6:
              // Toast('这里是6')
              ctx = canvas.getContext('2d');
              canvas.height = myimage.naturalWidth;
              canvas.width = myimage.naturalHeight;
              ctx.rotate(0.5*Math.PI);
              ctx.drawImage(document.getElementById("ttt"), 0, -myimage.naturalHeight);
              break;
            case 8:
              // Toast('这里是8')
              ctx = canvas.getContext('2d');
              canvas.height = myimage.naturalWidth;
              canvas.width = myimage.naturalHeight;
              ctx.rotate(-0.5*Math.PI);
              ctx.drawImage(document.getElementById("ttt"), -myimage.naturalWidth, 0);
              break;
            case 3:
              // Toast('这里是3')
              ctx = canvas.getContext('2d');
              canvas.width = myimage.naturalWidth;
              canvas.height = myimage.naturalHeight;
              ctx.rotate(Math.PI);
              ctx.drawImage(document.getElementById("ttt"), -myimage.naturalWidth, -myimage.naturalHeight);
              break;
            default:
              // Toast('这里是default')
              ctx = canvas.getContext('2d');
              canvas.width = myimage.naturalWidth;
              canvas.height = myimage.naturalHeight;
              ctx.drawImage(document.getElementById("ttt"), 0, 0);
              break;
          }


          dataURI = canvas.toDataURL(file.type || 'image/jpeg', quality);
          result = dataURIToBlob(dataURI);
          var reader = new FileReader();
          reader.readAsDataURL(result);
          reader.onload = function () {
            //console.log(this.result);
            callback(this.result);
          };
          });
          //callback(null, result);
        }

        function dataURIToBlob(dataURI) {
          var type = dataURI.match(/data:([^;]+)/)[1];
          var base64 = dataURI.replace(/^[^,]+,/, '');
          var byteString = atob(base64);
          var ia = new Uint8Array(byteString.length);
          for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          var blob;
          try {
            blob = new Blob([ia], {type: 'image/jpg'});
          } catch (e) {
            window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
            if(e.name === 'TypeError' && window.BlobBuilder){
              var blobBuilder = new BlobBuilder();
              blobBuilder.append(ia);
              blob = blobBuilder.getBlob('image/jpg');
            }
          }
          return blob
        }

      },

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
        min-height: 220px;
        img{
          width: 180px;
        }
      }
      .unit{
        display: flex;
        justify-content: space-between;
        .btnDelete{
          border-radius: 15px;
          padding: 1px 5px 5px;
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
