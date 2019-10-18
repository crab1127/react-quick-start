/**
 * 获取样式名
 *
 * @format
 * @param datag 格式 { [a: string]: boolean }
 */

export const getClassName = (data: {[a: string]: boolean}) => {
  const className: string[] = []
  for (const key in data) {
    if (data.hasOwnProperty(key) && data[key]) {
      className.push(key)
    }
  }
  return className.join(' ')
}

/**
 * 时间格式化
 */
export const dateFormat = (date: string | number | Date, fmt = 'yyyy-MM-dd hh:mm:ss'): string => {
  if (!date) {
    return ''
  }
  const date1 = new Date(date)
  const o = {
    'M+': date1.getMonth() + 1, // 月
    'd+': date1.getDate(), // 日
    'h+': date1.getHours(), // 小时
    'm+': date1.getMinutes(), // 分
    's+': date1.getSeconds(), // 秒
    'q+': Math.floor((date1.getMonth() + 3) / 3), // 季度S
    S: date1.getMilliseconds(), // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date1.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return fmt
}
/**
 * 获取
 */
export const getLastTimeStr = (day: string | number | Date): string => {
  const msd = +new Date() - new Date(day).getTime()
  const time = msd / 1000
  let str = ''
  if (null != time) {
    if (time > 60 && time < 3600) {
      str = Math.ceil(time / 60.0) + ' 分钟前'
    } else if (time >= 3600 && time < 86400) {
      str = Math.ceil(time / 3600.0) + ' 小时前'
    } else if (time >= 86400 && time < 86400 * 30) {
      str = Math.ceil(time / 86400.0) + ' 天前'
    } else if (time >= 86400 * 30 && time < 86400 * 365) {
      str = Math.ceil(time / (86400.0 * 30)) + ' 个月前'
    } else if (time >= 86400 * 365) {
      str = Math.ceil(time / (86400.0 * 365)) + ' 年前'
    } else {
      str = '刚刚'
    }
  }
  return str
}

/**
 * 获取路径上的参数
 * @param url
 */
export const getParmas = (url: string): any => {
  if (!url) return {}
  const arr = url.split('?')[1].split('&')
  const prarms = {}
  arr.forEach(item => {
    prarms[item.split('=')[0]] = item.split('=')[1]
  })
  return prarms
}
