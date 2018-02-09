import Bread from '../bread/Bread.vue'

export default {
	name: 'head-nav',
	components: {
		Bread
	},
	data () {
		return {
			activeIndex: '1',
			colorChangeDialog: false,
			colorOptions: [{
				label: '黑色',
				value: 'black',
				color: '#000000'
			}, {
				label: '灰色',
				value: 'gray',
				color: '#A9A9A9'
			}, {
				label: '绿色',
				value: 'green',
				color: '#19CAAD'
			}, {
				label: '浅绿色',
				value: 'prasinous',
				color: '#8CC7B5'
			}, {
				label: '橘红色',
				value: 'orage',
				color: '#FF8C00'
			}, {
				label: '粉色',
				value: 'pink',
				color: '#FF9A9E'
			}, {
				label: '红色',
				value: 'red',
				color: '#FF5940'
			}, {
				label: '黄色',
				value: 'yellow',
				color: '#D1BA74'
			}],
			colorValue: '',
			menuHidden: true
		}
	},
	methods: {
		toggleMenu () {
      this.$store.dispatch(this.$store.state.leftmenu.menu_flag ? 'set_menu_close' : 'set_menu_open')
    },
		setDialogInfo (command) {
			this.$message('点击了' + command)
			switch (command) {
				case 'color':
					this.colorHandle()
					break
				case 'logout':
					this.logout()
					break
				default:
					break
			}
		},
		toggleHorHeader () {
			this.menuHidden = !this.menuHidden
		},
		logout () {
      this.$confirm('你确定退出登录吗?', '确认退出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push('/login')
      }).catch(() => {})
    },
    colorHandle () {
      this.colorChangeDialog = true
    },
    colorChange () {
      if (this.colorValue) {
    		this.loadCss(this.colorValue)
    	}
    	this.colorChangeDialog = false
    },
    colorReset () {
    	this.resetCss()
    	this.colorChangeDialog = false
    	this.colorValue = ''
    },
    loadCss (fileName) {
      var cssTag = document.getElementById('loadCss')
	    var head = document.getElementsByTagName('head').item(0)
	    if (cssTag) {
	      head.removeChild(cssTag)
	    }
	    var css = document.createElement('link')
	    css.href = '/static/theme/theme-' + fileName + '/index-color.css'
	    css.rel = 'stylesheet'
	    css.type = 'text/css'
	    css.id = 'loadCss'
	    head.appendChild(css)
    },
    resetCss () {
      var cssTag = document.getElementById('loadCss')
	    var head = document.getElementsByTagName('head').item(0)
	    if (cssTag) {
	      head.removeChild(cssTag)
	    }
    }
	}
}
