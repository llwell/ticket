import axios from 'axios'
const apiUrl = 'http://192.168.0.109/api/'
export default {

  Ajax(group, token, method, param){
    return axios.post(apiUrl+group ,{
      token: token,
      method: method,
      param: param
    })
  },

  getAccredit(){
    axios.post('http://weixin.llwell.net/api/Weixin/OAuth', {
        token: "",
        method: "GetOAuthUrl",
        param: {
          returnUrl:"http://localhost:8080/"
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
