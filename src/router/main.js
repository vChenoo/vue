import { Home } from '@/layout/'
import { Main } from '@/views/'

export default {
  path: '/main',
  name: 'main',
  component: Home,
  ignore: true,
  meta: {
    icon: 'tj-homepage',
    title: '主页'
  },
  redirect: '/main/homepage',
  children: [
    {
      path: 'homepage',
      name: 'homepage',
      meta: {
        icon: 'tj-homepage',
        title: '主页',
        noCache: false
      },
      component: Main.Homepage
    }
  ]
}
