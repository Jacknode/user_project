<template>
  <div>
    <div class="panel panel-flat">
      <div class="panel-heading">
        <h5 class="panel-title">积分权重信息</h5>
      </div>
      <div class="dataTables_filter">
        <span>权重名称筛选:</span>
        <input type="text" placeholder="权重名称" v-model="orderDetail">
        <a href="javascript:;" class="btn btn-info" @click="search">搜索</a>
        <a href="javascript:;" class="btn btn-info" @click="addWeight">添加 </a>
      </div>
      <table class="table datatable-show-all">
        <thead>
        <tr>
          <th>权重编码</th>
          <th>权重名称</th>
          <th>权重所占比例</th>
          <th class="text-center">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in userLntegrationWeightKeyWord">
          <td>{{item.hm_ID}}</td>
          <td>{{item.hm_Name}}</td>
          <td class="time">{{item.hm_Percent}}</td>
          <td class="text-center">
            <ul class="icons-list">
              <li class="dropdown">
                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="icon-menu9"></i>
                </a>
                <ul class="dropdown-menu dropdown-menu-right">
                  <li><a href="javascript:;" @click="UpdateLntegrationWeight(item.hm_Code)"><i class="icon-pencil"></i>
                    修改</a></li>
                  <li><a href="javascript:;" @click="deleteLntegrationWeight(item.hm_ID)"><i class="icon-delicious"></i>
                    删除</a></li>
                </ul>
              </li>
            </ul>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <el-dialog title="添加权重" :visible.sync="addUserLntegrationWeight">
      <el-form :model="LntegrationWeight">
        <el-form-item label="权重编码" :label-width="formLabelWidth">
          <el-input v-model="LntegrationWeight.code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="权重名称" :label-width="formLabelWidth">
          <el-input v-model="LntegrationWeight.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="权重所占比例" :label-width="formLabelWidth">
          <el-input v-model="LntegrationWeight.percent" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserLntegrationWeight = false">取 消</el-button>
        <el-button type="primary" @click="dialogAddUserLntegrationWeight">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改权重" :visible.sync="updateUserLntegrationWeight">
      <el-form :model="initLntegrationWeight">
        <el-form-item label="权重编码" :label-width="formLabelWidth">
          <el-input v-model="initLntegrationWeight.hm_Code" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="权重名称" :label-width="formLabelWidth">
          <el-input v-model="initLntegrationWeight.hm_Name" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="权重所占比例" :label-width="formLabelWidth">
          <el-input v-model="initLntegrationWeight.hm_Percent" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateUserLntegrationWeight = false">取 消</el-button>
        <el-button type="primary" @click="dialogUpdateLntegrationWeight">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import publicInit from '../assets/js/public' //根据返回backCode的弹窗函数
  import {POST} from '../assets/js/universal'

  export default {
    name: '',
    data() {
      return {
        orderDetail: '',//初始化搜索
        addUserLntegrationWeight: false,//初始化添加弹窗
        updateUserLntegrationWeight: false,
        LntegrationWeight: {
          code: '',
          name: '',
          percent: ''
        },//权重form对象
        formLabelWidth: '120px'
      }
    },
    computed: mapGetters([
      'userLntegrationWeightKeyWord',
      'initLntegrationWeight'
    ]),
    methods: {
      //筛选
      search() {
        this.orderDetail = this.orderDetail.trim()
        this.$store.commit('searchLntegrationWeightKeyWord', this.orderDetail)
      },
      //初始化渲染权重信息
      initData() {
        var GetHeightPercent = {
          loginUserID: 'huileyou',
          loginUserPass: 123,
          hmCode: '',
          operateUserID: '',
          operateUserName: '',
          pcName: ''
        }
        this.$http.post('http://114.55.248.116:1001/Service.asmx/GetHeightPercent', {
          paramJson: JSON.stringify(GetHeightPercent)
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(data => {
            var data = data.data;
            if (data.backCode == '200') {
              this.$store.commit('initUserLntegrationWeight', data.heightManageList);
              this.$store.commit('initUserLntegrationWeightKeyWord', data.heightManageList);
            }
          })
      },
      //添加点击
      addWeight() {
        this.$store.commit('setTranstionFalse')
        this.addUserLntegrationWeight = true
      },
      //添加积分权重提交
      dialogAddUserLntegrationWeight() {
        var AddHeightItem = {
          loginUserID: 'huileyou',
          loginUserPass: 123,
          hmCode: this.LntegrationWeight.code,
          hmName: this.LntegrationWeight.name,
          percent: this.LntegrationWeight.percent,
          operateUserID: '',
          operateUserName: '',
          pcName: ''
        }
        this.$http.post('http://114.55.248.116:1001/Service.asmx/AddHeightItem', {
          paramJson: JSON.stringify(AddHeightItem)
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(data => {
            var data = data.data;
            publicInit.isBackCode(data, this)
            if (Number(data.backCode) == 200) {
              this.$message({
                showClose: true,
                message: data.backResult,
                type: 'success'
              });
              this.initData();
            }
            this.addUserLntegrationWeight = false
          })
      },
      //修改积分权重
      UpdateLntegrationWeight(code) {
        this.$store.commit('setTranstionFalse')
        this.updateUserLntegrationWeight = true;
        this.$store.commit('initUpdateLntegrationWeight', code)
      },
      //修改积分权重提交
      dialogUpdateLntegrationWeight() {
        var UpdateHeightPercent = {
          loginUserID: 'huileyou',
          loginUserPass: 123,
          hmCode: this.initLntegrationWeight.hm_Code,
          hmPersent: this.initLntegrationWeight.hm_Percent,
          operateUserID: '',
          operateUserName: '',
          pcName: ''
        }
        this.$http.post('http://114.55.248.116:1001/Service.asmx/UpdateHeightPercent', {
          paramJson: JSON.stringify(UpdateHeightPercent)
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(data => {
            var data = data.data;
            publicInit.isBackCode(data, this)
            if (Number(data.backCode) == 200) {
              this.$message({
                showClose: true,
                message: data.backResult,
                type: 'success'
              });
              this.initData();
            }
            this.updateUserLntegrationWeight = false
          })
      },
      //删除权重
      deleteLntegrationWeight(id) {
        var DeleteHeightPercent = {
          loginUserID: 'huileyou',
          loginUserPass: 123,
          hmID: id,
          operateUserID: '',
          operateUserName: '',
          pcName: ''
        }
        this.$http.post('http://114.55.248.116:1001/Service.asmx/DeleteHeightPercent', {
          paramJson: JSON.stringify(DeleteHeightPercent)
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(data => {
            var data = data.data;
            if (Number(data.backCode) == 200) {
              this.$message({
                showClose: true,
                message: data.backResult,
                type: 'success'
              });
              this.initData();
            }
          })
      }
    },
    mounted() {
      this.initData()
    }
  }
</script>
<style scoped>

</style>
