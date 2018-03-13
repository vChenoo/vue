import { Home } from '@/layout/'
import { Testsetting } from '@/views/'

export default {
  path: '/testsetting',
  name: 'testsetting',
  component: Home,
  meta: {
    icon: 'tj-muiiconradmin',
    title: '体检设置'
  },
  redirect: '/testsetting/testproject',
  children: [
    {
      path: 'testproject',
      name: 'testproject',
      meta: {
        icon: 'tj-zytz',
        title: '体检项目管理'
      },
      component: Testsetting.Testproject
    }, {
      path: 'department',
      name: 'department',
      meta: {
        icon: 'tj-zytz',
        title: '体检科室管理'
      },
      component: Testsetting.Department
    }, {
      path: 'groupproject',
      name: 'groupproject',
      meta: {
        icon: 'tj-zytz',
        title: '组合项目管理'
      },
      component: Testsetting.Groupproject
    }, {
      path: 'package',
      name: 'package',
      meta: {
        icon: 'tj-zytz',
        title: '体检套餐管理'
      },
      component: Testsetting.Package
    }, {
      path: 'conclusion',
      name: 'conclusion',
      meta: {
        icon: 'tj-zytz',
        title: '体检结论管理'
      },
      component: Testsetting.Conclusion
    }, {
      path: 'diagnose',
      name: 'diagnose',
      meta: {
        icon: 'tj-zytz',
        title: '诊断建议管理'
      },
      component: Testsetting.Diagnose
    }, {
      path: 'workstation',
      name: 'workstation',
      meta: {
        icon: 'tj-zytz',
        title: '工作台管理'
      },
      component: Testsetting.Workstation
    }
  ]
}
