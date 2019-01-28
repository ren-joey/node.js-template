// article.module.js
import mysql from 'mysql'
import config from '../../config/config'

const connectionPool = mysql.createPool({
  connectionLimit: 10,
  host: config.mysqlHost,
  user: config.mysqlUserName,
  password: config.mysqlPass,
  database: config.mysqlDatabase
})
/* Article  POST 新增 */
const createArticle = (insertValues) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError) // 若連線有問題回傳錯誤
      } else {
        connection.query('INSERT INTO Article SET ?', insertValues, (error, result) => { // Article資料表寫入一筆資料
          if (error) {
            console.error('SQL error: ', error) // 寫入資料庫有問題時回傳錯誤
            reject(error)
          } else if (result.affectedRows === 1) {
            resolve(`新增成功！ article_id: ${result.insertId}`) // 寫入成功回傳寫入id
          }
          connection.release()
        })
      }
    })
  })
}
export default {
  createArticle
}
