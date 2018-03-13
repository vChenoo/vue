import request from '@/utils/request_mock'

export function test(data) {
	return request({
		url: '/controller/basic/data/tmp',
		method: 'post',
		data
	})
}
