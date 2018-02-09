import { Home } from '@/layout/'
import { Database } from '@/views/'

export default {
  path: '/database',
  name: 'database',
  component: Home,
  meta: {
    icon: 'tj-management',
    title: '基础数据维护'
  },
  redirect: '/database/servicetype',
  children: [
    {
      path: 'clinical',
      name: 'clinical',
      meta: {
        icon: 'tj-zytz',
        title: '临床类型管理'
      },
      component: Database.Clinical
    },
    {
      path: 'color',
      name: 'color',
      meta: {
        icon: 'tj-zytz',
        title: '临床类型颜色管理'
      },
      component: Database.Color
    },
    {
      path: 'testtype',
      name: 'testtype',
      meta: {
        icon: 'tj-zytz',
        title: '体检类别管理'
      },
      component: Database.Testtype
    },
    {
      path: 'sample',
      name: 'sample',
      meta: {
        icon: 'tj-zytz',
        title: '标本类型管理'
      },
      component: Database.Sample
    },
    {
      path: 'logo',
      name: 'logo',
      meta: {
        icon: 'tj-zytz',
        title: '医院徽标管理'
      },
      component: Database.Logo
    },
    {
      path: 'invoice',
      name: 'invoice',
      meta: {
        icon: 'tj-zytz',
        title: '发票项目管理'
      },
      component: Database.Invoice
    }, {
      path: 'collect',
      name: 'collect',
      meta: {
        icon: 'tj-zytz',
        title: '汇总项目管理'
      },
      component: Database.Collect
    }, {
      path: 'othercharges',
      name: 'othercharges',
      meta: {
        icon: 'tj-zytz',
        title: '相关收费项目管理'
      },
      component: Database.Othercharges
    }, {
      path: 'consumable',
      name: 'othercharges',
      meta: {
        icon: 'tj-zytz',
        title: '耗材管理'
      },
      component: Database.Consumable
    }
  ]
}
