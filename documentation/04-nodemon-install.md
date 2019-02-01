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

[上一章](./03-webpack-install.md) - [返回目錄](../readme.md) - [下一章](./05-unified-coding-style.md)