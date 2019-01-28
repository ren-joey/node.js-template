import express from 'express'
import mysql from 'mysql'

import config from '../../config/config'

import article from './article.route'

const router = express.Router()

/* GET localhost:[port]/api page. */
router.get('/', (req, res) => {
  res.send(`此路徑是: localhost:${config.port}/api`)
})

/* mysql連線測試 */
router.get('/sqlTest', (req, res) => {
  const connectionPool = mysql.createPool({ // 建立一個連線池
    connectionLimit: 10, // 限制池子連線人數
    host: config.mysqlHost, // 主機名稱
    user: config.mysqlUserName, // 用戶名稱
    password: config.mysqlPass, // 資料庫密碼
    database: config.mysqlDatabase // 資料庫名稱
  })
  connectionPool.getConnection((err, connection) => { // 建立一個連線若錯誤回傳err
    if (err) {
      res.send(err)
      console.log('連線失敗！')
    } else {
      res.send('連線成功！')
      console.log(connection)
    }
  })
})

/** Article Router */
router.use('/article', article)

export default router
