# **Node.js API 建構範例**
本文參考 [IT鐵人賽 - 從無到有，打造一個漂亮乾淨俐落的 RESTful API](https://ithelp.ithome.com.tw/users/20107247/ironman/1312) 系列文章
範例採用 node.js 的 express.js 框架執行

本範例主要展示 node.js 伺服器架構 / 撰寫流程，以 npm 指令及 js 程式碼為主軸<br>
因此 **開始本範例前需具備下列 IT 知識** :
* 基本的前端鐵三角撰寫經驗，包含html, css, js
* 對 CommonJS ( module programming ) 有基本的認知
* 對 npm 指令有基本認知
* 對網頁前後端的交互運作機制有基本認知

# 目錄

* [ESLint 安裝及設定](#user-content-eslint-安裝及設定)
* [使用 yarn 來管理專案](#user-content-使用-yarn-來管理專案)
* [Webpack 安裝及設定](#user-content-webpack-安裝及設定)
* [使用 nodemon 取代 node 啟動程式](#user-content-使用-nodemon-取代-node-啟動程式)
* [統一 IDE 編程風格](#user-content-統一-ide-編程風格)
* [使用 Express 建立路由](#user-content-使用-express-建立路由)
* [新增中介 middleware](#user-content-新增中介-middleware)
* [安裝 MySQL](#user-content-安裝-mysql)
* [dotenv + joi 建立及設定](#user-content-dotenv-joi-建立及設定)
* [API 與資料庫連線設定](#user-content-api-與資料庫連線設定)
* [【實作】Article文章(GET與POST)](#user-content-實作article文章-get與post)
* [【實作】Article文章(PUT與DELETE)](#user-content-實作article文章-put與delete)
* [【實作】User用戶 (GET與POST)](#user-content-實作user用戶-get與post)
* [【實作】User用戶 (PUT與DELETE)](#user-content-實作user用戶-put與delete)
* [使用 joi 來驗證 POST 資料](#user-content-使用-joi-來驗證-post-資料)
* [bcrypt 鹽值加密](#user-content-bcrypt-鹽值加密)
* [使用者登入及密碼驗證](#user-content-使用者登入及密碼驗證)

## **ESLint 安裝及設定**

初始化 npm 專案
```bash
npm init -y
```

安裝 eslint 與 babel-eslint
```bash
npm i -D eslint babel-eslint
```

採用 Airbnb 所制定的編成風格
```bash
npm i -D eslint-config-airbnb-base eslint-plugin-import
```

建立檔案 _**.eslintrc.js**_ 並編輯其內容
```javascript
module.exports = {
  "parser": "babel-eslint",
  //parser: 指的是剖析器，如果你有用babel編譯器，就是設定"babel-eslint"
  "env": {
    "browser": true,
    "node": true
  },
  "extends": "airbnb-base",
  "rules": {
    "semi": [2, "never"],
    "arrow-body-style": ["error", "always"],
    "comma-dangle": ["error", "never"],
    //該規則強制使用對象和數組文字中的逗號
    "no-console": 0
    //關掉console.log()錯誤
  }
}
```
.eslintrc<br>
.eslintrc.*<br>
以上都是 ESLint 所允許的設定檔格式，但由於需要在程式碼中進行註解，故使用 js 副檔名

> 詳細請參考 [ESLint Configuring 文件](https://eslint.org/docs/user-guide/configuring)

### **安裝 Vscode 套件**

* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)<br>
<img src="https://ithelp.ithome.com.tw/upload/images/20171222/20107247alrrCQuVLm.png" width="500">

### **測試**

隨意撰寫一個 js 檔案測試 ESLint 是否有正常運作

<img src="https://ithelp.ithome.com.tw/upload/images/20171222/20107247ODuObnUceE.png" width="500">

## **使用 yarn 來管理專案**

### **引言**

由於專案建構過程中，使用 npm 安裝預設版本時，常出現版本相容性問題<br>
如果改由 yarn 作依賴元件的版本控制將會節省許多時間 <br>
建議接下來的版本控制取代為 yarn <br>
當然如果你對 npm 的版本控制寥落指掌也可以忽略這個方案 <br>

### **安裝**

```bash
sudo npm i -g yarn
```

終端機接下來會詢問您電腦的密碼，直接輸入後點 enter 即可

## **Webpack 安裝及設定**

使用 npm 安裝 webpack 及 babel
```bash
npm i -D webpack webpack-node-externals babel-preset-env babel-plugin-transform-object-rest-spread babel-core babel-loader
```

建立 Webpack 設定檔 _**webpack.config.js**_ 並編輯其內容如下

```javascript
/* webpack.config.js ： Webpack 的設定檔 */

const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    'index': './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    libraryTarget: 'commonjs2',
  },
  module: {   //設定你的檔案選項
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
    ],
  },
}
```

### **建立 npm 指令**

將新的 npm 指令動作新增到 _**package.json**_ 中的 "script" 項目，內容如下
```json
"scripts": {
  "build": "webpack -w",
  "build:prod": "webpack -p",
  "start": "nodemon dist/index.bundle.js"
}
```

### **測試**

建立 _**index.js**_ 檔案進行測試，內容入下
```javascript
//透過http模組啟動web server服務
const http = require('http')

const server = http.createServer(function (req, res) {
  //設定回應為text文件，並回應 Hello World!
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello World!')
})

//設定服務監聽localhost:3000(127.0.0.1/:3000)
server.listen('3000', function () {
  console.log('server start on 3000 port')
})
```

執行先前在 _**package.json**_ 新增的指令
```bash
yarn build
```

此時終端機可能會報錯 (若正常運作可跳過此步驟)

<img src="https://i.imgur.com/Xg1mjib.png" width="500">

原因是 babel-core 核心元件跟套件 babel-loader 的 npm 預設版本不合<br>
只要將 babel-loader 降低版本即可

```bash
yarn upgrade babel-loader@^7.0.0
```

之後再重新執行一次 yarn build 就可以看到 index.bundle.js 被編譯出來了

<img src="https://i.imgur.com/D0mGwMz.png">

對編譯結果進行測試
```bash
yarn start
```

command line 會吐出 _**index.js**_ 所寫好的內容

<img src="https://ithelp.ithome.com.tw/upload/images/20171223/201072470VSg20CiK2.png"  width="500">

接著可以在 [http://localhost:3000](http://localhost:3000) 看到伺服器吐出的訊息


<img src="https://ithelp.ithome.com.tw/upload/images/20171223/201072476gCWbmOEjI.png" width="350">

如果需要將 js 輸出為正式產品，可以使用壓縮指令進行打包，webpack 會將 js 程式碼全部縮減為一行

```bash
yarn build:prod
```

## **使用 nodemon 取代 node 啟動程式**

### **nodemon 功能**

* 自動重啟應用程式
* 持續偵測你的預設程式
* 默認支持 node＆coffeescript，但是易於運行任何可執行文件（比如python，make等）
* 可以忽略特定文件或目錄
* 觀察指定的目錄資料夾
* 與服務器應用程序或一次運行公用程序和 REPLs 一起使用
* 可在 node 中被存取使用
* 有完整的開源碼分享在 [GitHub](https://github.com/remy/nodemon#nodemon) 上

### **安裝步驟**

安裝全域套件
```bash
sudo npm i nodemon -g
```

安裝於專案資料夾
```bash
npm i -D nodemon
```

啟動專案
```bash
nodemon dist/index.bundle.js
```

可在 command line 看到運行結果

<img src="https://ithelp.ithome.com.tw/upload/images/20171223/201072470FUlksBye3.png" width="400">

## **統一 IDE 編程風格**

### **支援 editor config 的 IDE 清單**

* JetBrain’s IDEs, including PhpStorm, and
* WebStorm
* BBEdit
* Atom
* Sublime Text
* GitHub
* Emacs & Vim
* Brackets
* Coda
* Eclipse & NetBeans
* gEdit, jEdit, & Notepad++
* textmate
* Visual Studio
* Xcode

### **安裝**

建立檔案 _**.editorconfig**_ 並編輯其內容如下
```
# http://editorconfig.org
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

# Use 4 spaces for the Python files
[*.py]
indent_size = 4
max_line_length = 80

# The JSON files contain newlines inconsistently
[*.json]
insert_final_newline = ignore

# Minified JavaScript files shouldn't be changed
[**.min.js]
indent_style = ignore
insert_final_newline = ignore

# Makefiles always use tabs for indentation
[Makefile]
indent_style = tab

# Batch files use tabs for indentation
[*.bat]
indent_style = tab

[*.md]
trim_trailing_whitespace = false
```
完成後 IDE 會自動抓取設定值中的風格設定，並忽略 IDE 的原始設定值<br>
如此一來，只需要加入一個設定檔即可在團隊中統一編程風格


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

## **新增中介 middleware**

### **簡介**

node.js 伺服器收到請求後，在進入 route 轉發之前會先經過一個中繼站進行請求分析，依據計算的結果發送對應的頁面給使用者

### **安裝解析器 body-parser**

body-parser 是一個 HTTP 請求解析的中介軟體，使用這個插件可以解析 JSON、Raw、text、XML、URL-encoded 格式的請求，你可以在 Postman 上看到這些格式，假設今天 POST 東西到 body 時，後端必須要靠 body-parser 來解析資料

```bash
yarn add body-parser
```

編輯 _**express.js**_ 檔案，加入 middleware 中介機制，程式碼如下
```javascript
/* express.js */
import bodyParser from 'body-parser'

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
```

### **安裝跨來源資源共享 cors**

跨來源資源共享（Cross-Origin Resource Sharing (CORS)）是一種使用額外 HTTP 標頭來讓目前瀏覽網站的 user agent 能獲得訪問不同來源（網域）伺服器特定資源之權限的機制。當 user agent 請求一個不是目前文件來源——來自於不同網域（domain）、通訊協定（protocol）或通訊埠（port）的資源時，會建立一個跨來源 HTTP 請求（cross-origin HTTP request）。

所以當你在不同網域利用 ajax 或 fetch 存取 API 時會發現存取失敗的訊息，就是你未在標頭設定跨網域存取權限，所以這邊就要利用 cors 來快速建立讀取權限。

```bash
yarn add cors
```

編輯 _**express.js**_ 檔案，程式碼如下
```javascript
import cors from 'cors';

// enable CORS - Cross Origin Resource Sharing
app.use(cors());
```

如果跨來源資源共享有啟動成功，在瀏覽器的開發者工具中選到 Network 標籤，可以看到 Access-Control-Allow-Origin 已經被啟動

<img src="https://ithelp.ithome.com.tw/upload/images/20171227/201072474RGQJaUk73.png" width="500">

如果不想使用 cors 套件也可以手動設置

```javascript
app.get('/', (req, res) => {
  res.send('歡迎 API => http://localhost:4000/api');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
});
```

### **新增連線存取紀錄 morgan**

mogran 是一個 HTTP request logger 也就是在你存取某個 API 路徑時你的終端機就會顯示存取結果像是 200、404 的狀態碼，有助於開發階段的除錯。

```bash
yarn add morgan
```

編輯 _**express.js**_ 內容，程式碼如下
```javascript
import morgan from 'morgan';

// HTTP request logger middleware for node.js
app.use(morgan('dev'));
```

完成後建構並啟動專案
```bash
yarn build
yarn start
```

連結到 [http://127.0.0.1:3000](http://127.0.0.1:3000) ，再回來終端機就可以看到伺服器吐出的請求紀錄

<img src="https://ithelp.ithome.com.tw/upload/images/20171227/20107247I8lSVMJtgY.png" width="550">

## **安裝 MySQL**

> 本段文章節錄自 [https://ithelp.ithome.com.tw/articles/10194455](https://ithelp.ithome.com.tw/articles/10194455)

### **資料庫系統**

資料庫系統是由資料庫和資料庫管理系統所組成的，資料庫的定義就是一個儲存資料的電子文件檔案櫃並有長存資料之稱，數據類型分為關聯性資料庫(SQL)以及非關聯性資料庫(MySQL)。

1. 關聯性資料庫(SQL) <br>
所謂關聯(Relationship)是指藉由表格(table)之間的關聯性的形式找出資料的方法，常見的類型有以下幾種。
   * MySQL
   * PostgreSQL
   * Microsoft Access
   * Microsoft SQL Server
   * Google Fusion Tables
   * FileMaker
   * Oracle數據庫
   * Sybase
   * dBASE
   * Clipper
   * FoxPro
   * foshub

1. 非關聯性資料庫(NoSQL) <br>
非關聯性資料庫故名意思就是沒有關聯性的他所存在的資料，有分為四大類 Key-Value資料庫、記憶體資料庫、文件資料庫、圖學資料庫，其中最常見的就是一個鍵(key)搭配一個值(value)，Google 的 Firebase Database 就是儲存非關聯性的資料，下面來為各位做整理。

   * Key-Value資料庫
     * Google BigTable
     * Hadoop HBase
     * Amazon Dynamo
     * Cassandra
     * Hypertable

   * 記憶體資料庫
     * Memcached
     * Redis
     * Velocity
     * Tuple space

   * 文件資料庫
     * CouchDB
     * MongoDB
     * Riak

   * 圖學資料庫
     * Neo4j
     * InfoGrid
     * AllegroGrph

> 詳細介紹可參考 [快速認識4類主流 NoSQL 資料庫](https://www.ithome.com.tw/news/92507)

### **安裝**

點選 [Download MySQL Community Serve](https://dev.mysql.com/downloads/mysql/) 至 MySQL 官網下載最新的穩定版本

<img src="https://i.imgur.com/TOP0S0L.png">

### **安裝 GUI**

如果您對傳統介面 [phpMyAdmin](https://www.phpmyadmin.net/) 的操作很熟悉，可以略過此步驟<br>
本範例將採用 [Sequel Pro](http://www.sequelpro.com/)

1. 點選 [Sequel Pro 下載安裝](http://www.sequelpro.com/)，安裝過程選擇 Use Legacy Password Encryption，並輸入您的密碼
2. 打開 Sequel Pro 新增連線，帳號通常預設是 root，密碼為當初安裝所設定的密碼，主機位置就是自己本機 localhost 也就是 127.0.0.1<br>
  <img src="https://ithelp.ithome.com.tw/upload/images/20171229/20107247JzTSXiFjZn.png" width="500">
3. 連線成功後即可看到操作介面<br>
  <img src="https://i.imgur.com/SbUAFVE.png">
4. 建立新的資料表 Article 及相關欄位如下圖所示<br>
  <img src="https://ithelp.ithome.com.tw/upload/images/20171231/20107247QDSzrMTG04.png">
5. 建立新的資料表 User 及相關欄位如下圖所示<br>
  <img src="https://ithelp.ithome.com.tw/upload/images/20171231/20107247kMvMhTFmN6.png">

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

## **測試**

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

## **測試**

```bash
yarn build
yarn start
```

<img src="https://ithelp.ithome.com.tw/upload/images/20180106/20107247vzX272W3BG.png">

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