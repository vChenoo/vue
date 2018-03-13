import { Home } from '@/layout/'
import { Doctor } from '@/views/'

export default {
  path: '/doctor',
  name: 'doctor',
  component: Home,
  meta: {
    icon: 'tj-doctor',
    title: '医生工作台'
  },
  redirect: '/doctor/test',
  children: [
    {
      path: 'test',
      name: 'test',
      meta: {
        icon: 'tj-zytz',
        title: '体检医生工作台'
      },
      component: Doctor.Test
    }, {
      path: 'totaltest',
      name: 'totaltest',
      meta: {
        icon: 'tj-zytz',
        title: '总检医生工作台'
      },
      component: Doctor.Totaltest
    }
  ]
}
