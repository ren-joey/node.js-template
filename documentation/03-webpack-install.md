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

[上一章](./02-yarn-management.md) - [返回目錄](../readme.md) - [下一章](./04-nodemon-install.md)