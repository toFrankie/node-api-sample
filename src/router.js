import fs from 'fs'
import path from 'path'
import md5 from 'md5'
import express from 'express'
import { dirname, filename } from './utils/esm-path.js'

const router = express.Router()
const __dirname = dirname(import.meta)
const __filename = filename(import.meta)

router.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'))
})

router.get('/favicon.ico', (req, res) => {
  res.sendFile(path.resolve(__dirname, './favicon.ico'))
})

router.get('/user/:id', (req, res) => {
  if (req.headers.origin) res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
  const randomKey = Math.random().toString(36).slice(2)
  console.log(randomKey)
  const { id } = req.params
  res
    .status(200)
    .cookie('id', randomKey, { maxAge: 60 * 60, secure: true })
    .send({
      key: randomKey,
      id,
      name: 'Frankie'
    })
})

router.get('/abort/cancel', (req, res) => {
  if (req.headers.origin) res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
  res.setHeader('Content-Type', 'application/x-www-form-urlencoded')
  res.setHeader('Location', 'http://192.168.1.114:7701/user/1')
  setTimeout(() => {
    res.status(301)
    // res.send({ success: 'ok' })
    res.send('success=ok')
  }, 3000)
})

router.get('/static/test.js', (req, res) => {
  const filePath = path.resolve(__dirname, '../public/test.js')
  const buffer = fs.readFileSync(filePath, 'utf-8')
  const fileMd5 = md5(buffer)

  res.setHeader('Etag', fileMd5)

  if(req.headers['if-none-match'] === fileMd5) {
    res.status(304)
  } else {
    res.write(buffer)
  }

  res.end()
})

export default router
