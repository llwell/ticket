<template>
  <div class="main">
    <div class="top">
      <van-tabs v-model="activeTop" swipeable>
        <van-tab title="待处理">
          <div class="tabPane1">
            <van-card
              v-for="index in tabPaneOneData"
              :title="index.ticketNum"
              :desc="index.state"
              :price="index.ticketPrice"
              :thumb="index.img"
            >
              <div slot="footer">
                <van-button size="mini" @click="onEdit(index)">修改</van-button>
                <van-button size="mini" @click="onDelete(index)">删除</van-button>
              </div>
            </van-card>
          </div>
        </van-tab>
        <van-tab title="审批中">
          <div class="tabPane2">
            <van-card
              v-for="index in tabPaneTwoData"
              :title="index.ticketNum"
              :desc="index.state"
              :price="index.ticketPrice"
              :thumb="index.img"
            >
              <!--<div slot="footer">-->
              <!--<van-button size="mini" @click="onEdit(index)">修改</van-button>-->
              <!--<van-button size="mini" @click="onDelete(index)">删除</van-button>-->
              <!--</div>-->
            </van-card>
          </div>
        </van-tab>
        <van-tab title="已完成">
          <div class="tabPane3">
            <van-card
              v-for="index in tabPaneThreeData"
              :title="index.ticketNum"
              :desc="index.state"
              :price="index.ticketPrice"
              :thumb="index.img"
            >
              <!--<div slot="footer">-->
              <!--<van-button size="mini" @click="onEdit(index)">修改</van-button>-->
              <!--<van-button size="mini" @click="onDelete(index)">删除</van-button>-->
              <!--</div>-->
            </van-card>
          </div>
        </van-tab>
      </van-tabs>
    </div>
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
  import global from '../global/global'
  export default{
    data(){
      return {
        activeTop: 0,
        activeBottom: 0,
        tabPaneOneData:[
//                {
//                img:'http://ecc-product.oss-cn-beijing.aliyuncs.com/xcx/地图-icon@3x.png',
//                ticketNum:'小票1号码154854247sdsfs',
//                state:'处理中',
//                ticketPrice:'66.66'
//              },{
//                img:'http://ecc-product.oss-cn-beijing.aliyuncs.com/xcx/地图-icon@3x.png',
//                ticketNum:'小票2号码154854247sdsfs',
//                state:'处理中',
//                ticketPrice:'77.77'
//              }
        ],
        tabPaneTwoData:[
//                {
//                img:'http://ecc-product.oss-cn-beijing.aliyuncs.com/xcx/地图-icon@3x.png',
//                ticketNum:'小票1号码154854247sdsfs',
//                state:'处理中',
//                ticketPrice:'66.66'
//              },{
//                img:'http://ecc-product.oss-cn-beijing.aliyuncs.com/xcx/地图-icon@3x.png',
//                ticketNum:'小票2号码154854247sdsfs',
//                state:'处理中',
//                ticketPrice:'77.77'
//              }
        ],
        tabPaneThreeData:[
//                {
//                img:'http://ecc-product.oss-cn-beijing.aliyuncs.com/xcx/地图-icon@3x.png',
//                ticketNum:'小票1号码154854247sdsfs',
//                state:'已完成',
//                ticketPrice:'66.66'
//              }
        ],
      }
    },
    mounted:function () {
      if(this.$route.query.token == undefined){
        new Promise(resolve => {
          if(global.getToken()==undefined){
            global.getAccredit();
          }

        })
          .then(function () {
            this.getTicketRecord();
          })
      }
      else{
        global.setToken(this.$route.query.token);
      }
    },
    methods: {



      getTicketRecord(){
        //请求拿到 所有状态数据
        //  json 格式内 Home等外层名称，只作为页面所需接口存放的容器，并非接口字段
        var _this = this;
        axios.get('http://localhost:8080/static/test.json', {
//              token:"",
//              method:"",
//              param:{
//                  orderId:'asasa'
//              }
        })
          .then(function (response) {
            _this.tabPaneOneData=[]
            response.data.Home.tabPaneOneData.forEach((item)=>{
              _this.tabPaneOneData.push(item);
            })
            _this.tabPaneTwoData = response.data.Home.tabPaneTwoData;
            _this.tabPaneThreeData = response.data.Home.tabPaneThreeData;

          })
          .catch(function (error) {
            console.log(error);
          });
      },
      getPersonage(){
        var _this = this;
        axios.post('http://weixin.llwell.net/api/Weixin/OAuth', {
          token: global.getToken(),
          method: "GetUser",
          param: { token: global.getToken() }

        })
          .then(function (responseName) {
           console.log("~~~",responseName)
            axios.get('http://localhost:8080/static/test.json', {
//              token:"",
//              method:"",
//              param:{
//                  orderId:'asasa'
//              }
            })
              .then(function (responseCode) {
                // console.log({code:responseCode.data.personage.code})
                let response =  Object.assign(responseName.data.personage.about,{code:responseCode.data.personage.code})
                // console.log(response)
                _this.$router.push({name:'Personage',params:response})
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      ticketIn(active){
        // console.log('xiao',active)
        switch(active)
        {
          case 0:
            console.log('0')
            break;
          case 1:
            console.log('1')
            this.$router.push({name:'TicketIn',params:{"active":"1"}})
            // this.$router.push('/TicketIn')
            break;
          case 2:
            this.getPersonage();
            // this.$router.push('/Personage')
            break;
          default:
            console.log('err')
        }
      },



      onEdit(index){
//            console.log(index)
        //请求拿到 所有状态数据
        //  json 格式内 Home等外层名称，只作为页面所需接口存放的容器，并非接口字段
        var _this = this;
        axios.get('http://localhost:8080/static/test.json', {
//              token:"",
//              method:"",
//              param:{
//                  ticketNum:index.ticketNum,
//                  state:index.state
//              }
        })
          .then(function (response) {
            _this.$router.push({name:'TicketIn',params:response.data.ticketEdit.mes})
            console.log(response)

          })
          .catch(function (error) {
            console.log(error);
          });
      },
      onDelete(index){
        var _this = this;
        axios.get('http://localhost:8080/static/test.json', {
//              token:"",
//              method:"",
//              param:{
//                  ticketNum:index.ticketNum,
//                  state:index.state
//              }
        })
          .then(function (response) {

            _this.getTicketRecord()

          })
          .catch(function (error) {
            console.log(error);
          });
      },

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
        padding-top: 55px;
        padding-bottom: 50px;

      }

    }
  }
</style>
