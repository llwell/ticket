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
  import { Toast } from 'vant';
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
      console.log(this.$route.params);
      if(this.$route.query.token == undefined){
        if(global.getToken()==undefined){
          global.getAccredit();
        }else{
          this.getTicketRecord();
        }
      }else{
        global.setToken(this.$route.query.token);
        this.getTicketRecord();
      }
    },
    methods: {
      getTicketRecord(){
        //请求拿到 所有状态数据
        //  json 格式内 Home等外层名称，只作为页面所需接口存放的容器，并非接口字段
        var _this = this;
        global.Ajax('Ticket/Ticket',global.getToken(),'GetTicketList',{'token':global.getToken()})
          .then(function (response) {
            // console.log('aaa',response)
            if(response.success){
              // console.log('ooo',response)
              _this.tabPaneOneData=[];
              _this.tabPaneTwoData=[];
              _this.tabPaneThreeData=[];
            //   response.data.tabPaneOneData.forEach((item)=>{
            //     _this.tabPaneOneData.push(item);
            // })
              _this.tabPaneOneData = response.data.tabPaneOneData;
              _this.tabPaneTwoData = response.data.tabPaneTwoData;
              _this.tabPaneThreeData = response.data.tabPaneThreeData;
            }else{
              global.checkApiToken(response.msg.code);
              Toast('出错信息：'+response.msg.code+' '+response.msg.msg);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      getPersonage(){
        var _this = this;
        global.Ajax('Weixin/OAuth',global.getToken(),'GetUser',{"token": global.getToken()})
          .then(function (response) {
           // console.log("~~~",responseName)
            if(response.success) {
                global.Ajax('Ticket/Users',global.getToken(),'GetQRCoder',{"token": global.getToken()})
                  .then(function (responseCode) {
                    console.log(responseCode)
                    if(responseCode.success){
                      console.log(response.data)
                      console.log(responseCode.data)
                      let res =  Object.assign(response.data,{code:responseCode.data.url})
                      console.log('send',res)
                      _this.$router.push({name:'Personage',params:res})
                    }else{
                      global.checkApiToken(responseCode.msg.code);
                      Toast('出错信息：'+responseCode.msg.code+' '+responseCode.msg.msg);
                    }
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }else{
              global.checkApiToken(response.msg.code);
              Toast('出错信息：'+response.msg.code+' '+response.msg.msg);
            }
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
           // console.log(index)
        //请求拿到 所有状态数据
        //  json 格式内 Home等外层名称，只作为页面所需接口存放的容器，并非接口字段
        var _this = this;
           let params = {
             "token": global.getToken(),
             "ticketNum":index.ticketNum,
             "state":index.state
           }
        global.Ajax('Ticket/Ticket',global.getToken(),'GetTicketItem',params)
          .then(function (response) {
            if(response.success) {
              let res = {
                ...response.data,
                "state": index.state
              }
              _this.$router.push({name: 'TicketIn', params: res})
              // console.log(res)
            }else{
              global.checkApiToken(response.msg.code);
              Toast('出错信息：'+response.msg.code+' '+response.msg.msg);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      onDelete(index){
        var _this = this;
        let params = {
          "token": global.getToken(),
          "ticketNum":index.ticketNum,
          "state":index.state
        }
        global.Ajax('Ticket/Ticket',global.getToken(),'DelTicket',params)
          .then(function (response) {
            if(response.success){
              _this.getTicketRecord()
            }else{
              global.checkApiToken(response.msg.code);
              Toast('出错信息：'+response.msg.code+' '+response.msg.msg);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
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
