import request from '@/utils/request'

export function queryColor(data) {
	return request({
		url: '/database/color',
		method: 'get'
	})
}
export function queryClinical(data) {
	return request({
		url: '/database/clinical',
		method: 'get'
	})
}
/* export function queryServicetype(data) {
	return request({
		url: '/database/servicetype',
		method: 'get'
	})
} */
export function queryTesttype(data) {
	return request({
		url: '/database/testtype',
		method: 'get'
	})
}
export function querySample(data) {
	return request({
		url: '/database/sample',
		method: 'get'
	})
}
export function queryLogo(data) {
	return request({
		url: '/database/logo',
		method: 'get'
	})
}
export function queryInvoice(data) {
	return request({
		url: '/database/invoice',
		method: 'get'
	})
}
export function queryCollect(data) {
	return request({
		url: '/database/collect',
		method: 'get'
	})
}
export function queryOtherCharges(data) {
	return request({
		url: '/database/othercharges',
		method: 'get'
	})
}
export function queryConsumable(data) {
	return request({
		url: '/database/consumable',
		method: 'get'
	})
}
