## **使用 joi 來驗證 POST 資料**

安裝 express-validation
```bash
yarn add express-validation
```

新增並編輯 _src/config/**param-validation.js**_
```javascript
import Joi from 'joi'

export default {
  // POST /api/article
  createArticle: {
    body: {
      user_id: Joi.number().required(), // 數字 + 必填
      article_title: Joi.string().required(), // 字串 + 必填
      article_tag: Joi.string(), // 字串
      article_content: Joi.string().min(20).required() // 文章長度至少 20 個字
    }
  },
  modifyArticle: {
    params: {
      article_id: Joi.number().required()
    },
    body: {
      user_id: Joi.number(), // 數字
      article_title: Joi.string(), // 字串
      article_tag: Joi.string(), // 字串
      article_content: Joi.string().min(20) // 文章長度至少 20 個字
    }
  },
  // POST /api/user
  createUser: {
    body: {
      user_name: Joi.string().required(), // 限定 email 格式並移除空白
      user_mail: Joi.string().email().trim().required(), // 最小長度6最大30，只允許英文大小寫和數字
      user_password: Joi.string().regex(/[a-zA-Z0-9]{6,30}$/).required()
    }
  }
}
```

編輯 _src/server/routes/**article.route.js**_
```javascript
// article.route.js
import validation from 'express-validation'
import paramValidation from '../../config/param-validation'

router.route('/')
  .get(articleCtrl.articleGet) /** 取得 Article 所有值組 */
  .post(validation(paramValidation.createArticle), articleCtrl.articlePost) /** 新增 Article 值組 */

router.route('/:article_id')
  .put(validation(paramValidation.modifyArticle), articleCtrl.articlePut) /** 修改 Article 值組 */
  .delete(articleCtrl.articleDelete)
```

編輯 _src/server/routes/**user.route.js**_
```javascript
// user.route.js
import validation from 'express-validation'
import paramValidation from '../../config/param-validation'

router.route('/')
  .post(validation(paramValidation.createUser), userCtrl.userPost) /** 取得 User 所有值組 */
  .get(userCtrl.userGet)

router.route('/:user_id')
  .put(userCtrl.userPut)
  .delete(userCtrl.userDelete)
```

### **驗證測試**

```bash
yarn build
yarn start
```

測試資料
```json
{
    "user_id": 1,
    "article_title": "Node.js教學",
    "article_tag": "後端",
    "article_content": "歡迎來到此篇教學。"
}
```

可以發現圖中紅色圈起處拋出一個 joi 的錯誤裡面寫到，article_content 至少要20個字元

<img src="https://ithelp.ithome.com.tw/upload/images/20180107/20107247aBXbZrcGB0.png">

[上一章](./14-user-put-delete.md) - [返回目錄](../readme.md) - [下一章](./16-bcrypt-install.md)