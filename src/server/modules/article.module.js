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

/* Article  GET 取得 */
const selectArticle = () => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError) // 如果連線錯誤就回傳該錯誤
      } else {
        connection.query('SELECT * FROM Article', (error, result) => {
          if (error) {
            console.error('SQL error: ', error)
            reject(error)
          } else {
            resolve(result)
          }
          connection.release()
        })
      }
    })
  })
}

/* Article  PUT 修改 */
const modifyArticle = (insertValues, userId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError) // 若連線有問題回傳錯誤
      } else { // Article 資料表修改指定 id 一筆資料
        connection.query('UPDATE Article SET ? WHERE article_id = ?', [insertValues, userId], (error, result) => {
          if (error) {
            console.error('SQL error: ', error) // 寫入資料庫有問題時回傳錯誤
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改 id')
          } else if (result.message.match('Changed: 1')) { // 寫入成功
            resolve('資料修改成功')
          } else {
            resolve('資料無異動')
          }
          connection.release()
        })
      }
    })
  })
}

/**
 * Article  DELETE 刪除
 * @param {number} userId 要刪除的文章 id
 */
const deleteArticle = (userId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      // 資料庫連線
      if (connectionError) {
        reject(connectionError) // 若連線有問題回傳錯誤
      } else {
        // Article 資料表刪除指定 id 一筆資料
        connection.query('DELETE FROM Article WHERE article_id = ?', userId, (error, result) => {
          if (error) {
            console.error('SQL error: ', error) // 資料庫存取有問題時回傳錯誤
            reject(error)
          } else if (result.affectedRows === 1) {
            resolve('刪除成功')
          } else {
            resolve('刪除失敗')
          }
          connection.release()
        })
      }
    })
  })
}

export default {
  createArticle,
  selectArticle,
  modifyArticle,
  deleteArticle
}
