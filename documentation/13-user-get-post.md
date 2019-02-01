## **【實作】User用戶 (GET與POST)**

### **新增 User**

編輯 _src/server/modules/**index.route.js**_
```javascript
/** User Router */
router.use('/user', user);
```

新增並編輯 _src/server/modules/**user.module.js**_
```javascript
// user.module.js
import mysql from 'mysql';
import config from '../../config/config';

const connectionPool = mysql.createPool({
  connectionLimit: 10,
  host: config.mysqlHost,
  user: config.mysqlUserName,
  password: config.mysqlPass,
  database: config.mysqlDatabase
});
/* User  POST 新增 */
const createUser = (insertValues) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        connection.query('INSERT INTO User SET ?', insertValues, (error, result) => { // User資料表寫入一筆資料
          if (error) {
            console.error('SQL error: ', error);
            reject(error); // 寫入資料庫有問題時回傳錯誤
          } else if (result.affectedRows === 1) {
            resolve(`新增成功！ user_id: ${result.insertId}`); // 寫入成功回傳寫入id
          }
          connection.release();
        });
      }
    });
  });
};
export default {
  createUser
};
```

新增並編輯 _src/server/controllers/**user.controller.js**_
```javascript
// user.controller.js
import userModule from '../modules/user.module';

/* User  POST 新增 */
const userPost = (req, res) => {
  // 取得新增參數
  const insertValues = req.body;
  userModule.createUser(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};
export default {
  userPost
};
```

新增並編輯 _src/server/routes/**user.route.js**_
```javascript
// user.route.js
import express from 'express';
import userCtrl from '../controllers/user.controller';

const router = express.Router();

router.route('/').post(userCtrl.userPost); /** 取得 User 所有值組 */

export default router;
```

## **測試**

```bash
yarn build
yarn start
```

測試資料
```json
{
	"user_name":"Andy10",
	"user_mail":"andy@gmail.com",
	"user_password":"0000"
}
```

<img src="https://ithelp.ithome.com.tw/upload/images/20180105/20107247d6psIz3KrE.png">

### **取得 User**

編輯 _src/server/modules/**user.module.js**_
```javascript
// user.module.js

/*  User GET 取得  */
const selectUser = () => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        // User撈取所有欄位的值組
        connection.query('SELECT * FROM User', (error, result) => {
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
  selectUser
}
```

編輯 _src/server/controllers/**user.controller.js**_
```javascript
// user.controller.js

/*  User GET 取得  */
const userGet = (req, res) => {
  userModule.selectUser().then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => {
    return res.send(err);
  }); // 失敗回傳錯誤訊息
};

export default {
  userGet
}
```

編輯 _src/server/routes/**user.route.js**_
```javascript
// user.route.js
import express from 'express';
import userCtrl from '../controllers/user.controller';

const router = express.Router();

router.route('/')
  .get(userCtrl.userGet) /** 取得 User 所有值組 */
  .post(userCtrl.userPost); /** 新增 User 值組 */


export default router;
```

## **測試**

```bash
yarn build
yarn start
```

<img src="https://ithelp.ithome.com.tw/upload/images/20180105/20107247nKxSGo0dRA.png">

[上一章](./12-article-put-delete.md) - [返回目錄](../readme.md) - [下一章](./14-user-put-delete.md)