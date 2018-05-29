import axios from 'axios'
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
}
