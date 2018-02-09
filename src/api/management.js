import request from '@/utils/request'

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
