import request from '@/utils/request'

export function queryPrepersonal (data) {
	return request({
		url: '/register/prepersonal',
		method: 'get',
		data
	})
}
