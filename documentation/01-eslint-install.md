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

[返回目錄](../readme.md) - [下一章](./02-yarn-management.md)