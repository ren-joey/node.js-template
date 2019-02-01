## **API 與資料庫連線設定**

### **建立資料庫全域變數**

依照下圖所示之內容修改進 _**.env**_ 檔，並剪貼至副本 _**.example.env**_ 保存

<img src="https://ithelp.ithome.com.tw/upload/images/20180102/20107247yZBcftdNn7.png" width="500">

<img src="https://ithelp.ithome.com.tw/upload/images/20180102/20107247HK7C1wukAw.png" width="500">

```bash
/* .env 與 .example.env */
PORT=3000
NODE_ENV=development
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASS=12345678
MYSQL_DATABASE=Community
VERSION=1.0.0
```

修改 _**config.js**_ 檔案內容，程式碼如下
```javascript
/* config.js */
import Joi from 'joi';

// require and configure dotenv, will load vars in .env in process.env
require('dotenv').config();

const envVarSchema = Joi.object().keys({
  NODE_ENV: Joi.string().default('development').allow(['development', 'production']), // 字串且預設值為development 並只允許兩種參數
  PORT: Joi.number().default(8080), // 數字且預設值為 8080
  MYSQL_PORT: Joi.number().default(3306), //數字且預設值為3306
  MYSQL_HOST: Joi.string().default('127.0.0.1'), //字串取預設值為127.0.0.1
  MYSQL_USER: Joi.string(), // 字串
  MYSQL_PASS: Joi.string(), // 字串
  MYSQL_NAME: Joi.string(), // 字串
  VERSION: Joi.string() // 字串
}).unknown().required();

// process.env 撈取 .env 內的變數做 joi 驗證
const { error, value: envVars } = Joi.validate(process.env, envVarSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  version: envVars.VERSION, // API版本
  env: envVars.NODE_ENV, // 開發模式(development、production)
  port: envVars.PORT, // API 阜號
  mysqlPort: envVars.MYSQL_PORT, // 連接阜號(MYSQL_PORT)
  mysqlHost: envVars.MYSQL_HOST, // 主機名稱 (MYSQL_HOST)
  mysqlUserName: envVars.MYSQL_USER, // 用戶名稱 (MYSQL_USER)
  mysqlPass: envVars.MYSQL_PASS, // 資料庫密碼(MYSQL_PASS)
  mysqlDatabase: envVars.MYSQL_DATABASE // 資料庫名稱(MYSQL_DATABASE)
};

export default config; // 匯出共用
```

### **撰寫連線測試路由**

安裝 mysql
```bash
yarn add mysql
```

修改 _**index.route.js**_
```javascript
import express from 'express';
import mysql from 'mysql';

import config from './../../config/config';

const router = express.Router();

/* GET localhost:[port]/api page. */
router.get('/', (req, res) => {
  res.send(`此路徑是: localhost:${config.port}/api`);
});

/* mysql連線測試 */
router.get('/sqlTest', (req, res) => {
  const connectionPool = mysql.createPool({ // 建立一個連線池
    connectionLimit: 10, // 限制池子連線人數
    host: config.mysqlHost, // 主機名稱
    user: config.mysqlUserName, // 用戶名稱
    password: config.mysqlPass, // 資料庫密碼
    database: config.mysqlDatabase // 資料庫名稱
  });
  connectionPool.getConnection((err, connection) => { //建立一個連線若錯誤回傳err
    if (err) {
      res.send(err);
      console.log('連線失敗！');
    } else {
      res.send('連線成功！');
      console.log(connection);
    }
  });
});

export default router;
```

### **測試**

```bash
yarn build
yarn start
```

<img src="https://ithelp.ithome.com.tw/upload/images/20180102/20107247KVprssgF1X.png" width="350">

[上一章](./09-dotenv-joi-install.md) - [返回目錄](../readme.md) - [下一章](./11-article-get-post.md)