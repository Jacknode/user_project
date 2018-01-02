<template>
  <div>
    <div class="panel clearfix panel-flat">
      <div class="panel-heading">
        <h5 class="panel-title">系统信息</h5>
      </div>
      <div class="dataTables_filter">
        <span>系统编码筛选:</span>
        <input type="text" placeholder="系统编码">
        <a href="javascript:;" class="btn btn-info" @click="search">搜索</a>
      </div>
      <table class="table datatable-show-all" v-for="item in initSystemDataList">
        <thead>
        <tr>
          <th>系统编码</th>
          <th>系统名称</th>
          <th>下载地址</th>
          <th>版本号</th>
          <th>发布日期</th>
          <th>更新内容</th>
          <th>更新时间</th>
          <th class="text-center">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{item.ts_si_ID}}</td>
          <td>{{item.ts_si_SystemName}}</td>
          <td>{{item.ts_si_DownLoadURL}}</td>
          <td>{{item.ts_si_VersionNo}}</td>
          <td>{{item.ts_si_IssueDate}}</td>
          <td>{{item.ts_si_UpdateContent}}</td>
          <td>{{item.ts_si_UpdateTime | getNewDate}}</td>
          <td class="text-center">
            <ul class="icons-list">
              <li class="dropdown">
                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="icon-menu9"></i>
                </a>
                <ul class="dropdown-menu dropdown-menu-right">
                  <li><a href="javascript:;" @click="updateSystem(item.ts_si_ID)"><i class="icon-delicious"></i>修改</a>
                  </li>
                </ul>
              </li>
            </ul>
          </td>
        </tr>
        </tbody>
      </table>

    <!--修改系统信息-->
      <el-dialog title="修改系统信息" :visible.sync="dialogAddFormVisible" width="60%">
        <el-form :model="updateSystemObj">
          <el-form-item label="系统编码" :label-width="formLabelWidth" :required="isOff">
            <el-input v-model="updateSystemObj.ts_si_ID" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="系统名称" :label-width="formLabelWidth">
            <el-input v-model="updateSystemObj.ts_si_SystemName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="下载地址" :label-width="formLabelWidth">
            <el-input v-model="updateSystemObj.ts_si_DownLoadURL" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="版本号" :label-width="formLabelWidth">
            <el-input v-model="updateSystemObj.ts_si_VersionNo" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="发布日期" :label-width="formLabelWidth">
            <div class="block">
              <el-date-picker
                v-model="updateSystemObj.ts_si_IssueDate"
                type="date"
                placeholder="发布日期"
                value-format="yyyy-MM-dd"
                :label-width="formLabelWidth"
              >
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="更新内容" :label-width="formLabelWidth">
            <el-input v-model="updateSystemObj.ts_si_UpdateContent" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateSubmit">提交</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    name: '',
    computed: mapGetters([
      'initSystemDataList',
      'updateSystemObj'
    ]),
    data() {
      return {
        dialogAddFormVisible:false,
        formLabelWidth: '120px',
        isOff: true,
        id:''
      }
    },
    methods: {
      //查询系统信息
      initData(id) {
        var GetSystemInfoList = {
          loginUserID: 'huileyou',
          loginUserPass: 123,
          siID: id?id:''
        };
        this.$store.dispatch('initSearchSystem', GetSystemInfoList)
          .then(suc=>{
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      search() {
        this.initData(this.id)
      },
      updateSystem(id){
        this.$store.commit('setTranstionFalse')
        this.$store.commit('initUpdateSystemObj',id)
        this.dialogAddFormVisible = true;
      },
      updateSubmit(){
        if( this.updateSystemObj.ts_si_ID == '' ){
          this.$notify({
            message: '系统编码不能为空！',
            type: 'error'
          });
          return;
        }
        var UpdateSystemInfo={
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "orderID": 0,
          "data": {
            "ts_si_ID": this.updateSystemObj.ts_si_ID,
            "ts_si_SystemName": this.updateSystemObj.ts_si_SystemName,
            "ts_si_DownLoadURL": this.updateSystemObj.ts_si_DownLoadURL,
            "ts_si_VersionNo": this.updateSystemObj.ts_si_VersionNo,
            "ts_si_IssueDate": this.updateSystemObj.ts_si_IssueDate,
            "ts_si_UpdateContent": this.updateSystemObj.ts_si_UpdateContent
          }
        }
        this.$store.dispatch('UpdateSystemPorp',UpdateSystemInfo)
          .then(suc=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData()
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
            this.initData()
          })
        this.dialogAddFormVisible = false;
      }
    }

  }
</script>
<style>
  .clearfix:after {
    content: '';
    clear: both;
    display: block;
  }
</style>
