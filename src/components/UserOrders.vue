<template>
  <div>
    <div class="panel panel-flat">
      <div class="panel-heading">
        <h5 class="panel-title">订单信息</h5>
      </div>
      <div class="dataTables_filter">
        <span>订单号筛选:</span>
        <input type="text" placeholder="订单号" v-model="orderDetail">
        <a href="javascript:;" class="btn btn-info" @click="search">搜索</a>
      </div>
      <table class="table datatable-show-all">
        <thead>
        <tr>
          <th>订单类型</th>
          <th>订单用户</th>
          <th>订单号</th>
          <th>订单价格</th>
          <th>订单创建时间</th>
          <th class="text-center">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in orderListKeyWord">
          <td>{{item.OrderTypeName}}</td>
          <td>{{item.userName}}</td>
          <td>{{item.oi_OrderID}}</td>
          <td>{{item.oi_SellMoney}}元</td>
          <td class="time">{{item.oi_CreateTime}}</td>
          <td class="text-center">
            <ul class="icons-list">
              <li class="dropdown">
                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="icon-menu9"></i>
                </a>
                <ul class="dropdown-menu dropdown-menu-right">
                  <li><a href="javascript:;" @click="deleteOrderBtn(item.oi_OrderID)"><i class="icon-delicious"></i> 删除</a>
                  </li>
                </ul>
              </li>
            </ul>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="block" style="float: right;">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="5"
        layout="total, prev, pager, next"
        :total="total"
        v-show="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import publicInit from '../assets/js/public'
  import {POST} from '../assets/js/universal'

  export default {
    name: '',
    data() {
      return {
        total: 0,
        currentPage1: 1,
        orderDetail: ''
      }
    },
    computed: mapGetters([
      'orderListKeyWord'
    ]),
    methods: {
      handleCurrentChange(num) {
        this.initData(num)
      },
      //查询订单类型
      initData(num,orderID) {
        var GetOrderList = {
          loginUserID: 'huileyou',
          loginUserPass: 123,
          orderID:orderID?orderID:'',
          page: num,
          rows: 5
        };
        this.$store.dispatch('initOrdersSearch',GetOrderList)
          .then(total=>{
            this.total = Number(total);
          })
      },
      //订单号筛选
      search() {
        this.orderDetail = this.orderDetail.trim();
        this.initData(1, this.orderDetail)
      },
      //删除订单
      deleteOrderBtn(id) {
        this.$store.dispatch('deleteOrder',id)
          .then(()=>{
            this.$notify({
              message: '删除订单成功！',
              type: 'success'
            });
            this.initData(1)
          })
      }
    },
    mounted() {

    }
  }
</script>
<style scoped>

</style>
