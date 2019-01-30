// article.controller.js
import articleModule from '../modules/article.module'

/* Article  POST 新增 */
const articlePost = (req, res) => {
  // 取得新增參數
  const insertValues = req.body
  articleModule.createArticle(insertValues).then((result) => {
    res.send(result) // 成功回傳result結果
  }).catch((err) => {
    return res.send(err) // 失敗回傳錯誤訊息
  })
}

/* Article  GET 取得 */
const articleGet = (req, res) => {
  articleModule.selectArticle().then((result) => {
    res.send(result) // 成功回傳result結果
  }).catch((err) => {
    return res.send(err) // 失敗回傳錯誤訊息
  })
}

/* Article  PUT 修改 */
const articlePut = (req, res) => {
  const userId = req.params.article_id
  const insertValues = req.body

  articleModule.modifyArticle(insertValues, userId).then((result) => {
    res.send(result)
  }).catch((err) => {
    return res.send(err)
  })
}

/* Article  DELETE 刪除 */
const articleDelete = (req, res) => {
  const userId = req.params.article_id

  articleModule.deleteArticle(userId).then((result) => {
    res.send(result)
  }).catch((err) => {
    return res.send(err)
  })
}

export default {
  articlePost,
  articleGet,
  articlePut,
  articleDelete
}
