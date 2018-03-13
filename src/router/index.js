import Vue from 'vue'
import Router from 'vue-router'
import { Login } from '@/views/'
import Main from './main'
/* import One from './one'
import Two from './two'
import Three from './three'
import Four from './four' */
import Systemtools from './systemtools'
import Database from './database'
import Testsetting from './testsetting'
import Register from './register'
import Management from './management'
import Doctor from './doctor'
import History from './history'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: 'test',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      hidden: true,
      redirect (to) {
        return 'login'
      }
    }, {
      path: '/login',
      name: 'login',
      hidden: true,
      component: Login
    },
    Main,
    /* One,
    Two,
    Three,
    Four, */
    Register,
    Management,
    Doctor,
    History,
    Testsetting,
    Database,
    Systemtools
  ]
})
