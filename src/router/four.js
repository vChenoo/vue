import { Home } from '@/layout/'
import { Four } from '@/views/'

export default {
  path: '/four',
  name: 'four',
  component: Home,
  meta: {
    icon: 'tj-people',
    title: '第四模块'
  },
  redirect: '/four/button',
  children: [
    {
      path: 'button',
      name: 'button',
      meta: {
        icon: 'tj-dictionary',
        title: '标记'
      },
      component: Four.Button
    }, {
      path: 'notice',
      name: 'notice',
      meta: {
        icon: 'reorder',
        title: '提示'
      },
      component: Four.Notice
    }
  ]
}
