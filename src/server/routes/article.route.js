// article.route.js
import express from 'express'
import articleCtrl from '../controllers/article.controller'

const router = express.Router()

router.route('/').post(articleCtrl.articlePost) /** 新增 Article 值組 */

export default router
