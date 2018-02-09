import { Home } from '@/layout/'
import { Three } from '@/views/'

export default {
  path: '/three',
  name: '其他',
  component: Home,
  meta: {
    icon: 'tj-consult',
    title: '其他'
  },
  redirect: '/three/badge',
  children: [
    {
      path: 'badge',
      name: 'badge',
      meta: {
        icon: 'tj-zytz',
        title: '标记'
      },
      component: Three.Badge
    },
    {
      path: 'pagination',
      name: 'pagination',
      meta: {
        icon: 'tj-zytz',
        title: '分页'
      },
      component: Three.Pagination
    },
    {
      path: 'tree',
      name: 'tree',
      meta: {
        icon: 'tj-zytz',
        title: '树形控件'
      },
      component: Three.Tree
    }
  ]
}
