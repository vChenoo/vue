import request from '@/utils/request_mock'

export function querySystemlog(data) {
	return request({
		url: '/systemtools/systemlog',
		method: 'get'
	})
}
export function queryAccount(data) {
	return request({
		url: '/systemtools/account',
		method: 'get'
	})
}
