import {notifyConfig} from '@/utils/'

export default {
  name: 'formalregister',
	data () {
		return {
			active: 1,
			steps: [
			{
				id: '1',
				title: '个人信息'
			}, {
				id: '2',
				title: '选择体检项目'
			}]
		}
	},
	methods: {
		next() {
			let _len = this.steps.length
			if (_len < 2) return false
      if (this.active++ > _len + 1) this.active = 1
      if (this.active === _len + 1) this.active++
    }
	}
}
