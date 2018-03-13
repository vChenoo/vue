import request from '@/utils/request_mock'

export function queryPrepersonal (data) {
	return request({
		url: '/register/prepersonal',
		method: 'get',
		data
	})
}
export function queryFormalRegister (data) {
	return request({
		url: '/register/formalregister',
		method: 'get',
		data
	})
}
export function queryOrgRegister (data) {
	return request({
		url: '/register/orgregister',
		method: 'get',
		data
	})
}
