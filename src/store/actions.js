/**
 * Created by leibo on 17/10/30.
 */

import axios from 'axios'

export default {
  setUserInfo({commit},data){
    commit('setUserInfo',data)
  },
  //查询初始化常用联系人
  initContactNameData({commit},options){
    return new Promise(function (relove, reject) {
      axios.post('http://114.55.248.116:1001/Service.asmx/GetUsualConnectList', {
        paramJson: JSON.stringify(options)
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if(Number(data.backCode)==200){
            commit('initContactNameData',data.usualConnectList)
            relove()
          }else{
            reject(data.backResult)
          }
      })
    })
  }
}
