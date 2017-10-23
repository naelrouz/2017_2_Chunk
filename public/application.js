var lib =
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


class EventBus {
	constructor() {
		this.listeners = {};
	}

	on(event, listener) {
		this.listeners[event] = this.listeners[event] || [];
		this.listeners[event].push(listener);
		console.log("ON emitBus");
	}

	emit(event, data) {
		this.listeners[event].forEach(function (listener) {
			listener(data);
		});
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = EventBus;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commonView__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__ = __webpack_require__(37);





class MenuView extends __WEBPACK_IMPORTED_MODULE_0__commonView__["default"] {
	constructor(eventBus) {
		const menuElems = {
			profile: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('div', { 'data-section': 'profile' }, ['profile', 'auth'], ''),
			play: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('button', { 'data-section': 'play' }, ['button', 'auth'], 'Играть'),
			signup: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('button', { 'data-section': 'signup' }, ['button', 'unauth'], 'Зарегистрироваться'),
			login: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('button', { 'data-section': 'login' }, ['button', 'unauth'], 'Вход'),
			settings: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('button', { 'data-section': 'settings' }, ['button', 'auth'], 'Настройки'),
			rules: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('button', { 'data-section': 'rules' }, ['button', 'unauth'], 'Правила'),
			scores: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('button', { 'data-section': 'scores' }, ['button', 'unauth'], 'Таблица лидеров'),
			exit: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('button', { 'data-section': 'exit' }, ['button', 'auth'], 'Выход')
		};
		super(menuElems);

		this.bus = eventBus;

		this.bus.on("unauth", function () {
			for (let elem in this.elements) {
				if (this.elements[elem].el.classList.contains("unauth")) {
					this.elements[elem].show();
				} else this.elements[elem].hide();
			}
		}.bind(this));

		this.bus.on("auth", function () {
			for (let elem in this.elements) {
				if (this.elements[elem].el.classList.contains("auth")) {
					this.elements[elem].show();
				} else this.elements[elem].hide();
			}
		}.bind(this));

		this.bus.emit("unauth");
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = MenuView;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__blocks_block_block_js__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_eventBus__ = __webpack_require__(1);






class CommonView extends __WEBPACK_IMPORTED_MODULE_0__blocks_block_block_js__["default"] {
	constructor(blocks) {
		const view = document.createElement("section");
		const attrs = {
			"display": "flex",
			"flex-direction": "column",
			"align-items": "center",
			"justify-content": "center"
		};

		super(view);

		this.elements = blocks;

		for (const attr in attrs) {
			this.el.style.setProperty(attr, attrs[attr]);
		}

		for (const block in this.elements) {
			this.append(this.elements[block]);
		}
	}

	show() {
		this.el.style.setProperty("display", "flex");
	}

	hide() {
		this.el.style.setProperty("display", "none");
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = CommonView;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function requireAll(r) {
  r.keys().forEach(r);
}

requireAll(__webpack_require__(10));
requireAll(__webpack_require__(18));

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_block__ = __webpack_require__(37);
/**
 * Базовый класс формы
 * @module Form
 */




class Form extends __WEBPACK_IMPORTED_MODULE_0__block_block__["default"] {
	/**
  * @param fields []- корневой элемент блока
  * @constructor
  */
	constructor(fields = []) {
		const el = document.createElement('form');
		super(el);

		fields.forEach(function (field) {
			const f = __WEBPACK_IMPORTED_MODULE_0__block_block__["default"].Create('input', field.attrs || {}, field.classes || []);
			this.append(f);
		}.bind(this));
	}

	/**
  * Вызывается при отправке формы
  * @param {Function} callback - колбек функция
  */
	onSubmit(callback) {
		this.el.addEventListener('submit', event => {
			event.preventDefault();
			const formdata = {};
			const elements = this.el.elements;
			//запись элементов формы в formdata
			for (let element in elements) {
				formdata[elements[element].name] = elements[element].value;
			}

			callback(formdata);
		});
	}

	/**
  * Сбрасывает атрибуты HTMLElement
  */
	reset() {
		this.el.reset();
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Form;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


const ScoreboardTemplate = {
	pugEscape: function pugEscape(e) {
		var a = "" + e,
		    t = this.pugMatchHtml.exec(a);
		if (!t) return e;
		var r,
		    c,
		    n,
		    s = "";
		for (r = t.index, c = 0; r < a.length; r++) {
			switch (a.charCodeAt(r)) {
				case 34:
					n = "&quot;";
					break;
				case 38:
					n = "&amp;";
					break;
				case 60:
					n = "&lt;";
					break;
				case 62:
					n = "&gt;";
					break;
				default:
					continue;
			}
			c !== r && (s += a.substring(c, r)), c = r + 1, s += n;
		}
		return c !== r ? s + a.substring(c, r) : s;
	},

	pugMatchHtml: /["&<>]/,

	template: function template(locals) {
		var pug_html = "",
		    pug_mixins = {},
		    pug_interp;
		;var locals_for_with = locals || {};
		(function (users) {
			pug_html = pug_html + "\u003Cthead\u003E\u003Ctr\u003E\u003Cth\u003EEmail\u003C\u002Fth\u003E\u003Cth\u003EScores\u003C\u002Fth\u003E\u003C\u002Ftr\u003E\u003C\u002Fthead\u003E\u003Ctbody\u003E";
			// iterate users
			;(function () {
				var $$obj = users;
				if ('number' == typeof $$obj.length) {
					for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
						var user = $$obj[pug_index0];
						pug_html = pug_html + "\u003Ctr\u003E\u003Cth\u003E" + this.pugEscape(null == (pug_interp = user.name) ? "" : pug_interp) + "\u003C\u002Fth\u003E\u003Cth\u003E" + this.pugEscape(null == (pug_interp = user.score) ? "" : pug_interp) + "\u003C\u002Fth\u003E\u003C\u002Ftr\u003E";
					}
				} else {
					var $$l = 0;
					for (var pug_index0 in $$obj) {
						$$l++;
						var user = $$obj[pug_index0];
						pug_html = pug_html + "\u003Ctr\u003E\u003Cth\u003E" + this.pugEscape(null == (pug_interp = user.name) ? "" : pug_interp) + "\u003C\u002Fth\u003E\u003Cth\u003E" + this.pugEscape(null == (pug_interp = user.score) ? "" : pug_interp) + "\u003C\u002Fth\u003E\u003C\u002Ftr\u003E";
					}
				}
			}).call(this);

			pug_html = pug_html + "\u003C\u002Ftbody\u003E";
		}).call(this, "users" in locals_for_with ? locals_for_with.users : typeof users !== "undefined" ? users : undefined);
		;
		return pug_html;
	}
};

/* harmony default export */ __webpack_exports__["default"] = (ScoreboardTemplate);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commonView__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_form_form_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blocks_message_message_js__ = __webpack_require__(42);






class signUpView extends __WEBPACK_IMPORTED_MODULE_0__commonView__["default"] {
	constructor() {
		const loginFields = [{ attrs: {
				type: "text",
				size: "128",
				name: "name",
				placeholder: "Enter your name",
				required: "required",
				class: "login-input"
			} }, { attrs: {
				type: "email",
				size: "128",
				name: "email",
				placeholder: "Enter your email",
				required: "required",
				class: "login-input"
			} }, { attrs: {
				type: "password",
				size: "128",
				name: "password",
				placeholder: "Enter password",
				required: "required",
				class: "login-input"
			} }, { attrs: {
				type: "password",
				size: "128",
				name: "confirm",
				placeholder: "Confirm password",
				required: "required",
				class: "login-input"
			} }, { attrs: {
				type: "submit",
				value: "submit",
				class: "login-input button"
			} }];
		const form = new __WEBPACK_IMPORTED_MODULE_1__blocks_form_form_js__["default"](loginFields);
		super({ form });

		const err_message = new __WEBPACK_IMPORTED_MODULE_2__blocks_message_message_js__["default"]();
		this.append(err_message);

		this.hide();
	}

	onSubmit(callback) {
		this.el.addEventListener("submit", function (event) {
			event.preventDefault();
			const formData = {};
			const fields = this.el.childNodes.item(0).elements;

			for (let field in fields) {
				formData[fields[field].name] = fields[field].value;
			}
			callback(formData);
		}.bind(this));
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = signUpView;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_http__ = __webpack_require__(9);




/**
 * Сервис для работы с юзерами
 * @module UserService
 */
class UserService {
	constructor() {
		this.user = null;
		this.users = [];
	}

	/**
  * Регистрирует нового пользователя
  * @param {string} username
  * @param {string} email
  * @param {string} password
  * @param {string} confirm
  */
	signup(username, email, password, confirm) {
		//validation
		return new Promise(function (resolve, reject) {
			if (email.length < 4) {
				throw new Error("Длина логина должна быть не меньше 4 символов!");
			}
			if (email.length > 12) {
				throw new Error("Длина логина не должна превышать 12 символов!");
			}
			if (password.length < 6) {
				throw new Error("Длина пароля должна быть не меньше 6 символов!");
			}
			if (password !== confirm) {
				throw new Error("Пароли не совпадают!!!");
			}
			if (password === email) {
				throw new Error("Логин и пароль не должны совпадать!");
			}

			resolve(__WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].FetchPost('/sign_up', { username, email, password }));
		});
	}

	// /**
	//  * Авторизация пользователя
	//  * @param {string} email
	//  * @param {string} password
	//  * @param {Function} callback
	//  */
	// login(email, password, callback) {
	// 	if (email.length < 4) {
	// 		callback("Длина логина должна быть не меньше 4 символов!", null);
	// 		return;
	// 	}
	// 	if (email.length > 12) {
	// 		callback("Длина логина не должна превышать 12 символов!", null);
	// 		return;
	// 	}
	// 	if (password.length < 6) {
	// 		callback("Длина пароля должна быть не меньше 6 символов!", null);
	// 		return;
	// 	}
	// 	if (password === email) {
	// 		callback("Логин и пароль не могут совпадать!", null);
	// 		return;
	// 	}
	// 	Http.Post('/sign_in', {email, password}, callback);
	// }

	/**
  * Проверяет, авторизован ли пользователь
  * @return {boolean}
  */
	isLoggedIn() {
		return !!this.user;
	}

	/**
  * Загружает данные о текущем пользователе
  * @param {Function} callback
  * @param {boolean} [force=false] - игнорировать ли кэш?
  */
	// getData(callback, force = false) {
	// 	if (this.isLoggedIn() && !force) {
	// 		return callback(null, this.user);
	// 	}
	//
	// 	Http.FetchGet('/whoisit');
	// }

	/**
  * Проверяет, авторизован ли пользователь
  * @param force - пременная для принудительной отправки гет запроса если true
  * @return {Promise} - возвращает функцию колбек с результатом запроса или ошибкой
  */
	async getDataFetch(force = false) {
		if (this.isLoggedIn() && !force) {
			return new Promise(function (resolve, reject) {
				resolve(this.user);
			});
		}

		return await __WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].FetchGet('/whoisit').then(function (resp) {
			this.user = resp;
			return this.user;
		}.bind(this)).catch(function (err) {
			this.user = null;
			console.log(err.statusText);
			throw new Error("Can not get response =(");
		}.bind(this));
	}

	/**
  * Разлогинивает куки
  */
	logout() {
		if (this.isLoggedIn()) {
			this.user = null;
			this.users = [];
			this.delCookie();
		}
	}

	/**
  * Разлогинивает пользователя удаляя куку
  */
	async delCookie() {
		await __WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].FetchGet('/exit').catch(function (err) {
			console.log(err.errorMessage);
		});
	}

	/**
  * Загружает список всех пользователей
  * @param callback
  */
	loadUsersList(callback) {
		__WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].Get('/users', function (err, users) {
			if (err) {
				return callback(err, users);
			}

			this.users = users;

			if (this.isLoggedIn()) {
				this.users = this.users.map(user => {
					if (user.email === this.user.email) {
						user.me = true;
					}
					return user;
				});
			}

			callback(null, this.users);
		}.bind(this));
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = UserService;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });



// const backendUrl = 'https://chunkgame.herokuapp.com';

const backendUrl = "";
const baseUrl = `${window.location.protocol}//${window.location.host}`;

console.log("baseUrl = ", baseUrl);
/**
 * Модуль, предоставляющий методы для выполнения HTTP-запросов
 * @module Http
 */

class Http {
	/**
  * Выполняет GET-запрос по указанному адресу
  * @param {string} address - адрес запроса
  * @param {Function} callback - функция-коллбек
  */
	// static Get(address, callback) {
	// 	const xhr = new XMLHttpRequest();
	// 	xhr.open('GET', backendUrl + address, true);
	// 	xhr.withCredentials = true;
	//
	// 	xhr.onreadystatechange = function () {
	// 		if (xhr.readyState !== 4) return;
	// 		if (+xhr.status >= 400) {
	// 			return callback(xhr, null);
	// 		}
	//
	// 		callback(null, JSON.parse(xhr.responseText));
	// 	};
	//
	// 	xhr.send();
	// }
	//
	// /**
	//  * Выполняет POST-запрос по указанному адресу
	//  * @param {string} address - адрес запроса
	//  * @param {*} body - тело запроса (объект)
	//  * @param {Function} callback - функция-коллбек
	//  */
	// static Post(address, body, callback) {
	// 	const xhr = new XMLHttpRequest();
	// 	xhr.open('POST', backendUrl + address, true);
	// 	xhr.withCredentials = true;
	// 	xhr.timeout = 15000;
	// 	xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');
	//
	// 	xhr.onreadystatechange = function () {
	// 		if (xhr.readyState !== 4) return;
	// 		if (+xhr.status >= 400) {
	// 			return callback(JSON.parse(xhr.responseText).errorMessage, null);
	// 		}
	// 		callback(null, xhr);
	// 	};
	//
	// 	xhr.send(JSON.stringify(body));
	// }


	/**
  * Выполняет GET-запрос по указанному адресу
  * @param {string} address - адрес запроса
  */
	static async FetchGet(address) {
		const url = backendUrl + address;
		return await fetch(url, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include'
		}).then(function (response) {
			if (response.status >= 400) {
				throw response;
			}
			return response.json();
		});
	}

	/**
  * Выполняет POST-запрос по указанному адресу
  * @param {Object} body - body-request
  * @param {string} address - адрес запроса
  */
	static FetchPost(address, body) {
		const url = backendUrl + address;
		return fetch(url, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		});
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Http;

Http.BaseUrl = null;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./blocks/block/block.js": 37,
	"./blocks/form/form.js": 5,
	"./blocks/message/message.js": 42,
	"./blocks/scoreboard/index.js": 12,
	"./configs/login-fields.js": 13,
	"./configs/signup-fields.js": 14,
	"./include.js": 4,
	"./index.js": 15,
	"./main.js": 16,
	"./modules/eventBus.js": 1,
	"./modules/http.js": 9,
	"./services/user-service.js": 8,
	"./templates/scoreBoard.js": 6,
	"./templates/scoreBoardOld.js": 17,
	"./views/backButtonView.js": 39,
	"./views/commonView.js": 3,
	"./views/menuView.js": 2,
	"./views/profileView.js": 41,
	"./views/signUpView.js": 7
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 10;

/***/ }),
/* 11 */,
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_block_js__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__templates_scoreBoard_js__ = __webpack_require__(6);




/**
 * Модуль для получения шаблона таблицы рекордов с пользователями
 * @Module Scoreboard
 */



class Scoreboard extends __WEBPACK_IMPORTED_MODULE_0__block_block_js__["default"] {
	/**
  * HTMLElement el - корневой элемент блока
  * @constructor
  */
	constructor() {
		const el = document.createElement('table');
		super(el);
	}

	/**
  * Позволяет записать в шаблон таблицы рекордов пользователей users
  * шаблон вместе с данными записывается в this.el в виде готового HTML блока 'table'
  * инициализированного в конструкторе
  * @param users[]- массив пользователей
  */
	update(users = []) {
		console.log('Scoreboard.update', users[0]);
		this.clear();
		this.el.innerHTML = __WEBPACK_IMPORTED_MODULE_1__templates_scoreBoard_js__["default"].template({ users });
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Scoreboard;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

/**
 * Поля для формы логина
 *@module loginFilds
 */

const loginFields = [{
	attrs: {
		type: 'email',
		name: 'email',
		placeholder: 'Введите ваш E-Mail',
		required: 'required',
		class: 'login_input'
	}
}, {
	attrs: {
		type: 'password',
		name: 'password',

		placeholder: 'Введите пароль',
		required: 'required',
		class: 'login_input'
	}
}, {
	attrs: {
		type: 'submit',
		value: 'Log In',
		class: 'login_input'
	}
}];

/* harmony default export */ __webpack_exports__["default"] = (loginFields);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/**
 * Поля для формы регистрации
 *@module loginFilds
 */

const signupFields = [{
	attrs: {
		type: 'email',
		name: 'email',
		placeholder: 'Введите ваш E-Mail',
		required: 'required',
		class: 'sign_up_input'
	}
}, {
	attrs: {
		type: 'text',
		name: 'password',
		placeholder: 'Придумайте пароль длиннее 4 символов',
		required: 'required',
		pattern: '^\\S{4,}$',
		class: 'sign_up_input'
	}
}, {
	attrs: {
		type: 'text',
		name: 'confirm',
		placeholder: 'Повторите пароль',
		required: 'required',
		pattern: '^\\S{4,}$',
		class: 'sign_up_input'
	}
}, {
	attrs: {
		type: 'submit',
		value: 'Регистрация',
		class: 'sign_up_input'
	}
}];

/* harmony default export */ __webpack_exports__["default"] = (signupFields);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views_menuView__ = __webpack_require__(2);




/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views_menuView__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_signUpView__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_backButtonView__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_profileView__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__blocks_block_block_js__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_user_service_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_eventBus__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__blocks_message_message__ = __webpack_require__(42);

/**
 * Основной модуль работатющий со всеми объектами
 *@module main
 */

















const userService = new __WEBPACK_IMPORTED_MODULE_5__services_user_service_js__["default"]();

const eventBus = new __WEBPACK_IMPORTED_MODULE_6__modules_eventBus__["default"]();

const app = new __WEBPACK_IMPORTED_MODULE_4__blocks_block_block_js__["default"](document.body);

const menuView = new __WEBPACK_IMPORTED_MODULE_0__views_menuView__["default"](eventBus);

const signUpView = new __WEBPACK_IMPORTED_MODULE_1__views_signUpView__["default"]();

const backButtonView = new __WEBPACK_IMPORTED_MODULE_2__views_backButtonView__["default"]();

const profileView = new __WEBPACK_IMPORTED_MODULE_3__views_profileView__["default"](eventBus);

menuView.on("click", function (event) {
	event.preventDefault();
	const target = event.target;
	const section = target.getAttribute("data-section");
	switch (section) {
		case 'signup':
			eventBus.emit("openSignUp");
			break;
		case 'exit':
			eventBus.emit("exit");
			break;
	}
});

backButtonView.on("click", function (event) {
	event.preventDefault();
	eventBus.emit("openMenu");
});

signUpView.onSubmit(function (formData) {
	signUpView.message = new __WEBPACK_IMPORTED_MODULE_7__blocks_message_message__["default"]();
	signUpView.message.clear();
	signUpView.message.hide();
	signUpView.append(signUpView.message);
	userService.signup(formData.name, formData.email, formData.password, formData.confirm).then(function (resp) {
		eventBus.emit("openMenu");
	}).catch(function (err) {
		signUpView.message.setText(err.message);
		signUpView.message.show();
	}.bind(this));
}.bind(this));

eventBus.on("openSignUp", function () {
	menuView.hide();
	signUpView.show();
	backButtonView.show();
});

eventBus.on("openMenu", function () {
	menuView.show();
	signUpView.hide();
	backButtonView.hide();

	userService.getDataFetch().then(function (resp) {
		eventBus.emit("auth", resp.username);
	}).catch(function (err) {
		const user = { username: null };
		profileView.render(user.username);
		profileView.hide();
		console.log(err.message);
	});
});

//отследить ексепшены при отсутствии интернета
eventBus.on("exit", function () {
	userService.logout();
	profileView.hide();
	eventBus.emit("unauth");
	eventBus.emit("openMenu");
});

app.append(menuView).append(signUpView).append(backButtonView).append(profileView);

eventBus.emit("openMenu");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

// (function () {
// 	'use strict';
//
// 	window.ScoreboardTemplateOld = {
// 		pugEscape: function pug_escape(e) {
// 			var a = "" + e, t = this.pugMatchHtml.exec(a);
// 			if (!t) return e;
// 			var r, c, n, s = "";
// 			for (r = t.index, c = 0; r < a.length; r++) {
// 				switch (a.charCodeAt(r)) {
// 					case 34:
// 						n = "&quot;";
// 						break;
// 					case 38:
// 						n = "&amp;";
// 						break;
// 					case 60:
// 						n = "&lt;";
// 						break;
// 					case 62:
// 						n = "&gt;";
// 						break;
// 					default:
// 						continue
// 				}
// 				c !== r && (s += a.substring(c, r)), c = r + 1, s += n
// 			}
// 			return c !== r ? s + a.substring(c, r) : s
// 		},
// 		pug_match_html: /["&<>]/,
// 		template: function template(locals) {
// 			var pug_html = "", pug_mixins = {}, pug_interp;
// 			;var locals_for_with = (locals || {});
// 			(function (name) {
// 				pug_html = pug_html + "\u003Cdiv\u003E\u003Cp\u003E" + (this.pugEscape(null == (pug_interp = name) ? "" : pug_interp)) + "'s Pug source code!\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
// 			}.call(this, "name" in locals_for_with ? locals_for_with.name : typeof name !== "undefined" ? name : undefined));
// 			;
// 			return pug_html;
// 		}
// 	}
//
// })();
//
//

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./CSS/new.css": 19,
	"./blocks/block/block.css": 20,
	"./blocks/form/index.css": 21,
	"./blocks/message/index.css": 22,
	"./configs/login-fields.css": 23,
	"./configs/signup-fields.css": 24,
	"./views/view.css": 25
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 18;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 20 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 21 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 22 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 23 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 24 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 25 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

/**
 * Базовый класс блока
 * @module Block
 */

class Block {
	/**
  * @param {HTMLElement} el - корневой элемент блока
  * @constructor
  */
	constructor(el) {
		this.el = el;
	}

	/**
  * Фабричный метод, который ползволяет удобро создавать блоки с заданными характеристиками
  * @param {string} [tagName='div'] - tagName блока
  * @param {*} [attrs={}] - объект с атрибутами блока
  * @param {string[]} [classes=[]] - список имён классов
  * @param {string|null} [text=null] - опциональный текст блока
  * @return {Block}
  * @constructor
  */
	static Create(tagName = 'div', attrs = {}, classes = [], text = null) {
		const el = document.createElement(tagName);
		classes.forEach(function (className) {
			el.classList.add(className);
		});
		for (let name in attrs) {
			el.setAttribute(name, attrs[name]);
		}
		if (text) {
			el.textContent = text;
		}
		return new Block(el);
	}

	/**
  * Установить новый текст для блока
  * @param {string} text
  */
	setText(text) {
		this.el.textContent = text;
	}

	/**
  * Очищает содержимое блока
  */
	clear() {
		this.el.innerHTML = '';
	}

	/**
  * Скрывает блок
  */
	hide() {
		this.el.setAttribute('hidden', 'hidden');
	}

	/**
  * Отображает блок
  */
	show() {
		this.el.removeAttribute('hidden');
	}

	/**
  * Добавляет к текущему блоку дочерний
  * @param {Block} block
  * @return {Block}
  */
	append(block) {
		this.el.appendChild(block.el);
		return this;
	}

	/**
  * Удаляет у текущего блока дочерний
  * @param {Block} block
  * @return {Block}
  */
	remove(block) {
		this.el.removeChild(block.el);
		return this;
	}

	/**
  * Позволяет подписаться на событие
  * @param {string} event
  * @param {EventListener} callback
  * @return {function(this:Block)} - функция отписки от события
  */
	on(event, callback) {
		this.el.addEventListener(event, callback);
		return () => {
			this.el.removeEventListener(event, callback);
		};
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Block;


/***/ }),
/* 38 */,
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commonView__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__ = __webpack_require__(37);





class backButtonView extends __WEBPACK_IMPORTED_MODULE_0__commonView__["default"] {
	constructor() {
		const backButton = {
			back: __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('button', {}, ['button', 'back'], 'Back')
		};
		super(backButton);

		this.el.style.setProperty("align-items", "flex-start");

		this.hide();
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = backButtonView;


/***/ }),
/* 40 */,
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commonView__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__ = __webpack_require__(37);





class profileView extends __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"] {
	constructor(eventBus) {
		const profile = __WEBPACK_IMPORTED_MODULE_1__blocks_block_block_js__["default"].Create('div', {}, ['userData', 'auth', 'profile']);
		super(profile.el);

		this.bus = eventBus;
		this.bus.on("unauth", () => {
			this.hide();
		});
		this.bus.on("auth", username => {
			this.setText(username);
			this.show();
		});
	}

	render(username) {
		this.setText(username);
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = profileView;


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_block__ = __webpack_require__(37);




/**
 * Базовый класс формы для отправки информационных сообщений в тело html документа
 * @module Message
 */
class Message extends __WEBPACK_IMPORTED_MODULE_0__block_block__["default"] {
	/**
  * Создает элемент div CSS класса message
  * @constructor
  */
	constructor() {
		const el = document.createElement('div');
		super(el);

		// el.classList.add('message');
	}

	/**
  * Сбрасывает атрибуты HTMLElement
  */
	reset() {
		this.el.reset();
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Message;


/***/ })
/******/ ]);
//# sourceMappingURL=application.js.map