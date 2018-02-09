import request from '@/utils/request'

export function querySystemlog(data) {
	return request({
		url: '/database/systemlog',
		method: 'get'
	})
}
