import axios from 'axios'
import { Toast } from 'vant';
// const apiUrl = 'http://192.168.0.109/api/'
const apiUrl = 'http://ticket.llwell.net/api/'
export default {
  Ajax(group, token, method, param){
    let params = {
      token: token,
      method: method,
      param: param
    }
    return new Promise((resolve,reject)=>{
      axios.post(apiUrl+group ,params)
        .then(response=>{
          resolve(response.data)
        })
        .catch((err)=>{
          reject(err)
        })
    })
  },
  getAccredit(){
    axios.post('http://ticket.llwell.net/api/Weixin/OAuth', {
        token: "",
        method: "GetOAuthUrl",
        param: {
          // returnUrl:"http://localhost:8080/"
          returnUrl:"http://ticket.llwell.net/"
        }
    })
      .then(function (response) {
        console.log(response)
        window.location.href=response.data.data.url;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  getToken(){
    return sessionStorage.getItem("token");
  },
  setToken(token){
    sessionStorage.setItem("token", token);
  },
  checkApiToken(code){
    if(code == 4000){
      getAccredit();
    }
  },
  showFailToast(response){
    console.log(response.msg.code)
    switch (response.msg.code){
      case 5000:
        show('上传小票信息到数据库成功');
        break;
      case 5001:
        show('上传图片失败');
        break;
      case 5002:
        show('上传图片到oss失败');
        break;
      case 5003:
        show('上传小票信息到数据库失败');
        break;
      case 5004:
        show('小票号重复');
        break;
      case 5100:
        show('修改小票信息成功');
        break;
      case 5101:
        show('修改小票信息到数据库失败');
        break;
      case 5102:
        show('未查到票信息');
        break;
      case 5103:
        show('修改的小票状态不对');
        break;
      case 5200:
        show('删除小票信息成功');
        break;
      case 5201:
        show('删除小票信息失败');
        break;
      case 6001:
        show('获取二维码失败');
        break;
      default:
        break;
    };
    function show (mes){
      Toast('出错信息：'+response.msg.code+' '+mes+' '+response.msg.msg);
    }

  }
}
