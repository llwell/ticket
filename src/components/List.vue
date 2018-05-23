<template>
  <div class="entry">
      bbb
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      a:''
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .entry{
    border: 1px solid rebeccapurple;
  }
</style>
