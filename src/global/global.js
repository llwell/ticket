import axios from 'axios'
export default {
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
