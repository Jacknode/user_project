<template>
  <div>
    <div class="navbar navbar-inverse">
      <div class="navbar-header">
        <a class="navbar-brand" href="javascript:;">用户后台管理系统</a>

        <ul class="nav navbar-nav visible-xs-block">
          <li><a data-toggle="collapse" data-target="#navbar-mobile"><i class="icon-tree5"></i></a></li>
          <li><a class="sidebar-mobile-main-toggle"><i class="icon-paragraph-justify3"></i></a></li>
        </ul>
      </div>

      <div class="navbar-collapse collapse" id="navbar-mobile">
        <ul class="nav navbar-nav">
          <li><a class="sidebar-control sidebar-main-toggle hidden-xs"><i class="icon-paragraph-justify3"></i></a></li>

        </ul>


        <ul class="nav navbar-nav navbar-right">


          <li class="dropdown dropdown-user">
            <a class="dropdown-toggle" data-toggle="dropdown">
              <!--<img src="assets/images/placeholder.jpg" alt="">-->
              <span>管理员</span>
              <i class="caret"></i>
            </a>

            <ul class="dropdown-menu dropdown-menu-right">
              <li @click="getUser"><a href="javascript:;"><i class="icon-user-plus"></i>{{qiankeUser ? qiankeUser : ''}}</a>
              </li>
              <li @click="Quit"><a href="javascript:;"><i class="icon-switch2"></i>退出</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!-- /main navbar -->


    <!-- Page container -->
    <div class="page-container">

      <!-- Page content -->
      <div class="page-content">

        <!-- Main sidebar 左边导航栏开始-->
        <div class="sidebar sidebar-main">
          <div class="sidebar-content">

            <!-- User menu -->
            <div class="sidebar-user">
              <div class="category-content">
                <div class="media">
                  <a href="javascript:;" class="media-left">
                    <!--<img src="assets/images/placeholder.jpg" class="img-circle img-sm" alt="">-->
                  </a>
                  <div class="media-body">
                    <span class="media-heading text-semibold">欢迎您:{{qiankeUser ? qiankeUser : ''}}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- /user menu -->


            <!-- Main navigation -->
            <div class="sidebar-category sidebar-category-visible">
              <div class="category-content no-padding">
                <ul class="navigation navigation-main navigation-accordion">

                  <!-- Main -->
                  <li class="navigation-header"><span>Main</span> <i class="icon-menu" title="Main pages"></i></li>
                  <li>
                    <a href="javascript:;"><i class="icon-stack2"></i> <span>用户信息管理</span></a>
                    <ul>
                      <li>
                        <router-link to="/home/users">用户信息</router-link>
                      </li>
                      <li>
                        <router-link to="/home/profile">用户订单详情</router-link>
                      </li>
                      <li>
                        <router-link to="/home/lntegration">用户积分明细管理</router-link>
                      </li>
                      <li>
                        <router-link to="/home/lntegrationWeight">积分项目权重管理</router-link>
                      </li>
                      <li>
                        <router-link to="/home/orderType">订单类型管理</router-link>
                      </li>
                    </ul>
                  </li>
                  <!-- /main -->

                </ul>
              </div>
            </div>
            <!-- /main navigation-->

          </div>
        </div>
        <!-- /main sidebar  左边导航栏结束-->
        <!--右边内容-->
        <div class="content-wrapper">

          <div class="content"
               :class="{ 'animated': transtionActive.isActive, 'rotateInDownRight': transtionActive.isRotateInDownRight }">
            <!-- Page length options -->
            <!-- /page length options -->
            <router-view name="User"></router-view>
            <router-view name="newUser"></router-view>

            <!-- Footer -->
            <!--<div class="footer text-muted">-->
            <!--&copy; 2015. <a href="#">Limitless Web App Kit</a> by <a href="http://themeforest.net/user/Kopyov" target="_blank">Eugene Kopyov</a>-->
            <!--</div>-->
            <!-- /footer -->
          </div>
        </div>
        <!--右边内容结束-->
        <!-- /dashboard content -->


        <!-- Footer -->
        <div class="footer text-muted">

        </div>
        <!-- /footer -->

      </div>
      <!-- /content area -->

    </div>
    <!-- /main content -->

  </div>
  <!-- /page content -->
</template>
<script>
  import User from './User.vue'
  import {mapGetters} from 'vuex'
  import {POST} from '../assets/js/universal'

  export default {
    name: '',
    data() {
      return {
        qiankeUser: ''
      }
    },
    components: {
      User
    },
    computed: mapGetters([
      'userInfo',
      'transtionActive'
    ]),
    watch: {
      '$route'(to, from) {
        this.$store.commit('clearAll')
        // 对路由变化作出响应...
        if (this.transtionActive.isActive && this.transtionActive.isRotateInDownRight) {
          this.$store.commit('setTranstionFalse')
        }
        setTimeout(() => {
          this.$store.commit('oPTranstionFalse')
//          this.isActive = !this.isActive;
//          this.isRotateInDownRight = !this.isRotateInDownRight
        }, 10)
      }
    },
    mounted() {
      if (!JSON.parse(sessionStorage.getItem('isLogin'))) {
        this.$router.push({name: 'Login'})
      }
      var user = sessionStorage.getItem('admin');
      this.qiankeUser = user;
      //初始化订单类型数据
      var GetOrderTypeList = {
        loginUserID: 'huileyou',
        loginUserPass: 123,
        orderTypeCode: '',
        operateUserID: '',
        operateUserName: '',
        pcName: ''
      }
      this.$http.post('http://114.55.248.116:1001/Service.asmx/GetOrderTypeList', {
        paramJson: JSON.stringify(GetOrderTypeList)
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data
          if (data.backCode == '200') {
            this.$store.commit('initOrderType', data.orderTypeList);
            this.$store.commit('initOrderTypeKeyWord', data.orderTypeList);
          }
        })
      //初始化渲染权重信息
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
    methods: {
      //退出
      Quit() {
        this.$router.push({name: 'Login'})
      },
      //用户信息
      getUser() {
        this.$router.push({name: 'getUser'})
      }
    }
  }
</script>
<style scoped>

</style>
