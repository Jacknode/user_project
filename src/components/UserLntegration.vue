<template>
  <div>
    <div class="panel panel-flat">
      <div class="panel-heading">
        <h5 class="panel-title">用户积分明细</h5>
      </div>
      <div class="dataTables_filter">
        <span>用户名:</span>
        <input type="text" placeholder="用户名" v-model="userID">
        <el-date-picker
          v-model="value4"
          type="datetimerange"
          :picker-options="pickerOptions2"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          format="yyyy/MM/dd HH:mm:ss"
          @change="getDateArray"
        >
        </el-date-picker>
        <a href="javascript:;" class="btn btn-info" @click="search">搜索</a>
      </div>
      <table class="table datatable-show-all">
        <thead>
        <tr>
          <th>用户名</th>
          <th>权重名称</th>
          <th>积分</th>
          <th>积分时间</th>
          <th>备注</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in userScoreList">
          <td>{{item.userName}}</td>
          <td>{{item.hm_Name}}</td>
          <td>{{item.usd_Score}}</td>
          <td>{{item.usd_CreateTime}}</td>
          <td class="time">{{item.usd_Remark}}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="block" style="float: right;">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="5"
        layout="total, prev, pager, next"
        :total="total"
        v-show="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {getDateName} from '../assets/js/date'
  import publicInit from '../assets/js/public'
  import {POST} from '../assets/js/universal'

  import {mapGetters} from 'vuex'
  export default{
    name: '',
    computed:mapGetters([
        'dateArr',
        'userScoreList',
        'userLntegrationWeightKeyWord'
    ]),
    data(){
      return {
        total:0,
        currentPage1:1,
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        userID: '',
        orderDetail: '',//初始化搜索
        value4: ''
      }
    },
    methods:{
      handleCurrentChange(num){
        this.initData(num);
      },
      initData(num,userName){
        var GetScoreList = {
          loginUserID:'huileyou',
          loginUserPass:123,
          createFrom:this.dateArr[0]?this.dateArr[0]:'',
          createTo:this.dateArr[1]?this.dateArr[1]:'',
          userName:userName?userName:'',
          isDelete:0,
          page:num,
          rows:5,
        }
        this.$http.post('http://114.55.248.116:1001/Service.asmx/GetScoreList',{
          paramJson: JSON.stringify(GetScoreList)
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(data=>{
            var data = data.data;
            this.total = Number(data.total);
            publicInit.isBackCode(data,this);
            if(Number(data.backCode)==200){
              this.$store.commit('initUserScore',data.userScoreDetailList)
            }else{
              this.$message({
                showClose: true,
                message: '查询失败',
                type: 'error'
              });
              this.$store.commit('clearUserScore')
            }
          })
      },
      //筛选
      search(){
        this.userID = this.userID.trim();
        this.initData(1,this.userID)

      },
      //获取选中时间
      getDateArray(arr){
        let dateArr = [];
        for(var i=0;i<arr.length;i++){
          dateArr.push(getDateName(arr[i],'-'));
        }
        this.$store.commit('setDate',dateArr);
      },

    },
    mounted(){

    }
  }
</script>
<style scoped>

</style>
