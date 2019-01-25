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

/***/ "./node_modules/basic-auth/index.js":
/*!******************************************!*\
  !*** ./node_modules/basic-auth/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*!\n * basic-auth\n * Copyright(c) 2013 TJ Holowaychuk\n * Copyright(c) 2014 Jonathan Ong\n * Copyright(c) 2015-2016 Douglas Christopher Wilson\n * MIT Licensed\n */\n\n\n\n/**\n * Module dependencies.\n * @private\n */\n\nvar Buffer = __webpack_require__(/*! safe-buffer */ \"safe-buffer\").Buffer\n\n/**\n * Module exports.\n * @public\n */\n\nmodule.exports = auth\nmodule.exports.parse = parse\n\n/**\n * RegExp for basic auth credentials\n *\n * credentials = auth-scheme 1*SP token68\n * auth-scheme = \"Basic\" ; case insensitive\n * token68     = 1*( ALPHA / DIGIT / \"-\" / \".\" / \"_\" / \"~\" / \"+\" / \"/\" ) *\"=\"\n * @private\n */\n\nvar CREDENTIALS_REGEXP = /^ *(?:[Bb][Aa][Ss][Ii][Cc]) +([A-Za-z0-9._~+/-]+=*) *$/\n\n/**\n * RegExp for basic auth user/pass\n *\n * user-pass   = userid \":\" password\n * userid      = *<TEXT excluding \":\">\n * password    = *TEXT\n * @private\n */\n\nvar USER_PASS_REGEXP = /^([^:]*):(.*)$/\n\n/**\n * Parse the Authorization header field of a request.\n *\n * @param {object} req\n * @return {object} with .name and .pass\n * @public\n */\n\nfunction auth (req) {\n  if (!req) {\n    throw new TypeError('argument req is required')\n  }\n\n  if (typeof req !== 'object') {\n    throw new TypeError('argument req is required to be an object')\n  }\n\n  // get header\n  var header = getAuthorization(req)\n\n  // parse header\n  return parse(header)\n}\n\n/**\n * Decode base64 string.\n * @private\n */\n\nfunction decodeBase64 (str) {\n  return Buffer.from(str, 'base64').toString()\n}\n\n/**\n * Get the Authorization header from request object.\n * @private\n */\n\nfunction getAuthorization (req) {\n  if (!req.headers || typeof req.headers !== 'object') {\n    throw new TypeError('argument req is required to have headers property')\n  }\n\n  return req.headers.authorization\n}\n\n/**\n * Parse basic auth to object.\n *\n * @param {string} string\n * @return {object}\n * @public\n */\n\nfunction parse (string) {\n  if (typeof string !== 'string') {\n    return undefined\n  }\n\n  // parse header\n  var match = CREDENTIALS_REGEXP.exec(string)\n\n  if (!match) {\n    return undefined\n  }\n\n  // decode user pass\n  var userPass = USER_PASS_REGEXP.exec(decodeBase64(match[1]))\n\n  if (!userPass) {\n    return undefined\n  }\n\n  // return credentials object\n  return new Credentials(userPass[1], userPass[2])\n}\n\n/**\n * Object to represent user credentials.\n * @private\n */\n\nfunction Credentials (name, pass) {\n  this.name = name\n  this.pass = pass\n}\n\n\n//# sourceURL=webpack:///./node_modules/basic-auth/index.js?");

/***/ }),

