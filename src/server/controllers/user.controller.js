// user.controller.js
import bcrypt from 'bcrypt'
import userModule from '../modules/user.module'

/* User POST 新增 */
const userPost = (req, res) => {
  // 取得新增參數
  const insertValues = {
    user_name: req.body.user_name,
    user_mail: req.body.user_mail,
    user_password: bcrypt.hashSync(req.body.user_password, 10)
  }

  userModule.createUser(insertValues).then((result) => {
    res.send(result) // 成功回傳result結果
  }).catch((err) => {
    return res.send(err)
  }) // 失敗回傳錯誤訊息
}

/* User GET 取得 */
const userGet = (req, res) => {
  userModule.selectUser().then((result) => {
    res.send(result)
  }).catch((err) => {
    return res.send(err)
  })
}

/* User PUT 修改 */
const userPut = (req, res) => {
  const userId = req.params.user_id
  const insertValues = req.body

  userModule.modifyUser(insertValues, userId).then((result) => {
    res.send(result)
  }).catch((err) => {
    return res.send(err)
  })
}

/* User DELETE 刪除 */
const userDelete = (req, res) => {
  const userId = req.params.user_id

  userModule.deleteUser(userId).then((result) => {
    res.send(result)
  }).catch((err) => {
    return res.send(err)
  })
}

/* User  POST 登入(Login) */
const userLogin = (req, res) => {
  const insertValues = req.body

  userModule.selectUserLogin(insertValues).then((result) => {
    res.send(result)
  }).catch((err) => {
    return res.send(err)
  })
}

export default {
  userPost,
  userGet,
  userPut,
  userDelete,
  userLogin
}
