/**
 * Created by jiachenpan on 16/11/18.
 */

// 非路由链接
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/* 小写字母*/
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

// 除以100保留两位小数点
export function divideByHundred(str) {
  let floatVal = parseFloat(str);
  if (isNaN(floatVal )) {
    return 0;
  }
  floatVal = Math.round(str * 100) / 10000;
  let strVal = floatVal .toString();
  let searchVal = strVal.indexOf('.');
  if (searchVal < 0) {
    searchVal = strVal.length;
    strVal += '.';
  }
  while (strVal.length <= searchVal + 2) {
    strVal += '0';
  }
  return parseFloat(strVal);
}

// 除以10000保留两位小数点
export function divideByHundreds(str) {
  let floatVal = parseFloat(str);
  if (isNaN(floatVal )) {
    return 0;
  }
  floatVal = Math.round(str * 10000) / 100000000;
  let strVal = floatVal .toString();
  let searchVal = strVal.indexOf('.');
  if (searchVal < 0) {
    searchVal = strVal.length;
    strVal += '.';
  }
  while (strVal.length <= searchVal + 2) {
    strVal += '0';
  }
  return parseFloat(strVal);
}
