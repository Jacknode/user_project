/**
 * Created by leibo on 17/10/30.
 */

import axios from 'axios'

export default {
  setUserInfo({commit}, data) {
    commit('setUserInfo', data)
  },
  //登录
  Logining({commit},data){
    return new Promise(function (relove,reject) {
      axios.post('http://114.55.248.116:1001/Service.asmx/GetValidateByPassword',{
        paramJson: JSON.stringify(data)
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if( Number(data.backCode)==200 ){
            relove(data);
          }else{
            reject(data.backResult);
          }
        })
    })
  },
  //初始化用户信息
  initUserData({commit},data){
    return new Promise(function(relove,reject){
      axios.post('http://114.55.248.116:1001/Service.asmx/GetUserInfoList',{
        paramJson: JSON.stringify(data)
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if(Number(data.backCode)==200){
            commit('setUserInfoList', data.userInfoList);
            commit('setSearchKeyWord', data.userInfoList);
            relove(data.total);
          }else{
            reject(data.backResult);
          }
        })
    })
  },
  //添加用户提交
  addUser({commit},data){
    return new Promise(function(relove,reject){
      axios.post('http://114.55.248.116:1001/Service.asmx/AddUser',{
        paramJson: JSON.stringify(data)
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if(Number(data.resultcode) == 200){
            relove();
          }else{
            reject(data.resultcontent);
          }
        })
    })
  },
  //修改用户提交
  updateUser({commit},data){
    return new Promise(function(relove,reject){
      axios.post('http://114.55.248.116:1001/Service.asmx/UpdateUserInfo',{
        paramJson: JSON.stringify(data)
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if(Number(data.backCode) == 200){
            relove();
          }else{
            reject(data.backResult);
          }
        })
    })
  },
  //删除用户提交
  deleteUser({commit},id){
    return new Promise(function(relove,reject){
      axios.post('http://114.55.248.116:1001/Service.asmx/DeleteUserInfo',{
        paramJson: JSON.stringify({
          loginUserID: 'huileyou',
          loginUserPass: 123,
          userCode: id
        })
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if( Number(data.backCode) == 200 ){
            commit('filterUserInfo', id)
            relove();
          }else{
            reject(data.backResult);
          }
        })
    })
  },
  //密码修改提交
  updateUserPassword({commit},data){
    return new Promise(function(relove,reject){
      axios.post('http://114.55.248.116:1001/Service.asmx/UpdateUserInfoPassword',{
        paramJson: JSON.stringify(data)
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if( Number(data.backCode) == 200 ){
            relove();
          }else{
            reject(data.backResult);
          }
        })
    })
  },
  //查询用户订单信息
  initOrdersSearch({commit},data){
    return new Promise(function(relove,reject){
      axios.post('http://114.55.248.116:1001/Service.asmx/GetOrderList',{
        paramJson: JSON.stringify(data)
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if( Number(data.backCode) == 200 ){
            commit('initOrderList', data.orderInfoList);
            commit('initOrderListKeyWord', data.orderInfoList);
            relove(data.total);
          }
        })
    })
  },
  //删除用户订单信息
  deleteOrder({commit},id){
    return new Promise(function(relove,reject){
      axios.post('http://114.55.248.116:1001/Service.asmx/DeleteOrder',{
        paramJson: JSON.stringify({
          loginUserID: 'huileyou',
          loginUserPass: 123,
          orderCode: id
        })
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if( Number(data.backCode) == 200 ){
            relove();
          };
        });
    });
  },
  //用户积分明细查询
  userIntegralDetailed({commit},data){
    return new Promise(function(relove,reject){
      axios.post('http://114.55.248.116:1001/Service.asmx/GetScoreList',{
        paramJson:JSON.stringify(data)
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if(Number(data.backCode)==200){
            commit('initUserScore',data.userScoreDetailList)
            relove(data.total);
          }else{
            reject();
          };
        });
    });
  },
  //初始化积分权重信息
  initWeightInformation({commit},data){
    return new Promise(function(relove,reject){
      axios.post('http://114.55.248.116:1001/Service.asmx/GetHeightPercent',{
        paramJson:JSON.stringify(data)
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if( Number(data.backCode) == 200 ){
            commit('initUserLntegrationWeight', data.heightManageList);
            commit('initUserLntegrationWeightKeyWord', data.heightManageList);
          };
        });
    });
  },
  //添加积分权重提交
  addWeightInformation({commit},data){
    return new Promise(function(relove,reject){
      axios.post('http://114.55.248.116:1001/Service.asmx/AddHeightItem',{
        paramJson: JSON.stringify(data)
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if(Number(data.backCode) == 200){
            relove();
          }else{
            reject();
          };
        });
    });
  },
  //修改积分权重提交
  updateUserLntegrationWeight({commit},data){
    return new Promise(function(relove,reject){
      axios.post('http://114.55.248.116:1001/Service.asmx/UpdateHeightPercent',{
        paramJson: JSON.stringify(data)
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if(Number(data.backCode) == 200){
            relove();
          }else{
            reject(data.backResult);
          };
        });
    });
  },
  //删除积分权重提交
  deleteUserLntegrationWeight({commit},data){
    return new Promise(function(relove,reject){
      axios.post('http://114.55.248.116:1001/Service.asmx/DeleteHeightPercent',{
        paramJson: JSON.stringify(data)
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if(Number(data.backCode) == 200){
            relove();
          }
        })
    })
  },
  //初始化订单类型数据请求
  initOrderType({commit},data){
    return new Promise(function(relove,reject){
      axios.post('http://114.55.248.116:1001/Service.asmx/GetOrderTypeList',{
        paramJson: JSON.stringify(data)
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if(Number(data.backCode) == 200){
            commit('initOrderType', data.orderTypeList);
            commit('initOrderTypeKeyWord', data.orderTypeList);
          }
        })
    })
  },
  //订单添加提交
  addOrderSubmit({commit},data){
    return new Promise(function(relove,reject){
      axios.post('http://114.55.248.116:1001/Service.asmx/AddOrderType',{
        paramJson: JSON.stringify(data)
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if (Number(data.backCode) == 200) {
            relove()
          }else{
            reject(data.backResult)
          }
        })
    })
  },
  //修改订单提交
  updateOrderTypeList({commit},data){
    return new Promise(function(relove,reject){
      axios.post('http://114.55.248.116:1001/Service.asmx/UpdateOrderType',{
        paramJson: JSON.stringify(data)
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if(Number(data.backCode) == 200){
            relove();
          }else{
            reject();
          }
        })
    })
  },
  //删除订单删除
  deleteOrderTypeId({commit},id){
    return new Promise(function(relove,reject){
      axios.post('http://114.55.248.116:1001/Service.asmx/DeleteOrderType',{
        paramJson: JSON.stringify({
          loginUserID: 'huileyou',
          loginUserPass: 123,
          orderTypeCode: id
        })
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if (Number(data.backCode) == 200) {
            commit('filterOrderType', id);
            relove();
          }else{
            reject();
          }
        })
    })
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
  },
  //初始化积分类型信息
  initIntegralTypeData({commit},data){
    return new Promise(function(relove,reject){
      axios.post('http://114.55.248.116:1001/Service.asmx/GetAccumulateTypeList',{
        paramJson: JSON.stringify(data)
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if(Number(data.resultcode) == 200){
            commit('searshIntegralTypeList',data.data);
            relove(data.resultcontent);
          }else{
            reject(data.resultcontent);
          }
        })
    })
  },
  //添加积分类型
  addToIntegralType({commit},data){
    return new Promise(function(relove,reject){
      axios.post('http://114.55.248.116:1001/Service.asmx/AddAccumulateType',{
        paramJson: JSON.stringify(data)
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          console.log(data)
          if(Number(data.resultcode)==200){
            relove(data.resultcontent);
          }else{
            reject(data.resultcontent);
          }
        })
    })
  },
  //修改积分类型
  updateIntegralTypePopup({commit},data){
    return new Promise(function(relove,reject){
      axios.post('http://114.55.248.116:1001/Service.asmx/UpdateAccumulateType',{
        paramJson: JSON.stringify(data)
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if( Number(data.resultcode) == 200 ){
            relove(data.resultcontent);
          }else{
            reject(data.resultcontent);
          }
        })
    })
  },
  //删除积分类型
  deleteIntegralObj({commit},id){
    return new Promise(function(relove,reject){
      axios.post('http://114.55.248.116:1001/Service.asmx/DeleteAccumulateType',{
        paramJson: JSON.stringify({
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          atTypeID:id
        })
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if( Number(data.resultcode) == 200 ){
            relove(data.resultcontent);
          }else{
            reject(data.resultcontent);
          }
        })
    })
  }
}

