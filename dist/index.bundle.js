module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(originalModule) {\n\tif (!originalModule.webpackPolyfill) {\n\t\tvar module = Object.create(originalModule);\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"exports\", {\n\t\t\tenumerable: true\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/harmony-module.js?");

/***/ }),

/***/ "./src/config/config.js":
/*!******************************!*\
  !*** ./src/config/config.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! joi */ \"joi\");\n/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);\n/* config.js */\n// require and configure dotenv, will load vars in .env in PROCESS.ENV\n\n// require('dotenv').config()\n\n\n// const config = {\n//   version: '1.0.0',\n//   env: 'development',\n//   port: '3000'\n// }\n\n// export default config\n\n\n/* config.js */\n// import Joi from 'joi'\n\n// // require and configure dotenv, will load vars in .env in PROCESS.ENV\n// require('dotenv').config()\n\n// // 建立每個變數 joi 驗證規則\n// const envVarSchema = Joi.object().keys({\n//   NODE_ENV: Joi.string().default('development').allow(['development', 'production']),\n//   // 字串且預設值為development 並只允許兩種參數\n//   PORT: Joi.number().default(8080), // 數字且預設值為 8080\n//   VERSION: Joi.string() // 字串\n// }).unknown().required()\n\n// // process.env 撈取 .env 內的變數做 joi 驗證\n// const {\n//   error,\n//   value: envVars\n// } = Joi.validate(process.env, envVarSchema)\n\n// if (error) {\n//   throw new Error(`Config validation error: ${error.message}`)\n// }\n\n// const config = {\n//   version: envVars.VERSION, // 版本\n//   env: envVars.NODE_ENV, // 開發模式\n//   port: envVars.PORT // 阜號\n// }\n\n// export default config // 匯出共用\n\n/* config.js */\n\n\n// require and configure dotenv, will load vars in .env in process.env\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\n\nconst envVarSchema = joi__WEBPACK_IMPORTED_MODULE_0___default.a.object().keys({\n  NODE_ENV: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().default('development').allow(['development', 'production']), // 字串且預設值為development 並只允許兩種參數\n  PORT: joi__WEBPACK_IMPORTED_MODULE_0___default.a.number().default(8080), // 數字且預設值為 8080\n  MYSQL_PORT: joi__WEBPACK_IMPORTED_MODULE_0___default.a.number().default(3306), // 數字且預設值為3306\n  MYSQL_HOST: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().default('127.0.0.1'), // 字串取預設值為127.0.0.1\n  MYSQL_USER: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string(), // 字串\n  MYSQL_PASS: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string(), // 字串\n  MYSQL_NAME: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string(), // 字串\n  VERSION: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string() // 字串\n}).unknown().required();\n\n// process.env 撈取 .env 內的變數做 joi 驗證\nconst {\n  error,\n  value: envVars\n} = joi__WEBPACK_IMPORTED_MODULE_0___default.a.validate(process.env, envVarSchema);\n\nif (error) {\n  throw new Error(`Config validation error: ${error.message}`);\n}\n\nconst config = {\n  version: envVars.VERSION, // API版本\n  env: envVars.NODE_ENV, // 開發模式(development、production)\n  port: envVars.PORT, // API 阜號\n  mysqlPort: envVars.MYSQL_PORT, // 連接阜號(MYSQL_PORT)\n  mysqlHost: envVars.MYSQL_HOST, // 主機名稱 (MYSQL_HOST)\n  mysqlUserName: envVars.MYSQL_USER, // 用戶名稱 (MYSQL_USER)\n  mysqlPass: envVars.MYSQL_PASS, // 資料庫密碼(MYSQL_PASS)\n  mysqlDatabase: envVars.MYSQL_DATABASE // 資料庫名稱(MYSQL_DATABASE)\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (config); // 匯出共用\n\n//# sourceURL=webpack:///./src/config/config.js?");

/***/ }),

