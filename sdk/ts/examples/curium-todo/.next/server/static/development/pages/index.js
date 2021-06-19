module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../example-config.js":
/*!****************************!*\
  !*** ../example-config.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports.bluzelleConfig = {
    mnemonic:  "impulse apple dove sort leaf drill group narrow response net diary inhale screen wisdom blood absent page pact rail pyramid urge birth actor oppose",
    uuid: Date.now().toString(),
    endpoint: 'https://client.sentry.testnet.private.bluzelle.com:26657'
};


/***/ }),

/***/ "./components/ParamsForm.tsx":
/*!***********************************!*\
  !*** ./components/ParamsForm.tsx ***!
  \***********************************/
/*! exports provided: ParamsForm, ParamFormField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParamsForm", function() { return ParamsForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParamFormField", function() { return ParamFormField; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _services_TodoService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/TodoService */ "./services/TodoService.ts");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
var _jsxFileName = "/home/scott/work/bluzelle/curium/sdk/ts/examples/curium-todo/components/ParamsForm.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const ParamsForm = () => {
  const {
    0: params,
    1: setParams
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(_services_TodoService__WEBPACK_IMPORTED_MODULE_2__["params"]);
  const {
    0: userParams,
    1: setUserParams
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(_services_TodoService__WEBPACK_IMPORTED_MODULE_2__["userParams"]);
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_3__["useRouter"])();
  const {
    0: connecting,
    1: setConnecting
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);

  const updateParam = name => ev => setParams(_objectSpread({}, params, {
    [name]: ev.target.value
  }));

  const updateUserParam = name => ev => setUserParams(_objectSpread({}, userParams, {
    [name]: ev.target.value
  }));

  const formSubmit = ev => {
    setConnecting(true);
    Object(lodash__WEBPACK_IMPORTED_MODULE_4__["extend"])(_services_TodoService__WEBPACK_IMPORTED_MODULE_2__["params"], params);
    Object(lodash__WEBPACK_IMPORTED_MODULE_4__["extend"])(_services_TodoService__WEBPACK_IMPORTED_MODULE_2__["userParams"], userParams);
    ev.preventDefault();
    router.push('/todo');
  };

  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"], {
    onSubmit: formSubmit,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 9
    }
  }, __jsx(ParamFormField, {
    label: "Mnemonic",
    value: params.mnemonic,
    onChange: updateParam('mnemonic'),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 13
    }
  }), __jsx(ParamFormField, {
    label: "Endpoint",
    value: params.url,
    onChange: updateParam('url'),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 13
    }
  }), __jsx(ParamFormField, {
    label: "UUID",
    value: _services_TodoService__WEBPACK_IMPORTED_MODULE_2__["userParams"].uuid,
    onChange: updateUserParam('uuid'),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 13
    }
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "primary",
    onClick: formSubmit,
    disabled: connecting,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 13
    }
  }, connecting ? 'Connecting...' : 'Connect'));
};
const ParamFormField = (_ref) => {
  let {
    label
  } = _ref,
      props = _objectWithoutProperties(_ref, ["label"]);

  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
    controlId: "label",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 5
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 9
    }
  }, label), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, _extends({
    autoComplete: "off"
  }, props, {
    onBlur: props.onChange,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 9
    }
  })), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Text, {
    className: "text-muted",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 9
    }
  }));
};

/***/ }),

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_ParamsForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/ParamsForm */ "./components/ParamsForm.tsx");
var _jsxFileName = "/home/scott/work/bluzelle/curium/sdk/ts/examples/curium-todo/pages/index.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

/* harmony default export */ __webpack_exports__["default"] = (() => __jsx(_components_ParamsForm__WEBPACK_IMPORTED_MODULE_1__["ParamsForm"], {
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 4,
    columnNumber: 5
  }
}));

/***/ }),

/***/ "./services/TodoService.ts":
/*!*********************************!*\
  !*** ./services/TodoService.ts ***!
  \*********************************/
