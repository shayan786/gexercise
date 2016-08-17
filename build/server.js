require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _toConsumableArray2 = __webpack_require__(3);
  
  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
  
  var _set = __webpack_require__(4);
  
  var _set2 = _interopRequireDefault(_set);
  
  var _asyncToGenerator2 = __webpack_require__(5);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  __webpack_require__(6);
  
  var _path = __webpack_require__(7);
  
  var _path2 = _interopRequireDefault(_path);
  
  var _express = __webpack_require__(8);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _cookieParser = __webpack_require__(9);
  
  var _cookieParser2 = _interopRequireDefault(_cookieParser);
  
  var _bodyParser = __webpack_require__(10);
  
  var _bodyParser2 = _interopRequireDefault(_bodyParser);
  
  var _expressJwt = __webpack_require__(11);
  
  var _expressJwt2 = _interopRequireDefault(_expressJwt);
  
  var _expressGraphql = __webpack_require__(12);
  
  var _expressGraphql2 = _interopRequireDefault(_expressGraphql);
  
  var _jsonwebtoken = __webpack_require__(13);
  
  var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
  
  var _react = __webpack_require__(14);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _server = __webpack_require__(15);
  
  var _server2 = _interopRequireDefault(_server);
  
  var _Html = __webpack_require__(16);
  
  var _Html2 = _interopRequireDefault(_Html);
  
  var _ErrorPage = __webpack_require__(18);
  
  var _ErrorPage2 = __webpack_require__(20);
  
  var _ErrorPage3 = _interopRequireDefault(_ErrorPage2);
  
  var _universalRouter = __webpack_require__(28);
  
  var _universalRouter2 = _interopRequireDefault(_universalRouter);
  
  var _prettyError = __webpack_require__(29);
  
  var _prettyError2 = _interopRequireDefault(_prettyError);
  
  var _passport = __webpack_require__(30);
  
  var _passport2 = _interopRequireDefault(_passport);
  
  var _models = __webpack_require__(33);
  
  var _models2 = _interopRequireDefault(_models);
  
  var _schema = __webpack_require__(40);
  
  var _schema2 = _interopRequireDefault(_schema);
  
  var _routes = __webpack_require__(54);
  
  var _routes2 = _interopRequireDefault(_routes);
  
  var _assets = __webpack_require__(105);
  
  var _assets2 = _interopRequireDefault(_assets);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var app = (0, _express2.default)();
  
  //
  // Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
  // user agent is not known.
  // -----------------------------------------------------------------------------
  // eslint-disable-line import/no-unresolved
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  global.navigator = global.navigator || {};
  global.navigator.userAgent = global.navigator.userAgent || 'all';
  
  //
  // Register Node.js middleware
  // -----------------------------------------------------------------------------
  app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
  app.use((0, _cookieParser2.default)());
  app.use(_bodyParser2.default.urlencoded({ extended: true }));
  app.use(_bodyParser2.default.json());
  
  //
  // Authentication
  // -----------------------------------------------------------------------------
  app.use((0, _expressJwt2.default)({
    secret: _config.auth.jwt.secret,
    credentialsRequired: false,
    getToken: function getToken(req) {
      return req.cookies.id_token;
    }
  }));
  app.use(_passport2.default.initialize());
  
  app.get('/login/facebook', _passport2.default.authenticate('facebook', { scope: ['email', 'user_location'], session: false }));
  app.get('/login/facebook/return', _passport2.default.authenticate('facebook', { failureRedirect: '/login', session: false }), function (req, res) {
    var expiresIn = 60 * 60 * 24 * 180; // 180 days
    var token = _jsonwebtoken2.default.sign(req.user, _config.auth.jwt.secret, { expiresIn: expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('/');
  });
  
  //
  // Register API middleware
  // -----------------------------------------------------------------------------
  app.use('/graphql', (0, _expressGraphql2.default)(function (req) {
    return {
      schema: _schema2.default,
      graphiql: true,
      rootValue: { request: req },
      pretty: ("production") !== 'production'
    };
  }));
  
  //
  // Register server-side rendering middleware
  // -----------------------------------------------------------------------------
  app.get('*', function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              return _context2.delegateYield(_regenerator2.default.mark(function _callee() {
                var css, statusCode, data, html;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        css = new _set2.default();
                        statusCode = 200;
                        data = { title: '', description: '', style: '', script: _assets2.default.main.js, children: '' };
                        _context.next = 5;
                        return _universalRouter2.default.resolve(_routes2.default, {
                          path: req.path,
                          query: req.query,
                          context: {
                            insertCss: function insertCss() {
                              for (var _len = arguments.length, styles = Array(_len), _key = 0; _key < _len; _key++) {
                                styles[_key] = arguments[_key];
                              }
  
                              styles.forEach(function (style) {
                                return css.add(style._getCss());
                              }); // eslint-disable-line no-underscore-dangle, max-len
                            },
                            setTitle: function setTitle(value) {
                              return data.title = value;
                            },
                            setMeta: function setMeta(key, value) {
                              return data[key] = value;
                            }
                          },
                          render: function render(component) {
                            var status = arguments.length <= 1 || arguments[1] === undefined ? 200 : arguments[1];
  
                            css = new _set2.default();
                            statusCode = status;
                            data.children = _server2.default.renderToString(component);
                            data.style = [].concat((0, _toConsumableArray3.default)(css)).join('');
                            return true;
                          }
                        });
  
                      case 5:
                        html = _server2.default.renderToStaticMarkup(_react2.default.createElement(_Html2.default, data));
  
  
                        res.status(statusCode);
                        res.send('<!doctype html>' + html);
  
                      case 8:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              })(), 't0', 2);
  
            case 2:
              _context2.next = 7;
              break;
  
            case 4:
              _context2.prev = 4;
              _context2.t1 = _context2['catch'](0);
  
              next(_context2.t1);
  
            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 4]]);
    }));
  
    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
  
  //
  // Error handling
  // -----------------------------------------------------------------------------
  var pe = new _prettyError2.default();
  pe.skipNodeFiles();
  pe.skipPackage('express');
  
  app.use(function (err, req, res, next) {
    // eslint-disable-line no-unused-vars
    console.log(pe.render(err)); // eslint-disable-line no-console
    var statusCode = err.status || 500;
    var html = _server2.default.renderToStaticMarkup((0, _jsx3.default)(_Html2.default, {
      title: 'Internal Server Error',
      description: err.message,
      style: _ErrorPage3.default._getCss()
    }, void 0, _server2.default.renderToString((0, _jsx3.default)(_ErrorPage.ErrorPage, {
      error: err
    }))));
    res.status(statusCode);
    res.send('<!doctype html>' + html);
  });
  
  //
  // Launch the server
  // -----------------------------------------------------------------------------
  /* eslint-disable no-console */
  _models2.default.sync().catch(function (err) {
    return console.error(err.stack);
  }).then(function () {
    app.listen(_config.port, function () {
      console.log('The server is running at http://localhost:' + _config.port + '/');
    });
  });
  /* eslint-enable no-console */

/***/ },
/* 1 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/jsx");

/***/ },
/* 2 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/regenerator");

/***/ },
/* 3 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/toConsumableArray");

/***/ },
/* 4 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/set");

/***/ },
/* 5 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ },
/* 6 */
/***/ function(module, exports) {

  module.exports = require("babel-polyfill");

/***/ },
/* 7 */
/***/ function(module, exports) {

  module.exports = require("path");

/***/ },
/* 8 */
/***/ function(module, exports) {

  module.exports = require("express");

/***/ },
/* 9 */
/***/ function(module, exports) {

  module.exports = require("cookie-parser");

/***/ },
/* 10 */
/***/ function(module, exports) {

  module.exports = require("body-parser");

/***/ },
/* 11 */
/***/ function(module, exports) {

  module.exports = require("express-jwt");

/***/ },
/* 12 */
/***/ function(module, exports) {

  module.exports = require("express-graphql");

/***/ },
/* 13 */
/***/ function(module, exports) {

  module.exports = require("jsonwebtoken");

/***/ },
/* 14 */
/***/ function(module, exports) {

  module.exports = require("react");

/***/ },
/* 15 */
/***/ function(module, exports) {

  module.exports = require("react-dom/server");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(14);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref2 = (0, _jsx3.default)('meta', {
    charSet: 'utf-8'
  });
  
  var _ref3 = (0, _jsx3.default)('meta', {
    httpEquiv: 'x-ua-compatible',
    content: 'ie=edge'
  });
  
  var _ref4 = (0, _jsx3.default)('meta', {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1'
  });
  
  var _ref5 = (0, _jsx3.default)('link', {
    rel: 'apple-touch-icon',
    href: 'apple-touch-icon.png'
  });
  
  var _ref6 = (0, _jsx3.default)('script', {
    src: 'https://www.google-analytics.com/analytics.js',
    async: true,
    defer: true
  });
  
  function Html(_ref) {
    var title = _ref.title;
    var description = _ref.description;
    var style = _ref.style;
    var script = _ref.script;
    var children = _ref.children;
  
    return (0, _jsx3.default)('html', {
      className: 'no-js',
      lang: ''
    }, void 0, (0, _jsx3.default)('head', {}, void 0, _ref2, _ref3, (0, _jsx3.default)('title', {}, void 0, title), (0, _jsx3.default)('meta', {
      name: 'description',
      content: description
    }), _ref4, _ref5, (0, _jsx3.default)('style', {
      id: 'css',
      dangerouslySetInnerHTML: { __html: style }
    })), (0, _jsx3.default)('body', {}, void 0, (0, _jsx3.default)('div', {
      id: 'app',
      dangerouslySetInnerHTML: { __html: children }
    }), script && (0, _jsx3.default)('script', {
      src: script
    }), _config.analytics.google.trackingId && (0, _jsx3.default)('script', {
      dangerouslySetInnerHTML: { __html: 'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' + ('ga(\'create\',\'' + _config.analytics.google.trackingId + '\',\'auto\');ga(\'send\',\'pageview\')') }
    }), _config.analytics.google.trackingId && _ref6));
  }
  
  exports.default = Html;

/***/ },
/* 17 */
/***/ function(module, exports) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  /* eslint-disable max-len */
  
  var port = exports.port = process.env.PORT || 3000;
  var host = exports.host = process.env.WEBSITE_HOSTNAME || 'localhost:' + port;
  
  var databaseUrl = exports.databaseUrl = process.env.DATABASE_URL || 'sqlite:database.sqlite';
  
  var analytics = exports.analytics = {
  
    // https://analytics.google.com/
    google: {
      trackingId: process.env.GOOGLE_TRACKING_ID }
  
  };
  
  var auth = exports.auth = {
  
    jwt: { secret: process.env.JWT_SECRET || 'React Starter Kit' },
  
    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID || '186244551745631',
      secret: process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc'
    },
  
    // https://cloud.google.com/console/project
    google: {
      id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd'
    },
  
    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
      secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ'
    }
  
  };

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  exports.ErrorPage = ErrorPage;
  
  var _react = __webpack_require__(14);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(19);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ErrorPage = __webpack_require__(20);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function ErrorPage(_ref, context) {
    var error = _ref.error;
  
    var title = 'Error';
    var content = 'Sorry, a critical error occurred on this page.';
    var errorMessage = null;
  
    if (error.status === 404) {
      title = 'Page Not Found';
      content = 'Sorry, the page you were trying to view does not exist.';
    } else if (false) {
      errorMessage = (0, _jsx3.default)('pre', {}, void 0, error.stack);
    }
  
    if (context.setTitle) {
      context.setTitle(title);
    }
  
    return (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('h1', {}, void 0, title), (0, _jsx3.default)('p', {}, void 0, content), errorMessage);
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  ErrorPage.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_ErrorPage2.default)(ErrorPage);

