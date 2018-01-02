/**
 * Created by leibo on 17/10/30.
 */
export default {
  transtionActive(state) {
    return state.transtionActive;
  },
  loadingShow(state) {
    return state.loadingShow
  },
  userInfo(state) {
    return state.userInfo;
  },
  userInfoList(state) {
    return state.userInfoList;
  },
  //用户查询keyWord
  userInfoListKeyWord(state) {
    return state.userInfoListKeyWord;
  },
  //修改用户使用初始化对象
  newForm(state) {
    return state.initUser;
  },
  //订单类型
  OrderTypeList(state) {
    return state.OrderTypeList;
  },
  OrderTypeListKeyWord(state) {
    return state.OrderTypeListKeyWord
  },
  //初始化订单类型
  initType(state) {
    return state.initType;
  },
  //订单详情
  orderListKeyWord(state) {
    return state.orderListKeyWord;
  },
  //权重信息
  userLntegrationWeightKeyWord(state) {
    return state.userLntegrationWeightKeyWord
  },
  //初始化修改权重
  initLntegrationWeight(state) {
    return state.initLntegrationWeight;
  },
  userLntegrationWeight(state) {
    return state.userLntegrationWeight
  },
  //用户积分明细开始日期和结束日期
  dateArr(state) {
    return state.dateArr;
  },
  //用户积分明细
  userScoreList(state) {
    return state.userScoreList
  },
  //常用联系人
  contactNameList: state => state.contactNameList,
  //系统信息查询数据
  initSystemDataList: state => state.initSystemDataList,
  updateSystemObj: state => state.updateSystemObj,
  systemDataList: state => state.systemDataList,
  updateSystemDataObj: state => state.updateSystemDataObj,
  searshIntegralTypeList:state=>state.searshIntegralTypeList,
  updateIntegralTypeObj:state=>state.updateIntegralTypeObj,
}
