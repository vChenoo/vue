import request from '@/utils/request_mock'

export function queryTestproject(data) {
	return request({
		url: '/testsetting/testproject',
		method: 'get'
	})
}
export function queryGroupproject(data) {
	return request({
		url: '/testsetting/groupproject',
		method: 'get'
	})
}
export function queryPackage(data) {
	return request({
		url: '/testsetting/package',
		method: 'get'
	})
}
export function queryConclusion(data) {
	return request({
		url: '/testsetting/conclusion',
		method: 'get'
	})
}
export function queryDiagnose(data) {
	return request({
		url: '/testsetting/diagnose',
		method: 'get'
	})
}
export function queryResult(data) {
	return request({
		url: '/testsetting/result',
		method: 'get'
	})
}
export function queryWorkstation(data) {
	return request({
		url: '/testsetting/workstation',
		method: 'get'
	})
}