/***/ "./src/config/express.js":
/*!*******************************!*\
  !*** ./src/config/express.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! morgan */ \"morgan\");\n/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(morgan__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config */ \"./src/config/config.js\");\n/* harmony import */ var _server_routes_index_route__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../server/routes/index.route */ \"./src/server/routes/index.route.js\");\n/* express.js */\n\n\n\n\n\n\n\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()();\n\n// parse body params and attache them to req.body\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_1___default.a.json());\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_1___default.a.urlencoded({ extended: true }));\n\n// enable CORS - Cross Origin Resource Sharing\napp.use(cors__WEBPACK_IMPORTED_MODULE_2___default()());\n\n// HTTP request logger middleware for node.js\napp.use(morgan__WEBPACK_IMPORTED_MODULE_3___default()('dev'));\n\n/* GET home page. */\napp.get('/', (req, res) => {\n  res.send(`server started on  port http://127.0.0.1:${_config__WEBPACK_IMPORTED_MODULE_4__[\"default\"].port} (${_config__WEBPACK_IMPORTED_MODULE_4__[\"default\"].env})`);\n});\n\napp.use('/api', _server_routes_index_route__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (app);\n\n//# sourceURL=webpack:///./src/config/express.js?");

/***/ }),

/***/ "./src/config/param-validation.js":
/*!****************************************!*\
  !*** ./src/config/param-validation.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! joi */ \"joi\");\n/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  // POST /api/article\n  createArticle: {\n    body: {\n      user_id: joi__WEBPACK_IMPORTED_MODULE_0___default.a.number().required(), // 數字 + 必填\n      article_title: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().required(), // 字串 + 必填\n      article_tag: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string(), // 字串\n      article_content: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(20).required() // 文章長度至少 20 個字\n    }\n  },\n  modifyArticle: {\n    params: {\n      article_id: joi__WEBPACK_IMPORTED_MODULE_0___default.a.number().required()\n    },\n    body: {\n      user_id: joi__WEBPACK_IMPORTED_MODULE_0___default.a.number(), // 數字\n      article_title: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string(), // 字串\n      article_tag: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string(), // 字串\n      article_content: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().min(20) // 文章長度至少 20 個字\n    }\n  },\n  // POST /api/user\n  createUser: {\n    body: {\n      user_name: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().required(), // 限定 email 格式並移除空白\n      user_mail: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().email().trim().required(), // 最小長度6最大30，只允許英文大小寫和數字\n      user_password: joi__WEBPACK_IMPORTED_MODULE_0___default.a.string().regex(/[a-zA-Z0-9]{6,30}$/).required()\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/config/param-validation.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config/config */ \"./src/config/config.js\");\n/* harmony import */ var _config_express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config/express */ \"./src/config/express.js\");\n/* index.js */\n\n\n\nif (!module.parent) {\n  // listen on port config.port\n  _config_express__WEBPACK_IMPORTED_MODULE_1__[\"default\"].listen(_config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].port, () => {\n    console.log(`server started on port http://127.0.0.1:${_config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].port} (${_config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].env})`);\n  });\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_config_express__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/server/controllers/article.controller.js":
/*!******************************************************!*\
  !*** ./src/server/controllers/article.controller.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_article_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/article.module */ \"./src/server/modules/article.module.js\");\n// article.controller.js\n\n\n/* Article  POST 新增 */\nconst articlePost = (req, res) => {\n  // 取得新增參數\n  const insertValues = req.body;\n  _modules_article_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createArticle(insertValues).then(result => {\n    res.send(result); // 成功回傳result結果\n  }).catch(err => {\n    return res.send(err); // 失敗回傳錯誤訊息\n  });\n};\n\n/* Article  GET 取得 */\nconst articleGet = (req, res) => {\n  _modules_article_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"].selectArticle().then(result => {\n    res.send(result); // 成功回傳result結果\n  }).catch(err => {\n    return res.send(err); // 失敗回傳錯誤訊息\n  });\n};\n\n/* Article  PUT 修改 */\nconst articlePut = (req, res) => {\n  const userId = req.params.article_id;\n  const insertValues = req.body;\n\n  _modules_article_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"].modifyArticle(insertValues, userId).then(result => {\n    res.send(result);\n  }).catch(err => {\n    return res.send(err);\n  });\n};\n\n/* Article  DELETE 刪除 */\nconst articleDelete = (req, res) => {\n  const userId = req.params.article_id;\n\n  _modules_article_module__WEBPACK_IMPORTED_MODULE_0__[\"default\"].deleteArticle(userId).then(result => {\n    res.send(result);\n  }).catch(err => {\n    return res.send(err);\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  articlePost,\n  articleGet,\n  articlePut,\n  articleDelete\n});\n\n//# sourceURL=webpack:///./src/server/controllers/article.controller.js?");

/***/ }),