/***/ "./node_modules/morgan/index.js":
/*!**************************************!*\
  !*** ./node_modules/morgan/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*!\n * morgan\n * Copyright(c) 2010 Sencha Inc.\n * Copyright(c) 2011 TJ Holowaychuk\n * Copyright(c) 2014 Jonathan Ong\n * Copyright(c) 2014-2017 Douglas Christopher Wilson\n * MIT Licensed\n */\n\n\n\n/**\n * Module exports.\n * @public\n */\n\nmodule.exports = morgan\nmodule.exports.compile = compile\nmodule.exports.format = format\nmodule.exports.token = token\n\n/**\n * Module dependencies.\n * @private\n */\n\nvar auth = __webpack_require__(/*! basic-auth */ \"./node_modules/basic-auth/index.js\")\nvar debug = __webpack_require__(/*! debug */ \"debug\")('morgan')\nvar deprecate = __webpack_require__(/*! depd */ \"depd\")('morgan')\nvar onFinished = __webpack_require__(/*! on-finished */ \"on-finished\")\nvar onHeaders = __webpack_require__(/*! on-headers */ \"./node_modules/on-headers/index.js\")\n\n/**\n * Array of CLF month names.\n * @private\n */\n\nvar CLF_MONTH = [\n  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',\n  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'\n]\n\n/**\n * Default log buffer duration.\n * @private\n */\n\nvar DEFAULT_BUFFER_DURATION = 1000\n\n/**\n * Create a logger middleware.\n *\n * @public\n * @param {String|Function} format\n * @param {Object} [options]\n * @return {Function} middleware\n */\n\nfunction morgan (format, options) {\n  var fmt = format\n  var opts = options || {}\n\n  if (format && typeof format === 'object') {\n    opts = format\n    fmt = opts.format || 'default'\n\n    // smart deprecation message\n    deprecate('morgan(options): use morgan(' + (typeof fmt === 'string' ? JSON.stringify(fmt) : 'format') + ', options) instead')\n  }\n\n  if (fmt === undefined) {\n    deprecate('undefined format: specify a format')\n  }\n\n  // output on request instead of response\n  var immediate = opts.immediate\n\n  // check if log entry should be skipped\n  var skip = opts.skip || false\n\n  // format function\n  var formatLine = typeof fmt !== 'function'\n    ? getFormatFunction(fmt)\n    : fmt\n\n  // stream\n  var buffer = opts.buffer\n  var stream = opts.stream || process.stdout\n\n  // buffering support\n  if (buffer) {\n    deprecate('buffer option')\n\n    // flush interval\n    var interval = typeof buffer !== 'number'\n      ? DEFAULT_BUFFER_DURATION\n      : buffer\n\n    // swap the stream\n    stream = createBufferStream(stream, interval)\n  }\n\n  return function logger (req, res, next) {\n    // request data\n    req._startAt = undefined\n    req._startTime = undefined\n    req._remoteAddress = getip(req)\n\n    // response data\n    res._startAt = undefined\n    res._startTime = undefined\n\n    // record request start\n    recordStartTime.call(req)\n\n    function logRequest () {\n      if (skip !== false && skip(req, res)) {\n        debug('skip request')\n        return\n      }\n\n      var line = formatLine(morgan, req, res)\n\n      if (line == null) {\n        debug('skip line')\n        return\n      }\n\n      debug('log request')\n      stream.write(line + '\\n')\n    };\n\n    if (immediate) {\n      // immediate log\n      logRequest()\n    } else {\n      // record response start\n      onHeaders(res, recordStartTime)\n\n      // log when response finished\n      onFinished(res, logRequest)\n    }\n\n    next()\n  }\n}\n\n/**\n * Apache combined log format.\n */\n\nmorgan.format('combined', ':remote-addr - :remote-user [:date[clf]] \":method :url HTTP/:http-version\" :status :res[content-length] \":referrer\" \":user-agent\"')\n\n/**\n * Apache common log format.\n */\n\nmorgan.format('common', ':remote-addr - :remote-user [:date[clf]] \":method :url HTTP/:http-version\" :status :res[content-length]')\n\n/**\n * Default format.\n */\n\nmorgan.format('default', ':remote-addr - :remote-user [:date] \":method :url HTTP/:http-version\" :status :res[content-length] \":referrer\" \":user-agent\"')\ndeprecate.property(morgan, 'default', 'default format: use combined format')\n\n/**\n * Short format.\n */\n\nmorgan.format('short', ':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms')\n\n/**\n * Tiny format.\n */\n\nmorgan.format('tiny', ':method :url :status :res[content-length] - :response-time ms')\n\n/**\n * dev (colored)\n */\n\nmorgan.format('dev', function developmentFormatLine (tokens, req, res) {\n  // get the status code if response written\n  var status = headersSent(res)\n    ? res.statusCode\n    : undefined\n\n  // get status color\n  var color = status >= 500 ? 31 // red\n    : status >= 400 ? 33 // yellow\n      : status >= 300 ? 36 // cyan\n        : status >= 200 ? 32 // green\n          : 0 // no color\n\n  // get colored function\n  var fn = developmentFormatLine[color]\n\n  if (!fn) {\n    // compile\n    fn = developmentFormatLine[color] = compile('\\x1b[0m:method :url \\x1b[' +\n      color + 'm:status \\x1b[0m:response-time ms - :res[content-length]\\x1b[0m')\n  }\n\n  return fn(tokens, req, res)\n})\n\n/**\n * request url\n */\n\nmorgan.token('url', function getUrlToken (req) {\n  return req.originalUrl || req.url\n})\n\n/**\n * request method\n */\n\nmorgan.token('method', function getMethodToken (req) {\n  return req.method\n})\n\n/**\n * response time in milliseconds\n */\n\nmorgan.token('response-time', function getResponseTimeToken (req, res, digits) {\n  if (!req._startAt || !res._startAt) {\n    // missing request and/or response start time\n    return\n  }\n\n  // calculate diff\n  var ms = (res._startAt[0] - req._startAt[0]) * 1e3 +\n    (res._startAt[1] - req._startAt[1]) * 1e-6\n\n  // return truncated value\n  return ms.toFixed(digits === undefined ? 3 : digits)\n})\n\n/**\n * current date\n */\n\nmorgan.token('date', function getDateToken (req, res, format) {\n  var date = new Date()\n\n  switch (format || 'web') {\n    case 'clf':\n      return clfdate(date)\n    case 'iso':\n      return date.toISOString()\n    case 'web':\n      return date.toUTCString()\n  }\n})\n\n/**\n * response status code\n */\n\nmorgan.token('status', function getStatusToken (req, res) {\n  return headersSent(res)\n    ? String(res.statusCode)\n    : undefined\n})\n\n/**\n * normalized referrer\n */\n\nmorgan.token('referrer', function getReferrerToken (req) {\n  return req.headers['referer'] || req.headers['referrer']\n})\n\n/**\n * remote address\n */\n\nmorgan.token('remote-addr', getip)\n\n/**\n * remote user\n */\n\nmorgan.token('remote-user', function getRemoteUserToken (req) {\n  // parse basic credentials\n  var credentials = auth(req)\n\n  // return username\n  return credentials\n    ? credentials.name\n    : undefined\n})\n\n/**\n * HTTP version\n */\n\nmorgan.token('http-version', function getHttpVersionToken (req) {\n  return req.httpVersionMajor + '.' + req.httpVersionMinor\n})\n\n/**\n * UA string\n */\n\nmorgan.token('user-agent', function getUserAgentToken (req) {\n  return req.headers['user-agent']\n})\n\n/**\n * request header\n */\n\nmorgan.token('req', function getRequestToken (req, res, field) {\n  // get header\n  var header = req.headers[field.toLowerCase()]\n\n  return Array.isArray(header)\n    ? header.join(', ')\n    : header\n})\n\n/**\n * response header\n */\n\nmorgan.token('res', function getResponseHeader (req, res, field) {\n  if (!headersSent(res)) {\n    return undefined\n  }\n\n  // get header\n  var header = res.getHeader(field)\n\n  return Array.isArray(header)\n    ? header.join(', ')\n    : header\n})\n\n/**\n * Format a Date in the common log format.\n *\n * @private\n * @param {Date} dateTime\n * @return {string}\n */\n\nfunction clfdate (dateTime) {\n  var date = dateTime.getUTCDate()\n  var hour = dateTime.getUTCHours()\n  var mins = dateTime.getUTCMinutes()\n  var secs = dateTime.getUTCSeconds()\n  var year = dateTime.getUTCFullYear()\n\n  var month = CLF_MONTH[dateTime.getUTCMonth()]\n\n  return pad2(date) + '/' + month + '/' + year +\n    ':' + pad2(hour) + ':' + pad2(mins) + ':' + pad2(secs) +\n    ' +0000'\n}\n\n/**\n * Compile a format string into a function.\n *\n * @param {string} format\n * @return {function}\n * @public\n */\n\nfunction compile (format) {\n  if (typeof format !== 'string') {\n    throw new TypeError('argument format must be a string')\n  }\n\n  var fmt = String(JSON.stringify(format))\n  var js = '  \"use strict\"\\n  return ' + fmt.replace(/:([-\\w]{2,})(?:\\[([^\\]]+)\\])?/g, function (_, name, arg) {\n    var tokenArguments = 'req, res'\n    var tokenFunction = 'tokens[' + String(JSON.stringify(name)) + ']'\n\n    if (arg !== undefined) {\n      tokenArguments += ', ' + String(JSON.stringify(arg))\n    }\n\n    return '\" +\\n    (' + tokenFunction + '(' + tokenArguments + ') || \"-\") + \"'\n  })\n\n  // eslint-disable-next-line no-new-func\n  return new Function('tokens, req, res', js)\n}\n\n/**\n * Create a basic buffering stream.\n *\n * @param {object} stream\n * @param {number} interval\n * @public\n */\n\nfunction createBufferStream (stream, interval) {\n  var buf = []\n  var timer = null\n\n  // flush function\n  function flush () {\n    timer = null\n    stream.write(buf.join(''))\n    buf.length = 0\n  }\n\n  // write function\n  function write (str) {\n    if (timer === null) {\n      timer = setTimeout(flush, interval)\n    }\n\n    buf.push(str)\n  }\n\n  // return a minimal \"stream\"\n  return { write: write }\n}\n\n/**\n * Define a format with the given name.\n *\n * @param {string} name\n * @param {string|function} fmt\n * @public\n */\n\nfunction format (name, fmt) {\n  morgan[name] = fmt\n  return this\n}\n\n/**\n * Lookup and compile a named format function.\n *\n * @param {string} name\n * @return {function}\n * @public\n */\n\nfunction getFormatFunction (name) {\n  // lookup format\n  var fmt = morgan[name] || name || morgan.default\n\n  // return compiled format\n  return typeof fmt !== 'function'\n    ? compile(fmt)\n    : fmt\n}\n\n/**\n * Get request IP address.\n *\n * @private\n * @param {IncomingMessage} req\n * @return {string}\n */\n\nfunction getip (req) {\n  return req.ip ||\n    req._remoteAddress ||\n    (req.connection && req.connection.remoteAddress) ||\n    undefined\n}\n\n/**\n * Determine if the response headers have been sent.\n *\n * @param {object} res\n * @returns {boolean}\n * @private\n */\n\nfunction headersSent (res) {\n  return typeof res.headersSent !== 'boolean'\n    ? Boolean(res._header)\n    : res.headersSent\n}\n\n/**\n * Pad number to two digits.\n *\n * @private\n * @param {number} num\n * @return {string}\n */\n\nfunction pad2 (num) {\n  var str = String(num)\n\n  return (str.length === 1 ? '0' : '') + str\n}\n\n/**\n * Record the start time.\n * @private\n */\n\nfunction recordStartTime () {\n  this._startAt = process.hrtime()\n  this._startTime = new Date()\n}\n\n/**\n * Define a token function with the given name,\n * and callback fn(req, res).\n *\n * @param {string} name\n * @param {function} fn\n * @public\n */\n\nfunction token (name, fn) {\n  morgan[name] = fn\n  return this\n}\n\n\n//# sourceURL=webpack:///./node_modules/morgan/index.js?");

