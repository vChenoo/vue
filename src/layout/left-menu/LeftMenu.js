export default {
	name: 'left-menu',
	data () {
    return {
      menu_list: [],
      win_size: {
        height: ''
      }/* ,
      isCollapse: false */
    }
  },
	methods: {
		setSize () {
      this.win_size.height = document.documentElement.clientHeight + 'px'
    },
		/* toggleMenu () {
      this.isCollapse = !this.isCollapse
      this.$store.dispatch(this.$store.state.leftmenu.menu_flag ? 'set_menu_close' : 'set_menu_open')
    }, */
    updateCurMenu (route) {
      route = route || this.$route
      if (route.matched.length) {
        var rootPath = route.matched[0].path
        var fullPath = route.path
        this.$store.dispatch('set_cur_route', {
          rootPath,
          fullPath
        })
        var routes = this.$router.options.routes
        for (var i = 0; i < routes.length; i++) {
          if (routes[i].path === rootPath && !routes[i].hidden) {
            this.menu_list = routes[i].children
            break
          }
        }
      } else {
        this.$router.push('/404')
      }
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
	},
	created () {
		var that = this
    that.setSize()
    window.onresize = () => {
      that.setSize()
    }
    that.updateCurMenu()
  },
  watch: {
    $route (to, from) {
      console.log(1111)
      this.updateCurMenu(to)
    }
  }
}
