import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })
const whiteList = ['/login', '/hint']
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  // !u2登录返回code state
  const hrefs = window.location.href
  if (hrefs.indexOf('code=') > -1 && hrefs.indexOf('state=') > -1) {
    window.location.href = `${process.env.VUE_APP_REDIRECT_URL}/console/`
  }

  if (whiteList.indexOf(to.path) !== -1) {
    next()
  } else {
    // 检查是否登录
    if (store.getters.token && store.getters.email) {
      if (to.path === '/login') {
        // 重定向
        next({ path: '/' })
        NProgress.done()
      } else {
        // 未加载过路由{
          next()
      }
    } else {
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  const appmain = document.getElementsByClassName('app-main')[0]
  if (appmain) {
    appmain.scrollTo(0,0)
  }
  // Finish progress bar
  NProgress.done()
  document.title = '新东方学习机数据统计平台'
})
