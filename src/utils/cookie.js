import Cookies from 'js-cookie'

export function getCookie(key) {
	return Cookies.get(key)
}

export function setCookie(key, value, expires) {
	return Cookies.set(key, value, expires)
}

export function removeCookie(key) {
	return Cookies.remove(key)
}
