<template>
  <div>
    <div class="panel panel-flat" style="overflow: hidden">
      <div class="panel-heading">
        <h5 class="panel-title">系统信息</h5>
      </div>
      <div class="dataTables_filter">
        <span>系统编码筛选:</span>
        <input type="text" placeholder="系统编码">
        <a href="javascript:;" class="btn btn-info" @click="search">搜索</a>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    name: '',
    computed: mapGetters([

    ]),
    data() {
      return {}
    },
    methods: {
      //查询系统信息
      initData() {
        var GetSystemInfoList = {
          loginUserID: 'huileyou',
          loginUserPass: 123,
          siID: ''
        };
        this.$store.dispatch('initSearchSystem', GetSystemInfoList)
          .then(suc=>{
            this.$notify({
              message: suc,
              type: 'success'
            });
          },err=>{
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      search() {
        this.initData()
      },

    }

  }
</script>
<style>

</style>
