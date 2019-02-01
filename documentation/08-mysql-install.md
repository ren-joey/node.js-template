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

[上一章](./07-middleware-install.md) - [返回目錄](../readme.md) - [下一章](./09-dotenv-joi-install.md)