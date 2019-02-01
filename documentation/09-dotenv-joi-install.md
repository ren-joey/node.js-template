## **dotenv + joi 建立及設定**

### **設定 dotenv**

建立 _**.example.env**_ 檔
```text
/* .example.env 全域變數的設定檔範本 */
PORT=3000
NODE_ENV=development
VERSION=1.0.0
```

複製該檔案為 _**.env**_
```bash
cp .example.env .env
```

### **安裝及設定 joi**

joi是一個請求驗證機制，依照設定好的 schema 規範限制傳入的資料格式，如果傳入的資料錯誤就會立刻被檢測出來

安裝 joi
```bash
yarn add joi
```

編輯 _src/config/**config.js**_，將原本寫死的 config 設定值直接覆蓋掉
```javascript
/* config.js */
import Joi from 'joi';

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// 建立每個變數 joi 驗證規則
const envVarSchema = Joi.object().keys({
  NODE_ENV: Joi.string().default('development').allow(['development', 'production']), // 字串且預設值為development 並只允許兩種參數
  PORT: Joi.number().default(8080), // 數字且預設值為 8080
  VERSION: Joi.string() // 字串
}).unknown().required();

// process.env 撈取 .env 內的變數做 joi 驗證
const {
  error,
  value: envVars
} = Joi.validate(process.env, envVarSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  version: envVars.VERSION, // 版本
  env: envVars.NODE_ENV, // 開發模式
  port: envVars.PORT // 阜號
};

export default config; // 匯出共用
```

> 更多 joi 變數規範請參考 [joi GitHub](https://github.com/hapijs/joi/blob/v13.0.2/API.md)

測試
```bash
yarn build
yarn start
```

[上一章](./08-mysql-install.md) - [返回目錄](../readme.md) - [下一章](./10-database-connection.md)