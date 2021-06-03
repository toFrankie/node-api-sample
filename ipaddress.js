const os = require('os')

/** 获取本机IP */
const getNetWorkIP = () => {
  let host = ''
  let getFlag = false
  try {
    // 获取网络接口列表
    let network = os.networkInterfaces()
    for (let dev in network) {
      if (getFlag) break
      let iface = network[dev]
      for (let i = 0; i < iface.length; i++) {
        let alias = iface[i]
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          host = alias.address
          getFlag = true
          break
        }
      }
    }
  } catch (e) {
    console.warn(e)
    host = 'localhost'
  }
  return host
}

module.exports = {
  getNetWorkIP
}