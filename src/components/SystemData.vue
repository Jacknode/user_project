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
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {
        isLoading: false,
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
        ]
      }
    },
    computed: mapGetters([
      'systemDataList'
    ]),
    methods: {
      //初始化数据
      initData(options){
        let initValue = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          ts_if_Title:options.ts_if_Title?options.ts_if_Title:'',
          ts_if_InfoTypeID:options.ts_if_InfoTypeID?options.ts_if_InfoTypeID:''
        };
        this.$store.dispatch('initSystemData',initValue)
      },
      //搜索
      search(){
        this.initData({
          ts_if_Title:this.dataTitle,
          ts_if_InfoTypeID:this.infoTypeName
        })
      }
    },
  }
</script>
<style scoped>

</style>
