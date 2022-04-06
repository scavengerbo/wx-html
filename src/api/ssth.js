import axios from 'axios'
import qs from 'qs'
// axios.defaults.baseURL = 'http://64.64.236.137:3682'

// axios.defaults.baseURL = 'http://101.43.185.6:3682'
axios.defaults.baseURL = '/api'

export const requestLogin = params => { return axios.post('/login/verifyNameAndPasswd', qs.stringify(params)).then(res => res.data) }
export const workList = params => { return axios.post('/login/workList', qs.stringify(params)).then(res => res.data) }
export const approvalWork = params => { return axios.post('/work/approvalWork', qs.stringify(params)).then(res => res.data) }
export const workTitle = params => { return axios.post('/login/workTitle', qs.stringify(params)).then(res => res.data) }
export const selectContent = params => { return axios.post('/login/selectContent', qs.stringify(params)).then(res => res.data) }
// axios.defaults.headers.post['Content-Type'] = 'application/json'
export const sumbitWorkOrder = params => {
  return axios.post('/work/sumbitWorkOrder', JSON.stringify(params)).then(res => res.data)
}
