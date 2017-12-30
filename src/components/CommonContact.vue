<template>
    <div class="panel panel-flat">
      <div class="panel-heading">
        <h5 class="panel-title">联系人管理</h5>
      </div>
      <div class="dataTables_filter">
        <span>联系人名称:</span>
        <input type="text" placeholder="名称" v-model="contactName">
        <el-select v-model="isContactName" placeholder="请选择是否紧急联系人
">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="isDelete" placeholder="是否删除
">
          <el-option
            v-for="item in deletes"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <a href="javascript:;" class="btn btn-info" @click="search">搜索</a>
        <a href="javascript:;" class="btn btn-info" @click="addCommonContact">添加 </a>
      </div>
      <table class="table datatable-show-all" v-loading="isLoading">
        <thead>
        <tr>
          <th>联系人编号</th>
          <th>联系人名称</th>
          <th>所属游客编号</th>
          <th>电话号码</th>
          <th>身份证号</th>
          <th>所属省市县</th>
          <th>详细地址</th>
          <th class="text-center">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in contactNameList">
          <td>{{item.ui_uc_ID}}</td>
          <td class="time">{{item.ui_uc_Name}}</td>
          <td>{{item.ui_uc_UserInfoID}}</td>
          <td>{{item.ui_uc_Phone}}</td>
          <td>{{item.ui_uc_CertNo}}</td>
          <td>{{item.ui_uc_Provice?item.ui_uc_Provice:"某"+"省"}}{{item.ui_uc_City?item.ui_uc_City:"某"+"市"}}{{item.ui_uc_Contry?item.ui_uc_Contry:"某"+"县"}}</td>
          <td>{{item.ui_uc_Address}}</td>
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
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {
        contactName:'',
        isContactName:'',
        isDelete:'',
        isLoading:false,
        options:[
          {
            value: '0',
            label: '非紧急联系人'
          }, {
            value: '1',
            label: '是紧急联系人'
          }
        ],
        deletes:[
          {
            value: '0',
            label: '未删除'
          }, {
            value: '1',
            label: '已删除'
          }
        ]
      }
    },
    computed: mapGetters([
      'contactNameList'
    ]),
    methods: {
      //初始化数据
      initData(options){
        var initValue = {
          loginUserID:'huileyou',
          loginUserPass:123,
          name:options.name?options.name:'',
          isUrgent:options.isUrgent?options.isUrgent:'',
          isDelete:options.isDelete?options.isDelete:''
        };
        this.isLoading = true;
        this.$store.dispatch('initContactNameData',initValue)
        .then(()=>{
          this.isLoading = false;
        },err=>{
          this.$notify({
            message: err,
            type: 'error'
          });
        })
      },
      //搜索
      search(){
        this.initData({
          name:this.contactName,
          isUrgent:this.isContactName,
          isDelete:this.isDelete
        })
      },
      //添加
      addCommonContact(){

      },

    },
  }
</script>
<style scoped>

</style>
