/**
 * Created by leibo on 17/11/2.
 */
export default {
  isBackCode(data,_this){
    if(data.backCode==='005'||data.backCode==='001'||data.backCode==='002'||data.backCode==='003'||data.backCode==='004'||data.backCode==='000'){
      _this.$message({
        showClose: true,
        message: data.backResult,
        type: 'error'
      });
    }
  }
}

