
import { getU2AT, getU2NickName, removeU2AT, removeU2NickName } from '@/utils/cookies'

const tokens = document.domain === 'localhost' ? process.env.VUE_APP_LOCAL_TOKEN : ( getU2AT() || '' )
const emails = document.domain === 'localhost' ? process.env.VUE_APP_LOCAL_EMAIL : ( getU2NickName() || '' )

export default {
  namespaced: true,
  state: {
    valid: false,
    token: tokens,
    sysId: '',
    superUser: false,
    email: emails,
    authInfo: {}
  },
  mutations: {
    SET_VALID(state, payload) {
      state.valid = payload
    }
  },
  actions: {
    // *登录
    login() {
      const storage = window.localStorage;
      storage.removeItem("secretStatus");
      removeU2AT()
      removeU2NickName()
      const loginUrl = process.env.VUE_APP_U2_LOGIN_URL;
      const appId = process.env.VUE_APP_CLIENT_ID;
      const appUrl = process.env.VUE_APP_REDIRECT_URL + '/console';
      const appKey = process.env.VUE_APP_CLIENT_SECRET;
      window.location.href = `${loginUrl}?app_id=${appId}&redirect_uri=${appUrl}&response_type=code&scope=login&state=${appKey}&ehr_org_id=105&weChat=true`;
    },
    // *登出
    logout({ state }) {
      if (state.token === '') {
        console.log('logout: token is undefined!')
      }
      const storage = window.localStorage;
      storage.removeItem("secretStatus");
      removeU2AT()
      removeU2NickName()
      const logoutUrl = process.env.VUE_APP_U2_LOGOUT_URL;
      const appId = process.env.VUE_APP_CLIENT_ID;
      const appUrl = process.env.VUE_APP_REDIRECT_URL + '/console';
      const appKey = process.env.VUE_APP_CLIENT_SECRET;
      window.location.href = `${logoutUrl}?app_id=${appId}&redirect_uri=${appUrl}&response_type=code&scope=logout&state=${appKey}&ehr_org_id=105`;
    }
  }
}