/***/ "./src/server/controllers/user.controller.js":
/*!***************************************************!*\
  !*** ./src/server/controllers/user.controller.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _modules_user_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/user.module */ \"./src/server/modules/user.module.js\");\n// user.controller.js\n\n\n\n/* User POST 新增 */\nconst userPost = (req, res) => {\n  // 取得新增參數\n  const insertValues = {\n    user_name: req.body.user_name,\n    user_mail: req.body.user_mail,\n    user_password: bcrypt__WEBPACK_IMPORTED_MODULE_0___default.a.hashSync(req.body.user_password, 10)\n  };\n\n  _modules_user_module__WEBPACK_IMPORTED_MODULE_1__[\"default\"].createUser(insertValues).then(result => {\n    res.send(result); // 成功回傳result結果\n  }).catch(err => {\n    return res.send(err);\n  }); // 失敗回傳錯誤訊息\n};\n\n/* User GET 取得 */\nconst userGet = (req, res) => {\n  _modules_user_module__WEBPACK_IMPORTED_MODULE_1__[\"default\"].selectUser().then(result => {\n    res.send(result);\n  }).catch(err => {\n    return res.send(err);\n  });\n};\n\n/* User PUT 修改 */\nconst userPut = (req, res) => {\n  const userId = req.params.user_id;\n  const insertValues = req.body;\n\n  _modules_user_module__WEBPACK_IMPORTED_MODULE_1__[\"default\"].modifyUser(insertValues, userId).then(result => {\n    res.send(result);\n  }).catch(err => {\n    return res.send(err);\n  });\n};\n\n/* User DELETE 刪除 */\nconst userDelete = (req, res) => {\n  const userId = req.params.user_id;\n\n  _modules_user_module__WEBPACK_IMPORTED_MODULE_1__[\"default\"].deleteUser(userId).then(result => {\n    res.send(result);\n  }).catch(err => {\n    return res.send(err);\n  });\n};\n\n/* User  POST 登入(Login) */\nconst userLogin = (req, res) => {\n  const insertValues = req.body;\n\n  _modules_user_module__WEBPACK_IMPORTED_MODULE_1__[\"default\"].selectUserLogin(insertValues).then(result => {\n    res.send(result);\n  }).catch(err => {\n    return res.send(err);\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  userPost,\n  userGet,\n  userPut,\n  userDelete,\n  userLogin\n});\n\n//# sourceURL=webpack:///./src/server/controllers/user.controller.js?");

/***/ }),

