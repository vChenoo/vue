export default {
	name: 'systemclear',
	data () {
		return {
			isOptimize: false,
			optimizePercentStatus: '',
			optimizePercent: 0,
			isClear: false,
			clearPercentStatus: '',
			clearPercent: 0
		}
	},
	computed: { },
	methods: {
		optimizeHandle () {
			this.isOptimize = true
			if (this.optimizePercent === 0) {
				this.optimizePercentHandle()
			}
		},
		optimizePercentHandle () {
			let that = this
			if (that.optimizePercent < 100) {
				that.optimizePercent += 10
				setTimeout(() => {
					if (that.optimizePercent <= 100) {
						that.optimizePercentHandle()
					}
				}, 100)
			} else {
				that.optimizePercentStatus = 'success'
				setTimeout(() => {
					that.isOptimize = false
					that.optimizePercent = 0
					that.optimizePercentStatus = ''
				}, 800)
			}
		},
		clearHandle () {
			this.isClear = true
			if (this.clearPercent === 0) {
				this.clearPercentHandle()
				console.log(333)
			}
		},
		clearPercentHandle () {
			let that = this
			if (that.clearPercent < 100) {
				that.clearPercent += 10
				setTimeout(() => {
					if (that.clearPercent <= 100) {
						that.clearPercentHandle()
					}
				}, 100)
			} else {
				that.clearPercentStatus = 'success'
				setTimeout(() => {
					that.isClear = false
					that.clearPercent = 0
					that.clearPercentStatus = ''
				}, 800)
			}
		}
	}
}
