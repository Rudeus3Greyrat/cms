import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout/index'


/*

  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  hiddenChild:true               子路由隐藏
  alwaysShow:true                强制显示（默认规则有子路由）
  meta: {
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    hidden: true                 if true, this route will not show in the sidebar (default is false)
    redirect:noredirect          禁止面包屑点击跳转
    sidebar:'parentURL'          解决隐藏的子菜单在菜单中不显示父级选中
    nested: true                 提供外部内嵌使用
  }
*/

export const constantRoutes = [
    {
        path: '/',
        redirect: '/home',
        component: Layout,
        meta: {
            title: '首页',
            icon: 'alist1',
        },
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/Home.vue'),
                meta: {
                    title: '首页',
                    icon: 'alist1',
                },
            }
        ]
    }
]



const createRouter = () => new Router({
    mode: 'history',
    // mode: 'hash',
    routes: constantRoutes,
    scrollBehavior: () => ({ x:0, y: 0 }), //解决路由跳转后scrollTop
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}


export default router
