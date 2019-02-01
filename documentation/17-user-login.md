## **使用者登入及密碼驗證**

編輯 _src/server/modules/**user.module.js**_
```javascript
// user.module.js
import bcrypt from 'bcrypt';

/*  User GET (Login)登入取得資訊  */
const selectUserLogin = (insertValues) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(connectionError); // 若連線有問題回傳錯誤
      } else {
        connection.query( // User撈取所有欄位的值組
          'SELECT * FROM User WHERE user_mail = ?',
          insertValues.user_mail, (error, result) => {
            if (error) {
              console.error('SQL error: ', error);
              reject(error); // 寫入資料庫有問題時回傳錯誤
            } else if (Object.keys(result).length === 0) {
              resolve('信箱尚未註冊！');
            } else {
              const dbHashPassword = result[0].user_password; // 資料庫加密後的密碼
              const userPassword = insertValues.user_password; // 使用者登入輸入的密碼
              bcrypt.compare(userPassword, dbHashPassword).then((res) => { // 使用bcrypt做解密驗證
                if (res) {
                  resolve('登入成功'); // 登入成功
                } else {
                  resolve('您輸入的密碼有誤！'); // 登入失敗
                }
              });
            }
            connection.release();
          }
        );
      }
    });
  });
};
```

編輯 _src/server/controllers/**user.controller.js**_
```javascript
// user.controller.js
import userModule from '../modules/user.module';

/* User  POST 登入(Login) */
const userLogin = (req, res) => {
  // 取得帳密
  const insertValues = req.body;
  userModule.selectUserLogin(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};
```

編輯 _src/server/routes/**user.route.js**_
```javascript
// user.route.js
import userCtrl from '../controllers/user.controller';

router.route('/login').post(userCtrl.userLogin); /** User 登入 */
```

### **測試**

```bash
yarn build
yarn start
```

測試資料
```json
{
	"user_mail":"andy@gmail.com",
	"user_password":"password10"
}
```

<img src="https://ithelp.ithome.com.tw/upload/images/20180109/20107247VxVLfySoBO.png" width="500">

測試資料 (錯誤信箱)
```json
{
	"user_mail":"abcd@gmail.com",
	"user_password":"password10"
}
```

<img src="https://ithelp.ithome.com.tw/upload/images/20180109/20107247VYDO2NiQzX.png" width="500">

測試資料 (錯誤密碼)
```json
{
	"user_mail":"andy@gmail.com",
	"user_password":"abcde"
}
```

<img src="https://ithelp.ithome.com.tw/upload/images/20180109/20107247GRxIUDrFHA.png" width="500">