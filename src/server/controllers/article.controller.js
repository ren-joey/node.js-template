// article.controller.js
import articleModule from '../modules/article.module'

/* Article  POST 新增 */
const articlePost = (req, res) => {
  // 取得新增參數
  const insertValues = req.body
  articleModule.createArticle(insertValues).then((result) => {
    res.send(result) // 成功回傳result結果
  }).catch((err) => { return res.send(err) }) // 失敗回傳錯誤訊息
}
export default {
  articlePost
}
