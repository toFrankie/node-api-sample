const http = require('http')
const fs = require('fs')
const { getNetWorkIP } = require('../public/ipaddress')

const localIPAddress = getNetWorkIP()
const allowedOrigin = ''
const port = 7701

const num = 0

const server = http.createServer((request, response) => {
  console.log('')
  console.log(`${request.method}; ${request.url}`)

  // if (request.headers.origin === `http://${localIPAddress}:8080`) {
  if (request.headers.origin) {
    response.setHeader('Access-Control-Allow-Origin', request.headers.origin)
    response.setHeader('Access-Control-Allow-Credentials', true)
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type,Content-Length,Authorization,Accept,X-Requested-With')
    response.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  }

  if (request.url === '/') {
    console.log(request.headers)
    fs.readFile('./index.html', (err, data) => {
      if (err) throw err
      response.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' })
      response.end(data)
    })
  } else if (request.url == '/favicon.ico') {
    fs.readFile('../src/favicon.ico', (err, data) => {
      if (err) throw err
      response.writeHead(200, { 'Content-Type': 'image/png' })
      response.end(data)
    })
  } else if (request.url == '/data') {
    fs.readFile('../public/data.txt', (err, data) => {
      if (err) throw err
      response.writeHead(200, { 'Content-Type': 'text/plain' })
      console.log(response._header)
      response.end(data)
    })
  } else if (request.url == '/config') {
    fs.readFile('../public/config.json', (err, data) => {
      if (err) throw err
      // if (num < 4) {
      //   num += 1
      //   response.end('')
      //   return
      // }
      // response.writeHead(200, { 'Content-Type': 'application/json;charset=UTF-8' })

      console.log(request.headers)
      response.setHeader('Set-Cookie', ['name=Frankie; domain=192.168.1.114; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT; max-age=3600'])
      // end 只能传 string 或 Buffer
      // response.end(JSON.stringify(data))
      response.end(JSON.stringify({ name: 'Frankie', age: 20 }))
      // response.json(data)
    })
  } else if (request.url === '/auth') {
    response.setHeader('Set-Cookie', ['test=123'])
    response.end(JSON.stringify({ userId: Math.random().toString(36).slice(2) }))
  } else {
    console.log('其他请求', request.url)
  }
})

server.listen(port)

console.log(`Server is running at http://${localIPAddress}:${port}/`)
