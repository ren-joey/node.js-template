# **Node.js 建構**
本範例採用 node.js 的 express.js 框架進行執行

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







