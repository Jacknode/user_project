<template>
  <div>
    <div class="panel panel-flat">
      <div class="panel-heading">
        <h5 class="panel-title">订单类型管理</h5>
      </div>
      <div class="dataTables_filter">
        <span>订单类型名称:</span>
        <input type="text" placeholder="类型" v-model="orderType">
        <a href="javascript:;" class="btn btn-info" @click="search">搜索</a>
        <a href="javascript:;" class="btn btn-info" @click="addType">添加 </a>
      </div>
      <table class="table datatable-show-all">
        <thead>
        <tr>
          <th>订单类型编号</th>
          <th>订单类型名称</th>
          <th class="text-center">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in OrderTypeListKeyWord">
          <td>{{item.ot_Code}}</td>
          <td class="time">{{item.ot_TypeName}}</td>
          <td class="text-center">
            <ul class="icons-list">
              <li class="dropdown">
                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="icon-menu9"></i>
                </a>
                <ul class="dropdown-menu dropdown-menu-right">
                  <li><a href="javascript:;" @click="updateInit(item.ot_Code)"><i class="icon-pencil"></i> 修改</a></li>
                  <li><a href="javascript:;" @click="deleteType(item.ot_Code)"><i class="icon-delicious"></i> 删除</a>
                  </li>
                </ul>
              </li>
            </ul>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <el-dialog title="添加订单类型" :visible.sync="addOrderType">
      <el-form :model="formType">
        <el-form-item label="订单类型编号" :label-width="formLabelWidth">
          <el-input v-model="formType.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="订单类型名称" :label-width="formLabelWidth">
          <el-input v-model="formType.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addOrderType = false">取 消</el-button>
        <el-button type="primary" @click="dialogAddOrderType">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改订单类型" :visible.sync="updateOrderType">
      <el-form :model="initType">
        <el-form-item label="订单类型编号" :label-width="formLabelWidth">
          <el-input v-model="initType.ot_Code" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="订单类型名称" :label-width="formLabelWidth">
          <el-input v-model="initType.ot_TypeName" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateOrderType = false">取 消</el-button>
        <el-button type="primary" @click="dialogUpdateOrderType">确 定</el-button>
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
        orderType: '',//绑定搜索框
        addOrderType: false,//初始化添加弹窗
        updateOrderType: false,//初始化修改弹窗
        formType: {
          id: '',
          name: ''
        },//初始化添加订单类型
        formLabelWidth: '120px'
      }
    },
    //去看mutations里面的state注释
    computed: mapGetters([
      'OrderTypeList',
      'OrderTypeListKeyWord',
      'initType'
    ]),
    methods: {
      initData() {
        //初始化订单类型数据
        var GetOrderTypeList = {
          loginUserID: 'huileyou',
          loginUserPass: 123,
          orderTypeCode: ''
        }
        this.$http.post('http://114.55.248.116:1001/Service.asmx/GetOrderTypeList', {
          paramJson: JSON.stringify(GetOrderTypeList)
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(data => {
            var data = data.data;
            if (Number(data.backCode) == 200) {
              this.$store.commit('initOrderType', data.orderTypeList);
              this.$store.commit('initOrderTypeKeyWord', data.orderTypeList);
            }
          })
      },
      //订单类型筛选
      search() {
        this.orderType = this.orderType.trim()
        this.$store.commit('searchOrderKeyWord', this.orderType)
      },
      //添加点击
      addType() {
        this.$store.commit('setTranstionFalse')
        this.addOrderType = true;
      },
      //订单添加提交
      dialogAddOrderType() {
        var AddOrderType = {
          loginUserID: 'huileyou',
          loginUserPass: 123,
          orderTypeCode: this.formType.id,
          orderTypeName: this.formType.name
        }
        this.$http.post('http://114.55.248.116:1001/Service.asmx/AddOrderType', {
          paramJson: JSON.stringify(AddOrderType)
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
            this.addOrderType = false
          })
      },
      //订单类型初始化
      updateInit(id) {
        this.$store.commit('setTranstionFalse')
        this.updateOrderType = true;
        this.$store.commit('initUpdateType', id)
      },
      //订单类型修改
      dialogUpdateOrderType() {
        var UpdateOrderType = {
          loginUserID: 'huileyou',
          loginUserPass: 123,
          orderTypeCode: this.initType.ot_Code,
          orderTypeName: this.initType.ot_TypeName
        }
        this.$http.post('http://114.55.248.116:1001/Service.asmx/UpdateOrderType',{
          paramJson:JSON.stringify(UpdateOrderType)
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(data=>{
            var data = data.data;
            publicInit.isBackCode(data, this)
            if (Number(data.backCode) == 200) {
              this.$message({
                showClose: true,
                message: data.backResult,
                type: 'success'
              });
              this.initData()
            }
            this.updateOrderType = false
          })
      },
      //订单删除
      deleteType(id) {
        var DeleteOrderType = {
          loginUserID: 'huileyou',
          loginUserPass: 123,
          orderTypeCode: id
        }
        this.$http.post('http://114.55.248.116:1001/Service.asmx/DeleteOrderType',{
          paramJson:JSON.stringify(DeleteOrderType)
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(data=>{
            var data = data.data;
            publicInit.isBackCode(data, this)
            if (Number(data.backCode) == 200) {
              this.initData()
              this.$store.commit('filterOrderType', id);
            }
            this.$message({
              showClose: true,
              message: data.backResult,
              type: 'success'
            });
          })
      },

    },
    mounted() {
      this.initData();
    }
  }
</script>
<style scoped>

</style>
