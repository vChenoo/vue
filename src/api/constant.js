import request from '@/utils/request'

export function getWhether(data) {
	return request({
		url: '/constant/whether',
		method: 'get'
	})
}
export function getReport(data) {
	return request({
		url: '/constant/report',
		method: 'get'
	})
}
export function getOccupational(data) {
	return request({
		url: '/constant/occupational',
		method: 'get'
	})
}
export function getServicetype(data) {
	return request({
		url: '/constant/servicetype',
		method: 'get'
	})
}
export function getSex(data) {
	return request({
		url: '/constant/sex',
		method: 'get'
	})
}
export function getLogType(data) {
	return request({
		url: '/constant/logtype',
		method: 'get'
	})
}
export function getResultType(data) {
	return request({
		url: '/constant/resulttype',
		method: 'get'
	})
}
export function getDepartment(data) {
	return request({
		url: '/constant/department',
		method: 'get'
	})
}
export function getDepartmentType(data) {
	return request({
		url: '/constant/dptype',
		method: 'get'
	})
}
export function getAccessType(data) {
	return request({
		url: '/constant/accesstype',
		method: 'get'
	})
}
export function getCheckType(data) {
	return request({
		url: '/constant/checktype',
		method: 'get'
	})
}
export function getMealtime(data) {
	return request({
		url: '/constant/mealtime',
		method: 'get'
	})
}
export function getInterfaceType(data) {
	return request({
		url: '/constant/interfacetype',
		method: 'get'
	})
}
export function getMarriage(data) {
	return request({
		url: '/constant/marriage',
		method: 'get'
	})
}
export function getOrgGroupType(data) {
	return request({
		url: '/constant/orggrouptype',
		method: 'get'
	})
}
export function getStatementType(data) {
	return request({
		url: '/constant/statementtype',
		method: 'get'
	})
}
export function getPayType(data) {
	return request({
		url: '/constant/paytype',
		method: 'get'
	})
}
export function getOrgNature(data) {
	return request({
		url: '/constant/nature',
		method: 'get'
	})
}
export function getCardType(data) {
	return request({
		url: '/constant/cardtype',
		method: 'get'
	})
}
