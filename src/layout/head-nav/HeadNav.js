import Bread from '../bread/Bread.vue'
import {notifyConfig} from '@/utils/'
import {getCookie, removeCookie} from '@/utils/cookie'

export default {
	name: 'head-nav',
	components: {
		Bread
	},
	data () {
		let validatePwd = (rule, value, callback) => {
			if (/\s+/g.test(value)) {
				callback(new Error('输入密码不能包含空格'))
			}
		  if (this.changePwdForm.confirmpwd !== '') {
		    this.$refs.formEdit.validateField('confirmpwd')
		  }
		  callback()
		}
		let validateConfirmPwd = (rule, value, callback) => {
		  if (value !== this.changePwdForm.password) {
		    callback(new Error('两次输入的密码不一致'))
		  } else {
		    callback()
		  }
		}
		return {
			activeIndex: '1',
			userName: null,
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
			menuHidden: true,
			changePwdDialog: false,
			changePwdForm: {
				password: '',
				confirmpwd: ''
			},
			pwdRules: {
				password: [
				  {required: true, message: '请输入不少于6位的密码', min: 6, trigger: 'blur'},
				  {validator: validatePwd, trigger: 'blur'}
				],
				confirmpwd: [
				  {required: true, message: '请输入确认密码', trigger: 'blur'},
				  {validator: validateConfirmPwd, trigger: 'blur'}
				]
			},
			pwdRateMax: 3,
			pwdRate: 0,
			pwdRateText: ['弱', '中', '强'],
			pwdRateColors: ['#FFEB3B', '#CDDC39', '#8BC34A']
		}
	},
	created() {
		this.userName = getCookie('testuser')
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
				case 'pass':
					this.passWd()
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
      	removeCookie('testuser')
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
      let cssTag = document.getElementById('loadCss')
	    let head = document.getElementsByTagName('head').item(0)
	    if (cssTag) {
	      head.removeChild(cssTag)
	    }
	    let css = document.createElement('link')
	    css.href = '/static/theme/theme-' + fileName + '/index-color.css'
	    css.rel = 'stylesheet'
	    css.type = 'text/css'
	    css.id = 'loadCss'
	    head.appendChild(css)
    },
    resetCss () {
      let cssTag = document.getElementById('loadCss')
	    let head = document.getElementsByTagName('head').item(0)
	    if (cssTag) {
	      head.removeChild(cssTag)
	    }
    },
    passWd () {
    	this.changePwdDialog = true
    },
    updatePwd () {
    	this.$refs['formPwd'].validate((valid) => {
    	  if (valid) {
    	    console.log(this.changePwdForm)
    	    this.changePwdDialog = false
    	    this.$notify(notifyConfig('修改', 'success'))
    	  } else {
    	    console.log('校验不通过')
    	    return false
    	  }
    	})
    },
    changePwd(val) {
    	this.pwdRate = 0
			if (/\d/.test(val)) {
				this.pwdRate++
			}
			if (/[A-Za-z]/.test(val)) {
				this.pwdRate++
			}
			if (/\W/.test(val)) {
				this.pwdRate++
			}
    },
    handlePwdClose() {
    	this.resetForm('formPwd')
    	this.pwdRate = 0
    },
    resetForm (formName) {
    	this.$refs[formName].resetFields()
    }
	}
}
