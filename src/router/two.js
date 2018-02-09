import { Home } from '@/layout/'
import { Two } from '@/views/'

export default {
  path: '/two',
  name: 'two',
  component: Home,
  meta: {
    icon: 'tj-people',
    title: '第二模块'
  },
  redirect: '/two/normal',
  children: [
    {
      path: 'normal',
      name: 'normal',
      meta: {
        icon: 'tj-zytz',
        title: '标记'
      },
      component: Two.Normal
    },
    {
      path: 'update',
      name: 'update',
      meta: {
        icon: 'tj-zytz',
        title: '更新'
      },
      component: Two.Update
    }
  ]
}
