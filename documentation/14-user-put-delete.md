## **【實作】User用戶 (PUT與DELETE)**

### **User 修改**

編輯 _src/server/modules/**user.module.js**_
```javascript
// user.module.js

/* User PUT 修改 */
const modifyUser = (insertValues, userId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // User資料表修改指定id一筆資料
        connection.query('UPDATE User SET ? WHERE user_id = ?', [insertValues, userId], (error, result) => {
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
  modifyUser
}
```

編輯 _src/server/controllers/**user.controller.js**_
```javascript
// user.controller.js

/* User PUT 修改 */
const userPut = (req, res) => {
  // 取得修改id
  const userId = req.params.user_id;
  // 取得修改參數
  const insertValues = req.body;
  userModule.modifyUser(insertValues, userId).then((result) => {
    res.send(result); // 回傳修改成功訊息
  }).catch((err) => {
    return res.send(err);
  }); // 失敗回傳錯誤訊息
};

export default {
  userPut
}
```

編輯 _src/server/routes/**user.route.js**_
```javascript
// user.route.js

/** 修改 User 值組 */
router.route('/:user_id').put(userCtrl.userPut);
```

### **測試**

```bash
yarn build
yarn start
```

測試資料
```json
{
	"user_id":1,
	"user_name":"10程式中",
	"user_mail":"andy@gmail.com",
	"user_password":"1010"
}
```

<img src="https://ithelp.ithome.com.tw/upload/images/20180106/201072472YR3r6mrpv.png">

### **User 刪除**

編輯 _src/server/modules/**user.module.js**_
```javascript
// user.module.js

/* User  DELETE 刪除 */
const deleteUser = (userId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else { // User資料表刪除指定id一筆資料
        connection.query('DELETE FROM User WHERE user_id = ?', userId, (error, result) => {
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
  deleteUser
}
```

編輯 _src/server/controllers/**user.controller.js**_
```javascript
// user.controller.js

/* User  DELETE 刪除 */
const userDelete = (req, res) => {
  // 取得刪除id
  const userId = req.params.user_id;
  userModule.deleteUser(userId).then((result) => {
    res.send(result); // 回傳刪除成功訊息
  }).catch((err) => {
    return res.send(err);
  }); // 失敗回傳錯誤訊息
};

export default {
  userDelete
}
```

編輯 _src/server/routes/**user.route.js**_
```javascript
router.route('/:user_id')
  .put(userCtrl.userPut) /** 修改 User 值組 */
  .delete(userCtrl.userDelete); /** 刪除 User 值組 */
```

### **測試**

```bash
yarn build
yarn start
```

<img src="https://ithelp.ithome.com.tw/upload/images/20180106/20107247vzX272W3BG.png">

[上一章](./13-user-get-post.md) - [返回目錄](../readme.md) - [下一章](./15-joi-validation.md)