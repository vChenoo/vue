import { Home } from '@/layout/'
import { One } from '@/views/'

export default {
  path: '/one',
  name: 'one',
  component: Home,
  meta: {
    icon: 'tj-management',
    title: '数据'
  },
  redirect: '/one/table',
  children: [
    {
      path: 'tablemix',
      name: 'tablemix',
      meta: {
        icon: 'tj-zytz',
        title: '表格'
      },
      component: One.Tablemix
    },
    {
      path: 'tag',
      name: 'tag',
      meta: {
        icon: 'tj-zytz',
        title: '标签'
      },
      component: One.Tag
    },
    {
      path: 'progressmix',
      name: 'progressmix',
      meta: {
        icon: 'tj-zytz',
        title: '进度条'
      },
      component: One.Progressmix
    }
  ]
}