/***/ "./src/server/modules/article.module.js":
/*!**********************************************!*\
  !*** ./src/server/modules/article.module.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mysql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mysql */ \"mysql\");\n/* harmony import */ var mysql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mysql__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config/config */ \"./src/config/config.js\");\n// article.module.js\n\n\n\nconst connectionPool = mysql__WEBPACK_IMPORTED_MODULE_0___default.a.createPool({\n  connectionLimit: 10,\n  host: _config_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].mysqlHost,\n  user: _config_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].mysqlUserName,\n  password: _config_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].mysqlPass,\n  database: _config_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].mysqlDatabase\n});\n\n/* Article  POST 新增 */\nconst createArticle = insertValues => {\n  return new Promise((resolve, reject) => {\n    connectionPool.getConnection((connectionError, connection) => {\n      // 資料庫連線\n      if (connectionError) {\n        reject(connectionError); // 若連線有問題回傳錯誤\n      } else {\n        connection.query('INSERT INTO Article SET ?', insertValues, (error, result) => {\n          // Article資料表寫入一筆資料\n          if (error) {\n            console.error('SQL error: ', error); // 寫入資料庫有問題時回傳錯誤\n            reject(error);\n          } else if (result.affectedRows === 1) {\n            resolve(`新增成功！ article_id: ${result.insertId}`); // 寫入成功回傳寫入id\n          }\n          connection.release();\n        });\n      }\n    });\n  });\n};\n\n/* Article  GET 取得 */\nconst selectArticle = () => {\n  return new Promise((resolve, reject) => {\n    connectionPool.getConnection((connectionError, connection) => {\n      // 資料庫連線\n      if (connectionError) {\n        reject(connectionError); // 如果連線錯誤就回傳該錯誤\n      } else {\n        connection.query('SELECT * FROM Article', (error, result) => {\n          if (error) {\n            console.error('SQL error: ', error);\n            reject(error);\n          } else {\n            resolve(result);\n          }\n          connection.release();\n        });\n      }\n    });\n  });\n};\n\n/* Article  PUT 修改 */\nconst modifyArticle = (insertValues, userId) => {\n  return new Promise((resolve, reject) => {\n    connectionPool.getConnection((connectionError, connection) => {\n      if (connectionError) {\n        reject(connectionError); // 若連線有問題回傳錯誤\n      } else {\n        // Article 資料表修改指定 id 一筆資料\n        connection.query('UPDATE Article SET ? WHERE article_id = ?', [insertValues, userId], (error, result) => {\n          if (error) {\n            console.error('SQL error: ', error); // 寫入資料庫有問題時回傳錯誤\n          } else if (result.affectedRows === 0) {\n            // 寫入時發現無該筆資料\n            resolve('請確認修改 id');\n          } else if (result.message.match('Changed: 1')) {\n            // 寫入成功\n            resolve('資料修改成功');\n          } else {\n            resolve('資料無異動');\n          }\n          connection.release();\n        });\n      }\n    });\n  });\n};\n\n/**\n * Article  DELETE 刪除\n * @param {number} userId 要刪除的文章 id\n */\nconst deleteArticle = userId => {\n  return new Promise((resolve, reject) => {\n    connectionPool.getConnection((connectionError, connection) => {\n      // 資料庫連線\n      if (connectionError) {\n        reject(connectionError); // 若連線有問題回傳錯誤\n      } else {\n        // Article 資料表刪除指定 id 一筆資料\n        connection.query('DELETE FROM Article WHERE article_id = ?', userId, (error, result) => {\n          if (error) {\n            console.error('SQL error: ', error); // 資料庫存取有問題時回傳錯誤\n            reject(error);\n          } else if (result.affectedRows === 1) {\n            resolve('刪除成功');\n          } else {\n            resolve('刪除失敗');\n          }\n          connection.release();\n        });\n      }\n    });\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  createArticle,\n  selectArticle,\n  modifyArticle,\n  deleteArticle\n});\n\n//# sourceURL=webpack:///./src/server/modules/article.module.js?");

/***/ }),