/***/ },
/* 19 */
/***/ function(module, exports) {

  module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(21);
      var insertCss = __webpack_require__(23);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(22)();
  // imports
  
  
  // module
  exports.push([module.id, "*{line-height:1.2;margin:0}html{color:#888;display:table;font-family:sans-serif;height:100%;text-align:center;width:100%}body{display:table-cell;vertical-align:middle;margin:2em auto}h1{color:#555;font-size:2em;font-weight:400}p{margin:0 auto;width:280px}pre{text-align:left;margin-top:32px;margin-top:2rem}@media only screen and (max-width:280px){body,p{width:95%}h1{font-size:1.5em;margin:0 0 .3em}}", ""]);
  
  // exports


/***/ },
/* 22 */
/***/ function(module, exports) {

  /*
  	MIT License http://www.opensource.org/licenses/mit-license.php
  	Author Tobias Koppers @sokra
  */
  // css base code, injected by the css-loader
  module.exports = function() {
  	var list = [];
  
  	// return the list of modules as css string
  	list.toString = function toString() {
  		var result = [];
  		for(var i = 0; i < this.length; i++) {
  			var item = this[i];
  			if(item[2]) {
  				result.push("@media " + item[2] + "{" + item[1] + "}");
  			} else {
  				result.push(item[1]);
  			}
  		}
  		return result.join("");
  	};
  
  	// import a list of modules into the list
  	list.i = function(modules, mediaQuery) {
  		if(typeof modules === "string")
  			modules = [[null, modules, ""]];
  		var alreadyImportedModules = {};
  		for(var i = 0; i < this.length; i++) {
  			var id = this[i][0];
  			if(typeof id === "number")
  				alreadyImportedModules[id] = true;
  		}
  		for(i = 0; i < modules.length; i++) {
  			var item = modules[i];
  			// skip already imported module
  			// this implementation is not 100% perfect for weird media query combinations
  			//  when a module is imported multiple times with different media queries.
  			//  I hope this will never occur (Hey this way we have smaller bundles)
  			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
  				if(mediaQuery && !item[2]) {
  					item[2] = mediaQuery;
  				} else if(mediaQuery) {
  					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
  				}
  				list.push(item);
  			}
  		}
  	};
  	return list;
  };


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _assign = __webpack_require__(24);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var _stringify = __webpack_require__(25);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _slicedToArray2 = __webpack_require__(26);
  
  var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
  
  var _getIterator2 = __webpack_require__(27);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Isomorphic CSS style loader for Webpack
   *
   * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var prefix = 's';
  var inserted = {};
  
  // Base64 encoding and decoding - The "Unicode Problem"
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
  function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  }
  
  /**
   * Remove style/link elements for specified node IDs
   * if they are no longer referenced by UI components.
   */
  function removeCss(ids) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;
  
    try {
      for (var _iterator = (0, _getIterator3.default)(ids), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var id = _step.value;
  
        if (--inserted[id] <= 0) {
          var elem = document.getElementById(prefix + id);
          if (elem) {
            elem.parentNode.removeChild(elem);
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  
  /**
   * Example:
   *   // Insert CSS styles object generated by `css-loader` into DOM
   *   var removeCss = insertCss([[1, 'body { color: red; }']]);
   *
   *   // Remove it from the DOM
   *   removeCss();
   */
  function insertCss(styles, options) {
    var _Object$assign = (0, _assign2.default)({
      replace: false,
      prepend: false
    }, options);
  
    var replace = _Object$assign.replace;
    var prepend = _Object$assign.prepend;
  
  
    var ids = [];
    for (var i = 0; i < styles.length; i++) {
      var _styles$i = (0, _slicedToArray3.default)(styles[i], 4);
  
      var moduleId = _styles$i[0];
      var css = _styles$i[1];
      var media = _styles$i[2];
      var sourceMap = _styles$i[3];
  
      var id = moduleId + '-' + i;
  
      ids.push(id);
  
      if (inserted[id]) {
        if (!replace) {
          inserted[id]++;
          continue;
        }
      }
  
      inserted[id] = 1;
  
      var elem = document.getElementById(prefix + id);
      var create = false;
  
      if (!elem) {
        create = true;
  
        elem = document.createElement('style');
        elem.setAttribute('type', 'text/css');
        elem.id = prefix + id;
  
        if (media) {
          elem.setAttribute('media', media);
        }
      }
  
      var cssText = css;
      if (sourceMap) {
        cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
        cssText += '\n/*# sourceURL=' + sourceMap.file + '*/';
      }
  
      if ('textContent' in elem) {
        elem.textContent = cssText;
      } else {
        elem.styleSheet.cssText = cssText;
      }
  
      if (create) {
        if (prepend) {
          document.head.insertBefore(elem, document.head.childNodes[0]);
        } else {
          document.head.appendChild(elem);
        }
      }
    }
  
    return removeCss.bind(null, ids);
  }
  
  module.exports = insertCss;

/***/ },
/* 24 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/assign");

/***/ },
/* 25 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/json/stringify");

/***/ },
/* 26 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ },
/* 27 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/get-iterator");

/***/ },
/* 28 */
/***/ function(module, exports) {

  module.exports = require("universal-router");

/***/ },
/* 29 */
/***/ function(module, exports) {

  module.exports = require("pretty-error");

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(5);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _passport = __webpack_require__(31);
  
  var _passport2 = _interopRequireDefault(_passport);
  
  var _passportFacebook = __webpack_require__(32);
  
  var _models = __webpack_require__(33);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Sign in with Facebook.
   */
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  /**
   * Passport.js reference implementation.
   * The database schema used in this sample is available at
   * https://github.com/membership/membership.db/tree/master/postgres
   */
  
  _passport2.default.use(new _passportFacebook.Strategy({
    clientID: _config.auth.facebook.id,
    clientSecret: _config.auth.facebook.secret,
    callbackURL: '/login/facebook/return',
    profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
    passReqToCallback: true
  }, function (req, accessToken, refreshToken, profile, done) {
    /* eslint-disable no-underscore-dangle */
    var loginName = 'facebook';
    var claimType = 'urn:facebook:access_token';
    var fooBar = function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var userLogin, user, users, _user;
  
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!req.user) {
                  _context.next = 14;
                  break;
                }
  
                _context.next = 3;
                return _models.UserLogin.findOne({
                  attributes: ['name', 'key'],
                  where: { name: loginName, key: profile.id }
                });
  
              case 3:
                userLogin = _context.sent;
  
                if (!userLogin) {
                  _context.next = 8;
                  break;
                }
  
                // There is already a Facebook account that belongs to you.
                // Sign in with that account or delete it, then link it with your current account.
                done();
                _context.next = 12;
                break;
  
              case 8:
                _context.next = 10;
                return _models.User.create({
                  id: req.user.id,
                  email: profile._json.email,
                  logins: [{ name: loginName, key: profile.id }],
                  claims: [{ type: claimType, value: profile.id }],
                  profile: {
                    displayName: profile.displayName,
                    gender: profile._json.gender,
                    picture: 'https://graph.facebook.com/' + profile.id + '/picture?type=large'
                  }
                }, {
                  include: [{ model: _models.UserLogin, as: 'logins' }, { model: _models.UserClaim, as: 'claims' }, { model: _models.UserProfile, as: 'profile' }]
                });
  
              case 10:
                user = _context.sent;
  
                done(null, {
                  id: user.id,
                  email: user.email
                });
  
              case 12:
                _context.next = 32;
                break;
  
              case 14:
                _context.next = 16;
                return _models.User.findAll({
                  attributes: ['id', 'email'],
                  where: { '$logins.name$': loginName, '$logins.key$': profile.id },
                  include: [{
                    attributes: ['name', 'key'],
                    model: _models.UserLogin,
                    as: 'logins',
                    required: true
                  }]
                });
  
              case 16:
                users = _context.sent;
  
                if (!users.length) {
                  _context.next = 21;
                  break;
                }
  
                done(null, users[0]);
                _context.next = 32;
                break;
  
              case 21:
                _context.next = 23;
                return _models.User.findOne({ where: { email: profile._json.email } });
  
              case 23:
                _user = _context.sent;
  
                if (!_user) {
                  _context.next = 28;
                  break;
                }
  
                // There is already an account using this email address. Sign in to
                // that account and link it with Facebook manually from Account Settings.
                done(null);
                _context.next = 32;
                break;
  
              case 28:
                _context.next = 30;
                return _models.User.create({
                  email: profile._json.email,
                  emailVerified: true,
                  logins: [{ name: loginName, key: profile.id }],
                  claims: [{ type: claimType, value: accessToken }],
                  profile: {
                    displayName: profile.displayName,
                    gender: profile._json.gender,
                    picture: 'https://graph.facebook.com/' + profile.id + '/picture?type=large'
                  }
                }, {
                  include: [{ model: _models.UserLogin, as: 'logins' }, { model: _models.UserClaim, as: 'claims' }, { model: _models.UserProfile, as: 'profile' }]
                });
  
              case 30:
                _user = _context.sent;
  
                done(null, {
                  id: _user.id,
                  email: _user.email
                });
  
              case 32:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));
  
      return function fooBar() {
        return _ref.apply(this, arguments);
      };
    }();
  
    fooBar().catch(done);
  }));
  
  exports.default = _passport2.default;

