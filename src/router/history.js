import { Home } from '@/layout/'
import { History } from '@/views/'

export default {
  path: '/history',
  name: 'history',
  component: Home,
  meta: {
    icon: 'tj-import',
    title: '转档记录'
  },
  redirect: '/history/personalhistory',
  children: [
    {
      path: 'personalhistory',
      name: 'personalhistory',
      meta: {
        icon: 'tj-zytz',
        title: '个人体检转档记录'
      },
      component: History.Personalhistory
    }, {
      path: 'orghistory',
      name: 'orghistory',
      meta: {
        icon: 'tj-zytz',
        title: '单位体检转档记录'
      },
      component: History.Orghistory
    }
  ]
}
