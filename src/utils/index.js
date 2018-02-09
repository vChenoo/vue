export function notifyConfig (text, type) {
  let title = (type === 'success') ? '成功' : '失败'
  switch (type) {
    case 'success':
      title = '成功'
      break
    case 'warning':
      title = '提示'
      break
    case 'info':
      title = '信息'
      break
    case 'error':
      title = '错误'
      break
    default:
      type = 'info'
      title = '信息'
  }
  return {
    title: title,
    message: text + '成功',
    type: type,
    duration: 2000
  }
}
export const pickerDateOptions = [
{
  text: '今天',
  onClick (picker) {
    picker.$emit('pick', new Date())
  }
}, {
  text: '昨天',
  onClick (picker) {
    const date = new Date()
    date.setTime(date.getTime() - 3600 * 1000 * 24)
    picker.$emit('pick', date)
  }
}, {
  text: '一周前',
  onClick (picker) {
    const date = new Date()
    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
    picker.$emit('pick', date)
  }
}, {
  text: '一个月前',
  onClick (picker) {
    const date = new Date()
    date.setTime(date.getTime() - 3600 * 1000 * 24 * 30)
    picker.$emit('pick', date)
  }
}]
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}
export function deepClone (source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

export const pickerTimeOptions = [
{
  text: '今天',
  onClick (picker) {
    const end = new Date()
    const start = new Date(new Date().toDateString())
    end.setTime(start.getTime())
    picker.$emit('pick', [start, end])
  }
}, {
  text: '最近一周',
  onClick (picker) {
    const end = new Date(new Date().toDateString())
    const start = new Date()
    start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '最近一个月',
  onClick (picker) {
    const end = new Date(new Date().toDateString())
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '最近三个月',
  onClick (picker) {
    const end = new Date(new Date().toDateString())
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
    picker.$emit('pick', [start, end])
  }
}]
