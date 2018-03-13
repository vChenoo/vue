import { Home } from '@/layout/'
import { Systemtools } from '@/views/'

export default {
  path: '/systemtools',
  name: 'systemtools',
  component: Home,
  meta: {
    icon: 'setting',
    title: '系统工具'
  },
  redirect: '/systemtools/systemaccount',
  children: [
    {
      path: 'systemaccount',
      name: 'systemaccount',
      meta: {
        icon: 'tj-zytz',
        title: '账户管理'
      },
      component: Systemtools.Systemaccount
    },
    {
      path: 'systemlog',
      name: 'systemlog',
      meta: {
        icon: 'tj-zytz',
        title: '操作日志'
      },
      component: Systemtools.Systemlog
    },
    {
      path: 'systemclear',
      name: 'systemclear',
      meta: {
        icon: 'tj-zytz',
        title: '系统清理'
      },
      component: Systemtools.Systemclear
    },
    {
      path: 'systemregister',
      name: 'systemregister',
      meta: {
        icon: 'tj-zytz',
        title: '系统注册'
      },
      component: Systemtools.Systemregister
    }
  ]
}
