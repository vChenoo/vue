import requestMock from '@/utils/request_mock'
import request from '@/utils/request'

const URLHeader = 'basic/data/'
export function queryClinicalType(data) {
	return request({
		url: URLHeader + 'queryClinicalType',
		method: 'post',
		data
	})
}
export function saveClinicalType(data) {
	return request({
		url: URLHeader + 'saveClinicalType',
		method: 'post',
		data
	})
}
export function updateClinicalType(data) {
	return request({
		url: URLHeader + 'updateClinicalType',
		method: 'post',
		data
	})
}
/* mock数据 */
export function queryColor(data) {
	return requestMock({
		url: '/database/color',
		method: 'get'
	})
}
export function queryClinical(data) {
	return requestMock({
		url: '/database/clinical',
		method: 'get'
	})
}
/* export function queryServicetype(data) {
	return requestMock({
		url: '/database/servicetype',
		method: 'get'
	})
} */
export function queryTesttype(data) {
	return requestMock({
		url: '/database/testtype',
		method: 'get'
	})
}
export function querySample(data) {
	return requestMock({
		url: '/database/sample',
		method: 'get'
	})
}
export function queryLogo(data) {
	return requestMock({
		url: '/database/logo',
		method: 'get'
	})
}
export function queryInvoice(data) {
	return requestMock({
		url: '/database/invoice',
		method: 'get'
	})
}
export function queryCollect(data) {
	return requestMock({
		url: '/database/collect',
		method: 'get'
	})
}
export function queryOtherCharges(data) {
	return requestMock({
		url: '/database/othercharges',
		method: 'get'
	})
}
export function queryConsumable(data) {
	return requestMock({
		url: '/database/consumable',
		method: 'get'
	})
}
