const http = require('http')
const fs = require('fs')
const { getNetWorkIP } = require('./ipaddress')

const localIPAddress = getNetWorkIP()
const port = 7701
const allowedOrigin = 'http://10.16.4.226:8080' // `http://${localIPAddress}:8080`

const server = http.createServer((request, response) => {
  console.log('')
  console.log(`${request.method} ${request.url}`)
  if (request.headers.origin === allowedOrigin) {
    response.setHeader('Access-Control-Allow-Origin', allowedOrigin)
    // response.setHeader('Access-Control-Allow-Credentials', true)
    // response.setHeader('Access-Control-Allow-Headers', 'Content-Type,Content-Length,Authorization,Accept,X-Requested-With')
    // response.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  }
  if (request.url == '/config') {
    fs.readFile('./config.json', (err, data) => {
      if (err) throw err
      response.end(JSON.stringify({ name: 'Frankie', age: 20 }))
    })
  }

  // if (request.url === '/') {
  //   fs.readFile('./index.html', (err, data) => {
  //     if (err) throw err
  //     response.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' })
  //     response.end(data)
  //   })
  // } else if (request.url == '/config') {
  //   fs.readFile('./config.json', (err, data) => {
  //     if (err) throw err
  //     response.end(JSON.stringify({ name: 'Frankie', age: 20 }))
  //   })
  // }
  // else {
  //   console.log('其他请求', request.url)
  // }
})

server.listen(port)

console.log(`Server is running at http://${localIPAddress}:${port}/`)