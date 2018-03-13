import request from '@/utils/request_mock'

export function queryAccount(data) {
	return request({
		url: '/systemmg/account',
		method: 'get'
	})
}
