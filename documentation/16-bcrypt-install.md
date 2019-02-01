## **bcrypt 鹽值加密**

> 節錄自 [IT 鐵人賽 - [Day-29] (實作)bcrypt將使用者密碼加密](https://ithelp.ithome.com.tw/articles/10196477)

安裝
```bash
yarn add bcrypt
```

編輯 _src/server/controllers/**user.controller.js**_
```javascript
// user.controller.js
import bcrypt from 'bcrypt';

/* User  POST 新增 */
const userPost = (req, res) => {
  // 取得新增參數
  const insertValues = {
    user_name: req.body.user_name,
    user_mail: req.body.user_mail,
    user_password: bcrypt.hashSync(req.body.user_password, 10) // 密碼加密
  };

  userModule.createUser(insertValues).then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((err) => { return res.send(err); }); // 失敗回傳錯誤訊息
};
```

### **測試**

測試前先將資料庫中的 User 資料表清空
```sql
TRUNCATE TABLE User
```

<img src="https://ithelp.ithome.com.tw/upload/images/20180108/20107247SljOfto2AS.png" width="400">

測試資料
```json
{
	"user_name":"Andy10",
	"user_mail":"andy@gmail.com",
	"user_password":"password10"
}
```

<img src="https://ithelp.ithome.com.tw/upload/images/20180108/20107247DzBkEVfBQu.png" width="400">

使用 GET 查看加密結果

<img src="https://ithelp.ithome.com.tw/upload/images/20180108/20107247UZQvxngYDk.png" width="400">

[上一章](./15-joi-validation.md) - [返回目錄](../readme.md) - [下一章](./documentation/17-user-login.md)