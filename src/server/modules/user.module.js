// user.module.js
import mysql from 'mysql'
import bcrypt from 'bcrypt'
import config from '../../config/config'

const connectionPool = mysql.createPool({
  connectionLimit: 10,
  host: config.mysqlHost,
  user: config.mysqlUserName,
  password: config.mysqlPass,
  database: config.mysqlDatabase
})

/* User POST 新增 */
const createUser = (insertValues) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError) // 若連線有問題回傳錯誤
      } else {
        connection.query('INSERT INTO User SET ?', insertValues, (error, result) => { // User資料表寫入一筆資料
          if (error) {
            console.error('SQL error: ', error)
            reject(error) // 寫入資料庫有問題時回傳錯誤
          } else if (result.affectedRows === 1) {
            resolve(`新增成功！ user_id: ${result.insertId}`) // 寫入成功回傳寫入id
          }
          connection.release()
        })
      }
    })
  })
}

/* User GET 取得 */
const selectUser = () => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError)
      } else {
        connection.query('SELECT * FROM User', (error, result) => {
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

/* User PUT 修改 */
const modifyUser = (insertValues, userId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError)
      } else {
        connection.query('UPDATE User SET ? WHERE user_id = ?', [insertValues, userId], (error, result) => {
          if (error) {
            console.error(error)
          } else if (result.affectedRows === 0) {
            resolve('請確認修改 id')
          } else if (result.message.match('Changed: 1')) {
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

/* User DELETE 刪除 */
const deleteUser = (userId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError)
      } else {
        connection.query('DELETE FROM User WHERE user_id = ?', userId, (error, result) => {
          if (error) {
            console.error('SQL error: ', error)
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

/*  User GET (Login)登入取得資訊  */
const selectUserLogin = (insertValues) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError)
      } else {
        connection.query('SELECT * FROM User WHERE user_mail = ?', insertValues.user_mail, (error, result) => {
          if (error) {
            console.error(error)
            reject(error)
          } else if (Object.keys(result).length === 0) {
            resolve(`${insertValues.user_mail} 該信箱尚未註冊`)
          } else {
            const dbHashPassword = result[0].user_password
            const requestPassword = insertValues.user_password

            bcrypt.compare(requestPassword, dbHashPassword).then((res) => {
              if (res) {
                resolve('登入成功')
              } else {
                resolve('您輸入的密碼有誤')
              }
            })
          }
          connection.release()
        })
      }
    })
  })
}

export default {
  createUser,
  selectUser,
  modifyUser,
  deleteUser,
  selectUserLogin
}
