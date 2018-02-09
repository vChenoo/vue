import { Home } from '@/layout/'
import { Systemtools } from '@/views/'

export default {
  path: '/systemtools',
  name: 'systemtools',
  component: Home,
  meta: {
    icon: 'tj-management',
    title: '系统工具'
  },
  redirect: '/systemtools/systemlog',
  children: [
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
      path: 'register',
      name: 'register',
      meta: {
        icon: 'tj-zytz',
        title: '系统注册'
      },
      component: Systemtools.Register
    }
  ]
}