/*! exports provided: params, userParams, initialLoadTodos, onTodoListUpdated, storeTodo, deleteTodo, toggleTodoDone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "params", function() { return params; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userParams", function() { return userParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialLoadTodos", function() { return initialLoadTodos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onTodoListUpdated", function() { return onTodoListUpdated; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storeTodo", function() { return storeTodo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteTodo", function() { return deleteTodo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleTodoDone", function() { return toggleTodoDone; });
/* harmony import */ var _bluzelle_sdk_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bluzelle/sdk-js */ "@bluzelle/sdk-js");
/* harmony import */ var _bluzelle_sdk_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_bluzelle_sdk_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _example_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../example-config */ "../example-config.js");
/* harmony import */ var _example_config__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_example_config__WEBPACK_IMPORTED_MODULE_2__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const params = _example_config__WEBPACK_IMPORTED_MODULE_2__["bluzelleConfig"];
const userParams = _example_config__WEBPACK_IMPORTED_MODULE_2__["userConfig"];
const todosListeners = [];
const todos = {};
const bz = Object(_bluzelle_sdk_js__WEBPACK_IMPORTED_MODULE_0__["bluzelle"])(params);
const initialLoadTodos = () => loadTodos();
const onTodoListUpdated = fn => {
  todosListeners.push(fn);
};
const storeTodo = todo => {
  const time = new Date().toISOString();
  todos[time] = _objectSpread({}, todo, {
    time,
    synced: false,
    done: false
  });
  notifyListeners();

  const storedTodo = _objectSpread({}, todo, {
    time,
    done: false
  });

  return bz.then(client => client.db.tx.Create({
    creator: client.db.address,
    // the creator of the transaction should always be the sender's address*
    uuid: _example_config__WEBPACK_IMPORTED_MODULE_2__["userConfig"].uuid,
    key: time,
    value: new TextEncoder().encode(JSON.stringify(storedTodo)),
    // values are stored as byte arrays 
    metadata: new Uint8Array(),
    lease: {
      days: 0,
      seconds: 0,
      years: 0,
      hours: 1,
      minutes: 0
    } // Lease object to specify lifespan of key-value**

  })).then(() => todos[time].synced = true).then(notifyListeners);
};

const notifyListeners = () => todosListeners.forEach(listener => listener(Object.values(todos)));

const loadTodos = () => bz.then(client => client.db.q.KeyValues({
  uuid: client.db.address
})).then(result => result.keyValues.map(it => _objectSpread({}, JSON.parse(new TextDecoder().decode(it.value)), {
  synced: true
}))).then(list => list.map(it => todos[it.time] = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["extend"])(todos[it.time] || {}, it))).then(notifyListeners);

const deleteTodo = todo => {
  todo.synced = false;
  notifyListeners();
  return bz.then(client => client.db.tx.DeleteAll({
    creator: client.db.address,
    uuid: _example_config__WEBPACK_IMPORTED_MODULE_2__["userConfig"].uuid
  })).then(() => delete todos[todo.time]).then(notifyListeners);
};
const toggleTodoDone = todo => {
  todo.done = !todo.done;
  todo.synced = false;
  notifyListeners();
  const storedTodo = {
    done: todo.done,
    body: todo.body,
    time: todo.time
  };
  return bz.then(client => client.db.tx.Upsert({
    creator: client.db.address,
    uuid: _example_config__WEBPACK_IMPORTED_MODULE_2__["userConfig"].uuid,
    key: todo.time,
    value: new TextEncoder().encode(JSON.stringify(storedTodo)),
    metadata: new Uint8Array(),
    lease: {
      days: 0,
      seconds: 0,
      years: 0,
      hours: 1,
      minutes: 0
    }
  })).then(() => todo.synced = true).then(notifyListeners);
};

/***/ }),

/***/ 4:
/*!*******************************!*\
  !*** multi ./pages/index.tsx ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/scott/work/bluzelle/curium/sdk/ts/examples/curium-todo/pages/index.tsx */"./pages/index.tsx");


/***/ }),

/***/ "@bluzelle/sdk-js":
/*!***********************************!*\
  !*** external "@bluzelle/sdk-js" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@bluzelle/sdk-js");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-bootstrap":
/*!**********************************!*\
  !*** external "react-bootstrap" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map