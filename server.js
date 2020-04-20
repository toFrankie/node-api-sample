const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
    console.log(`${request.method}; ${request.url}`);
    if (request.headers.origin === 'http://192.168.1.113:8081') {
        response.setHeader("Access-Control-Allow-Origin", request.headers.origin);
        response.setHeader("Access-Control-Allow-Credentials", true);
        response.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
        response.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    }
    if (request.url === '/') {
        fs.readFile('./index.html', (err, data) => {
            if (err) throw err;
            response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' })
            response.end(data)
        })
    } else if (request.url == '/data') {
        fs.readFile('./data.txt', (err, data) => {
            if (err) throw err;
            response.writeHead(200, { 'Content-Type': 'text/plain' })
            console.log(response._header)
            response.end(data)
        })
    }
    else {
        console.log('其他请求', request.url)
    }
})

server.listen(7701)

console.log('Server is running at http://127.0.0.1:7701/')