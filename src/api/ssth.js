import axios from 'axios'
import qs from 'qs'
// axios.defaults.baseURL = 'http://64.64.236.137:3682'

// axios.defaults.baseURL = 'http://101.43.185.6:3682/login'
axios.defaults.baseURL = '/api'

export const requestLogin = params => { return axios.post('/verifyNameAndPasswd', qs.stringify(params)).then(res => res.data) }
export const workList = params => { return axios.post('/workList', qs.stringify(params)).then(res => res.data) }
export const workTitle = params => { return axios.post('/workTitle', qs.stringify(params)).then(res => res.data) }
export const selectContent = params => { return axios.post('/selectContent', qs.stringify(params)).then(res => res.data) }
