// user.route.js
import express from 'express'
import validation from 'express-validation'

import userCtrl from '../controllers/user.controller'
import paramValidation from '../../config/param-validation'

const router = express.Router()

router.route('/')
  .post(validation(paramValidation.createUser), userCtrl.userPost) /** 取得 User 所有值組 */
  .get(userCtrl.userGet)

router.route('/:user_id')
  .put(userCtrl.userPut)
  .delete(userCtrl.userDelete)

router.route('/login')
  .post(userCtrl.userLogin)

export default router
