import request from '@/utils/request_mock'

export function getTester(data) {
	return request({
		url: '/doctor/gettester',
		method: 'get'
	})
}