/***/ },
/* 31 */
/***/ function(module, exports) {

  module.exports = require("passport");

/***/ },
/* 32 */
/***/ function(module, exports) {

  module.exports = require("passport-facebook");

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UserProfile = exports.UserClaim = exports.UserLogin = exports.User = undefined;
  
  var _sequelize = __webpack_require__(34);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _User = __webpack_require__(36);
  
  var _User2 = _interopRequireDefault(_User);
  
  var _UserLogin = __webpack_require__(37);
  
  var _UserLogin2 = _interopRequireDefault(_UserLogin);
  
  var _UserClaim = __webpack_require__(38);
  
  var _UserClaim2 = _interopRequireDefault(_UserClaim);
  
  var _UserProfile = __webpack_require__(39);
  
  var _UserProfile2 = _interopRequireDefault(_UserProfile);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  _User2.default.hasMany(_UserLogin2.default, {
    foreignKey: 'userId',
    as: 'logins',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  _User2.default.hasMany(_UserClaim2.default, {
    foreignKey: 'userId',
    as: 'claims',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  });
  
  _User2.default.hasOne(_UserProfile2.default, {
    foreignKey: 'userId',
    as: 'profile',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  });
  
  function sync() {
    return _sequelize2.default.sync.apply(_sequelize2.default, arguments);
  }
  
  exports.default = { sync: sync };
  exports.User = _User2.default;
  exports.UserLogin = _UserLogin2.default;
  exports.UserClaim = _UserClaim2.default;
  exports.UserProfile = _UserProfile2.default;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _sequelize = __webpack_require__(35);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var sequelize = new _sequelize2.default(_config.databaseUrl, {
    define: {
      freezeTableName: true
    }
  });
  
  exports.default = sequelize;

/***/ },
/* 35 */
/***/ function(module, exports) {

  module.exports = require("sequelize");

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _sequelize = __webpack_require__(35);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _sequelize3 = __webpack_require__(34);
  
  var _sequelize4 = _interopRequireDefault(_sequelize3);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var User = _sequelize4.default.define('User', {
  
    id: {
      type: _sequelize2.default.UUID,
      defaultValue: _sequelize2.default.UUIDV1,
      primaryKey: true
    },
  
    email: {
      type: _sequelize2.default.STRING(255),
      validate: { isEmail: true }
    },
  
    emailConfirmed: {
      type: _sequelize2.default.BOOLEAN,
      defaultValue: false
    }
  
  }, {
  
    indexes: [{ fields: ['email'] }]
  
  });
  
  exports.default = User;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _sequelize = __webpack_require__(35);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _sequelize3 = __webpack_require__(34);
  
  var _sequelize4 = _interopRequireDefault(_sequelize3);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var UserLogin = _sequelize4.default.define('UserLogin', {
  
    name: {
      type: _sequelize2.default.STRING(50),
      primaryKey: true
    },
  
    key: {
      type: _sequelize2.default.STRING(100),
      primaryKey: true
    }
  
  });
  
  exports.default = UserLogin;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _sequelize = __webpack_require__(35);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _sequelize3 = __webpack_require__(34);
  
  var _sequelize4 = _interopRequireDefault(_sequelize3);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var UserClaim = _sequelize4.default.define('UserClaim', {
  
    type: {
      type: _sequelize2.default.STRING
    },
  
    value: {
      type: _sequelize2.default.STRING
    }
  
  });
  
  exports.default = UserClaim;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _sequelize = __webpack_require__(35);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _sequelize3 = __webpack_require__(34);
  
  var _sequelize4 = _interopRequireDefault(_sequelize3);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var UserProfile = _sequelize4.default.define('UserProfile', {
  
    userId: {
      type: _sequelize2.default.UUID,
      primaryKey: true
    },
  
    displayName: {
      type: _sequelize2.default.STRING(100)
    },
  
    picture: {
      type: _sequelize2.default.STRING(255)
    },
  
    gender: {
      type: _sequelize2.default.STRING(50)
    },
  
    location: {
      type: _sequelize2.default.STRING(100)
    },
  
    website: {
      type: _sequelize2.default.STRING(255)
    }
  
  });
  
  exports.default = UserProfile;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(41);
  
  var _me = __webpack_require__(42);
  
  var _me2 = _interopRequireDefault(_me);
  
  var _content = __webpack_require__(44);
  
  var _content2 = _interopRequireDefault(_content);
  
  var _news = __webpack_require__(50);
  
  var _news2 = _interopRequireDefault(_news);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var schema = new _graphql.GraphQLSchema({
    query: new _graphql.GraphQLObjectType({
      name: 'Query',
      fields: {
        me: _me2.default,
        content: _content2.default,
        news: _news2.default
      }
    })
  });
  
  exports.default = schema;

/***/ },
/* 41 */
/***/ function(module, exports) {

  module.exports = require("graphql");

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _UserType = __webpack_require__(43);
  
  var _UserType2 = _interopRequireDefault(_UserType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var me = {
    type: _UserType2.default,
    resolve: function resolve(_ref) {
      var request = _ref.request;
  
      return request.user && {
        id: request.user.id,
        email: request.user.email
      };
    }
  }; /**
      * React Starter Kit (https://www.reactstarterkit.com/)
      *
      * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
      *
      * This source code is licensed under the MIT license found in the
      * LICENSE.txt file in the root directory of this source tree.
      */
  
  exports.default = me;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(41);
  
  var UserType = new _graphql.GraphQLObjectType({
    name: 'User',
    fields: {
      id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
      email: { type: _graphql.GraphQLString }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = UserType;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getIterator2 = __webpack_require__(27);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(5);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _assign = __webpack_require__(24);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var resolveExtension = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(path, extension) {
      var fileNameBase, ext, fileName;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              fileNameBase = (0, _path.join)(CONTENT_DIR, '' + (path === '/' ? '/index' : path));
              ext = extension;
  
              if (!ext.startsWith('.')) {
                ext = '.' + extension;
              }
  
              fileName = fileNameBase + ext;
              _context.next = 6;
              return fileExists(fileName);
  
            case 6:
              if (_context.sent) {
                _context.next = 9;
                break;
              }
  
              fileNameBase = (0, _path.join)(CONTENT_DIR, path + '/index');
              fileName = fileNameBase + ext;
  
            case 9:
              _context.next = 11;
              return fileExists(fileName);
  
            case 11:
              if (_context.sent) {
                _context.next = 13;
                break;
              }
  
              return _context.abrupt('return', { success: false });
  
            case 13:
              return _context.abrupt('return', { success: true, fileName: fileName });
  
            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));
  
    return function resolveExtension(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
  
  var resolveFileName = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(path) {
      var extensions, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, extension, maybeFileName;
  
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              extensions = ['.md', '.html'];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context2.prev = 4;
              _iterator = (0, _getIterator3.default)(extensions);
  
            case 6:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context2.next = 16;
                break;
              }
  
              extension = _step.value;
              _context2.next = 10;
              return resolveExtension(path, extension);
  
            case 10:
              maybeFileName = _context2.sent;
  
              if (!maybeFileName.success) {
                _context2.next = 13;
                break;
              }
  
              return _context2.abrupt('return', { success: true, fileName: maybeFileName.fileName, extension: extension });
  
            case 13:
              _iteratorNormalCompletion = true;
              _context2.next = 6;
              break;
  
            case 16:
              _context2.next = 22;
              break;
  
            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2['catch'](4);
              _didIteratorError = true;
              _iteratorError = _context2.t0;
  
            case 22:
              _context2.prev = 22;
              _context2.prev = 23;
  
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
  
            case 25:
              _context2.prev = 25;
  
              if (!_didIteratorError) {
                _context2.next = 28;
                break;
              }
  
              throw _iteratorError;
  
            case 28:
              return _context2.finish(25);
  
            case 29:
              return _context2.finish(22);
  
            case 30:
              return _context2.abrupt('return', { success: false, fileName: null, extension: null });
  
            case 31:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[4, 18, 22, 30], [23,, 25, 29]]);
    }));
  
    return function resolveFileName(_x3) {
      return _ref2.apply(this, arguments);
    };
  }();
  
  var _fs = __webpack_require__(45);
  
  var _fs2 = _interopRequireDefault(_fs);
  
  var _path = __webpack_require__(7);
  
  var _bluebird = __webpack_require__(46);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _frontMatter = __webpack_require__(47);
  
  var _frontMatter2 = _interopRequireDefault(_frontMatter);
  
  var _markdownIt = __webpack_require__(48);
  
  var _markdownIt2 = _interopRequireDefault(_markdownIt);
  
  var _graphql = __webpack_require__(41);
  
  var _ContentType = __webpack_require__(49);
  
  var _ContentType2 = _interopRequireDefault(_ContentType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var md = new _markdownIt2.default();
  
  // A folder with Markdown/HTML content pages
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var CONTENT_DIR = (0, _path.join)(__dirname, './content');
  
  // Extract 'front matter' metadata and generate HTML
  var parseContent = function parseContent(path, fileContent, extension) {
    var fmContent = (0, _frontMatter2.default)(fileContent);
    var htmlContent = void 0;
    switch (extension) {
      case '.md':
        htmlContent = md.render(fmContent.body);
        break;
      case '.html':
        htmlContent = fmContent.body;
        break;
      default:
        return null;
    }
    return (0, _assign2.default)({ path: path, content: htmlContent }, fmContent.attributes);
  };
  
  var readFile = _bluebird2.default.promisify(_fs2.default.readFile);
  var fileExists = function fileExists(filename) {
    return new _bluebird2.default(function (resolve) {
      _fs2.default.exists(filename, resolve);
    });
  };
  
  var content = {
    type: _ContentType2.default,
    args: {
      path: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    },
    resolve: function resolve(_ref3, _ref4) {
      var _this = this;
  
      var request = _ref3.request;
      var path = _ref4.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var _ref5, success, fileName, extension, source;
  
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return resolveFileName(path);
  
              case 2:
                _ref5 = _context3.sent;
                success = _ref5.success;
                fileName = _ref5.fileName;
                extension = _ref5.extension;
  
                if (success) {
                  _context3.next = 8;
                  break;
                }
  
                return _context3.abrupt('return', null);
  
              case 8:
                _context3.next = 10;
                return readFile(fileName, { encoding: 'utf8' });
  
              case 10:
                source = _context3.sent;
                return _context3.abrupt('return', parseContent(path, source, extension));
  
              case 12:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this);
      }))();
    }
  };
  
  exports.default = content;

