import {loginByUsername} from '@/api/login'
import {setCookie} from '@/utils/cookie'

const user = {
	state: {
		user: ''
	},
	mutations: {
		SET_USER: (state, user) => {
			state.user = user
		}
	},
	actions: {
		LoginByUsername({ commit }, userInfo) {
			return new Promise((resolve, reject) => {
				loginByUsername(userInfo).then(response => {
					// const data = response.data
					commit('SET_USER', userInfo.username)
					if (userInfo.isremember) {
						setCookie('testuser', userInfo.username, { expires: 30 })
					} else {
						setCookie('testuser', userInfo.username)
					}
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}

export default user
