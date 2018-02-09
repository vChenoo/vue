import request from '@/utils/request'

export function loginByUsername (data) {
	return request({
		url: '/login',
		method: 'post',
		data
	})
}

export function getUserInfo (data) {
	return request({
		url: 'user/info',
		method: 'get',
		params: {data}
	})
}