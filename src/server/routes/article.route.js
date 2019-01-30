// article.route.js
import express from 'express'
import validation from 'express-validation'

import articleCtrl from '../controllers/article.controller'
import paramValidation from '../../config/param-validation'

const router = express.Router()

router.route('/')
  .get(articleCtrl.articleGet) /** 取得 Article 所有值組 */
  .post(validation(paramValidation.createArticle), articleCtrl.articlePost) /** 新增 Article 值組 */

router.route('/:article_id')
  .put(validation(paramValidation.modifyArticle), articleCtrl.articlePut) /** 修改 Article 值組 */
  .delete(articleCtrl.articleDelete)

export default router