/***/ "./src/server/modules/user.module.js":
/*!*******************************************!*\
  !*** ./src/server/modules/user.module.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mysql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mysql */ \"mysql\");\n/* harmony import */ var mysql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mysql__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/config */ \"./src/config/config.js\");\n// user.module.js\n\n\n\n\nconst connectionPool = mysql__WEBPACK_IMPORTED_MODULE_0___default.a.createPool({\n  connectionLimit: 10,\n  host: _config_config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].mysqlHost,\n  user: _config_config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].mysqlUserName,\n  password: _config_config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].mysqlPass,\n  database: _config_config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].mysqlDatabase\n});\n\n/* User POST 新增 */\nconst createUser = insertValues => {\n  return new Promise((resolve, reject) => {\n    connectionPool.getConnection((connectionError, connection) => {\n      // 資料庫連線\n      if (connectionError) {\n        reject(connectionError); // 若連線有問題回傳錯誤\n      } else {\n        connection.query('INSERT INTO User SET ?', insertValues, (error, result) => {\n          // User資料表寫入一筆資料\n          if (error) {\n            console.error('SQL error: ', error);\n            reject(error); // 寫入資料庫有問題時回傳錯誤\n          } else if (result.affectedRows === 1) {\n            resolve(`新增成功！ user_id: ${result.insertId}`); // 寫入成功回傳寫入id\n          }\n          connection.release();\n        });\n      }\n    });\n  });\n};\n\n/* User GET 取得 */\nconst selectUser = () => {\n  return new Promise((resolve, reject) => {\n    connectionPool.getConnection((connectionError, connection) => {\n      if (connectionError) {\n        reject(connectionError);\n      } else {\n        connection.query('SELECT * FROM User', (error, result) => {\n          if (error) {\n            console.error('SQL error: ', error);\n            reject(error);\n          } else {\n            resolve(result);\n          }\n          connection.release();\n        });\n      }\n    });\n  });\n};\n\n/* User PUT 修改 */\nconst modifyUser = (insertValues, userId) => {\n  return new Promise((resolve, reject) => {\n    connectionPool.getConnection((connectionError, connection) => {\n      if (connectionError) {\n        reject(connectionError);\n      } else {\n        connection.query('UPDATE User SET ? WHERE user_id = ?', [insertValues, userId], (error, result) => {\n          if (error) {\n            console.error(error);\n          } else if (result.affectedRows === 0) {\n            resolve('請確認修改 id');\n          } else if (result.message.match('Changed: 1')) {\n            resolve('資料修改成功');\n          } else {\n            resolve('資料無異動');\n          }\n          connection.release();\n        });\n      }\n    });\n  });\n};\n\n/* User DELETE 刪除 */\nconst deleteUser = userId => {\n  return new Promise((resolve, reject) => {\n    connectionPool.getConnection((connectionError, connection) => {\n      if (connectionError) {\n        reject(connectionError);\n      } else {\n        connection.query('DELETE FROM User WHERE user_id = ?', userId, (error, result) => {\n          if (error) {\n            console.error('SQL error: ', error);\n            reject(error);\n          } else if (result.affectedRows === 1) {\n            resolve('刪除成功');\n          } else {\n            resolve('刪除失敗');\n          }\n          connection.release();\n        });\n      }\n    });\n  });\n};\n\n/*  User GET (Login)登入取得資訊  */\nconst selectUserLogin = insertValues => {\n  return new Promise((resolve, reject) => {\n    connectionPool.getConnection((connectionError, connection) => {\n      if (connectionError) {\n        reject(connectionError);\n      } else {\n        connection.query('SELECT * FROM User WHERE user_mail = ?', insertValues.user_mail, (error, result) => {\n          if (error) {\n            console.error(error);\n            reject(error);\n          } else if (Object.keys(result).length === 0) {\n            resolve(`${insertValues.user_mail} 該信箱尚未註冊`);\n          } else {\n            const dbHashPassword = result[0].user_password;\n            const requestPassword = insertValues.user_password;\n\n            bcrypt__WEBPACK_IMPORTED_MODULE_1___default.a.compare(requestPassword, dbHashPassword).then(res => {\n              if (res) {\n                resolve('登入成功');\n              } else {\n                resolve('您輸入的密碼有誤');\n              }\n            });\n          }\n          connection.release();\n        });\n      }\n    });\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  createUser,\n  selectUser,\n  modifyUser,\n  deleteUser,\n  selectUserLogin\n});\n\n//# sourceURL=webpack:///./src/server/modules/user.module.js?");

/***/ }),

