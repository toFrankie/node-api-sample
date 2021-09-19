import express from 'express'
import path from 'path'
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
  const randomKey = Math.random().toString(36).slice(2)
  const { id } = req.params
  res
    .status(200)
    .cookie('id', randomKey, { 'maxAge': 60 * 60 })
    .send({
      key: randomKey,
      id,
      name: 'Frankie'
    })
})

export default router
