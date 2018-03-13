import request from '@/utils/request_mock'

export function queryPersonalexamination (data) {
	return request({
		url: '/management/personalexamination',
		method: 'get',
		data
	})
}
export function queryReportSend (data) {
	return request({
		url: '/management/reportsend',
		method: 'get',
		data
	})
}
export function queryPersonalInfo (data) {
	return request({
		url: '/management/personalinfo',
		method: 'get',
		data
	})
}
export function queryOrgGroup (data) {
	return request({
		url: '/management/orggroup',
		method: 'get',
		data
	})
}
export function queryOrganization (data) {
	return request({
		url: '/management/organization',
		method: 'get',
		data
	})
}
export function queryOrgexamination (data) {
	return request({
		url: '/management/orgexamination',
		method: 'get',
		data
	})
}
export function queryReturnVisit (data) {
	return request({
		url: '/management/returnvisit',
		method: 'get',
		data
	})
}
