import { Home } from '@/layout/'
import { Register } from '@/views/'

export default {
  path: '/register',
  name: 'register',
  component: Home,
  meta: {
    icon: 'tj-yudengji',
    title: '体检登记'
  },
  redirect: '/register/prepersonal',
  children: [
    {
      path: 'prepersonal',
      name: 'prepersonal',
      meta: {
        icon: 'tj-zytz',
        title: '个人体检预登记'
      },
      component: Register.Prepersonal
    }, {
      path: 'preorganization',
      name: 'preorganization',
      meta: {
        icon: 'tj-zytz',
        title: '单位体检预登记'
      },
      component: Register.Preorganization
    }, {
      path: 'formalregister',
      name: 'formalregister',
      meta: {
        icon: 'tj-zytz',
        title: '体检正式登记'
      },
      component: Register.Formalregister
    }, {
      path: 'formalcharge',
      name: 'formalcharge',
      meta: {
        icon: 'tj-zytz',
        title: '个人体检收费'
      },
      component: Register.Formalcharge
    }, {
      path: 'orgregister',
      name: 'orgregister',
      meta: {
        icon: 'tj-zytz',
        title: '单位批量正式登记'
      },
      component: Register.Orgregister
    }
  ]
}
