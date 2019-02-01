## **【實作】Article文章 (GET與POST)**

> 本章節參考 [IT鐵人賽 - \[Day-24\](實作)Article文章(GET與POST)](https://ithelp.ithome.com.tw/articles/10195687)

### **設定路由**

編輯 _**index.route.js**_ 內容，代碼如下
```javascript
// Router
import article from './article.route';

/** Article Router */
router.use('/article', article);
```

### **新增 Article**

新增檔案 _src/server/modules/**article.module.js**_ 並編輯其內容，程式碼如下

```javascript
// article.module.js
import mysql from 'mysql';
import config from '../../config/config';

const connectionPool = mysql.createPool({
  connectionLimit: 10,
  host: config.mysqlHost,
  user: config.mysqlUserName,
  password: config.mysqlPass,
  database: config.mysqlDatabase
});
/* Article  POST 新增 */
const createArticle = (insertValues) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        connection.query('INSERT INTO Article SET ?', insertValues, (error, result) => { // Article資料表寫入一筆資料
          if (error) {
            console.error('SQL error: ', error); // 寫入資料庫有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 1) {
            resolve(`新增成功！ article_id: ${result.insertId}`); // 寫入成功回傳寫入id
          }
          connection.release();
        });
      }
    });
  });
};
export default {
  createArticle
};
```

新增檔案 _src/server/controllers/**article.controller.js**_ 並編輯其內容
```javascript
// article.controller.js
import articleModule from '../modules/article.module';

/* Article  POST 新增 */
const articlePost = (req, res) => {
  // 取得新增參數
  const insertValues = req.body;
  articleModule.createArticle(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};
export default {
  articlePost
};
```

新增檔案 _src/server/routes/**article.route.js**_ 並編輯其內容
```javascript
// article.route.js
import express from 'express';
import articleCtrl from '../controllers/article.controller';

const router = express.Router();

router.route('/').post(articleCtrl.articlePost); /** 新增 Article 值組 */

export default router;
```

### **POST測試**
```bash
yarn build
yarn start
```

使用 [Postman](https://www.getpostman.com/) 進行測試

如果您是第一次使用 Postman 請先點選畫面右上角的板手，依照下圖將設定值重新設定

<img src="https://i.imgur.com/D8ApXuV.png" width="500">

<img src="https://i.imgur.com/ogEEcGs.png" width="500">

設定完成後即可開始測試

```json
{
    "user_id": 1,
    "article_title": "Node.js教學",
    "article_tag": "後端",
    "article_content": "歡迎來到此篇教學。"
}
```

<img src="https://ithelp.ithome.com.tw/upload/images/20180103/20107247x35NaYFdIW.png">

### **取得 Article**

編輯 _src/server/modules/**article.module.js**_
```javascript
// article.module.js

/*  Article GET 取得  */
const selectArticle = () => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        connection.query( // Article撈取所有欄位的值組
          'SELECT * FROM Article', (error, result) => {
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else {
              resolve(result); // 撈取成功回傳 JSON 資料
            }
            connection.release();
          }
        );
      }
    });
  });
};

export default {
  selectArticle
}
```

編輯 _src/server/controllers/**article.controller.js**_
```javascript
// article.controller.js

/*  Article GET 取得  */
const articleGet = (req, res) => {
  articleModule.selectArticle().then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};

export default {
  articleGet
}
```

編輯 _src/server/routes/**article.route.js**_
```javascript
// article.route.js

router.route('/')
  .get(articleCtrl.articleGet) /** 取得 Article 所有值組 */
  .post(articleCtrl.articlePost); /** 新增 Article 值組 */
```

### **GET 測試**

```bash
yarn build
yarn start
```

使用 Postman 進行 GET 請求測試

<img src="https://ithelp.ithome.com.tw/upload/images/20180103/20107247kKXZwQBdk2.png">

[上一章](./10-database-connection.md) - [返回目錄](../readme.md) - [下一章](./12-article-put-delete.md)