/***/ "./src/server/routes/article.route.js":
/*!********************************************!*\
  !*** ./src/server/routes/article.route.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express_validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express-validation */ \"express-validation\");\n/* harmony import */ var express_validation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express_validation__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _controllers_article_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/article.controller */ \"./src/server/controllers/article.controller.js\");\n/* harmony import */ var _config_param_validation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/param-validation */ \"./src/config/param-validation.js\");\n// article.route.js\n\n\n\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();\n\nrouter.route('/').get(_controllers_article_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].articleGet) /** 取得 Article 所有值組 */\n.post(express_validation__WEBPACK_IMPORTED_MODULE_1___default()(_config_param_validation__WEBPACK_IMPORTED_MODULE_3__[\"default\"].createArticle), _controllers_article_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].articlePost); /** 新增 Article 值組 */\n\nrouter.route('/:article_id').put(express_validation__WEBPACK_IMPORTED_MODULE_1___default()(_config_param_validation__WEBPACK_IMPORTED_MODULE_3__[\"default\"].modifyArticle), _controllers_article_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].articlePut) /** 修改 Article 值組 */\n.delete(_controllers_article_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].articleDelete);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./src/server/routes/article.route.js?");

/***/ }),

/***/ "./src/server/routes/index.route.js":
/*!******************************************!*\
  !*** ./src/server/routes/index.route.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var mysql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mysql */ \"mysql\");\n/* harmony import */ var mysql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mysql__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../config/config */ \"./src/config/config.js\");\n/* harmony import */ var _article_route__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./article.route */ \"./src/server/routes/article.route.js\");\n/* harmony import */ var _user_route__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user.route */ \"./src/server/routes/user.route.js\");\n\n\n\n\n\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();\n\n/* GET localhost:[port]/api page. */\nrouter.get('/', (req, res) => {\n  res.send(`此路徑是: localhost:${_config_config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].port}/api`);\n});\n\n/* mysql連線測試 */\nrouter.get('/sqlTest', (req, res) => {\n  const connectionPool = mysql__WEBPACK_IMPORTED_MODULE_1___default.a.createPool({ // 建立一個連線池\n    connectionLimit: 10, // 限制池子連線人數\n    host: _config_config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].mysqlHost, // 主機名稱\n    user: _config_config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].mysqlUserName, // 用戶名稱\n    password: _config_config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].mysqlPass, // 資料庫密碼\n    database: _config_config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].mysqlDatabase // 資料庫名稱\n  });\n  connectionPool.getConnection((err, connection) => {\n    // 建立一個連線若錯誤回傳err\n    if (err) {\n      res.send(err);\n      console.log('連線失敗！');\n    } else {\n      res.send('連線成功！');\n      console.log(connection);\n    }\n  });\n});\n\n/** Article Router */\nrouter.use('/article', _article_route__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\n\n/** User Router */\nrouter.use('/user', _user_route__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./src/server/routes/index.route.js?");

/***/ }),

/***/ "./src/server/routes/user.route.js":
/*!*****************************************!*\
  !*** ./src/server/routes/user.route.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express_validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express-validation */ \"express-validation\");\n/* harmony import */ var express_validation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express_validation__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _controllers_user_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/user.controller */ \"./src/server/controllers/user.controller.js\");\n/* harmony import */ var _config_param_validation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/param-validation */ \"./src/config/param-validation.js\");\n// user.route.js\n\n\n\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();\n\nrouter.route('/').post(express_validation__WEBPACK_IMPORTED_MODULE_1___default()(_config_param_validation__WEBPACK_IMPORTED_MODULE_3__[\"default\"].createUser), _controllers_user_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].userPost) /** 取得 User 所有值組 */\n.get(_controllers_user_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].userGet);\n\nrouter.route('/:user_id').put(_controllers_user_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].userPut).delete(_controllers_user_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].userDelete);\n\nrouter.route('/login').post(_controllers_user_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].userLogin);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./src/server/routes/user.route.js?");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcrypt\");\n\n//# sourceURL=webpack:///external_%22bcrypt%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-validation":
/*!*************************************!*\
  !*** external "express-validation" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-validation\");\n\n//# sourceURL=webpack:///external_%22express-validation%22?");

/***/ }),

/***/ "joi":
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"joi\");\n\n//# sourceURL=webpack:///external_%22joi%22?");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"morgan\");\n\n//# sourceURL=webpack:///external_%22morgan%22?");

/***/ }),

/***/ "mysql":
/*!************************!*\
  !*** external "mysql" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mysql\");\n\n//# sourceURL=webpack:///external_%22mysql%22?");

/***/ })

/******/ });