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

[上一章](./06-express-proxy.md) - [返回目錄](../readme.md) - [下一章](./08-mysql-install.md)