<template>
  <div class="play">
    <div class="top">
      <div class="video">
        <div class="prism-player" id="J_prismPlayer"></div>
      </div>
    </div>
    <div class="bottom">
      <div class="describe">
          <div class="title">{{title}}</div>
          <div class="content">{{content}}</div>
          <div class="time">{{time}}</div>
        </div>
      <div class="list-item">
        <ul class="clearfix">
          <li v-for="(item,index) in playItemList" v-bind:key="index">
            <div class="img">
              <a :href="item.goods_url">
                <img class="lazy" :src="item.goods_img" />
              </a>
            </div>
            <div class="txt">
              <h3>{{item.goods_text}}</h3>
              <div class="price">
                <span>{{item.goods_price}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- <router-link to="/play">
      <div class="toPlay">
        {{$route.params.id}}
      </div>
    </router-link> -->
  </div>

</template>

<script>
  import axios from 'axios'
  export default {
    name: 'HelloWorld',
    data() {
      return {
        id: "",
        time: "",
        content: "",
        title: "",
        video:'',
        playItemList:[]
      }
    },
    created() {
      // this.id = this.$route.query.id;
    },
    mounted:function () {
      axios.get(`http://yuki.llwell.net/api/vlist/video/${this.$route.query.ids}/true`).then(response => {
          console.log(response)
          response.data.goods.forEach((item)=>{
            this.playItemList.push(item);
          })
          this.title = response.data.video_title;
          this.content = response.data.video_text;
          this.time = response.data.video_time;
          this.video=response.data.video_url;
          console.log(this.video)



          var player = new Aliplayer({
        id: "J_prismPlayer",
        autoplay: false,
        isLive: false,
        playsinline: true,
        width: "100%",
        height: "400px",
        controlBarVisibility: "always",
        useH5Prism: true,
        useFlashPrism: false,
        source: this.video,
        cover: "",
        skinLayout: [{
            "name": "bigPlayButton",
            "align": "blabs",
            "x": 30,
            "y": 80
          },
          {
            "name": "controlBar",
            "align": "blabs",
            "x": 0,
            "y": 0,
            "children": [{
                "name": "progress",
                "align": "blabs",
                "x": 0,
                "y": 44
              },
              {
                "name": "fullScreenButton",
                "align": "tr",
                "x": 10,
                "y": 10
              },
              {
                "name": "snapshot",
                "align": "tr",
                "x": 10,
                "y": 10
              }
            ]
          },
          {
            "name": "fullControlBar",
            "align": "tlabs",
            "x": 0,
            "y": 0,
            "children": [{
                "name": "fullTitle",
                "align": "tl",
                "x": 25,
                "y": 6
              },
              {
                "name": "fullNormalScreenButton",
                "align": "tr",
                "x": 24,
                "y": 13
              },
              {
                "name": "fullZoom",
                "align": "cc"
              }
            ]
          }
        ]
      }, function(player) {
        console.log("播放器创建了。");
      });
      });

        console.log(this.video)

    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .play {
    .top {
      width: 375px;
      position: relative;
      text-align: center;
      .video {
        width: 100%;
        &>div {
          width: 100%;
          max-height: 180px;
        }
      }

    }
    .bottom{
      background: #313131;
          padding-bottom: 25px;
      .describe {
        padding: 15px;
        .title {
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          text-align: left;
        }
        .content {
          font-size: 10px;
          color: #e1e1e1;
          text-align: left;
        }
        .time {
          font-size: 12px;
          color: #7d7d7d;
          text-align: left;
        }
      }
      .list-item {
        // padding: 25px 0;
        margin:0 25px;
        background:#1b1b1b;
        li {
          background:#181818;
          overflow: hidden;
          position: relative;
          float: left;
          // width: calc(100% / 2);
          width:~"calc(50% - 1px)";
          margin-top:2px;
          height:240px;
          .img {
            height: 150px;
            margin-top:30px;
            img {
              width: 100%;
              height: 100%
            }
          }
          .txt {
            padding: 5px;
            h3 {
              font-size: 10px;
              // -webkit-line-clamp: 2;
              // -webkit-box-orient: vertical;
              // overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            overflow: hidden;
              text-align: center;
              color: #fff;
            }
            .price {

              font-size: 10px;
              text-align: center;
              color: #fff;
              margin: 5px 0;
            }
          }
        }
        li:nth-child(2n) {
          float: right;
          // border-left: 1px solid #b5b5b5;
        }
      }
    }
  }
  
  
</style>