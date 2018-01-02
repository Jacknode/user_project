/**
 * Created by leibo on 17/10/30.
 */

import axios from 'axios'

export default {
  setUserInfo({commit}, data) {
    commit('setUserInfo', data)
  },
  //查询初始化常用联系人
  initContactNameData({commit}, options) {
    return new Promise(function (relove, reject) {
      axios.post('http://114.55.248.116:1001/Service.asmx/GetUsualConnectList', {
        paramJson: JSON.stringify(options)
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.backCode) == 200) {
          commit('initContactNameData', data.usualConnectList)
          relove(data.total)
        } else {
          reject(data.backResult)
        }

      })
    })
  },
  //查询系统信息
  initSearchSystem({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://114.55.248.116:1001/Service.asmx/GetSystemInfoList', {
        paramJson: JSON.stringify(data)
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.resultcontent)
          commit('initSystemData', data.data)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //修改查询系统
  UpdateSystemPorp({commit}, data){
    return new Promise(function (relove, reject) {
      axios.post('http://114.55.248.116:1001/Service.asmx/UpdateSystemInfo', {
        paramJson: JSON.stringify(data)
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.resultcontent);
        } else {
          reject(data.resultcontent);
        }
      })
    })
  },
  //系统资料
  initSystemData({commit}, data){
    return new Promise(function (relove, reject) {
      axios.post('http://114.55.248.116:1001/Service.asmx/GetInformationList', {
        paramJson: JSON.stringify(data)
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          commit('initSystemDataList', data.data);
          relove()
        } else {
          reject(data.resultcontent)
        }
      })
    })
  }
}

