const http = require('http')
const fs = require('fs')
const { getNetWorkIP } = require('./ipaddress')

const localIPAddress = getNetWorkIP()
const port = 7701
const allowedOrigin = 'http://192.168.1.105:8080' // `http://${localIPAddress}:8080`

const server = http.createServer((request, response) => {
  if (request.headers.origin === allowedOrigin) {
    response.setHeader('Access-Control-Allow-Origin', allowedOrigin)
    response.setHeader('Access-Control-Allow-Credentials', true)
    response.setHeader('Access-Control-Allow-Methods', 'PUT,OPTIONS')
    response.setHeader('Access-Control-Allow-Headers', 'X-Custom-Header')
    response.setHeader('Access-Control-Expose-Headers', 'Date,Access-Control-Allow-Origin')
  }
  if (request.url === '/config') {
    response.end(JSON.stringify({ name: 'Frankie', age: 20 }))
  }
})

server.listen(port)

console.log(`Server is running at http://${localIPAddress}:${port}/`)