/***/ }),

/***/ "./node_modules/on-headers/index.js":
/*!******************************************!*\
  !*** ./node_modules/on-headers/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*!\n * on-headers\n * Copyright(c) 2014 Douglas Christopher Wilson\n * MIT Licensed\n */\n\n\n\n/**\n * Reference to Array slice.\n */\n\nvar slice = Array.prototype.slice\n\n/**\n * Execute a listener when a response is about to write headers.\n *\n * @param {Object} res\n * @return {Function} listener\n * @api public\n */\n\nmodule.exports = function onHeaders(res, listener) {\n  if (!res) {\n    throw new TypeError('argument res is required')\n  }\n\n  if (typeof listener !== 'function') {\n    throw new TypeError('argument listener must be a function')\n  }\n\n  res.writeHead = createWriteHead(res.writeHead, listener)\n}\n\nfunction createWriteHead(prevWriteHead, listener) {\n  var fired = false;\n\n  // return function with core name and argument list\n  return function writeHead(statusCode) {\n    // set headers from arguments\n    var args = setWriteHeadHeaders.apply(this, arguments);\n\n    // fire listener\n    if (!fired) {\n      fired = true\n      listener.call(this)\n\n      // pass-along an updated status code\n      if (typeof args[0] === 'number' && this.statusCode !== args[0]) {\n        args[0] = this.statusCode\n        args.length = 1\n      }\n    }\n\n    prevWriteHead.apply(this, args);\n  }\n}\n\nfunction setWriteHeadHeaders(statusCode) {\n  var length = arguments.length\n  var headerIndex = length > 1 && typeof arguments[1] === 'string'\n    ? 2\n    : 1\n\n  var headers = length >= headerIndex + 1\n    ? arguments[headerIndex]\n    : undefined\n\n  this.statusCode = statusCode\n\n  // the following block is from node.js core\n  if (Array.isArray(headers)) {\n    // handle array case\n    for (var i = 0, len = headers.length; i < len; ++i) {\n      this.setHeader(headers[i][0], headers[i][1])\n    }\n  } else if (headers) {\n    // handle object case\n    var keys = Object.keys(headers)\n    for (var i = 0; i < keys.length; i++) {\n      var k = keys[i]\n      if (k) this.setHeader(k, headers[k])\n    }\n  }\n\n  // copy leading arguments\n  var args = new Array(Math.min(length, headerIndex))\n  for (var i = 0; i < args.length; i++) {\n    args[i] = arguments[i]\n  }\n\n  return args\n}\n\n\n//# sourceURL=webpack:///./node_modules/on-headers/index.js?");

/***/ }),

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
eval("__webpack_require__.r(__webpack_exports__);\n/* config.js */\n// require and configure dotenv, will load vars in .env in PROCESS.ENV\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\n\nconst config = {\n  version: '1.0.0',\n  env: 'development',\n  port: '3000'\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (config);\n\n//# sourceURL=webpack:///./src/config/config.js?");

