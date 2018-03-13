import axios from 'axios'
/* import qs from 'qs' */
import { Message, Confirm } from 'element-ui'

/* eslint-disable */
const service = axios.create({
	/* baseURL: 'http://localhost:8081/' */
	/* baseURL: 'http://172.16.4.120:8080',
	headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [function (data) {
    return qs.stringify(data, { allowDots: true })
  }] */
})
function getURIList(key, list) {
	let ret = ''
  for (let it in list) {
    ret += encodeURIComponent(key+'['+it+']') + '=' + encodeURIComponent(JSON.stringify(list[it])) + '&'
  }
  return ret
}
// 请求拦截器
service.interceptors.request.use(config => {
	return config
}, error => {
	console.log('错误：发送请求')
	console.log(error)
	Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(
	response => {
		const res = response.data
		if (!res && !res.flag) {
			// 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  		if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
			  Confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
	  			confirmButtonText: '重新登录',
	  			cancelButtonText: '取消',
	  			type: 'warning'
	  		}).then(() => {
	   		  /* this.$store.dispatch('FedLogOut').then(() => {	//登出操作
	  				location.reload()		// 为了重新实例化vue-router对象
	      	}) */
	   		})
	  	}
	  	/* eslint-disable */
	   	return Promise.reject('error')
  	} else {
  		console.log('接收请求' + response.config.url)
  		console.log(response.data)
			return response.data
		}
	},
	error => {
		/* console.log('err' + error)
		Message({
			message: error.message,
			type: 'error',
			duration: 5 * 1000
		}) */

		if (error.status !== 404) {
      Message({
        showClose: true,
        message: '返回错误：' + error.msg,
        type: 'error'
      })
    } else {
      /* this.$alert(err.status + ',' + err.msg + '！', '确定登出', {
          confirmButtonText: '重新登录',
          callback: action => {
            // this.$router.push('/login')
            this.$store.dispatch('FedLogOut').then(() => {
            	location.reload()
            })
          }
      }) */
    }
    /* eslint-disable */
		return Promise.reject(error)
	}
)

export default service
