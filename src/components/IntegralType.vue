<template>
  <div>
    <div class="panel clearfix panel-flat">
      <div class="panel-heading">
        <h5 class="panel-title">积分类型</h5>
      </div>
      <div class="dataTables_filter">
        <span>类型名称:</span>
        <input type="text" v-model="values" placeholder="类型名称">
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
        <a href="javascript:;" class="btn btn-info" @click="addIntegralType">添加 </a>
      </div>

      <!--展示数据-->
      <table class="table datatable-show-all" v-loading="isLoading">
        <thead>
        <tr>
          <th>积分类型ID</th>
          <th>类型名称</th>
          <th>分数</th>
          <th>备注</th>
          <th>是否删除</th>
          <th class="text-center">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in searshIntegralTypeList">
          <td>{{item.ts_at_TypeID}}</td>
          <td>{{item.ts_at_TypeName}}</td>
          <td>{{item.ts_at_Score}}</td>
          <td>{{item.ts_at_Remark}}</td>
          <td>{{item.ts_at_IsDelete==0?"未删除":"已删除"}}</td>
          <td class="text-center">
            <ul class="icons-list">
              <li class="dropdown">
                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="icon-menu9"></i>
                </a>
                <ul class="dropdown-menu dropdown-menu-right">
                  <li>
                    <a href="javascript:;" @click="updateIntegralType(item.ts_at_TypeID)"><i class="icon-pencil"></i>修改</a>
                  </li>
                  <li>
                    <a href="javascript:;" @click="deleteIntegralType(item.ts_at_TypeID)"><i class="icon-delicious"></i>删除</a>
                  </li>
                </ul>
              </li>
            </ul>
          </td>
        </tr>
        </tbody>
      </table>

      <!--添加弹窗-->
      <el-dialog title="添加积分类型" :visible.sync="dialogAddFormVisible" width="60%">
        <el-form :model="addIntegralTypePopup">
          <el-form-item label="类型ID" :label-width="formLabelWidth" :required="isOff">
            <el-input v-model="addIntegralTypePopup.tsAtTypeID" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型名称" :label-width="formLabelWidth">
            <el-input v-model="addIntegralTypePopup.tsAtTypeName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="分数" :label-width="formLabelWidth">
            <el-input v-model="addIntegralTypePopup.tsAtScore" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="addIntegralTypePopup.tsAtRemark" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addIntegralTypePopupSubmit">提交</el-button>
        </div>
      </el-dialog>

      <!--修改积分类型-->
      <el-dialog title="修改积分类型" :visible.sync="dialogUpdateFormVisible" width="60%">
        <el-form :model="updateIntegralTypeObj">
          <el-form-item label="类型ID" :label-width="formLabelWidth" :required="isOff">
            <el-input v-model="updateIntegralTypeObj.ts_at_TypeID" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型名称" :label-width="formLabelWidth">
            <el-input v-model="updateIntegralTypeObj.ts_at_TypeName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="分数" :label-width="formLabelWidth">
            <el-input v-model="updateIntegralTypeObj.ts_at_Score" auto-complete="off"></el-input>
          </el-form-item>
          <!--<el-form-item label="是否启用" :label-width="formLabelWidth">-->
            <!--<el-input v-model="updateIntegralTypeObj.ts_at_IsDelete==0?'启用':'不启用'" auto-complete="off"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item  label="是否删除" :label-width="formLabelWidth">
            <el-select v-model="updateIntegralTypeObj.ts_at_IsDelete" placeholder="是否删除">
          <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="updateIntegralTypeObj.ts_at_Remark" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogUpdateFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateIntegralTypePopupSubmit">提交</el-button>
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
      'searshIntegralTypeList',
      'updateIntegralTypeObj'
    ]),
    data(){
      return {
        isDelete:'',
        isLoading: false,
        dialogAddFormVisible:false,
        dialogUpdateFormVisible:false,
        isOff:true,
        formLabelWidth:'120px',
        //修改
        options:[
          {
            value: '0',
            label: '未删除'
          }, {
            value: '1',
            label: '已删除'
          }
        ],
        optionsValue:'',
        deletes:[
          {
            value: '0',
            label: '未删除'
          }, {
            value: '1',
            label: '已删除'
          },
          {
            value: '',
            label: '所有'
          }
        ],
        values:'',
        addIntegralTypePopup:{
          tsAtTypeID:'',
          tsAtTypeName:'',
          tsAtScore:'',
          tsAtRemark:''
        }
      }
    },
    methods:{
      //初始化积分类型查询
      initData(options){
        var GetAccumulateTypeList = {
          loginUserID:'huileyou',
          loginUserPass:'123',
          atTypeID:'',
          atTypeName:options.atTypeName?options.atTypeName:'',
          atIsDelete:options.atIsDelete?options.atIsDelete:''
        };
        this.isLoading = true;
        this.$store.dispatch('initIntegralTypeData',GetAccumulateTypeList)
          .then(()=>{
            this.isLoading = false;
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      //查询
      search(){
        this.initData({
          atTypeName: this.values.trim(),
          atIsDelete: this.isDelete.trim()
        });
      },
      //添加
      addIntegralType(){
        this.$store.commit('setTranstionFalse')
        this.dialogAddFormVisible = true;
      },
      //添加弹窗
      addIntegralTypePopupSubmit(){
        //判断积分类型不能为空
        if(this.addIntegralTypePopup.tsAtTypeID == ''){
          this.$notify({
            message: '请输入积分类型ID！',
            type: 'error'
          });
          return;
        }
        var AddAccumulateType = {
          loginUserID:'huileyou',
          loginUserPass:123,
          data:{
            ts_at_TypeID:this.addIntegralTypePopup.tsAtTypeID,
            ts_at_TypeName:this.addIntegralTypePopup.tsAtTypeName,
            ts_at_Score:this.addIntegralTypePopup.tsAtScore,
            ts_at_Remark:this.addIntegralTypePopup.tsAtRemark
          }
        };
        this.$store.dispatch('addToIntegralType',AddAccumulateType)
          .then(suc=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData({
              atTypeName: this.values.trim(),
              atIsDelete: this.isDelete.trim()
            })
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.dialogAddFormVisible = false;
      },
      //初始化修改积分类型
      updateIntegralType(id){
        this.$store.commit('setTranstionFalse')
        this.dialogUpdateFormVisible = true;
        this.$store.commit('initupdateIntegralType',id)
      },
      //修改积分类型弹窗
      updateIntegralTypePopupSubmit(){
        console.log(this.updateIntegralTypeObj)
        var UpdateAccumulateType = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ts_at_TypeID": this.updateIntegralTypeObj.ts_at_TypeID,
            "ts_at_TypeName": this.updateIntegralTypeObj.ts_at_TypeName,
            "ts_at_Score": this.updateIntegralTypeObj.ts_at_Score,
            "ts_at_IsDelete": this.updateIntegralTypeObj.ts_at_IsDelete+'',
            "ts_at_Remark": this.updateIntegralTypeObj.ts_at_Remark
          }
        }
        this.$store.dispatch('updateIntegralTypePopup',UpdateAccumulateType)
          .then(suc=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData({
              atTypeName: this.values.trim(),
              atIsDelete: this.isDelete.trim()
            })
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.dialogUpdateFormVisible = false;
      },
      //删除积分类型
      deleteIntegralType(id){
        this.$store.dispatch('deleteIntegralObj',id)
          .then(suc=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData({
              atTypeName: this.values.trim(),
              atIsDelete: this.isDelete.trim()
            })
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
    }

  }
</script>
<style>

</style>
