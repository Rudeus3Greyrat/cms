import axios from 'axios'
import { Message } from 'element-ui'
import { getU2AT, removeU2AT, removeU2NickName } from '@/utils/cookies'

const http = axios.create({
    timeout: 5000
})

const tokens = document.domain === 'localhost' ? process.env.VUE_APP_LOCAL_TOKEN : getU2AT() 
// 发起请求
http.interceptors.request.use(function (config) {
    const token = tokens
    if (token) {
        config.headers['u2-token'] = token
    }
    return config;
}, function (error) {
    console.log(error) // for debug
    return Promise.reject(error)
})



// 响应请求
http.interceptors.response.use(response => {
    const res = response.data
    if (!(res.code == 0 || res.Code == 0 || res.Status == 1 || res.Code == 103 ) ) {
        Message({
            message: res.message || res.Msg || 'Error',
            type: 'warning',
            duration: 5 * 1000
        })
        return Promise.reject(new Error(res.message || 'Error'))
    } else {
        return response.data
    }
}, error => {
    if(error.response.status === 403 || error.response.status === 401){
        const storage = window.localStorage;
        storage.removeItem("secretStatus");
        removeU2AT()
        removeU2NickName()
        const logoutUrl = process.env.VUE_APP_U2_LOGOUT_URL;
        const appId = process.env.VUE_APP_CLIENT_ID;
        const appUrl = process.env.VUE_APP_REDIRECT_URL + '/console';
        const appKey = process.env.VUE_APP_CLIENT_SECRET;
        window.location.href = `${logoutUrl}?app_id=${appId}&redirect_uri=${appUrl}&response_type=code&scope=logout&state=${appKey}&ehr_org_id=105`;
    } else {
        Message({
            message: error.response.data.message,
            type: 'error'
        })
        return Promise.reject(error)
    }
})


export default http