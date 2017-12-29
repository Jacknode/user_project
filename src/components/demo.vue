<template>
  <div>
    <div class="panel panel-flat">
      <div class="panel-heading">
        <h5 class="panel-title">用户信息</h5>
      </div>
      <div class="dataTables_filter">
        <span>用户筛选:</span>
        <input type="text" placeholder="用户名">
        <a href="javascript:;" class="btn btn-info">搜索</a>
        <a href="javascript:;" class="btn btn-info">添加 </a>
      </div>
      <input type="button" value="展开" />
      <input type="button" value="收缩" />
      <div class="wrap" id="list">
        <h2>标题</h2>
        <div>
          <span>第一项</span>
          <div>
            <span>第二项</span>
            <div>
              <span>第三项</span>
              <div>
                <span>第四项</span>
                <div>
                  <span>第五项</span>
                  <div>
                    <span>第六项</span>
                    <div>
                      <span>第七项</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name: '',
    data(){
      return {
        orderDetail:''//初始化搜索
      }
    },
    methods:{
      //筛选
      search(){}
    },
    mounted(){
      var oList=document.getElementById("list");
      var aDiv=oList.getElementsByTagName("div");
      var aBtn=document.getElementsByTagName("input");
      var oTimer=null;
      console.log(aBtn)
      aBtn[2].onclick=function()
      {
        var i=aDiv.length-1;
        clearInterval(oTimer);
        oTimer=setInterval(function(){
          aDiv[i].className="";
          i--;
          if(i<0)
          {
            clearInterval(oTimer);
          }
        },50);
      };
      aBtn[1].onclick=function()
      {
        console.log(1)
        var i=0;
        clearInterval(oTimer);
        oTimer=setInterval(function(){
          aDiv[i].className="open";
          i++;
          if(i==aDiv.length)
          {
            clearInterval(oTimer);
          }
        },100);
      };
    }
  }
</script>
<style scoped>
  @-webkit-keyframes open{
    0%
    {
      -webkit-transform:rotateX(-120deg);
    }
    40%
    {
      -webkit-transform:rotateX(30deg);
    }
    60%
    {
      -webkit-transform:rotateX(-20deg);
    }
    80%
    {
      -webkit-transform:rotateX(10deg);
    }
    100%
    {
      -webkit-transform:rotateX(0deg);
    }
  }
  .wrap{margin:30px auto;width:300px;-webkit-perspective:800px;position:relative;}
  .wrap h2{ height:50px;background:#F03; text-align:center; font:16px/50px "微软雅黑"; color:#fff; position:relative;z-index:2;}
  .wrap div{ position:absolute; top:32px;left:0;-webkit-transform-style:preserve-3d; -webkit-transform-origin:top; -webkit-transform:rotateX(-120deg); transition:.5s;}
  .wrap>div{ top:50px;}
  .wrap .open{-webkit-animation:open 2s;-webkit-transform:rotateX(0deg);}
  .wrap span{ display:block;width:300px;height:30px; font:14px/30px "宋体"; background:#6F3; text-indent:15px; color:#fff; transition:.5s; box-shadow:inset 0 0 30px 20px rgba(0,0,0,1);}
  .wrap .open>span{box-shadow:inset 0 0 30px 10px rgba(0,0,0,0);}
  .wrap span:hover{ background:#FF0;text-indent:30px;}

</style>
