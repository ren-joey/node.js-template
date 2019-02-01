## **使用 Express 建立路由**

### **檔案結構**

安裝 Express
```bash
yarn add express
```

安裝 dotenv
```bash
yarn add dotenv
```

依照以下結構建立檔案及資料夾
```
src
┌── config
│   ├── config.js  // joi驗證與匯出全域變數
│   └── express.js  // express與其他middleware設定
├── server
│   ├── controllers  // 處理控制流程和回應
│   ├── helper  // 處理例外Error
│   ├── modules // 後端資料庫進行運作
│   └── routes  // 各路徑的設定點
│       └── index.route.js  // 主路由
│
└── index.js  // 程式進入點
```

編輯 /_**src**_/_**config**_/_**config.js**_ 其內容如下
```javascript
/* config.js */
// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();


const config = {
  version: '1.0.0',
  env: 'development',
  port: '3000'
};

export default config;
```

編輯 /_**src**_/_**config**_/_**express.js**_ 內容如下
```javascript
/* express.js */
import express from 'express';
import config from './config';
import index from '../server/routes/index.route';

const app = express();

/* GET home page. */
app.get('/', (req, res) => {
  res.send(`server started on  port http://127.0.0.1:${config.port} (${config.env})`);
});

app.use('/api', index);

export default app;
```

編輯 /_**src**_/_**server**_/_**routes**_/_**index.route.js**_ 內容如下
```javascript
/* index.route.js */
import express from 'express'
import config from '../../config/config'

const router = express.Router()

/* GET localhost:[port]/api page. */
router.get('/', (req, res) => {
  res.send(`此路徑是: localhost:${config.port}/api`)
})

export default router
```

編輯 /_**src**_/_**index.js**_ 內容如下
```javascript
/* index.js */
import config from './config/config';
import app from './config/express';

if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    console.log(`server started on  port http://127.0.0.1:${config.port} (${config.env})`);
  });
}

export default app;
```

使用 build 指令對專案進行打包
```bash
yarn build
```

使用 start 指令對 js 進行測試
```bash
yarn start
```

連結 [localhost:3000](localhost:3000) 測試運行結果

<img src="https://ithelp.ithome.com.tw/upload/images/20171226/201072473gCJANIOhx.png" width="350">

連結 [localhost:3000/api](localhost:3000/api) 測試 route 運行結果

<img src="https://ithelp.ithome.com.tw/upload/images/20171226/20107247Y7gToxSS9s.png" width="350">

[上一章](./05-unified-coding-style.md) - [返回目錄](../readme.md) - [下一章](./07-middleware-install.md)