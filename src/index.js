import express from 'express'
import router from './router.js'
import getNetWorkIP from './utils/ip-address.js'

const app = express()
const port = 7701
const ip = getNetWorkIP()

app.use(router)
app.listen(port)
console.log(`Server is running at http://${ip}:${port}/`)
