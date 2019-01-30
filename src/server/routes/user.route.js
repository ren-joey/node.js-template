// user.route.js
import express from 'express'
import userCtrl from '../controllers/user.controller'

const router = express.Router()

router.route('/')
  .post(userCtrl.userPost) /** 取得 User 所有值組 */
  .get(userCtrl.userGet)

router.route('/:user_id')
  .put(userCtrl.userPut)
  .delete(userCtrl.userDelete)

export default router