/***/ }),

/***/ "./src/config/express.js":
/*!*******************************!*\
  !*** ./src/config/express.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! morgan */ \"./node_modules/morgan/index.js\");\n/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(morgan__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config */ \"./src/config/config.js\");\n/* harmony import */ var _server_routes_index_route__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../server/routes/index.route */ \"./src/server/routes/index.route.js\");\n/* express.js */\n\n\n\n\n\n\n\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()();\n\n// parse body params and attache them to req.body\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_1___default.a.json());\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_1___default.a.urlencoded({ extended: true }));\n\n// enable CORS - Cross Origin Resource Sharing\napp.use(cors__WEBPACK_IMPORTED_MODULE_2___default()());\n\n// HTTP request logger middleware for node.js\napp.use(morgan__WEBPACK_IMPORTED_MODULE_3___default()('dev'));\n\n/* GET home page. */\napp.get('/', (req, res) => {\n  res.send(`server started on  port http://127.0.0.1:${_config__WEBPACK_IMPORTED_MODULE_4__[\"default\"].port} (${_config__WEBPACK_IMPORTED_MODULE_4__[\"default\"].env})`);\n});\n\napp.use('/api', _server_routes_index_route__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (app);\n\n//# sourceURL=webpack:///./src/config/express.js?");

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

/***/ "./src/server/routes/index.route.js":
/*!******************************************!*\
  !*** ./src/server/routes/index.route.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config/config */ \"./src/config/config.js\");\n/* index.route.js */\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();\n\n/* GET localhost:[port]/api page. */\nrouter.get('/', (req, res) => {\n  res.send(`此路徑是: localhost:${_config_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].port}/api`);\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./src/server/routes/index.route.js?");

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

/***/ "debug":
/*!************************!*\
  !*** external "debug" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"debug\");\n\n//# sourceURL=webpack:///external_%22debug%22?");

/***/ }),

/***/ "depd":
/*!***********************!*\
  !*** external "depd" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"depd\");\n\n//# sourceURL=webpack:///external_%22depd%22?");

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

/***/ "on-finished":
/*!******************************!*\
  !*** external "on-finished" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"on-finished\");\n\n//# sourceURL=webpack:///external_%22on-finished%22?");

/***/ }),

/***/ "safe-buffer":
/*!******************************!*\
  !*** external "safe-buffer" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"safe-buffer\");\n\n//# sourceURL=webpack:///external_%22safe-buffer%22?");

/***/ })

/******/ });