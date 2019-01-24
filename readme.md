# **Node.js 建構**
本文參考 [IT鐵人賽 - 從無到有，打造一個漂亮乾淨俐落的 RESTful API](https://ithelp.ithome.com.tw/users/20107247/ironman/1312) 系列文章
範例採用 node.js 的 express.js 框架進行執行

<h2 style="font-weight: bold;"><a>ESLint 安裝及設定</a></h2>

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
.eslintrc<br/>
.eslintrc.*<br/>
以上都是 ESLint 所允許的設定檔格式，但由於需要在程式碼中進行註解，故使用 js 副檔名

> 詳細請參考 [ESLint Configuring 文件](https://eslint.org/docs/user-guide/configuring)

<h3 style="font-weight: bold;"><a>安裝 Vscode 套件</a></h3>

* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)<br/>
<img src="https://ithelp.ithome.com.tw/upload/images/20171222/20107247alrrCQuVLm.png" width="500">

<h3 style="font-weight: bold;"><a>測試</a></h3>

隨意撰寫一個 js 檔案測試 ESLint 是否有正常運作

<img src="https://ithelp.ithome.com.tw/upload/images/20171222/20107247ODuObnUceE.png" width="500">

<h2 style="font-weight: bold;"><a>Webpack 安裝及設定</a></h2>

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

<h3 style="font-weight: bold;"><a>建立 npm 指令</a></h3>

將新的 npm 指令動作新增到 _**package.json**_ 中的 "script" 項目，內容如下
```json
"scripts": {
  "build": "webpack -w",
  "build:prod": "webpack -p",
  "start": "nodemon dist/index.bundle.js"
}
```

指令使用方法
```bash
npm run build
```
在 _**6.x**_ 以上版的 npm 也可以使用
```bash
npm build
```

<h3 style="font-weight: bold;"><a>測試</a></h3>

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

執行先前在 npm 新增的指令
```bash
npm run build
```

對編譯結果進行測試
```bash
npm run start
```

command line 會吐出 _**index.js**_ 所寫好的內容

<img src="https://ithelp.ithome.com.tw/upload/images/20171223/201072470VSg20CiK2.png"  width="500">

接著可以在 [http://localhost:3000](http://localhost:3000) 看到伺服器吐出的訊息


<img src="https://ithelp.ithome.com.tw/upload/images/20171223/201072476gCWbmOEjI.png" width="350">

如果需要將 js 輸出為正式產品，可以使用壓縮指令進行打包，webpack 會將 js 程式碼全部縮減為一行

```bash
npm run build:prod
```

<h2 style="font-weight: bold;"><a>使用 nodemon 取代 node 啟動程式</a></h2>

<h3 style="font-weight: bold;"><a>nodemon 功能</a></h3>

* 自動重啟應用程式
* 持續偵測你的預設程式
* 默認支持 node＆coffeescript，但是易於運行任何可執行文件（比如python，make等）
* 可以忽略特定文件或目錄
* 觀察指定的目錄資料夾
* 與服務器應用程序或一次運行公用程序和 REPLs 一起使用
* 可在 node 中被存取使用
* 有完整的開源碼分享在 [GitHub](https://github.com/remy/nodemon#nodemon) 上

<h3 style="font-weight: bold;"><a>安裝步驟</a></h3>

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

<h2 style="font-weight: bold;"><a>統一 IDE 編程風格</a></h2>

<h3 style="font-weight: bold;"><a>支援 editor config 的 IDE 清單</a></h3>

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

<h3 style="font-weight: bold;"><a>安裝</a></h3>

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

<h2 style="font-weight: bold;"><a>使用Express建立路由</a></h2>

<h3 style="font-weight: bold;"><a>檔案結構</a></h3>

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

安裝 Express
```bash
yarn add express
```

安裝 dotenv
```bash
yarn add dotenv
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