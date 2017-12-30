/**
 * Created by leibo on 17/10/30.
 */
import Home from '@/components/Home'
//用户信息
import Users from '@/components/User'
//登录
import Login from '@/components/Login'
//用户订单明细
import UserOrders from '@/components/UserOrders'
//用户积分
import UserLntegration from '@/components/UserLntegration'
//积分权重
import UserLntegrationWeight from '@/components/UserLntegrationWeight'
//订单类型
import OrderType from '@/components/OrderType'
//常用联系人
import CommonContact from '@/components/CommonContact'
export default [
  , {
    path: '/',
    name: 'Login',
    component: Login
  }, {
    path: '/home',
    name: 'Home',
    components: {
      default: Home
    },
    children: [{
      path: 'profile',
      components: {
        default: Home,
        User: UserOrders
      }
    }, {
      path: 'users',
      components: {
        default: Home,
        User: Users
      },
      name: 'getUser'
    }, {
      path: 'lntegration',
      components: {
        default: Home,
        User: UserLntegration
      }
    }, {
      path: 'lntegrationWeight',
      components: {
        default: Home,
        User: UserLntegrationWeight
      }
    }, {
      path: 'orderType',
      components: {
        default: Home,
        User: OrderType
      },
    },{
      path: 'commonContact',
      components: {
        default: Home,
        User: CommonContact
      },
      name:'CommonContact'
    }]
  }, {
    path: '*',
    redirect: {
      name: 'Login'
    }
  }]
