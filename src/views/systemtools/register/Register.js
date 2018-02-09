export default {
	name: 'register',
	data () {
		return {
			registerData: {
				status: 0,
				time: '-',
				unit: '-'
			},
			registerForm: {
				register: ''
			},
			rules: {
				register: [
					{required: true, message: '请输入注册码', trigger: 'blur'}
				]
			}
		}
	},
	computed: {
		registerStatus () {
			return this.registerData.status === 1 ? '已注册' : '未注册'
		},
		hasRegister () {
			return this.registerData.status === 1
		},
		needRegister () {
			return this.registerData.status === 2
		},
		notRegister () {
			return this.registerData.status === 0
		}
	},
	methods: {
		submitRegister (formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					console.log('注册' + this.registerForm.register)
					this.registerData.time = '2018-01-01 ~ 2021-12-30'
					this.registerData.status = 1
					this.registerData.unit = 'XXX单位'
				}
			})
		},
		resetForm (formName) {
      this.$refs[formName].resetFields()
    }
	}
}
