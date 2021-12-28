import Cookies from 'js-cookie'

// App
const sidebarStatusKey = 'sidebar_status'
export const getSidebarStatus = () => Cookies.get(sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus) => Cookies.set(sidebarStatusKey, sidebarStatus)

// U2AT
const U2AT = 'U2AT'
export const getU2AT = () => Cookies.get(U2AT)
export const setU2AT = (id) => Cookies.set(U2AT, id)
export const removeU2AT = () => Cookies.remove(U2AT)

// U2Email
const U2Email = 'U2Email'
export const getU2Email = () => Cookies.get(U2Email)
export const setU2Email = (id) => Cookies.set(U2Email, id)
export const removeU2Email = () => Cookies.remove(U2Email)

// U2NickName

const U2NickName = 'U2NickName'
export const getU2NickName = () => Cookies.get(U2NickName)
export const setU2NickName = (id) => Cookies.set(U2NickName, id)
export const removeU2NickName = () => Cookies.remove(U2NickName)

// 清除所有cookie
export const clearAllCookie = () => {
    let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (let i = keys.length; i--;)
            Cookies.remove(keys[i])
    }
}