/***/ },
/* 45 */
/***/ function(module, exports) {

  module.exports = require("fs");

/***/ },
/* 46 */
/***/ function(module, exports) {

  module.exports = require("bluebird");

/***/ },
/* 47 */
/***/ function(module, exports) {

  module.exports = require("front-matter");

/***/ },
/* 48 */
/***/ function(module, exports) {

  module.exports = require("markdown-it");

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(41);
  
  var ContentType = new _graphql.GraphQLObjectType({
    name: 'Content',
    fields: {
      path: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      title: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      content: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      component: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = ContentType;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(41);
  
  var _fetch = __webpack_require__(51);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _NewsItemType = __webpack_require__(53);
  
  var _NewsItemType2 = _interopRequireDefault(_NewsItemType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // React.js News Feed (RSS)
  var url = 'http://ajax.googleapis.com/ajax/services/feed/load' + '?v=1.0&num=10&q=https://reactjsnews.com/feed.xml'; /**
                                                                                                                        * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                                                        *
                                                                                                                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                                                        *
                                                                                                                        * This source code is licensed under the MIT license found in the
                                                                                                                        * LICENSE.txt file in the root directory of this source tree.
                                                                                                                        */
  
  var items = [];
  var lastFetchTask = void 0;
  var lastFetchTime = new Date(1970, 0, 1);
  
  var news = {
    type: new _graphql.GraphQLList(_NewsItemType2.default),
    resolve: function resolve() {
      if (lastFetchTask) {
        return lastFetchTask;
      }
  
      if (new Date() - lastFetchTime > 1000 * 60 * 10 /* 10 mins */) {
          lastFetchTime = new Date();
          lastFetchTask = (0, _fetch2.default)(url).then(function (response) {
            return response.json();
          }).then(function (data) {
            if (data.responseStatus === 200) {
              items = data.responseData.feed.entries;
            }
  
            return items;
          }).finally(function () {
            lastFetchTask = null;
          });
  
          if (items.length) {
            return items;
          }
  
          return lastFetchTask;
        }
  
      return items;
    }
  };
  
  exports.default = news;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Response = exports.Headers = exports.Request = exports.default = undefined;
  
  var _bluebird = __webpack_require__(46);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _nodeFetch = __webpack_require__(52);
  
  var _nodeFetch2 = _interopRequireDefault(_nodeFetch);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  _nodeFetch2.default.Promise = _bluebird2.default; /**
                                                     * React Starter Kit (https://www.reactstarterkit.com/)
                                                     *
                                                     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                     *
                                                     * This source code is licensed under the MIT license found in the
                                                     * LICENSE.txt file in the root directory of this source tree.
                                                     */
  
  _nodeFetch.Response.Promise = _bluebird2.default;
  
  function localUrl(url) {
    if (url.startsWith('//')) {
      return 'https:' + url;
    }
  
    if (url.startsWith('http')) {
      return url;
    }
  
    return 'http://' + _config.host + url;
  }
  
  function localFetch(url, options) {
    return (0, _nodeFetch2.default)(localUrl(url), options);
  }
  
  exports.default = localFetch;
  exports.Request = _nodeFetch.Request;
  exports.Headers = _nodeFetch.Headers;
  exports.Response = _nodeFetch.Response;

/***/ },
/* 52 */
/***/ function(module, exports) {

  module.exports = require("node-fetch");

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(41);
  
  var NewsItemType = new _graphql.GraphQLObjectType({
    name: 'NewsItem',
    fields: {
      title: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      link: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      author: { type: _graphql.GraphQLString },
      publishedDate: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      contentSnippet: { type: _graphql.GraphQLString }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = NewsItemType;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _asyncToGenerator2 = __webpack_require__(5);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(14);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _App = __webpack_require__(55);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _home = __webpack_require__(64);
  
  var _home2 = _interopRequireDefault(_home);
  
  var _exp = __webpack_require__(100);
  
  var _exp2 = _interopRequireDefault(_exp);
  
  var _error = __webpack_require__(104);
  
  var _error2 = _interopRequireDefault(_error);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/',
  
    // keep in mind, routes are evaluated in order
    children: [_home2.default, _exp2.default,
  
    // place new routes before...
    _error2.default],
  
    action: function action(_ref) {
      var _this = this;
  
      var next = _ref.next;
      var render = _ref.render;
      var context = _ref.context;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var component;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return next();
  
              case 2:
                component = _context.sent;
  
                if (!(component === undefined)) {
                  _context.next = 5;
                  break;
                }
  
                return _context.abrupt('return', component);
  
              case 5:
                return _context.abrupt('return', render((0, _jsx3.default)(_App2.default, {
                  context: context
                }, void 0, component)));
  
              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  // Child routes

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(56);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(57);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(58);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(59);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(60);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(14);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _emptyFunction = __webpack_require__(61);
  
  var _emptyFunction2 = _interopRequireDefault(_emptyFunction);
  
  var _App = __webpack_require__(62);
  
  var _App2 = _interopRequireDefault(_App);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var App = function (_Component) {
    (0, _inherits3.default)(App, _Component);
  
    function App() {
      (0, _classCallCheck3.default)(this, App);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(App).apply(this, arguments));
    }
  
    (0, _createClass3.default)(App, [{
      key: 'getChildContext',
      value: function getChildContext() {
        var context = this.props.context;
        return {
          insertCss: context.insertCss || _emptyFunction2.default,
          setTitle: context.setTitle || _emptyFunction2.default,
          setMeta: context.setMeta || _emptyFunction2.default
        };
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        var insertCss = this.props.context.insertCss;
  
        this.removeCss = insertCss(_App2.default);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.removeCss();
      }
    }, {
      key: 'render',
      value: function render() {
        return !this.props.error ? (0, _jsx3.default)('div', {}, void 0, this.props.children) : this.props.children;
      }
    }]);
    return App;
  }(_react.Component);
  
  App.childContextTypes = {
    insertCss: _react.PropTypes.func.isRequired,
    setTitle: _react.PropTypes.func.isRequired,
    setMeta: _react.PropTypes.func.isRequired
  };
  exports.default = App;

/***/ },
/* 56 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ },
/* 57 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ },
/* 58 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/createClass");

/***/ },
/* 59 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ },
/* 60 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/inherits");

/***/ },
/* 61 */
/***/ function(module, exports) {

  module.exports = require("fbjs/lib/emptyFunction");

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(63);
      var insertCss = __webpack_require__(23);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(22)();
  // imports
  
  
  // module
  exports.push([module.id, "/*! normalize.css v4.1.1 | MIT License | github.com/necolas/normalize.css */html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block}audio:not([controls]){display:none;height:0}progress{vertical-align:baseline}[hidden],template{display:none}a{background-color:transparent;-webkit-text-decoration-skip:objects}a:active,a:hover{outline-width:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit;font-weight:bolder}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}svg:not(:root){overflow:hidden}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}button,input,select,textarea{font:inherit;margin:0}optgroup{font-weight:700}button,input{overflow:visible}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-input-placeholder{color:inherit;opacity:.54}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}\n\n/*! React Starter Kit | MIT License | https://www.reactstarterkit.com/ */html{color:#222;font-weight:100;font-size:1em;font-family:Segoe UI,HelveticaNeue-Light,sans-serif;line-height:1.375}a{color:#0074c2}::-moz-selection{background:#b3d4fc;text-shadow:none}::selection{background:#b3d4fc;text-shadow:none}hr{display:block;height:1px;border:0;border-top:1px solid #ccc;margin:1em 0;padding:0}audio,canvas,iframe,img,svg,video{vertical-align:middle}fieldset{border:0;margin:0;padding:0}textarea{resize:vertical}.browserupgrade{margin:.2em 0;background:#ccc;color:#000;padding:.2em 0}@media print{*,:after,:before{background:transparent!important;color:#000!important;box-shadow:none!important;text-shadow:none!important}a,a:visited{text-decoration:underline}a[href]:after{content:' (' attr(href) ')'}abbr[title]:after{content:' (' attr(title) ')'}a[href^='#']:after,a[href^='javascript:']:after{content:''}blockquote,pre{border:1px solid #999;page-break-inside:avoid}thead{display:table-header-group}img,tr{page-break-inside:avoid}img{max-width:100%!important}h2,h3,p{orphans:3;widows:3}h2,h3{page-break-after:avoid}}", ""]);
  
  // exports


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(14);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Home = __webpack_require__(65);
  
  var _Home2 = _interopRequireDefault(_Home);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)(_Home2.default, {});
  
  exports.default = {
  
    path: '/',
  
    action: function action() {
      return _ref;
    }
  };

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(56);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(57);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(58);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(59);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(60);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(14);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _bind = __webpack_require__(66);
  
  var _bind2 = _interopRequireDefault(_bind);
  
  var _withStyles = __webpack_require__(19);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Home = __webpack_require__(67);
  
  var _Home2 = _interopRequireDefault(_Home);
  
  var _Header = __webpack_require__(69);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _Footer = __webpack_require__(71);
  
  var _Footer2 = _interopRequireDefault(_Footer);
  
  var _Header3 = __webpack_require__(73);
  
  var _Header4 = _interopRequireDefault(_Header3);
  
  var _Grid = __webpack_require__(75);
  
  var _Grid2 = _interopRequireDefault(_Grid);
  
  var _Detail = __webpack_require__(81);
  
  var _Detail2 = _interopRequireDefault(_Detail);
  
  var _Footer3 = __webpack_require__(86);
  
  var _Footer4 = _interopRequireDefault(_Footer3);
  
  var _images = __webpack_require__(91);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Shy - Google Exercise';
  
  var _ref = (0, _jsx3.default)(_Footer4.default, {});
  
  var Home = function (_Component) {
    (0, _inherits3.default)(Home, _Component);
  
    function Home(props) {
      (0, _classCallCheck3.default)(this, Home);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Home).call(this, props));
  
      _this.state = {
        showDetail: false,
        showHeaderAndFooter: true,
        showDetailImage: null
      };
      return _this;
    }
  
    (0, _createClass3.default)(Home, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.setTitle(title);
      }
    }, {
      key: 'showImage',
      value: function showImage(event, image) {
        var _this2 = this;
  
        var TRANSITION_DELAY = 300;
        var imageEl = event.target;
        var imageContainerEl = event.target.parentElement;
  
        imageContainerEl.style.transformOrigin = getTransformOrigin(imageContainerEl);
  
        if (!imageContainerEl.classList.toString().includes(_Home2.default.enlargeContainer)) imageContainerEl.classList.add(_Home2.default.enlargeContainer);
  
        setTimeout(function () {
          _this2.setState({
            showDetail: true,
            showDetailImage: image
          });
        }, TRANSITION_DELAY);
  
        function getTransformOrigin(el) {
          var rect = el.getBoundingClientRect();
          var WINDOW_WIDTH = window.innerWidth;
          var WINDOW_HEIGHT = window.innerHeight;
  
          // 0% 0% (top left)
          if (rect.left < WINDOW_WIDTH / 2 && rect.top < WINDOW_HEIGHT / 4) return '0% 0%';
          if (rect.left < WINDOW_WIDTH / 2 && rect.top > WINDOW_HEIGHT / 4 && rect.top < WINDOW_HEIGHT / 2) return '0% 25%';
          if (rect.left < WINDOW_WIDTH / 2 && rect.top > WINDOW_HEIGHT / 2 && rect.top < WINDOW_HEIGHT / 1.4) return '0% 75%';
          if (rect.left < WINDOW_WIDTH / 2 && rect.top > WINDOW_HEIGHT / 1.4) return '0% 100%';
          if (rect.left > WINDOW_WIDTH / 2 && rect.top < WINDOW_HEIGHT / 4) return '100% 0%';
          if (rect.left > WINDOW_WIDTH / 2 && rect.top > WINDOW_HEIGHT / 4 && rect.top < WINDOW_HEIGHT / 2) return '100% 25%';
          if (rect.left > WINDOW_WIDTH / 2 && rect.top > WINDOW_HEIGHT / 2 && rect.top < WINDOW_HEIGHT / 1.4) return '100% 75%';
          if (rect.left > WINDOW_WIDTH / 2 && rect.top > WINDOW_HEIGHT / 1.4) return '100% 100%';
        }
      }
    }, {
      key: 'handleDismiss',
      value: function handleDismiss(event) {
        event.preventDefault();
  
        this.setState({
          showDetail: false,
          showDetailImage: null
        });
      }
    }, {
      key: 'toggleHeaderAndFooter',
      value: function toggleHeaderAndFooter() {
        var _this3 = this;
  
        var _state = this.state;
        var showHeaderAndFooter = _state.showHeaderAndFooter;
        var showDetail = _state.showDetail;
  
  
        if (showHeaderAndFooter && showDetail) {
          var footer = document.getElementsByClassName(_Footer2.default.container)[0];
          var header = document.getElementsByClassName(_Header2.default.root)[0];
  
          if (!header.classList.toString().includes(_Home2.default.hide)) header.classList.add(_Home2.default.hide);
  
          if (!footer.classList.toString().includes(_Home2.default.hide)) footer.classList.add(_Home2.default.hide);
  
          setTimeout(function () {
            _this3.setState({
              showHeaderAndFooter: !showHeaderAndFooter
            });
          }, 400);
        } else {
          this.setState({
            showHeaderAndFooter: !showHeaderAndFooter
          });
        }
      }
    }, {
      key: 'onSwipeRight',
      value: function onSwipeRight(currentImageIndex) {
        if (currentImageIndex !== 0) {
          this.setState({
            showDetailImage: _images.images[currentImageIndex - 1]
          });
        }
      }
    }, {
      key: 'onSwipeLeft',
      value: function onSwipeLeft(currentImageIndex) {
        if (currentImageIndex !== _images.images.length - 1) {
          this.setState({
            showDetailImage: _images.images[currentImageIndex + 1]
          });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _state2 = this.state;
        var showDetail = _state2.showDetail;
        var showDetailImage = _state2.showDetailImage;
        var showHeaderAndFooter = _state2.showHeaderAndFooter;
  
        var cx = _bind2.default.bind(_Home2.default);
  
        return (0, _jsx3.default)('div', {}, void 0, showHeaderAndFooter && (0, _jsx3.default)(_Header4.default, {
          title: showDetail ? showDetailImage.title : "Image Gallery",
          isDismissable: showDetail,
          handleDismiss: this.handleDismiss.bind(this)
        }), (0, _jsx3.default)('section', {
          className: cx({ root: true, blackBg: showDetail })
        }, void 0, (0, _jsx3.default)('div', {
          className: cx({ container: true, blackBg: showDetail })
        }, void 0, showDetail && (0, _jsx3.default)(_Detail2.default, {
          image: showDetailImage,
          onSwipeRight: this.onSwipeRight.bind(this),
          onSwipeLeft: this.onSwipeLeft.bind(this),
          onClick: this.toggleHeaderAndFooter.bind(this)
        }), !showDetail && (0, _jsx3.default)(_Grid2.default, {
          images: _images.images,
          showImage: this.showImage.bind(this)
        }), showDetail && showHeaderAndFooter && _ref)));
      }
    }]);
    return Home;
  }(_react.Component);
  
  Home.contextTypes = {
    setTitle: _react.PropTypes.func.isRequired
  };
  exports.default = (0, _withStyles2.default)(_Home2.default)(Home);

/***/ },
/* 66 */
/***/ function(module, exports) {

  module.exports = require("classnames/bind");

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(68);
      var insertCss = __webpack_require__(23);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(22)();
  // imports
  
  
  // module
  exports.push([module.id, "._2IMq{padding-left:20px;padding-right:20px}._2Yej{margin:0 auto;padding-top:10px;max-width:1000px}._3w5r{background:#000}._3w5r,.oTyG{padding:0}._3Ob1{list-style-type:none;padding-bottom:6px}._1yWV{font-size:1.125em}._1yWV,._21LX{display:block}._3yif{z-index:99;-webkit-transform:scale(2.1);transform:scale(2.1);-webkit-transition:all .3s ease-in;transition:all .3s ease-in}._12Gb{opacity:.01}._3EdY,._12Gb{-webkit-transition:all .4s ease-in-out;transition:all .4s ease-in-out}._3EdY{opacity:1}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_2IMq",
  	"container": "_2Yej",
  	"blackBg": "_3w5r",
  	"news": "oTyG",
  	"newsItem": "_3Ob1",
  	"newsTitle": "_1yWV",
  	"newsDesc": "_21LX",
  	"enlargeContainer": "_3yif",
  	"hide": "_12Gb",
  	"show": "_3EdY"
  };

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(70);
      var insertCss = __webpack_require__(23);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(22)();
  // imports
  
  
  // module
  exports.push([module.id, "._3Gi4{background:#f5f5f5;color:#a1a1a1;border-bottom:2px solid #f6f6f6}._3RMT{background:#333;color:#ebebeb;border-bottom:none;position:absolute;width:100%}._1rGb{margin:0 auto;padding:1.5em 0;max-width:1000px}._3XuF{margin:0;font-weight:400;text-align:center;line-height:1em;font-size:1.441em}._8SDB{position:absolute;top:25px;right:25px;width:16px;height:16px}._8SDB img{width:100%;height:100%}@media screen and (orientation:landscape){._3Gi4{z-index:1}}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_3Gi4",
  	"blackBg": "_3RMT",
  	"container": "_1rGb",
  	"title": "_3XuF",
  	"dismiss": "_8SDB"
  };

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(72);
      var insertCss = __webpack_require__(23);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(22)();
  // imports
  
  
  // module
  exports.push([module.id, "._2SmS{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row;-ms-flex-pack:distribute;justify-content:space-around;-webkit-box-align:center;-ms-flex-align:center;align-items:center;position:absolute;bottom:0;left:0;width:100%;height:65px;background:#333}._13Wn{width:25px;height:25px}", ""]);
  
  // exports
  exports.locals = {
  	"container": "_2SmS",
  	"icon": "_13Wn"
  };

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(56);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(57);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(58);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(59);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(60);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(14);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _bind = __webpack_require__(66);
  
  var _bind2 = _interopRequireDefault(_bind);
  
  var _withStyles = __webpack_require__(19);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Header = __webpack_require__(69);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _dismiss = __webpack_require__(74);
  
  var _dismiss2 = _interopRequireDefault(_dismiss);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)('img', {
    src: _dismiss2.default,
    alt: 'Close',
    title: 'Close'
  });
  
  var Header = function (_Component) {
    (0, _inherits3.default)(Header, _Component);
  
    function Header() {
      (0, _classCallCheck3.default)(this, Header);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Header).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Header, [{
      key: 'render',
      value: function render() {
        var _props = this.props;
        var title = _props.title;
        var isDismissable = _props.isDismissable;
        var handleDismiss = _props.handleDismiss;
  
        var cx = _bind2.default.bind(_Header2.default);
  
        return (0, _jsx3.default)('div', {
          className: cx({ root: true, blackBg: isDismissable })
        }, void 0, (0, _jsx3.default)('div', {
          className: _Header2.default.container
        }, void 0, (0, _jsx3.default)('h1', {
          className: _Header2.default.title
        }, void 0, title), isDismissable && (0, _jsx3.default)('div', {
          className: _Header2.default.dismiss,
          onClick: function onClick(e) {
            return handleDismiss(e);
          }
        }, void 0, _ref)));
      }
    }]);
    return Header;
  }(_react.Component);
  
  exports.default = (0, _withStyles2.default)(_Header2.default)(Header);

/***/ },
/* 74 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkZGQkRGMDJDNTlEMDExRTY4NTc3OEY0RDRBNzUyNUZEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkZGQkRGMDJENTlEMDExRTY4NTc3OEY0RDRBNzUyNUZEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkZCREYwMkE1OUQwMTFFNjg1Nzc4RjRENEE3NTI1RkQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkZCREYwMkI1OUQwMTFFNjg1Nzc4RjRENEE3NTI1RkQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4/PIv8AAAERklEQVR42uzdW27bMBSEYTnoRtruz0lX0iTdX5F3L8KVAKlQHF2oC8mZOUNAyVsM+/+gyDZ4dLndbk3iurTH7/Z4bo97//tP44Wwru3x2jd6a49ffaP1qIkAxvGHZQR48YeVjCAFwFR8I8CNvwnBGoCl+EaAGz8ZwRKAlPhGgBs/CcEcgC3xjQA3/iqCKQB74hsBbvxFBI8AjsQ3Atz4swjGAM6IbwS48ScRDADOjG8EuPG/IOgA5IhvBLjxPyHoAHTxXzI+iXv/99/dEyb+sF6f2h8fTeLnxjvXpX8iVzeFit81/xiuAZ77fwMXnwnCxO+uAd7G7wKMIFj8qc8BjCBQ/CkARhAo/hwAIwgSfwmAEQSIvwbACMTjpwAwAuH4qQCMQDT+FgBGIBh/KwAjEIu/B4ARCMXfC8AIROIfAWAEAvGPAjAC8vhnADAC4vhnATAC0vhnAjACwvhnA4iOgC5+DgBREVDGzwUgGgLa+DkBREFAHT83AHUE9PFLAFBFIBG/FAA1BDLxSwJQQSAVvzQAdgRy8WsAYEUgGb8WADYEsvFrAmBBIB2/NgB0BPLxEQCgIggRHwUAGoIw8ZEAoCAIFR8NQG0E4eIjAqiFIGR8VAClETRR4yMDKImgiRofHUApBE3U+AwAmBHAx2cBwIiAZiMLCwAmBFS7mJgAMCCg28fIBgAZAeUmVkYAiAhot7GzAkBCQD3DgBkAAgL6KSbsAGoikBhhowCgBgKZIVYqAEoikJpg9tTorLvoY/kMkLBKfJ//CEDibmgKAErHl0LADqBWfBkEzABqx5dAwAoAJT49AkYAaPGpEbABQI1Pi4AJAHp8SgQsAFji0yFgAMAWnwoBOgDW+DQIkAGU2q7VNIEHXKMCKLlXr1thp5x/Cx5/vGkjJ4JL/5waNARoZ4Cau3RDjrpHAoCwRTscAhQASPvzQyFAAIA4nCEMgtoAkCdzhEBQEwDDWBZ5BLUAMM3kkUZQAwDjQCZZBKUBME/jkkRQEoDCKDY5BKUAKM3hk0JQAoDiEEYZBLkBKE/glECQE0CE8av0CHIBiDR7lxpBDgARBy/TIjgbQNip26wIzgQQOT4tgrMAOD4pgjMAOD4xgqMAHJ8cwREAji+AYC8AxxdBsAeA4wsh2ArA8cUQbAHg+IIIUgE4viiCFACOL4xgDYDjiyNYAuD4ARDMAXD8IAimADh+IASPABw/GIIxAMcPiGAA4PhBEXQAHD8wgu6WMT8cH2699a9ZzlvTdM1/dmeAYYLV1fFDnQm6a4CX4RogBwLHx0Xw3l8D3MfvAs5EIHVrNTEE/+NPfQ5wBgLHx0XwKf4UgKMIHB8XwZf4cwD2InB8XAST8ZcAbEXg+LgIZuOvAUhF4Pi4CBbjpwBYQ+D4uAhW46cCmEPg+LgIkuJvAfCIwPFxESTH3wpgQNA90F/Hh0Twvdn4HYLK7eO9dq5/AgwA/dv35TKt56YAAAAASUVORK5CYII="

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(56);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(57);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(58);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(59);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(60);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(14);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(19);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Grid = __webpack_require__(76);
  
  var _Grid2 = _interopRequireDefault(_Grid);
  
  var _GridImage = __webpack_require__(78);
  
  var _GridImage2 = _interopRequireDefault(_GridImage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Grid = function (_Component) {
    (0, _inherits3.default)(Grid, _Component);
  
    function Grid() {
      (0, _classCallCheck3.default)(this, Grid);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Grid).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Grid, [{
      key: 'renderImages',
      value: function renderImages(images) {
        if (images.length === 0 || !images) return null;
  
        var showImage = this.props.showImage;
  
  
        return images.map(function (i, key) {
          return (0, _jsx3.default)(_GridImage2.default, {
            image: i,
            onClick: showImage
          }, key);
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var images = this.props.images;
  
  
        return (0, _jsx3.default)('div', {
          className: _Grid2.default.container
        }, void 0, this.renderImages(images));
      }
    }]);
    return Grid;
  }(_react.Component);
  
  exports.default = (0, _withStyles2.default)(_Grid2.default)(Grid);

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(77);
      var insertCss = __webpack_require__(23);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(22)();
  // imports
  
  
  // module
  exports.push([module.id, "._28mj{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-flow:row wrap;flex-flow:row wrap;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}", ""]);
  
  // exports
  exports.locals = {
  	"container": "_28mj"
  };

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(56);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(57);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(58);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(59);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(60);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(14);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(19);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _gridImage = __webpack_require__(79);
  
  var _gridImage2 = _interopRequireDefault(_gridImage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var GridImage = function (_Component) {
    (0, _inherits3.default)(GridImage, _Component);
  
    function GridImage() {
      (0, _classCallCheck3.default)(this, GridImage);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GridImage).apply(this, arguments));
    }
  
    (0, _createClass3.default)(GridImage, [{
      key: 'render',
      value: function render() {
        var _props = this.props;
        var image = _props.image;
        var _onClick = _props.onClick;
  
  
        return (0, _jsx3.default)('div', {
          className: _gridImage2.default.imageContainer,
          onClick: function onClick(e) {
            return _onClick(e, image);
          }
        }, void 0, (0, _jsx3.default)('img', {
          src: image.url,
          className: _gridImage2.default.image
        }));
      }
    }]);
    return GridImage;
  }(_react.Component);
  
  exports.default = (0, _withStyles2.default)(_gridImage2.default)(GridImage);

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(80);
      var insertCss = __webpack_require__(23);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(22)();
  // imports
  
  
  // module
  exports.push([module.id, ".GK13{width:150px;height:130px;margin:5px;overflow:hidden;position:relative;cursor:pointer}._3XcM{position:absolute;left:50%;top:50%;height:100%;width:auto;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}", ""]);
  
  // exports
  exports.locals = {
  	"imageContainer": "GK13",
  	"image": "_3XcM"
  };

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(56);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(57);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(58);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(59);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(60);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(14);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(19);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Detail = __webpack_require__(82);
  
  var _Detail2 = _interopRequireDefault(_Detail);
  
  var _reactSwipeable = __webpack_require__(84);
  
  var _reactSwipeable2 = _interopRequireDefault(_reactSwipeable);
  
  var _reactAddonsCssTransitionGroup = __webpack_require__(85);
  
  var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Detail = function (_Component) {
    (0, _inherits3.default)(Detail, _Component);
  
    function Detail() {
      (0, _classCallCheck3.default)(this, Detail);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Detail).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Detail, [{
      key: 'render',
      value: function render() {
        var _props = this.props;
        var image = _props.image;
        var onSwipeRight = _props.onSwipeRight;
        var onSwipeLeft = _props.onSwipeLeft;
        var _onClick = _props.onClick;
  
  
        return (0, _jsx3.default)(_reactAddonsCssTransitionGroup2.default, {
          transitionName: {
            enter: _Detail2.default.enter,
            enterActive: _Detail2.default.enterActive,
            leave: _Detail2.default.leave,
            leaveActive: _Detail2.default.leaveActive,
            appear: _Detail2.default.appear,
            appearActive: _Detail2.default.appearActive
          },
          transitionAppear: true,
          transitionAppearTimeout: 200,
          transitionEnterTimeout: 200,
          transitionLeaveTimeout: 200
        }, void 0, (0, _jsx3.default)(_reactSwipeable2.default, {
          onSwipedRight: function onSwipedRight() {
            return onSwipeRight(image.index);
          },
          onSwipedLeft: function onSwipedLeft() {
            return onSwipeLeft(image.index);
          }
        }, void 0, (0, _jsx3.default)('div', {
          className: _Detail2.default.container,
          onClick: function onClick() {
            return _onClick();
          }
        }, void 0, (0, _jsx3.default)('img', {
          src: image.url,
          className: _Detail2.default.image
        }))));
      }
    }]);
    return Detail;
  }(_react.Component);
  
  exports.default = (0, _withStyles2.default)(_Detail2.default)(Detail);

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(83);
      var insertCss = __webpack_require__(23);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(22)();
  // imports
  
  
  // module
  exports.push([module.id, "._3Asz{width:100%;height:100vh;background:#000;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-flow:column nowrap;flex-flow:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.dohS{width:100%;height:auto}._3TWT{opacity:.01}._2hEH{-webkit-transition:opacity .2s ease-in;transition:opacity .2s ease-in}._1dj9,._2hEH{opacity:1}._2qEA{-webkit-transition:opacity .2s ease-in;transition:opacity .2s ease-in}._2qEA,._979G{opacity:.01}._3fTQ{opacity:1;-webkit-transition:opacity .2s ease-in;transition:opacity .2s ease-in}@media screen and (orientation:landscape){.dohS{top:0;width:auto;height:100%}._3Asz{text-align:center}}", ""]);
  
  // exports
  exports.locals = {
  	"container": "_3Asz",
  	"image": "dohS",
  	"enter": "_3TWT",
  	"enterActive": "_2hEH",
  	"leave": "_1dj9",
  	"leaveActive": "_2qEA",
  	"appear": "_979G",
  	"appearActive": "_3fTQ"
  };

/***/ },
/* 84 */
/***/ function(module, exports) {

  module.exports = require("react-swipeable");

/***/ },
/* 85 */
/***/ function(module, exports) {

  module.exports = require("react-addons-css-transition-group");

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(14);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(19);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Footer = __webpack_require__(71);
  
  var _Footer2 = _interopRequireDefault(_Footer);
  
  var _share = __webpack_require__(87);
  
  var _share2 = _interopRequireDefault(_share);
  
  var _add = __webpack_require__(88);
  
  var _add2 = _interopRequireDefault(_add);
  
  var _like = __webpack_require__(89);
  
  var _like2 = _interopRequireDefault(_like);
  
  var _comment = __webpack_require__(90);
  
  var _comment2 = _interopRequireDefault(_comment);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Footer() {
    return (0, _jsx3.default)('div', {
      className: _Footer2.default.container
    }, void 0, (0, _jsx3.default)('img', {
      className: _Footer2.default.icon,
      src: _like2.default,
      alt: 'Like',
      title: 'Like',
      onClick: function onClick() {
        return alert('Liked!');
      }
    }), (0, _jsx3.default)('img', {
      className: _Footer2.default.icon,
      src: _comment2.default,
      alt: 'Comment',
      title: 'Comment',
      onClick: function onClick() {
        return alert('Comment!');
      }
    }), (0, _jsx3.default)('img', {
      className: _Footer2.default.icon,
      src: _add2.default,
      alt: 'Add',
      title: 'Add',
      onClick: function onClick() {
        return alert('Add!');
      }
    }), (0, _jsx3.default)('img', {
      className: _Footer2.default.icon,
      src: _share2.default,
      alt: 'Share',
      title: 'Share',
      onClick: function onClick() {
        return alert('Share!');
      }
    }));
  }
  
  exports.default = (0, _withStyles2.default)(_Footer2.default)(Footer);

/***/ },
/* 87 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkYwNjU1MDY5NUFCOTExRTZCNDhDRDNDMEVEMTc3QjZGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkYwNjU1MDZBNUFCOTExRTZCNDhDRDNDMEVEMTc3QjZGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjA2NTUwNjc1QUI5MTFFNkI0OENEM0MwRUQxNzdCNkYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjA2NTUwNjg1QUI5MTFFNkI0OENEM0MwRUQxNzdCNkYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5d+zo4AAAHLklEQVR42uydaWxUVRTHb8eK4opGExKiBpfEJX5yAeMGGBXiQnFhc6FQBEWwCJXWggutCyDashmIBhusBTUxhkS/qJFE45Jo/KCiRhMlatRYcQ2uMJ6Td6aO03kzb+a9d5e5/3/yzystM/Pmnt879767vbpsNqsgf5VBEQAACABAAAACABAAgAAABAAgb1Tf39+PUkAGgKrQHeQhAMBfXUl+xnUIAEA8TSQ/7TIEACC+GlyGAAAkB8E2FyEAAMlpEnmraxAAgGR1FbnPJQgAQPK6WiDYHwD4DcFWFyAAAJ5ngnrEKVVdI8dp5H+QAfyFoM/Wiw0ZQI+uzcsEe5EB/IWAG4b7AQC/IeizCQIAoF+TbYIAAJiDoNcGCACAOU21AQIAYB6CJ01CAADMi28Nt5iCAADYoemmIAAAdkHQoxsCAGCXrtcNAQCwE4IndEEAAOzUDeTNOiAAAPbqRh0QAAD7IXg8TQgAgP1qTBMCzAeoTAeQTxaP0AwBb+d2k0p4PgEACNcR5LPIZ4pPJ49U5rptZ8pxNnkfAEhex5LHkMeSzyOfaOE5Jg6BzwAcQr6IPJ58Cfl4R857plQHs+UIACrQMBWs3uEp2+PIBzr6PWblZYIsACitoSpYxj2FPEEacrWgWXkNwywAGCxutM1RQdfqsBr9jk1yrBqCWgOAvw/Pw7+NfI4n1VqTBH9ONRDUCgCHSkEsJB/nYYM21xaYWykErgPALflm8mK5b/dZuWrg5kogcBWAoZLmW8hHoQtjQLlq4JaoELgGQJ0KJlKuUEHHDTRYc+UYCQKXABhF7iaPRowjQcDBn1cOAhdGAw8jryO/geBXJG4LbJCs6WwGmChfYgTiWZVy1cD8sEyQsfiq59kwzyP4sTVPMmidKxngXBWslhmJ2CWmW+W4oDAT2JQBmNBW8g4EPzUI1hZmAlsyAPfV90idD6WnXFugOZcJbADgFPJ2ZecEjFpUrhrgbvOs6SqAJ2K8ieBrF/eidnF1YDID8ODNRoVpaabUbLIRyE/beAzBN64vdAeAW6ArBQDIrBaRu+s1B78rl3og48Hv0l0FPILgW6HFueDrBGCV3HZAZtUiF6LSCUAb6nwrxDF4uPCXaQPA69wfQNkb1xLy6mJ/SBMAXnixWZUZj4a0BP+hsD+mBcBJ5Odwn29craWCnxYAPDv3RfLhKH+japPGt9IJAKd7HstH37754K+M8h+TBqCdfBnK36jaowY/aQB4Xf1ylL/x4D9YyQuSAuBIZXjTY0gtrTT4SQKwSWHypkktU1X2tyQBwAz13+PRIDPBv7/aF8cFYLgq6FuGtOruOMFPAoD1Uv9DZoLfGfdN4gDQoIK9diD9uieJ4McB4CDyGsTBiO4ldyT1ZtX21fMtR60uz/5R/Jt4j/z+D/Lv8vPfKhjsGm4g+In2tVQDwAkqmFXimv4kf0reRf5azD9/JT//II66AeNrmgFYrlLoaKsGAO5ssHmrNX5K9/vkD8kfkD8i7yR/rix7bm8F6pCrX5kGYLSF9/zfqmBxyVtyfCcvVdeCOqXRp2wAgIcXTU/w+Jn8svgVSeu1qk653VM2AHAx+XxDBcH1NE8w2S51718etPbvSzv4lQLQobkAdqvgIcvbJLXvU/6Ie/fu0vFBUQEYr/Tsz5OV1P4o+QW53fJNPKizTNeHRQWgLeXz+FUFT87kruWPlb/iO6ylOj8wCgB85V+YYt3O05X5OXm/KL/FwW/X/aH1hq7+XdLI2eJJg66cVpgIfhQAeK+eKxL8vO+kgbMJgR8Qz9+709SHlwOAtxhLYtII986tkzuJnxDzAa3S0L6qGoCDVbANeVztUMEOVTsR7/+JF2y0mj6JUlf3ZBXvSRuc7vkxLWMR/KLBX2LDiZTKAE0x3pc7cHg3qt2I9SCttiX4pQA4VQU7dlYqHkfnnaqfRZyLipdnW7VUPgyAxire63XydPKXiHNR8eTZFttOKhPyu6kVvg/v6D0OwQ8Vb8li5SSaYhmAR/yOifh6nibFW5L3IMYlg7/I1pMrBsB1EV/LV/sk8ruIcai6bQ5+MQB4bV9DhNe9p4JVwN8gxiWDf7vtJ1nYBriAfHSZ17ykgsEhBD9ca2y/8sMAKLfQg2flXK6C4VsoPPh85WddBKDUwA8v/+beQQzihGutS8EvBIAfthy22KNXBc+t34sYh4oHuxa6FPxCAMK2duE5eY0IftngN7sW/EIALi3yd56XNwPBL6kNrgY/HwBe7Fn4uPW3UedHCv4CV4Of3w/At3/5y70+kwbhHsQ4VDyr6SmXg58PwJi8331PniBHKFy9tfAlMnkZQEm6nyIZAPJAGan/z5B/c2PmVRSLXwCcTR6igrn5G1Ek/gEwSgWDO/NRHH4CcBp5Glr8/gLAqf8TFIW/AKDR57HqstksSsHzDAABAAgAQAAAAgAQAIAAAAQAIAAAeaB/BRgA9zAvUNiT4Q4AAAAASUVORK5CYII="

/***/ },
/* 88 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFDNzE4OTY4NUFCQTExRTZCNDhDRDNDMEVEMTc3QjZGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFDNzE4OTY5NUFCQTExRTZCNDhDRDNDMEVEMTc3QjZGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUM3MTg5NjY1QUJBMTFFNkI0OENEM0MwRUQxNzdCNkYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUM3MTg5Njc1QUJBMTFFNkI0OENEM0MwRUQxNzdCNkYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Pe3D2AAABO0lEQVR42uzbMQ6CQBBAUTA03MPKBCrvfwJpMLHyBnMASxwPsZswvpdMPWHzydIwRcRQyJ6zNN7xzFmrHNhl4K8JQAAIAAEgAASAABAAAkAACAABIAAEgAAQAAJAAAgAASAABIAAEAACQAAIAAEgAASAABAAAkAACAABIAAEgAAQAAJAAAgAASAABIAAEAACoLMp51Hoea6ddpQ5szEiDu+BKwABIAAEgAAQAAJAAAgAASAABIAAEAACQAAIAAEgAASAABAAAuCUfj+GbIWe55YzN97xyXlVCuBeKIA9Z2m8413pzFwBvgEQAAJAAAgAASAABIAAEAACQAAIAAEgAASAABAAAkAACAABIAAEgAAQAAJAAAgAASAABIAAEAACQAAIAAEgAASAABAAAkAACAABIAAEgADo6SvAABs3EHkMJI31AAAAAElFTkSuQmCC"

/***/ },
/* 89 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkYwNjU1MDY1NUFCOTExRTZCNDhDRDNDMEVEMTc3QjZGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkYwNjU1MDY2NUFCOTExRTZCNDhDRDNDMEVEMTc3QjZGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjA2NTUwNjM1QUI5MTFFNkI0OENEM0MwRUQxNzdCNkYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjA2NTUwNjQ1QUI5MTFFNkI0OENEM0MwRUQxNzdCNkYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4TV9ggAAACkUlEQVR42uzdvWtTURzH4Rupim+IUB18yVLFSQVR6qZgHUTFl01dRXAQnd0VVxHsHyAoDiIOguDgoKuTg5siOAjJ7Hr9XZrRpZiTc27O88B37W2ST3OT29AO2rZtqNcGd4EAEAACQAAIgMosjMdj94JnAHpoKdb+7wTQXyueAep2TgD12hE7L4B63YxtFUC9L9zvexdQrxuxwwKo07bYQ9cB6vUoNhRAnc7E7qZ4QUH59sWexwYCqM+W2OvY/lRvKSjXptiL2HLK95SUaWPsZexKyoMsuJ+L1F3qfdVM6XKvAPrlQOxd7MgsDuYUUJZLsS+zevAFUI7tsaext7HdszywU0B+3Yu8J82Ur/B5Bijfidj72JtcD75ngDxOxh7ELjcJruwJoEybY1dj92KnSvrGBJBOdxXvdOx67FpsZ4nfpACmp7tyd2zyE959Yvfs5NV90QSwPt1Fmu6XMrtii83aZ/MPxg7Fjk6e6ntFAOuzGrswTzfI28DKCUAACIBq5XwR+Cm2N8HX/Ri75aEtP4Bhk+Ya+DcPq1MAAkAACAABUOi7gD76HPuT4bjHm7VfPAkgs8eZjvssdscpAAEgAASAABAAAkAACAABIAAEgAAQAAJAAAgAASAABIAA+KfuU8EfMh17T6Kvu5zpNv2I3e5jACtzFvViptv01SkAASAABIAAEAACQAAIAAEgAASAABAAAkAACAABIAAEQC7dh0K/Zzr2sEnzt4q7P+b8O8Pt+dXXAJYyHftnk+Z/BnX/NOqin22nAASAABAAAkAACAABIAAEgAAQAAIQgLtAAAgAASAABIAAEAACQAAIAAEgAASAABAAc2cwGo3cCzUH0Late8EpAAEgAASAAKjJXwEGAKcdQ4lsj9aDAAAAAElFTkSuQmCC"

/***/ },
/* 90 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFDNzE4OTY0NUFCQTExRTZCNDhDRDNDMEVEMTc3QjZGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFDNzE4OTY1NUFCQTExRTZCNDhDRDNDMEVEMTc3QjZGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjA2NTUwNkI1QUI5MTFFNkI0OENEM0MwRUQxNzdCNkYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjA2NTUwNkM1QUI5MTFFNkI0OENEM0MwRUQxNzdCNkYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4qzlHzAAADAUlEQVR42uzdT0tUYRTH8evoC+gPLdq0kAisZa3CiDbtUojWQS2igl5D0IvIIqj21iJcaotIbNcqC4KCWlggQogEBWbnyRHEULrk3Kl7Pl/4bWYE4Txfz3mu95k7A4uLi9UODERORcYjJyPDkf2RwQr/IquRpcj7yFzkSeR5ZG3bBd5BgPORW5Fj6vpfMx+5GXn8pwKUv/AHkXNq1yqmIpe6HWJbAQ5FpiNH1KuVvI2cjXzYeKGz6c19kacWv9WUtZ3pdvnfBCht/7AatZ6yxve3CnAhMqY2aRjrrvmvPUC51HsVOaouqXhTrvA63et8i5+PkbL2Ha0/NeMbHQA5GS0CDKtDWoaLAHvUIS17iwBD6pCWwY4a5IYABAABQAAQAAQAAUAAEAAEQAaaug/wOjKr3LUYrRo4qNOUAM8i161pLW43IYARYA8AAoAAIAAIAAKAACAACAACoPU0dS/gdOSuctditIlfUp4PsKbWRgAIAAKAAHAV0AvK0yg/KnctykM7D7RFgEeVI2F1KUfCrhkBIAAIAAKAACAACAACgAAgAAiAv6SpewHlY85XlLt2zXqOI2FGAAgAAoAAIAAI0BsmyhWH1MqEDgACgAAgAAgAAoAAIAAIAAKAANgFmjoSVj7nfly5a9es5zgSZgSAACAACAACgAAgAAgAAoAAIAAIAAKgpawQIDcLBMjNSwLkZtqBkLx8jRzUAfJyJ7KsA+Tkc2Qk8kUHyMdq5GJZfP8HyMePav2LqKY3XhhSkzSsRC5HJje/qAPkYKZa/1zG5NY3dID2shyZ6u72Z7f7oX4L8CLy0Frt6oxfiryLzHc3fDvSTwHuRW5Evlm3/tGPPcD3yNVq/fHxFr/PNN0BPkUuROaUPl8HKPP+hMXPKUCZ92ciC0qeSwDzPvEewLxP3AHM+8QCmPdJBTDvE+8BzPvEHcC8TyyAeZ9UAPM+8R7AvE/cAcz7xAKY90kFMO8T7wHM+8QdwLxPLIB5n1QA8z7xHsC8T9wBzPvEApj3ifkpwACtGpLsTaaBMgAAAABJRU5ErkJggg=="

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.images = undefined;
  
  var _image_ = __webpack_require__(92);
  
  var _image_2 = _interopRequireDefault(_image_);
  
  var _image_3 = __webpack_require__(93);
  
  var _image_4 = _interopRequireDefault(_image_3);
  
  var _image_5 = __webpack_require__(94);
  
  var _image_6 = _interopRequireDefault(_image_5);
  
  var _image_7 = __webpack_require__(95);
  
  var _image_8 = _interopRequireDefault(_image_7);
  
  var _image_9 = __webpack_require__(96);
  
  var _image_10 = _interopRequireDefault(_image_9);
  
  var _image_11 = __webpack_require__(97);
  
  var _image_12 = _interopRequireDefault(_image_11);
  
  var _image_13 = __webpack_require__(98);
  
  var _image_14 = _interopRequireDefault(_image_13);
  
  var _image_15 = __webpack_require__(99);
  
  var _image_16 = _interopRequireDefault(_image_15);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var images = exports.images = [{
    index: 0,
    url: _image_2.default,
    title: "Logo"
  }, {
    index: 1,
    url: _image_4.default,
    title: "The Hive"
  }, {
    index: 2,
    url: _image_6.default,
    title: "Desks"
  }, {
    index: 3,
    url: _image_8.default,
    title: "Lounge"
  }, {
    index: 4,
    url: _image_10.default,
    title: "RaceCar"
  }, {
    index: 5,
    url: _image_12.default,
    title: "Air"
  }, {
    index: 6,
    url: _image_14.default,
    title: "Another Lounge"
  }, {
    index: 7,
    url: _image_16.default,
    title: "Mountain View"
  }];

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "460976a64e85af802304b8e7ad1a2cbf.jpg";

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "601b2b7be9d10a2720fea8651c7d40d9.jpg";

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "c2d8b20af4aa57ff314326226a48b36f.jpg";

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "fe06346bdc5dedd8e3daa871ce2fcd69.jpg";

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "7ce50eb585de32114cfbb3029060c87c.jpg";

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "59f78bffed89e47f5becbb00aba0135e.jpg";

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "98f0201b0babf1851902dc54e19cca25.jpg";

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "40a355a37057cd0abd0e13a7e1ec24e6.jpg";

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(14);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Exp = __webpack_require__(101);
  
  var _Exp2 = _interopRequireDefault(_Exp);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)(_Exp2.default, {});
  
  exports.default = {
  
    path: '/exp',
  
    action: function action() {
      return _ref;
    }
  };

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(56);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(57);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(58);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(59);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(60);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(14);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(19);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Exp = __webpack_require__(102);
  
  var _Exp2 = _interopRequireDefault(_Exp);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Shy - Google Exercise';
  
  var _ref = (0, _jsx3.default)('h2', {}, void 0, ' Google Exercise ');
  
  var _ref2 = (0, _jsx3.default)('h3', {}, void 0, ' Design Choices & Process ');
  
  var _ref3 = (0, _jsx3.default)('h3', {}, void 0, ' What I Used ');
  
  var _ref4 = (0, _jsx3.default)('a', {
    href: 'http://yeoman.io/',
    target: '_blank'
  }, void 0, 'yeoman');
  
  var _ref5 = (0, _jsx3.default)('h3', {}, void 0, ' Get it Running (Dev) ');
  
  var _ref6 = (0, _jsx3.default)('br', {});
  
  var _ref7 = (0, _jsx3.default)('h3', {}, void 0, ' Hope ya\'ll think is passable, thanks for taking the time!! ');
  
  var Exp = function (_Component) {
    (0, _inherits3.default)(Exp, _Component);
  
    function Exp() {
      (0, _classCallCheck3.default)(this, Exp);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Exp).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Exp, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.setTitle(this.props.title);
      }
    }, {
      key: 'render',
      value: function render() {
        return (0, _jsx3.default)('div', {
          className: _Exp2.default.root
        }, void 0, (0, _jsx3.default)('div', {
          className: _Exp2.default.container
        }, void 0, _ref, _ref2, (0, _jsx3.default)('ul', {}, void 0, (0, _jsx3.default)('li', {
          className: _Exp2.default.li
        }, void 0, ' A quick study of existing well built photo galleries which included google photos, flikr, facebook, dropbox, & shutterstock. '), (0, _jsx3.default)('li', {
          className: _Exp2.default.li
        }, void 0, ' Majority simply utilize animation through cheap browser resources: opacity (fading) or tranlsation (movement) for performance reasons but also intuitive clean experience. '), (0, _jsx3.default)('li', {
          className: _Exp2.default.li
        }, void 0, ' The most concerning animation to me was the relationship between selecting or clicking a image from the grid view and conveying to the user that what you clicked is what the detail view will show. ')), _ref3, (0, _jsx3.default)('ul', {}, void 0, (0, _jsx3.default)('li', {
          className: _Exp2.default.li
        }, void 0, ' I like to start off most projects with ', _ref4, ' generator.'), (0, _jsx3.default)('li', {
          className: _Exp2.default.li
        }, void 0, ' Node.js '), (0, _jsx3.default)('li', {
          className: _Exp2.default.li
        }, void 0, ' Express '), (0, _jsx3.default)('li', {
          className: _Exp2.default.li
        }, void 0, ' React '), (0, _jsx3.default)('li', {
          className: _Exp2.default.li
        }, void 0, ' Webpack '), (0, _jsx3.default)('li', {
          className: _Exp2.default.li
        }, void 0, ' Babel '), (0, _jsx3.default)('li', {
          className: _Exp2.default.li
        }, void 0, ' CSS Modules '), (0, _jsx3.default)('li', {
          className: _Exp2.default.li
        }, void 0, ' BrowserSync (dev.) ')), _ref5, (0, _jsx3.default)('ul', {}, void 0, (0, _jsx3.default)('li', {
          className: _Exp2.default.li
        }, void 0, ' Must use node v5+, npm v3.3+'), (0, _jsx3.default)('li', {
          className: _Exp2.default.li
        }, void 0, ' npm install '), (0, _jsx3.default)('li', {
          className: _Exp2.default.li
        }, void 0, ' npm start '), (0, _jsx3.default)('li', {
          className: _Exp2.default.li
        }, void 0, ' localhost:3001 '), (0, _jsx3.default)('li', {
          className: _Exp2.default.li
        }, void 0, ' npm run build (only for production build) ')), _ref6, _ref7));
      }
    }]);
    return Exp;
  }(_react.Component);
  
  Exp.contextTypes = {
    setTitle: _react.PropTypes.func.isRequired
  };
  exports.default = (0, _withStyles2.default)(_Exp2.default)(Exp);

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(103);
      var insertCss = __webpack_require__(23);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(22)();
  // imports
  
  
  // module
  exports.push([module.id, "._2Ni-{padding-left:20px;padding-right:20px}._2jTc{margin:0 auto;padding-top:10px;max-width:1000px}._2PEv{margin-bottom:10px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_2Ni-",
  	"container": "_2jTc",
  	"li": "_2PEv"
  };

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(1);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(14);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _App = __webpack_require__(55);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _ErrorPage = __webpack_require__(18);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/error',
  
    action: function action(_ref) {
      var render = _ref.render;
      var context = _ref.context;
      var error = _ref.error;
  
      return render((0, _jsx3.default)(_App2.default, {
        context: context,
        error: error
      }, void 0, (0, _jsx3.default)(_ErrorPage2.default, {
        error: error
      })), error.status || 500);
    }
  }; /**
      * React Starter Kit (https://www.reactstarterkit.com/)
      *
      * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
      *
      * This source code is licensed under the MIT license found in the
      * LICENSE.txt file in the root directory of this source tree.
      */

/***/ },
/* 105 */
/***/ function(module, exports) {

  module.exports = require("./assets");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map