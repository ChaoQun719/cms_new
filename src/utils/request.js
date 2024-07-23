import axios from "axios";
import { useNavigate } from "react-router-dom";

const request = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 5000,
  headers: { 'X-Custom-Header': 'foobar' }
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // post请求头
  request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

const navgate = useNavigate()

/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function HttpGET(url, params) {
  return new Promise((resolve, reject) => {
    request.get(url, { params: params })
      .then(res => {
        if (res.data.res === -1) {
          // 没有登录状态，回到登录页
          setTimeout(() => {
            navgate('/login')
          }, 500)
        }
        else {
          resolve(res.data)
        }
      })
      .catch(err => {
        reject(err.data)
      })
  })
}


/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function HttpPOST(url, params) {
  return new Promise((resolve, reject) => {
    request.post(url, params)
      .then(res => {
        if (res.data.res === -1) {
          // 没有登录状态，回到登录页
          setTimeout(() => {
            navgate('/login')
          }, 500)
        }
        else {
          resolve(res.data)
        }
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

/** 
* fileUpload方法，对应文件上传post请求 
* @param {String} url [请求的url地址] 
* @param {Object} params [请求时携带的参数] 
*/
export function HttpFileUpload(url, params = {}) {
  return new Promise((resolve, reject) => {
    request.post(url, params, { headers: { "Content-Type": "multipart/form-data" } })
      .then(res => {
        if (res.data.res === -1) {
          // 没有登录状态，回到登录页
          setTimeout(() => {
            navgate('/login')
          }, 500)
        }
        else {
          resolve(res.data)
        }
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export { HttpGET, HttpPOST, HttpFileUpload }