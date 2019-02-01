## **【實作】Article文章 (PUT與DELETE)**

> 本章節參考 [IT鐵人賽 - \[Day-25\](實作)Article文章(PUT與DELETE)](https://ithelp.ithome.com.tw/articles/10195846)

### **PUT 修改**

編輯 _src/server/modules/**article.module.js**_
```javascript
// article.module.js

/* Article PUT 修改 */
const modifyArticle = (insertValues, userId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表修改指定id一筆資料
        connection.query('UPDATE Article SET ? WHERE article_id = ?', [insertValues, userId], (error, result) => {
          if (error) {
            console.error('SQL error: ', error);// 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 0) { // 寫入時發現無該筆資料
            resolve('請確認修改Id！');
          } else if (result.message.match('Changed: 1')) { // 寫入成功
            resolve('資料修改成功');
          } else {
            resolve('資料無異動');
          }
          connection.release();
        });
      }
    });
  });
};

export default {
  modifyArticle
}
```

編輯 _src/server/controllers/**article.controller.js**_
```javascript
// article.controller.js

/* Article PUT 修改 */
const articlePut = (req, res) => {
  // 取得修改id
  const userId = req.params.article_id;
  // 取得修改參數
  const insertValues = req.body;
  articleModule.modifyArticle(insertValues, userId).then((result) => {
    res.send(result); // 回傳修改成功訊息
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};

export default {
  articlePut
}
```

編輯 _src/server/routes/**article.route.js**_
```javascript
router.route('/:article_id').put(articleCtrl.articlePut); /** 修改 Article 值組 */
```

### **PUT 測試**

打包並啟動伺服器
```bash
yarn build
yarn start
```

準備進行測試的 json body
```json
{
    "user_id": 1,
    "article_title": "Node.js教學",
    "article_tag": "API",
    "article_content": "修改了內容"
}
```

使用 Postman 發送請求

<img src="https://ithelp.ithome.com.tw/upload/images/20180104/20107247nK802XO5e2.png">

### **DELETE 刪除**

編輯 _src/server/modules/**article.module.js**_
```javascript
/* Article  DELETE 刪除 */
const deleteArticle = (userId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // Article資料表刪除指定id一筆資料
        connection.query('DELETE FROM Article WHERE article_id = ?', userId, (error, result) => {
          if (error) {
            console.error('SQL error: ', error);// 資料庫存取有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 1) {
            resolve('刪除成功！');
          } else {
            resolve('刪除失敗！');
          }
          connection.release();
        });
      }
    });
  });
};

export default {
  deleteArticle
}
```

編輯 _src/server/controllers/**article.controller.js**_
```javascript
// article.module.js

/* Article  DELETE 刪除 */
const articleDelete = (req, res) => {
  // 取得刪除id
  const userId = req.params.article_id;
  articleModule.deleteArticle(userId).then((result) => {
    res.send(result); // 回傳刪除成功訊息
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};

export default {
  articleDelete
}
```

編輯 _src/server/routes/**article.route.js**_
```javascript
router.route('/:article_id')
  .put(articleCtrl.articlePut) /** 修改 Article 值組 */
  .delete(articleCtrl.articleDelete); /** 刪除 Article 值組 */
```

### **DELETE 測試**

打包並啟動伺服器
```bash
yarn build
yarn start
```

使用 Postman 發送請求

<img src="https://ithelp.ithome.com.tw/upload/images/20180104/20107247JXPQO1GWLt.png">

[上一章](./11-article-get-post.md) - [返回目錄](../readme.md) - [下一章](./13-user-get-post.md)