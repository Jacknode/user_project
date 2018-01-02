<template>
  <div>
    <div class="panel panel-flat">
      <div class="panel-heading">
        <h5 class="panel-title">系统资料</h5>
      </div>
      <div class="dataTables_filter">
        <span>系统资料标题:</span>
        <input type="text" placeholder="标题" v-model="dataTitle">
        <el-select v-model="infoTypeName" placeholder="资料所属类型
">
          <el-option
            v-for="item in infoTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <a href="javascript:;" class="btn btn-info" @click="search">搜索</a>
        <a href="javascript:;" class="btn btn-info" @click="addSystemData">新增</a>
      </div>
      <table class="table datatable-show-all" v-loading="isLoading">
        <thead>
        <tr>
          <th>资料编码</th>
          <th>档案编号</th>
          <th>资料所属类型</th>
          <th>档案名称</th>
          <th>标题</th>
          <th>简介</th>
          <th>资料内容</th>
          <th class="text-center">操作</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="item in systemDataList">
            <td>{{item.ts_if_ID}}</td>
            <td class="time">{{item.ts_if_Code}}</td>
            <td>{{item.ts_if_InfoTypeID}}</td>
            <td>{{item.ts_if_Name}}</td>
            <td>
              {{item.ts_if_Title}}
            </td>
            <td>{{item.ts_if_Introduce}}</td>
            <td>{{item.ts_if_Content}}</td>
            <td class="text-center">
              <ul class="icons-list">
                <li class="dropdown">
                  <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                    <i class="icon-menu9"></i>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-right">
                    <li><a href="javascript:;" @click="updateSystem(item.ts_if_ID)"><i class="icon-pencil"></i> 修改</a></li>
                  </ul>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--添加系统资料-->
    <el-dialog title="添加系统资料" :visible.sync="addSystemDialog">
      <el-form :model="addSystem">
        <el-form-item label="档案编号" :label-width="formLabelWidth">
          <el-input v-model="addSystem.data.ts_if_Code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="资料所属类型" :label-width="formLabelWidth">
          <el-select v-model="addSystem.data.ts_if_InfoTypeID" placeholder="请选择资料类型">
            <el-option label="注册协议" value="0"></el-option>
            <el-option label="法律声明" value="1"></el-option>
            <el-option label="隐私政策" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="档案名称" :label-width="formLabelWidth">
          <el-input v-model="addSystem.data.ts_if_Name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="addSystem.data.ts_if_Title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="简介" :label-width="formLabelWidth">
          <el-input v-model="addSystem.data.ts_if_Introduce" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="资料内容" :label-width="formLabelWidth">
          <el-input v-model="addSystem.data.ts_if_Content" auto-complete="off" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addSystemDialog = false">取 消</el-button>
        <el-button type="primary" @click="addSystemDialogSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改系统资料-->
    <el-dialog title="修改系统资料" :visible.sync="updateSystemDialog">
      <el-form :model="updateSystemDataObj">
        <el-form-item label="档案编号" :label-width="formLabelWidth">
          <el-input v-model="updateSystemDataObj.ts_if_Code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="资料所属类型" :label-width="formLabelWidth">
          <el-select v-model="updateSystemDataObj.ts_if_InfoTypeID" placeholder="请选择资料类型">
            <el-option label="注册协议" value="0"></el-option>
            <el-option label="法律声明" value="1"></el-option>
            <el-option label="隐私政策" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="档案名称" :label-width="formLabelWidth">
          <el-input v-model="updateSystemDataObj.ts_if_Name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="updateSystemDataObj.ts_if_Title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="简介" :label-width="formLabelWidth">
          <el-input v-model="updateSystemDataObj.ts_if_Introduce" auto-complete="off" type="textarea" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
        </el-form-item>
        <el-form-item label="资料内容" :label-width="formLabelWidth">
          <el-input v-model="updateSystemDataObj.ts_if_Content" auto-complete="off" type="textarea" :rows="row"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateSystemDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateSystemDialogSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {
        isLoading: false,
        row:8,
        formLabelWidth:'120px',
        dataTitle: '',
        infoTypeName: '',
        infoTypeList: [
          {
            value: '0',
            label: '注册协议'
          }, {
            value: '1',
            label: '法律声明'
          }, {
            value: '2',
            label: '隐私政策'
          }
        ],
        addSystemDialog:false,//增加弹窗
        updateSystemDialog:false,//修改弹窗
        //增加系统资料
        addSystem:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          data:{
            "ts_if_Code": "",
            "ts_if_InfoTypeID": "",
            "ts_if_Name": "",
            "ts_if_Title": "",
            "ts_if_Introduce":'',
            "ts_if_Content":''
          }
        }
      }
    },
    computed: mapGetters([
      'systemDataList',
      'updateSystemDataObj'
    ]),
    methods: {
      //初始化数据
      initData(options){
        let initValue = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          ts_if_Title: options.ts_if_Title ? options.ts_if_Title : '',
          ts_if_InfoTypeID: options.ts_if_InfoTypeID ? options.ts_if_InfoTypeID : ''
        };
        this.isLoading = true;
        this.$store.dispatch('initSystemData', initValue)
          .then(()=>{
            this.isLoading = false
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
          ts_if_Title: this.dataTitle,
          ts_if_InfoTypeID: this.infoTypeName
        })
      },
      //新增
      addSystemData(){
        this.$store.commit('setTranstionFalse')
        this.addSystemDialog = true;
      },
      //添加提交
      addSystemDialogSubmit(){
        if(this.addSystem.data.ts_if_Code.trim()==''
          || this.addSystem.data.ts_if_Name.trim()==''
        ){
          this.$notify({
            message: '输入编号或名称不能为空!',
            type: 'error'
          });
          this.addSystemDialog = false;
          return
        }
        this.$store.dispatch('addSystemOne',this.addSystem)
          .then(()=>{
            this.$notify({
              message: '添加成功!',
              type: 'success'
            });
            this.initData({
              ts_if_Title: '',
              ts_if_InfoTypeID: ''
            })
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.addSystemDialog = false;
      },
      //修改
      updateSystem(id){
        this.$store.commit('setTranstionFalse');
        this.$store.commit('initUpdateSystemDataObj',id)
        this.updateSystemDialog = true;
      },
      //修改提交
      updateSystemDialogSubmit(){
        this.$store.dispatch('updateSystemOne',this.updateSystemDataObj)
          .then(()=>{
            this.$notify({
              message: '修改成功!',
              type: 'success'
            });
            this.initData({
              ts_if_Title: '',
              ts_if_InfoTypeID: ''
            })
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
          });
        this.updateSystemDialog = false;
      }
    },
  }
</script>
<style scoped>

</style>
