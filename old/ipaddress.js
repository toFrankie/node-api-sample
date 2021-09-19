import os from 'os'

// 获取 IP Address
const getNetWorkIP = () => {
  let host = ''
  let getFlag = false
  try {
    // 获取网络接口列表
    const network = os.networkInterfaces()
    for (const dev in network) {
      if (getFlag) break
      const iface = network[dev]
      for (let i = 0; i < iface.length; i++) {
        const alias = iface[i]
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

export default getNetWorkIP