import { Home } from '@/layout/'
import { Management } from '@/views/'

export default {
  path: '/management',
  name: 'management',
  component: Home,
  meta: {
    icon: 'tj-person',
    title: '体检管理'
  },
  redirect: '/management/personalexamination',
  children: [
    {
      path: 'personalexamination',
      name: 'personalexamination',
      meta: {
        icon: 'tj-zytz',
        title: '个人体检管理'
      },
      component: Management.Personalexamination
    }, {
      path: 'reportsend',
      name: 'reportsend',
      meta: {
        icon: 'tj-zytz',
        title: '体检报告发放'
      },
      component: Management.Reportsend
    }, {
      path: 'personalinfo',
      name: 'personalinfo',
      meta: {
        icon: 'tj-zytz',
        title: '个人信息管理'
      },
      component: Management.Personalinfo
    }, {
      path: 'orggroup',
      name: 'orggroup',
      meta: {
        icon: 'tj-zytz',
        title: '单位分组管理'
      },
      component: Management.Orggroup
    }, {
      path: 'organization',
      name: 'organization',
      meta: {
        icon: 'tj-zytz',
        title: '单位信息管理'
      },
      component: Management.Organization
    }, {
      path: 'orgexamination',
      name: 'orgexamination',
      meta: {
        icon: 'tj-zytz',
        title: '单位体检管理'
      },
      component: Management.Orgexamination
    }, {
      path: 'returnvisit',
      name: 'returnvisit',
      meta: {
        icon: 'tj-zytz',
        title: '复诊通知管理'
      },
      component: Management.Returnvisit
    }
  ]
}
