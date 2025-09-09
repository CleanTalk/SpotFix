"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return r; }; var t, r = {}, e = Object.prototype, n = e.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag"; function c(t, r, e, n) { return Object.defineProperty(t, r, { value: e, enumerable: !n, configurable: !n, writable: !n }); } try { c({}, ""); } catch (t) { c = function c(t, r, e) { return t[r] = e; }; } function h(r, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype); return c(a, "_invoke", function (r, e, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var c = d(u, n); if (c) { if (c === f) continue; return c; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var h = s(r, e, n); if ("normal" === h.type) { if (o = n.done ? 4 : 2, h.arg === f) continue; return { value: h.arg, done: n.done }; } "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg); } }; }(r, n, new Context(o || [])), !0), a; } function s(t, r, e) { try { return { type: "normal", arg: t.call(r, e) }; } catch (t) { return { type: "throw", arg: t }; } } r.wrap = h; var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var l = {}; c(l, i, function () { return this; }); var p = Object.getPrototypeOf, y = p && p(p(x([]))); y && y !== e && n.call(y, i) && (l = y); var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l); function g(t) { ["next", "throw", "return"].forEach(function (r) { c(t, r, function (t) { return this._invoke(r, t); }); }); } function AsyncIterator(t, r) { function e(o, i, a, u) { var c = s(t[o], t, i); if ("throw" !== c.type) { var h = c.arg, f = h.value; return f && "object" == _typeof(f) && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) { e("next", t, a, u); }, function (t) { e("throw", t, a, u); }) : r.resolve(f).then(function (t) { h.value = t, a(h); }, function (t) { return e("throw", t, a, u); }); } u(c.arg); } var o; c(this, "_invoke", function (t, n) { function i() { return new r(function (r, o) { e(t, n, r, o); }); } return o = o ? o.then(i, i) : i(); }, !0); } function d(r, e) { var n = e.method, o = r.i[n]; if (o === t) return e.delegate = null, "throw" === n && r.i.return && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f; var i = s(o, r.i, e.arg); if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f; var a = i.arg; return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f); } function w(t) { this.tryEntries.push(t); } function m(r) { var e = r[4] || {}; e.type = "normal", e.arg = t, r[4] = e; } function Context(t) { this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0); } function x(r) { if (null != r) { var e = r[i]; if (e) return e.call(r); if ("function" == typeof r.next) return r; if (!isNaN(r.length)) { var o = -1, a = function e() { for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e; return e.value = t, e.done = !0, e; }; return a.next = a; } } throw new TypeError(_typeof(r) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) { var r = "function" == typeof t && t.constructor; return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name)); }, r.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t; }, r.awrap = function (t) { return { __await: t }; }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () { return this; }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(h(t, e, n, o), i); return r.isGeneratorFunction(e) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, g(v), c(v, u, "Generator"), c(v, i, function () { return this; }), c(v, "toString", function () { return "[object Generator]"; }), r.keys = function (t) { var r = Object(t), e = []; for (var n in r) e.unshift(n); return function t() { for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t; return t.done = !0, t; }; }, r.values = x, Context.prototype = { constructor: Context, reset: function reset(r) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(r) { if (this.done) throw r; var e = this; function n(t) { a.type = "throw", a.arg = r, e.next = t; } for (var o = e.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i[4], u = this.prev, c = i[1], h = i[2]; if (-1 === i[0]) return n("end"), !1; if (!c && !h) throw Error("try statement without catch or finally"); if (null != i[0] && i[0] <= u) { if (u < c) return this.method = "next", this.arg = t, n(c), !0; if (u < h) return n(h), !1; } } }, abrupt: function abrupt(t, r) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var n = this.tryEntries[e]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i); }, complete: function complete(t, r) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f; }, finish: function finish(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[2] === t) return this.complete(e[4], e[3]), m(e), f; } }, catch: function _catch(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[0] === t) { var n = e[4]; if ("throw" === n.type) { var o = n.arg; m(e); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(r, e, n) { return this.delegate = { i: x(r), r: e, n: n }, "next" === this.method && (this.arg = t), f; } }, r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var DOBOARD_API_URL = 'https://api-next.doboard.com';
var createTaskDoboard = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(sessionId, taskDetails) {
    var accountId, formData, response, responseBody;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          accountId = taskDetails.accountId;
          formData = new FormData();
          formData.append('session_id', sessionId);
          formData.append('project_token', taskDetails.projectToken);
          formData.append('project_id', taskDetails.projectId);
          formData.append('user_id', localStorage.getItem('spotfix_user_id'));
          formData.append('name', taskDetails.taskTitle);
          formData.append('comment', taskDetails.taskDescription);
          formData.append('meta', taskDetails.taskMeta);
          _context.next = 11;
          return fetch(DOBOARD_API_URL + '/' + accountId + '/task_add', {
            method: 'POST',
            body: formData
          });
        case 11:
          response = _context.sent;
          if (response.ok) {
            _context.next = 14;
            break;
          }
          throw new Error('Failed to create task');
        case 14:
          _context.next = 16;
          return response.json();
        case 16:
          responseBody = _context.sent;
          if (!(!responseBody || !responseBody.data)) {
            _context.next = 19;
            break;
          }
          throw new Error('Invalid response from server');
        case 19:
          if (!(responseBody.data.operation_status === 'FAILED')) {
            _context.next = 21;
            break;
          }
          throw new Error(responseBody.data.operation_message);
        case 21:
          if (!(responseBody.data.operation_status === 'SUCCESS')) {
            _context.next = 23;
            break;
          }
          return _context.abrupt("return", {
            taskId: responseBody.data.task_id,
            isPublic: 1 //todo MOCK!
          });
        case 23:
          throw new Error('Unknown error occurred during creating task');
        case 24:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function createTaskDoboard(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var createTaskCommentDoboard = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(accountId, sessionId, taskId, comment, projectToken) {
    var status,
      response,
      responseBody,
      _args2 = arguments;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          status = _args2.length > 5 && _args2[5] !== undefined ? _args2[5] : 'ACTIVE';
          _context2.next = 3;
          return fetch(DOBOARD_API_URL + '/' + accountId + '/comment_add' + '?session_id=' + sessionId + '&task_id=' + taskId + '&comment=' + comment + '&project_token=' + projectToken + '&status=' + status, {
            method: 'GET'
          });
        case 3:
          response = _context2.sent;
          if (response.ok) {
            _context2.next = 6;
            break;
          }
          throw new Error('Failed to create task comment');
        case 6:
          _context2.next = 8;
          return response.json();
        case 8:
          responseBody = _context2.sent;
          if (!(!responseBody || !responseBody.data)) {
            _context2.next = 11;
            break;
          }
          throw new Error('Invalid response from server');
        case 11:
          if (!(responseBody.data.operation_status === 'FAILED')) {
            _context2.next = 13;
            break;
          }
          throw new Error(responseBody.data.operation_message);
        case 13:
          if (!(responseBody.data.operation_status === 'SUCCESS')) {
            _context2.next = 15;
            break;
          }
          return _context2.abrupt("return", {
            commentId: responseBody.data.comment_id
          });
        case 15:
          throw new Error('Unknown error occurred during creating task comment');
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function createTaskCommentDoboard(_x3, _x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();
var registerUserDoboard = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(projectToken, accountId, email, nickname) {
    var formData, response, responseBody;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          formData = new FormData();
          formData.append('project_token', projectToken);
          formData.append('account_id', accountId);
          if (email && nickname) {
            formData.append('email', email);
            formData.append('nickname', nickname);
          }
          _context3.next = 6;
          return fetch(DOBOARD_API_URL + '/user_registration', {
            method: 'POST',
            body: formData
          });
        case 6:
          response = _context3.sent;
          if (response.ok) {
            _context3.next = 9;
            break;
          }
          throw new Error('Registration failed');
        case 9:
          _context3.next = 11;
          return response.json();
        case 11:
          responseBody = _context3.sent;
          if (!(!responseBody || !responseBody.data)) {
            _context3.next = 14;
            break;
          }
          throw new Error('Invalid response from server');
        case 14:
          if (!(responseBody.data.operation_status === 'FAILED')) {
            _context3.next = 16;
            break;
          }
          throw new Error(responseBody.data.operation_message);
        case 16:
          if (!(responseBody.data.operation_status === 'SUCCESS')) {
            _context3.next = 20;
            break;
          }
          if (!(responseBody.data.user_email_confirmed === 1)) {
            _context3.next = 19;
            break;
          }
          return _context3.abrupt("return", {
            accountExists: true
          });
        case 19:
          return _context3.abrupt("return", {
            sessionId: responseBody.data.session_id,
            userId: responseBody.data.user_id,
            email: responseBody.data.email
          });
        case 20:
          throw new Error('Unknown error occurred during registration');
        case 21:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function registerUserDoboard(_x8, _x9, _x0, _x1) {
    return _ref3.apply(this, arguments);
  };
}();
var _loginUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(email, password) {
    var formData, response, responseBody;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          formData = new FormData();
          formData.append('email', email);
          formData.append('password', password);
          _context4.next = 5;
          return fetch(DOBOARD_API_URL + '/user_authorize', {
            method: 'POST',
            body: formData
          });
        case 5:
          response = _context4.sent;
          if (response.ok) {
            _context4.next = 8;
            break;
          }
          throw new Error('Authorization failed');
        case 8:
          _context4.next = 10;
          return response.json();
        case 10:
          responseBody = _context4.sent;
          if (!(!responseBody || !responseBody.data)) {
            _context4.next = 13;
            break;
          }
          throw new Error('Invalid response from server');
        case 13:
          if (!(responseBody.data.operation_status === 'FAILED')) {
            _context4.next = 15;
            break;
          }
          throw new Error(responseBody.data.operation_message);
        case 15:
          if (!(responseBody.data.operation_status === 'SUCCESS')) {
            _context4.next = 17;
            break;
          }
          return _context4.abrupt("return", {
            sessionId: responseBody.data.session_id,
            userId: responseBody.data.user_id,
            email: email
          });
        case 17:
          throw new Error('Unknown error occurred during registration');
        case 18:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function loginUser(_x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();
var getTasksDoboard = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(projectToken, sessionId, accountId, projectId, userId) {
    var formData, response, responseBody;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          formData = new FormData();
          formData.append('project_token', projectToken);
          formData.append('session_id', sessionId);
          formData.append('project_id', projectId);
          formData.append('status', 'ACTIVE');
          if (userId) {
            formData.append('user_id', userId);
          }
          _context5.next = 8;
          return fetch(DOBOARD_API_URL + '/' + accountId + '/task_get', {
            method: 'POST',
            body: formData
          });
        case 8:
          response = _context5.sent;
          if (response.ok) {
            _context5.next = 11;
            break;
          }
          throw new Error('Getting tasks failed');
        case 11:
          _context5.next = 13;
          return response.json();
        case 13:
          responseBody = _context5.sent;
          if (!(!responseBody || !responseBody.data)) {
            _context5.next = 16;
            break;
          }
          throw new Error('Invalid response from server');
        case 16:
          if (!(responseBody.data.operation_status === 'FAILED')) {
            _context5.next = 18;
            break;
          }
          throw new Error(responseBody.data.operation_message);
        case 18:
          if (!(responseBody.data.operation_status === 'SUCCESS')) {
            _context5.next = 20;
            break;
          }
          return _context5.abrupt("return", responseBody.data.tasks.map(function (task) {
            return {
              taskId: task.task_id,
              taskTitle: task.name,
              taskLastUpdate: task.updated,
              taskCreated: task.created,
              taskCreatorTaskUser: task.creator_user_id,
              taskMeta: task.meta
            };
          }));
        case 20:
          throw new Error('Unknown error occurred during getting tasks');
        case 21:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function getTasksDoboard(_x12, _x13, _x14, _x15, _x16) {
    return _ref5.apply(this, arguments);
  };
}();
var getTaskCommentsDoboard = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(taskId, sessionId, accountId, projectToken) {
    var status,
      response,
      responseBody,
      _args6 = arguments;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          status = _args6.length > 4 && _args6[4] !== undefined ? _args6[4] : 'ACTIVE';
          _context6.next = 3;
          return fetch(DOBOARD_API_URL + '/' + accountId + '/comment_get' + '?session_id=' + sessionId + '&status=' + status + '&task_id=' + taskId + '&project_token=' + projectToken, {
            method: 'GET'
          });
        case 3:
          response = _context6.sent;
          if (response.ok) {
            _context6.next = 6;
            break;
          }
          throw new Error('Getting logs failed');
        case 6:
          _context6.next = 8;
          return response.json();
        case 8:
          responseBody = _context6.sent;
          if (!(!responseBody || !responseBody.data)) {
            _context6.next = 11;
            break;
          }
          throw new Error('Invalid response from server');
        case 11:
          if (!(responseBody.data.operation_status === 'FAILED')) {
            _context6.next = 13;
            break;
          }
          throw new Error(responseBody.data.operation_message);
        case 13:
          if (!(responseBody.data.operation_status === 'SUCCESS')) {
            _context6.next = 15;
            break;
          }
          return _context6.abrupt("return", responseBody.data.comments.map(function (comment) {
            return {
              commentId: comment.comment_id,
              userId: comment.user_id,
              comment: comment.comment,
              commentBody: comment.comment_text,
              commentDate: comment.updated,
              status: comment.status,
              issueTitle: comment.task_name
            };
          }));
        case 15:
          throw new Error('Unknown error occurred during getting comments');
        case 16:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function getTaskCommentsDoboard(_x17, _x18, _x19, _x20) {
    return _ref6.apply(this, arguments);
  };
}();
var getUserDoboard = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(sessionId, projectToken, accountId) {
    var response, responseBody;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return fetch(DOBOARD_API_URL + '/' + accountId + '/user_get' + '?session_id=' + sessionId + '&project_token=' + projectToken, {
            method: 'GET'
          });
        case 2:
          response = _context7.sent;
          if (response.ok) {
            _context7.next = 5;
            break;
          }
          throw new Error('Getting user failed');
        case 5:
          _context7.next = 7;
          return response.json();
        case 7:
          responseBody = _context7.sent;
          if (responseBody) {
            _context7.next = 10;
            break;
          }
          throw new Error('Invalid response from server');
        case 10:
          if (!(responseBody.data && responseBody.data.operation_status)) {
            _context7.next = 17;
            break;
          }
          if (!(responseBody.data.operation_status === 'FAILED')) {
            _context7.next = 13;
            break;
          }
          throw new Error(responseBody.data.operation_message);
        case 13:
          if (!(responseBody.data.operation_status === 'SUCCESS')) {
            _context7.next = 17;
            break;
          }
          if (!Array.isArray(responseBody.data.users)) {
            _context7.next = 16;
            break;
          }
          return _context7.abrupt("return", responseBody.data.users);
        case 16:
          return _context7.abrupt("return", []);
        case 17:
          if (!responseBody.operation_status) {
            _context7.next = 24;
            break;
          }
          if (!(responseBody.operation_status === 'FAILED')) {
            _context7.next = 20;
            break;
          }
          throw new Error(responseBody.operation_message);
        case 20:
          if (!(responseBody.operation_status === 'SUCCESS')) {
            _context7.next = 24;
            break;
          }
          if (!Array.isArray(responseBody.users)) {
            _context7.next = 23;
            break;
          }
          return _context7.abrupt("return", responseBody.users);
        case 23:
          return _context7.abrupt("return", []);
        case 24:
          throw new Error('Unknown error occurred during getting user');
        case 25:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function getUserDoboard(_x21, _x22, _x23) {
    return _ref7.apply(this, arguments);
  };
}();
var userUpdateDoboard = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(projectToken, accountId, sessionId, userId, timezone) {
    var response, responseBody;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return fetch(DOBOARD_API_URL + '/' + accountId + '/user_update' + '?session_id=' + sessionId + '&project_token=' + projectToken + '&user_id=' + userId + '&timezone=' + timezone, {
            method: 'GET'
          });
        case 2:
          response = _context8.sent;
          if (response.ok) {
            _context8.next = 5;
            break;
          }
          throw new Error('User update failed');
        case 5:
          _context8.next = 7;
          return response.json();
        case 7:
          responseBody = _context8.sent;
          if (!(!responseBody || !responseBody.data)) {
            _context8.next = 10;
            break;
          }
          throw new Error('Invalid response from server');
        case 10:
          if (!(responseBody.data.operation_status === 'FAILED')) {
            _context8.next = 12;
            break;
          }
          throw new Error(responseBody.data.operation_message);
        case 12:
          if (!(responseBody.data.operation_status === 'SUCCESS')) {
            _context8.next = 14;
            break;
          }
          return _context8.abrupt("return", {
            success: true
          });
        case 14:
          throw new Error('Unknown error occurred during user update');
        case 15:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function userUpdateDoboard(_x24, _x25, _x26, _x27, _x28) {
    return _ref8.apply(this, arguments);
  };
}();
function getTaskFullDetails(_x29, _x30) {
  return _getTaskFullDetails.apply(this, arguments);
}
function _getTaskFullDetails() {
  _getTaskFullDetails = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(params, taskId) {
    var sessionId, comments, users, lastComment, author, date, time, dt, avatarSrc, authorName;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          sessionId = localStorage.getItem('spotfix_session_id');
          _context15.next = 3;
          return getTaskCommentsDoboard(taskId, sessionId, params.accountId, params.projectToken);
        case 3:
          comments = _context15.sent;
          _context15.next = 6;
          return getUserDoboard(sessionId, params.projectToken, params.accountId);
        case 6:
          users = _context15.sent;
          // Last comment
          lastComment = comments.length > 0 ? comments[0] : null; // Author of the last comment
          author = null;
          if (lastComment && users && users.length > 0) {
            author = users.find(function (u) {
              return String(u.user_id) === String(lastComment.userId);
            });
          }
          // Format date
          date = '', time = '';
          if (lastComment) {
            dt = formatDate(lastComment.commentDate);
            date = dt.date;
            time = dt.time;
          }
          // Get the avatar and the name through separate functions
          avatarSrc = getAvatarSrc(author);
          authorName = getAuthorName(author);
          return _context15.abrupt("return", {
            taskId: taskId,
            taskAuthorAvatarImgSrc: avatarSrc,
            taskAuthorName: authorName,
            lastMessageText: lastComment ? lastComment.commentBody : 'No messages yet',
            lastMessageTime: time,
            issueTitle: comments.length > 0 ? comments[0].issueTitle : 'No Title',
            issueComments: comments.sort(function (a, b) {
              return new Date(a.commentDate) - new Date(b.commentDate);
            }).map(function (comment) {
              var _formatDate2 = formatDate(comment.commentDate),
                date = _formatDate2.date,
                time = _formatDate2.time;
              var author = null;
              if (users && users.length > 0) {
                author = users.find(function (u) {
                  return String(u.user_id) === String(comment.userId);
                });
              }
              return {
                commentAuthorAvatarSrc: getAvatarSrc(author),
                commentAuthorName: getAuthorName(author),
                commentBody: comment.commentBody,
                commentDate: date,
                commentTime: time,
                commentUserId: comment.userId || 'Unknown User'
              };
            })
          });
        case 15:
        case "end":
          return _context15.stop();
      }
    }, _callee15);
  }));
  return _getTaskFullDetails.apply(this, arguments);
}
function handleCreateTask(_x31, _x32) {
  return _handleCreateTask.apply(this, arguments);
}
function _handleCreateTask() {
  _handleCreateTask = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16(sessionId, taskDetails) {
    var result;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _context16.next = 3;
          return createTaskDoboard(sessionId, taskDetails);
        case 3:
          result = _context16.sent;
          if (!(result && result.taskId && taskDetails.taskDescription)) {
            _context16.next = 7;
            break;
          }
          _context16.next = 7;
          return addTaskComment({
            projectToken: taskDetails.projectToken,
            accountId: taskDetails.accountId
          }, result.taskId, taskDetails.taskDescription);
        case 7:
          return _context16.abrupt("return", result);
        case 10:
          _context16.prev = 10;
          _context16.t0 = _context16["catch"](0);
          throw _context16.t0;
        case 13:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 10]]);
  }));
  return _handleCreateTask.apply(this, arguments);
}
function addTaskComment(_x33, _x34, _x35) {
  return _addTaskComment.apply(this, arguments);
}
function _addTaskComment() {
  _addTaskComment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17(params, taskId, commentText) {
    var sessionId;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          sessionId = localStorage.getItem('spotfix_session_id');
          if (sessionId) {
            _context17.next = 3;
            break;
          }
          throw new Error('No session');
        case 3:
          if (!(!params.projectToken || !params.accountId)) {
            _context17.next = 5;
            break;
          }
          throw new Error('Missing params');
        case 5:
          _context17.next = 7;
          return createTaskCommentDoboard(params.accountId, sessionId, taskId, commentText, params.projectToken);
        case 7:
          return _context17.abrupt("return", _context17.sent);
        case 8:
        case "end":
          return _context17.stop();
      }
    }, _callee17);
  }));
  return _addTaskComment.apply(this, arguments);
}
function getUserTasks(params) {
  if (!localStorage.getItem('spotfix_session_id')) {
    return {};
  }
  var projectToken = params.projectToken;
  var sessionId = localStorage.getItem('spotfix_session_id');
  var userId = localStorage.getItem('spotfix_user_id');
  return getTasksDoboard(projectToken, sessionId, params.accountId, params.projectId, userId);
}
function getAllTasks(_x36) {
  return _getAllTasks.apply(this, arguments);
}
function _getAllTasks() {
  _getAllTasks = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18(params) {
    var projectToken, sessionId, tasksData, filteredTaskData;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          if (localStorage.getItem('spotfix_session_id')) {
            _context18.next = 2;
            break;
          }
          return _context18.abrupt("return", {});
        case 2:
          projectToken = params.projectToken;
          sessionId = localStorage.getItem('spotfix_session_id');
          _context18.next = 6;
          return getTasksDoboard(projectToken, sessionId, params.accountId, params.projectId);
        case 6:
          tasksData = _context18.sent;
          // Get only tasks with metadata
          filteredTaskData = tasksData.filter(function (task) {
            return task.taskMeta;
          });
          return _context18.abrupt("return", filteredTaskData);
        case 9:
        case "end":
          return _context18.stop();
      }
    }, _callee18);
  }));
  return _getAllTasks.apply(this, arguments);
}
function formatDate(dateStr) {
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  // dateStr expected format: 'YYYY-MM-DD HH:mm:ss' or 'YYYY-MM-DDTHH:mm:ssZ'
  if (!dateStr) return {
    date: '',
    time: ''
  };
  var dateObj;
  if (dateStr.includes('T')) {
    dateObj = new Date(dateStr);
  } else if (dateStr.includes(' ')) {
    dateObj = new Date(dateStr.replace(' ', 'T'));
  } else {
    dateObj = new Date(dateStr);
  }
  if (isNaN(dateObj.getTime())) return {
    date: '',
    time: ''
  };

  // Adjust to local timezone
  var offsetMinutes = dateObj.getTimezoneOffset();
  var localDateObj = new Date(dateObj.getTime() - offsetMinutes * 60000);
  var month = months[localDateObj.getMonth()];
  var day = localDateObj.getDate();
  var date = "".concat(month, " ").concat(day);
  var hours = localDateObj.getHours().toString().padStart(2, '0');
  var minutes = localDateObj.getMinutes().toString().padStart(2, '0');
  var time = "".concat(hours, ":").concat(minutes);
  return {
    date: date,
    time: time
  };
}
function getTaskAuthorDetails(params, taskId) {
  var sessionId = localStorage.getItem('spotfix_session_id');
  var mockUsersData = [{
    'taskId': '1',
    'taskAuthorAvatarImgSrc': 'https://s3.eu-central-1.amazonaws.com/cleantalk-ctask-atts/accounts/1/avatars/081a1b65d20fe318/m.jpg',
    'taskAuthorName': 'Test All Issues Single Author Name'
  }];
  var defaultData = {
    'taskId': null,
    'taskAuthorAvatarImgSrc': null,
    'taskAuthorName': 'Task Author'
  };
  var data = mockUsersData.find(function (element) {
    return element.taskId === taskId;
  });
  return data === undefined ? defaultData : data;
}
function getIssuesCounterString(onPageSpotsCount, totalSpotsCount) {
  return "(".concat(onPageSpotsCount, "/").concat(totalSpotsCount, ")");
}

// Get the author's avatar
function getAvatarSrc(author) {
  if (author && author.avatar) {
    if (_typeof(author.avatar) === 'object' && author.avatar.m) {
      return author.avatar.m;
    } else if (typeof author.avatar === 'string') {
      return author.avatar;
    }
  }
  return null;
}

// Get the author's name
function getAuthorName(author) {
  if (author) {
    if (author.name && author.name.trim().length > 0) {
      return author.name;
    } else if (author.email && author.email.trim().length > 0) {
      return author.email;
    }
  }
  return 'Unknown Author';
}
function registerUser(taskDetails) {
  var userEmail = taskDetails.userEmail;
  var userName = taskDetails.userName;
  var projectToken = taskDetails.projectToken;
  var accountId = taskDetails.accountId;
  var resultRegisterUser = registerUserDoboard(projectToken, accountId, userEmail, userName).then(function (response) {
    if (response.accountExists) {
      document.querySelector(".doboard_task_widget-accordion>.doboard_task_widget-input-container").innerText = 'Account already exists. Please, login usin your password.';
      document.querySelector(".doboard_task_widget-accordion>.doboard_task_widget-input-container.hidden").classList.remove('hidden');
      document.getElementById("doboard_task_widget-user_password").focus();
    } else if (response.sessionId) {
      localStorage.setItem('spotfix_session_id', response.sessionId);
      localStorage.setItem('spotfix_user_id', response.userId);
      localStorage.setItem('spotfix_email', response.email);
      userUpdate(projectToken, accountId);
    } else {
      throw new Error('Session ID not found in response');
    }
  }).catch(function (error) {
    throw error;
  });
  return resultRegisterUser;
}
function userUpdate(projectToken, accountId) {
  var sessionId = localStorage.getItem('spotfix_session_id');
  var userId = localStorage.getItem('spotfix_user_id');
  var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return userUpdateDoboard(projectToken, accountId, sessionId, userId, timezone);
}

/**
 * Widget class to create a task widget
 */
var CleanTalkWidgetDoboard = /*#__PURE__*/function () {
  /**
   * Constructor
   */
  function CleanTalkWidgetDoboard(selectedData, type) {
    _classCallCheck(this, CleanTalkWidgetDoboard);
    _defineProperty(this, "selectedText", '');
    _defineProperty(this, "selectedData", {});
    _defineProperty(this, "widgetElement", null);
    _defineProperty(this, "params", {});
    _defineProperty(this, "currentActiveTaskId", 0);
    _defineProperty(this, "savedIssuesQuantityOnPage", 0);
    _defineProperty(this, "savedIssuesQuantityAll", 0);
    this.selectedData = selectedData;
    this.selectedText = selectedData.selectedText;
    this.init(type);
  }

  /**
   * Initialize the widget
   */
  return _createClass(CleanTalkWidgetDoboard, [{
    key: "init",
    value: (function () {
      var _init = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(type) {
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              this.params = this.getParams();
              _context9.next = 3;
              return this.createWidgetElement(type);
            case 3:
              this.widgetElement = _context9.sent;
              this.bindWidgetInputsInteractive();
            case 5:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function init(_x37) {
        return _init.apply(this, arguments);
      }
      return init;
    }())
  }, {
    key: "getParams",
    value: function getParams() {
      var script = document.querySelector("script[src*=\"doboard-widget-bundle.min.js\"]");
      if (!script || !script.src) {
        throw new Error('Script not provided');
      }
      var url = new URL(script.src);
      var params = Object.fromEntries(url.searchParams.entries());
      if (!params) {
        throw new Error('Script params not provided');
      }
      if (!params.projectToken || !params.accountId || !params.projectId) {
        throw new Error('Necessary script params not provided');
      }
      return params;
    }

    /**
     * Binding events to create a task
     */
  }, {
    key: "bindCreateTaskEvents",
    value: function bindCreateTaskEvents() {
      var _this = this;
      var submitButton = document.getElementById('doboard_task_widget-submit_button');
      if (submitButton) {
        submitButton.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee0() {
          var taskTitleElement, taskTitle, taskDescriptionElement, taskDescription, userName, userEmail, userPassword, loginSectionElement, _userEmailElement, userNameElement, userPasswordElement, userEmailElement, submitButton, taskDetails, submitTaskResult;
          return _regeneratorRuntime().wrap(function _callee0$(_context0) {
            while (1) switch (_context0.prev = _context0.next) {
              case 0:
                // Check required fields: Report about and Description
                taskTitleElement = document.getElementById('doboard_task_widget-title');
                taskTitle = taskTitleElement.value;
                if (taskTitle) {
                  _context0.next = 7;
                  break;
                }
                taskTitleElement.style.borderColor = 'red';
                taskTitleElement.focus();
                taskTitleElement.addEventListener('input', function () {
                  this.style.borderColor = '';
                });
                return _context0.abrupt("return");
              case 7:
                taskDescriptionElement = document.getElementById('doboard_task_widget-description');
                taskDescription = taskDescriptionElement.value;
                if (taskDescription) {
                  _context0.next = 14;
                  break;
                }
                taskDescriptionElement.style.borderColor = 'red';
                taskDescriptionElement.focus();
                taskDescriptionElement.addEventListener('input', function () {
                  this.style.borderColor = '';
                });
                return _context0.abrupt("return");
              case 14:
                // If login section is open, check required fields: Nickname, Email
                userName = '';
                userEmail = '';
                userPassword = '';
                loginSectionElement = document.querySelector('.doboard_task_widget-login');
                if (!(loginSectionElement && loginSectionElement.classList.contains('active'))) {
                  _context0.next = 42;
                  break;
                }
                _userEmailElement = document.getElementById('doboard_task_widget-user_email');
                userNameElement = document.getElementById('doboard_task_widget-user_name');
                userPasswordElement = document.getElementById('doboard_task_widget-user_password');
                userEmail = _userEmailElement.value;
                if (userEmail) {
                  _context0.next = 28;
                  break;
                }
                _userEmailElement.style.borderColor = 'red';
                _userEmailElement.focus();
                _userEmailElement.addEventListener('input', function () {
                  this.style.borderColor = '';
                });
                return _context0.abrupt("return");
              case 28:
                if (!(_userEmailElement && userNameElement)) {
                  _context0.next = 35;
                  break;
                }
                userName = userNameElement.value;
                if (userName) {
                  _context0.next = 35;
                  break;
                }
                userNameElement.style.borderColor = 'red';
                userNameElement.focus();
                userNameElement.addEventListener('input', function () {
                  this.style.borderColor = '';
                });
                return _context0.abrupt("return");
              case 35:
                if (!(_userEmailElement && userPasswordElement && !userNameElement)) {
                  _context0.next = 42;
                  break;
                }
                userPassword = userPasswordElement.value;
                if (userPassword) {
                  _context0.next = 42;
                  break;
                }
                userPasswordElement.style.borderColor = 'red';
                userPasswordElement.focus();
                userPasswordElement.addEventListener('input', function () {
                  this.style.borderColor = '';
                });
                return _context0.abrupt("return");
              case 42:
                // If it is the login request
                userEmailElement = document.getElementById('doboard_task_widget-user_email');
                userEmail = userEmailElement.value;

                // Make the submit button disable with spinner
                submitButton = document.getElementById('doboard_task_widget-submit_button');
                submitButton.disabled = true;
                submitButton.innerText = 'Creating spot...';
                taskDetails = {
                  taskTitle: taskTitle,
                  taskDescription: taskDescription,
                  //typeSend: typeSend,
                  selectedData: _this.selectedData,
                  projectToken: _this.params.projectToken,
                  projectId: _this.params.projectId,
                  accountId: _this.params.accountId,
                  taskMeta: JSON.stringify(_this.selectedData)
                };
                if (userEmail) {
                  taskDetails.userEmail = userEmail;
                }
                if (userName) {
                  taskDetails.userName = userName;
                }
                if (userPassword) {
                  taskDetails.userPassword = userPassword;
                }
                _context0.next = 53;
                return _this.submitTask(taskDetails);
              case 53:
                submitTaskResult = _context0.sent;
                // Return the submit button normal state
                submitButton.disabled = false;
                submitButton.style.cursor = 'pointer';
                if (!submitTaskResult.needToLogin) {
                  _context0.next = 58;
                  break;
                }
                return _context0.abrupt("return");
              case 58:
                if (submitTaskResult.isPublic !== undefined) {
                  _this.selectedData.isPublic = submitTaskResult.isPublic;
                }
                _this.selectedData = {};
                _context0.next = 62;
                return _this.createWidgetElement('all_issues');
              case 62:
                hideContainersSpinner(false);
              case 63:
              case "end":
                return _context0.stop();
            }
          }, _callee0);
        })));
      }
    }

    /**
     * Create widget element
     * @return {HTMLElement} widget element
     */
  }, {
    key: "createWidgetElement",
    value: (function () {
      var _createWidgetElement = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(type) {
        var _this2 = this,
          _document$querySelect;
        var showOnlyCurrentPage,
          widgetContainer,
          templateName,
          variables,
          issuesQuantityOnPage,
          tasks,
          spotsToBeHighlighted,
          i,
          elTask,
          taskId,
          taskTitle,
          taskDataString,
          _formatDate,
          lastMessageTime,
          taskData,
          currentPageURL,
          taskNodePath,
          taskPublicStatusImgSrc,
          taskPublicStatusHint,
          taskFullDetails,
          avatarData,
          _variables,
          taskDetails,
          issuesCommentsContainer,
          dayMessagesData,
          initIssuerID,
          userIsIssuer,
          _iterator,
          _step,
          comment,
          _avatarData,
          commentData,
          daysWrapperHTML,
          day,
          currentDayMessages,
          dayMessagesWrapperHTML,
          messageId,
          currentMessageData,
          sendForm,
          backToAllIssuesController,
          widgetClass,
          paperclipController,
          _args10 = arguments;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              showOnlyCurrentPage = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : true;
              widgetContainer = document.querySelector('.doboard_task_widget') ? document.querySelector('.doboard_task_widget') : document.createElement('div');
              widgetContainer.className = 'doboard_task_widget';
              widgetContainer.innerHTML = '';
              templateName = '';
              variables = {};
              _context10.t0 = type;
              _context10.next = _context10.t0 === 'create_issue' ? 9 : _context10.t0 === 'wrap' ? 12 : _context10.t0 === 'all_issues' ? 14 : _context10.t0 === 'concrete_issue' ? 16 : 20;
              break;
            case 9:
              templateName = 'create_issue';
              variables = {
                selectedText: this.selectedText,
                currentDomain: document.location.hostname || ''
              };
              return _context10.abrupt("break", 21);
            case 12:
              templateName = 'wrap';
              return _context10.abrupt("break", 21);
            case 14:
              templateName = 'all_issues';
              return _context10.abrupt("break", 21);
            case 16:
              templateName = 'concrete_issue';
              // todo: this is call duplicate!
              getTaskFullDetails(this.params, this.currentActiveTaskId).then(function (taskDetails) {
                var issueTitle = taskDetails.issueTitle;
                var issueTitleElement = document.querySelector('.doboard_task_widget-issue-title');
                if (issueTitleElement) {
                  issueTitleElement.innerHTML = issueTitle;
                }
              });
              variables = {
                issueTitle: '...',
                issuesCounter: getIssuesCounterString(this.savedIssuesQuantityOnPage, this.savedIssuesQuantityAll),
                paperclipImgSrc: '/spotfix/img/send-message--paperclip.svg',
                sendButtonImgSrc: '/spotfix/img/send-message--button.svg',
                msgFieldBackgroundImgSrc: '/spotfix/img/send-message--input-background.svg'
              };
              return _context10.abrupt("break", 21);
            case 20:
              return _context10.abrupt("break", 21);
            case 21:
              _context10.next = 23;
              return this.loadTemplate(templateName, variables);
            case 23:
              widgetContainer.innerHTML = _context10.sent;
              document.body.appendChild(widgetContainer);
              _context10.t1 = type;
              _context10.next = _context10.t1 === 'create_issue' ? 28 : _context10.t1 === 'wrap' ? 30 : _context10.t1 === 'all_issues' ? 35 : _context10.t1 === 'concrete_issue' ? 79 : 122;
              break;
            case 28:
              this.bindCreateTaskEvents();
              return _context10.abrupt("break", 123);
            case 30:
              _context10.next = 32;
              return this.getTaskCount();
            case 32:
              document.querySelector('.doboard_task_widget-wrap').addEventListener('click', function () {
                _this2.createWidgetElement('all_issues');
              });
              hideContainersSpinner(false);
              return _context10.abrupt("break", 123);
            case 35:
              this.removeTextSelection();
              issuesQuantityOnPage = 0;
              _context10.next = 39;
              return getAllTasks(this.params);
            case 39:
              tasks = _context10.sent;
              spotsToBeHighlighted = [];
              if (!(tasks.length > 0)) {
                _context10.next = 75;
                break;
              }
              document.querySelector(".doboard_task_widget-all_issues-container").innerHTML = '';
              i = 0;
            case 44:
              if (!(i < tasks.length)) {
                _context10.next = 71;
                break;
              }
              elTask = tasks[i]; // Data from api
              taskId = elTask.taskId;
              taskTitle = elTask.taskTitle;
              taskDataString = elTask.taskMeta;
              _formatDate = formatDate(elTask.taskLastUpdate), lastMessageTime = _formatDate.time;
              taskData = taskDataString ? JSON.parse(taskDataString) : null;
              currentPageURL = taskData ? taskData.pageURL : '';
              taskNodePath = taskData ? taskData.nodePath : ''; // Define publicity details
              taskPublicStatusImgSrc = '';
              taskPublicStatusHint = 'Task publicity is unknown';
              if (taskData && taskData.isPublic !== undefined) {
                if (taskData.isPublic) {
                  taskPublicStatusImgSrc = '/spotfix/img/public.svg';
                  taskPublicStatusHint = 'The task is public';
                } else {
                  taskPublicStatusImgSrc = '/spotfix/img/private.svg';
                  taskPublicStatusHint = 'The task is private and visible only for registered DoBoard users';
                }
              }
              if (!(!showOnlyCurrentPage || currentPageURL === window.location.href)) {
                _context10.next = 68;
                break;
              }
              issuesQuantityOnPage++;
              //define last message and update time
              /* let lastMessageDetails = await getTaskLastMessageDetails(this.params, taskId);
              const authorDetails = getTaskAuthorDetails(this.params, '1'); // todo MOCK! */
              _context10.next = 60;
              return getTaskFullDetails(this.params, taskId);
            case 60:
              taskFullDetails = _context10.sent;
              avatarData = getAvatarData(taskFullDetails);
              _variables = {
                taskTitle: taskTitle || '',
                taskAuthorAvatarImgSrc: taskFullDetails.taskAuthorAvatarImgSrc,
                taskAuthorName: taskFullDetails.taskAuthorName,
                taskPublicStatusImgSrc: taskPublicStatusImgSrc,
                taskPublicStatusHint: taskPublicStatusHint,
                taskLastMessage: taskFullDetails.lastMessageText,
                taskLastUpdate: lastMessageTime,
                nodePath: taskNodePath,
                taskId: taskId,
                avatarCSSClass: avatarData.avatarCSSClass,
                avatarStyle: avatarData.avatarStyle,
                taskAuthorInitials: avatarData.taskAuthorInitials,
                initialsClass: avatarData.initialsClass
              };
              _context10.t2 = document.querySelector(".doboard_task_widget-all_issues-container").innerHTML;
              _context10.next = 66;
              return this.loadTemplate('list_issues', _variables);
            case 66:
              document.querySelector(".doboard_task_widget-all_issues-container").innerHTML = _context10.t2 += _context10.sent;
              spotsToBeHighlighted.push(taskData);
            case 68:
              i++;
              _context10.next = 44;
              break;
            case 71:
              this.savedIssuesQuantityOnPage = issuesQuantityOnPage;
              this.savedIssuesQuantityAll = tasks.length;
              this.highlightElements(spotsToBeHighlighted);
              document.querySelector('.doboard_task_widget-header span').innerText += ' ' + getIssuesCounterString(this.savedIssuesQuantityOnPage, this.savedIssuesQuantityAll);
            case 75:
              if (tasks.length === 0 || issuesQuantityOnPage === 0) {
                document.querySelector(".doboard_task_widget-all_issues-container").innerHTML = '<div class="doboard_task_widget-issues_list_empty">The issues list is empty</div>';
              }

              // Bind the click event to the task elements for scrolling to the selected text and Go to concrete issue interface by click issue-item row
              this.bindIssuesClick();
              hideContainersSpinner(false);
              return _context10.abrupt("break", 123);
            case 79:
              _context10.next = 81;
              return getTaskFullDetails(this.params, this.currentActiveTaskId);
            case 81:
              taskDetails = _context10.sent;
              variables = {
                issueTitle: taskDetails.issueTitle,
                issueComments: taskDetails.issueComments,
                issuesCounter: getIssuesCounterString(),
                chevronBackTitle: 'Back to all spots'
              };
              issuesCommentsContainer = document.querySelector('.doboard_task_widget-concrete_issues-container');
              dayMessagesData = [];
              initIssuerID = localStorage.getItem('spotfix_user_id');
              userIsIssuer = false;
              if (!(taskDetails.issueComments.length > 0)) {
                _context10.next = 117;
                break;
              }
              issuesCommentsContainer.innerHTML = '';
              _iterator = _createForOfIteratorHelper(taskDetails.issueComments);
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  comment = _step.value;
                  userIsIssuer = Number(initIssuerID) === Number(comment.commentUserId);
                  _avatarData = getAvatarData({
                    taskAuthorAvatarImgSrc: comment.commentAuthorAvatarSrc,
                    taskAuthorName: comment.commentAuthorName,
                    userIsIssuer: userIsIssuer
                  });
                  commentData = {
                    commentAuthorName: comment.commentAuthorName,
                    commentBody: comment.commentBody,
                    commentDate: comment.commentDate,
                    commentTime: comment.commentTime,
                    issueTitle: variables.issueTitle,
                    issuesCounter: variables.issuesCounter,
                    commentContainerBackgroundSrc: userIsIssuer ? '/spotfix/img/comment-self-background.png' : '/spotfix/img/comment-other-background.png',
                    avatarCSSClass: _avatarData.avatarCSSClass,
                    avatarStyle: _avatarData.avatarStyle,
                    taskAuthorInitials: _avatarData.taskAuthorInitials,
                    initialsClass: _avatarData.initialsClass
                  };
                  if (dayMessagesData[comment.commentDate] === undefined) {
                    dayMessagesData[comment.commentDate] = [];
                    dayMessagesData[comment.commentDate].push(commentData);
                  } else {
                    dayMessagesData[comment.commentDate].push(commentData);
                  }
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              daysWrapperHTML = '';
              _context10.t3 = _regeneratorRuntime().keys(dayMessagesData);
            case 93:
              if ((_context10.t4 = _context10.t3()).done) {
                _context10.next = 114;
                break;
              }
              day = _context10.t4.value;
              currentDayMessages = dayMessagesData[day];
              dayMessagesWrapperHTML = '';
              currentDayMessages.sort(function (a, b) {
                return a.commentTime.localeCompare(b.commentTime);
              });
              _context10.t5 = _regeneratorRuntime().keys(currentDayMessages);
            case 99:
              if ((_context10.t6 = _context10.t5()).done) {
                _context10.next = 108;
                break;
              }
              messageId = _context10.t6.value;
              currentMessageData = currentDayMessages[messageId];
              _context10.t7 = dayMessagesWrapperHTML;
              _context10.next = 105;
              return this.loadTemplate('concrete_issue_messages', currentMessageData);
            case 105:
              dayMessagesWrapperHTML = _context10.t7 += _context10.sent;
              _context10.next = 99;
              break;
            case 108:
              _context10.t8 = daysWrapperHTML;
              _context10.next = 111;
              return this.loadTemplate('concrete_issue_day_content', {
                dayContentMonthDay: day,
                dayContentMessages: dayMessagesWrapperHTML
              });
            case 111:
              daysWrapperHTML = _context10.t8 += _context10.sent;
              _context10.next = 93;
              break;
            case 114:
              issuesCommentsContainer.innerHTML = daysWrapperHTML;
              _context10.next = 118;
              break;
            case 117:
              issuesCommentsContainer.innerHTML = 'No comments';
            case 118:
              // Scroll to the bottom comments
              setTimeout(function () {
                var contentContainer = document.querySelector('.doboard_task_widget-content');
                contentContainer.scrollTo({
                  top: contentContainer.scrollHeight,
                  behavior: 'smooth'
                });
              }, 0);
              sendForm = document.querySelector('.doboard_task_widget-send_message form');
              if (sendForm) {
                sendForm.addEventListener('submit', /*#__PURE__*/function () {
                  var _ref0 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee1(e) {
                    var input, commentText;
                    return _regeneratorRuntime().wrap(function _callee1$(_context1) {
                      while (1) switch (_context1.prev = _context1.next) {
                        case 0:
                          e.preventDefault();
                          input = sendForm.querySelector('.doboard_task_widget-send_message_input');
                          commentText = input.value.trim();
                          if (commentText) {
                            _context1.next = 5;
                            break;
                          }
                          return _context1.abrupt("return");
                        case 5:
                          input.disabled = true;
                          _context1.prev = 6;
                          _context1.next = 9;
                          return addTaskComment(_this2.params, _this2.currentActiveTaskId, commentText);
                        case 9:
                          input.value = '';
                          _context1.next = 12;
                          return _this2.createWidgetElement('concrete_issue');
                        case 12:
                          hideContainersSpinner(false);
                          _context1.next = 18;
                          break;
                        case 15:
                          _context1.prev = 15;
                          _context1.t0 = _context1["catch"](6);
                          alert('Error when adding a comment: ' + _context1.t0.message);
                        case 18:
                          input.disabled = false;
                        case 19:
                        case "end":
                          return _context1.stop();
                      }
                    }, _callee1, null, [[6, 15]]);
                  }));
                  return function (_x39) {
                    return _ref0.apply(this, arguments);
                  };
                }());
              }
              return _context10.abrupt("break", 123);
            case 122:
              return _context10.abrupt("break", 123);
            case 123:
              backToAllIssuesController = document.querySelector('.doboard_task_widget_return_to_all');
              if (backToAllIssuesController) {
                widgetClass = this;
                backToAllIssuesController.addEventListener('click', function (e) {
                  var self = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : widgetClass;
                  self.createWidgetElement('all_issues');
                });
              }
              paperclipController = document.querySelector('.doboard_task_widget-send_message_paperclip');
              if (paperclipController) {
                paperclipController.addEventListener('click', function (e) {
                  e.preventDefault();
                  alert('This action is not implemented yet..');
                });
              }
              ((_document$querySelect = document.querySelector('.doboard_task_widget-close_btn')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.addEventListener('click', function () {
                _this2.hide();
              })) || '';
              return _context10.abrupt("return", widgetContainer);
            case 129:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this);
      }));
      function createWidgetElement(_x38) {
        return _createWidgetElement.apply(this, arguments);
      }
      return createWidgetElement;
    }())
  }, {
    key: "bindIssuesClick",
    value: function bindIssuesClick() {
      var _this3 = this;
      document.querySelectorAll('.issue-item').forEach(function (item) {
        item.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
          var nodePath;
          return _regeneratorRuntime().wrap(function _callee11$(_context11) {
            while (1) switch (_context11.prev = _context11.next) {
              case 0:
                nodePath = JSON.parse(item.getAttribute('data-node-path'));
                scrollToNodePath(nodePath);
                _this3.currentActiveTaskId = item.getAttribute('data-task-id');
                _context11.next = 5;
                return _this3.createWidgetElement('concrete_issue');
              case 5:
                hideContainersSpinner(false);
              case 6:
              case "end":
                return _context11.stop();
            }
          }, _callee11);
        })));
      });
    }

    /**
     * Load the template
     *
     * @param templateName
     * @param variables
     * @return {Promise<string>}
     * @ToDo have to refactor templates loaded method: need to be templates included into the bundle
     *
     */
  }, {
    key: "loadTemplate",
    value: (function () {
      var _loadTemplate = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(templateName) {
        var variables,
          response,
          template,
          _i,
          _Object$entries,
          _Object$entries$_i,
          key,
          value,
          placeholder,
          _args12 = arguments;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              variables = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : {};
              _context12.next = 3;
              return fetch("/spotfix/templates/".concat(templateName, ".html"));
            case 3:
              response = _context12.sent;
              _context12.next = 6;
              return response.text();
            case 6:
              template = _context12.sent;
              for (_i = 0, _Object$entries = Object.entries(variables); _i < _Object$entries.length; _i++) {
                _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
                placeholder = "{{".concat(key, "}}");
                template = template.replaceAll(placeholder, value);
              }
              return _context12.abrupt("return", template);
            case 9:
            case "end":
              return _context12.stop();
          }
        }, _callee12);
      }));
      function loadTemplate(_x40) {
        return _loadTemplate.apply(this, arguments);
      }
      return loadTemplate;
    }())
  }, {
    key: "getTaskCount",
    value: function () {
      var _getTaskCount = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
        var projectToken, sessionId, tasks, filteredTasks, taskCountElement;
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              if (localStorage.getItem('spotfix_session_id')) {
                _context13.next = 2;
                break;
              }
              return _context13.abrupt("return", {});
            case 2:
              projectToken = this.params.projectToken;
              sessionId = localStorage.getItem('spotfix_session_id');
              _context13.next = 6;
              return getTasksDoboard(projectToken, sessionId, this.params.accountId, this.params.projectId);
            case 6:
              tasks = _context13.sent;
              filteredTasks = tasks.filter(function (task) {
                return task.taskMeta;
              });
              taskCountElement = document.getElementById('doboard_task_widget-task_count');
              if (taskCountElement) {
                taskCountElement.innerText = filteredTasks.length;
                taskCountElement.classList.remove('hidden');
              }
            case 10:
            case "end":
              return _context13.stop();
          }
        }, _callee13, this);
      }));
      function getTaskCount() {
        return _getTaskCount.apply(this, arguments);
      }
      return getTaskCount;
    }()
    /**
     * Bind events to the widget
     */
    /*bindEvents() {
        this.submitButton.addEventListener('click', () => this.submitTask());
    }*/
    /**
     * Submit the task
     */
  }, {
    key: "submitTask",
    value: (function () {
      var _submitTask = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(taskDetails) {
        var sessionId;
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              if (localStorage.getItem('spotfix_session_id')) {
                _context14.next = 6;
                break;
              }
              _context14.next = 3;
              return registerUser(taskDetails);
            case 3:
              if (!taskDetails.userPassword) {
                _context14.next = 6;
                break;
              }
              _context14.next = 6;
              return this.loginUser(taskDetails);
            case 6:
              sessionId = localStorage.getItem('spotfix_session_id');
              if (sessionId) {
                _context14.next = 9;
                break;
              }
              return _context14.abrupt("return", {
                needToLogin: true
              });
            case 9:
              _context14.next = 11;
              return handleCreateTask(sessionId, taskDetails);
            case 11:
              return _context14.abrupt("return", _context14.sent);
            case 12:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this);
      }));
      function submitTask(_x41) {
        return _submitTask.apply(this, arguments);
      }
      return submitTask;
    }())
  }, {
    key: "loginUser",
    value: function loginUser(taskDetails) {
      var userEmail = taskDetails.userEmail;
      var userPassword = taskDetails.userPassword;
      return _loginUser(userEmail, userPassword).then(function (response) {
        if (response.sessionId) {
          localStorage.setItem('spotfix_session_id', response.sessionId);
          localStorage.setItem('spotfix_user_id', response.userId);
          localStorage.setItem('spotfix_email', response.email);
        } else {
          throw new Error('Session ID not found in response');
        }
      }).catch(function (error) {
        throw error;
      });
    }

    /**
     * Hide the widget
     */
  }, {
    key: "hide",
    value: function hide() {
      this.removeTextSelection();
      this.createWidgetElement('wrap');
    }
  }, {
    key: "removeTextSelection",
    value: function removeTextSelection() {
      var textSelectionclassName = 'doboard_task_widget-text_selection';
      var spans = document.querySelectorAll('.' + textSelectionclassName);
      spans.forEach(function (span) {
        var parent = span.parentNode;
        while (span.firstChild) {
          parent.insertBefore(span.firstChild, span);
        }
        parent.removeChild(span);
      });
    }
  }, {
    key: "highlightElements",
    value: function highlightElements(spotsToBeHighlighted) {
      if (spotsToBeHighlighted.length === 0) {
        return;
      }
      var sortedSpots = new Map();
      // Aggregate selections by HtmlElement: [Element1 => [selection1, selection2], Element2 => [selection3]]
      spotsToBeHighlighted.forEach(function (spot) {
        var element = retrieveNodeFromPath(spot.nodePath);
        if (!sortedSpots.has(element)) {
          sortedSpots.set(element, []);
        }
        var currentData = sortedSpots.get(element);
        currentData.push({
          selectStartPosition: spot.startSelectPosition,
          selectEndPosition: spot.endSelectPosition
        });
      });
      // Render selections for the HtmlElement
      var highlightWrapperOpen = '<span class="doboard_task_widget-text_selection">';
      var highlightWrapperClose = '</span>';
      sortedSpots.forEach(function (spotSelectionsPositions, element) {
        // If the element no provided
        if (!element) {
          return;
        }
        //Is the element is the not simple text one
        if (element.children.length > 0) {
          // @ToDo make selection for the difficult elements
          //console.log('Try to highlight difficult element: ' + element.innerHTML); // The debug statement
          return;
        }
        var positions = [];
        spotSelectionsPositions.forEach(function (spotSelectionPositions) {
          positions.push({
            pos: spotSelectionPositions.selectStartPosition,
            type: 'start'
          }, {
            pos: spotSelectionPositions.selectEndPosition,
            type: 'end'
          });
        });
        positions.sort(function (a, b) {
          return b.pos - a.pos;
        });
        var text = element.innerHTML;
        var prevSlicePosition = null;
        var slicedStringWithSelections = [];
        positions.forEach(function (position) {
          var afterText = text.substring(position.pos, prevSlicePosition ? prevSlicePosition : position.pos);
          prevSlicePosition = position.pos;
          var span = position.type === 'start' ? highlightWrapperOpen : highlightWrapperClose;
          slicedStringWithSelections.unshift(afterText);
          slicedStringWithSelections.unshift(span);
        });
        element.innerHTML = text.substring(0, prevSlicePosition) + slicedStringWithSelections.join('');
      });
    }
  }, {
    key: "bindWidgetInputsInteractive",
    value: function bindWidgetInputsInteractive() {
      // Customising placeholders
      var inputs = document.querySelectorAll('.doboard_task_widget-field');
      inputs.forEach(function (input) {
        if (input.value) {
          input.classList.add('has-value');
        }
        input.addEventListener('input', function () {
          if (input.value) {
            input.classList.add('has-value');
          } else {
            input.classList.remove('has-value');
          }
        });
        input.addEventListener('blur', function () {
          if (!input.value) {
            input.classList.remove('has-value');
          }
        });
      });

      // Customising accordion dropdown
      var accordionController = document.querySelector('.doboard_task_widget-login span');
      if (accordionController) {
        accordionController.addEventListener('click', function () {
          this.closest('.doboard_task_widget-login').classList.toggle('active');
        });
      }
    }
  }]);
}();
var selectedData = {};
var widgetTimeout = null;
document.addEventListener('DOMContentLoaded', function () {
  new CleanTalkWidgetDoboard({}, 'wrap');
});
document.addEventListener('selectionchange', function (e) {
  if (widgetTimeout) {
    clearTimeout(widgetTimeout);
  }
  widgetTimeout = setTimeout(function () {
    var selection = window.getSelection();
    if (selection.type === 'Range') {
      var _selectedData = getSelectedData(selection);
      var widgetExist = document.querySelector('.doboard_task_widget-container');
      openWidget(_selectedData, widgetExist, 'create_issue');
    }
  }, 1000);
});

/**
 * Open the widget to create a task.
 * @param {*} selectedData
 * @param {*} widgetExist
 * @param {*} type
 */
function openWidget(selectedData, widgetExist, type) {
  if (selectedData && !widgetExist) {
    new CleanTalkWidgetDoboard(selectedData, type);
  }
}

/**
 * Get the selected data from the DOM
 * @param {Selection} selectedData
 * @returns {Object}
 */
function getSelectedData(selectedData) {
  var pageURL = window.location.href;
  var selectedText = selectedData.toString();
  var anchorOffset = selectedData.anchorOffset;
  var focusOffset = selectedData.focusOffset;
  var nodeToCalculate = selectedData.focusNode.nodeName === '#text' ? selectedData.focusNode.parentNode : selectedData.focusNode;
  return {
    startSelectPosition: Math.min(anchorOffset, focusOffset),
    endSelectPosition: Math.max(anchorOffset, focusOffset),
    selectedText: selectedText,
    pageURL: pageURL,
    nodePath: calculateNodePath(nodeToCalculate)
  };
}

/**
 * Calculate the path of a DOM node
 *
 * @param {Node} node
 * @return {int[]}
 */
function calculateNodePath(node) {
  var path = [];
  while (node) {
    var index = 0;
    var sibling = node.previousSibling;
    while (sibling) {
      if (sibling.nodeType === 1) {
        index++;
      }
      sibling = sibling.previousSibling;
    }
    path.unshift(index);
    node = node.parentNode;
  }

  // Hard fix - need to remove first element to work correctly
  path.shift();
  return path;
}

/**
 * Retrieve a DOM node from a path
 *
 * @param {int[]} path
 * @return {*|null}
 */
function retrieveNodeFromPath(path) {
  // @ToDo check if the path is correct
  if (!path) {
    return null;
  }
  var node = document;
  for (var i = 0; i < path.length; i++) {
    node = node.children[path[i]];
    if (!node) {
      return null;
    }
  }
  return node;
}

/**
 * Analyze the task selected data
 * @param {Object} taskSelectedData
 * @return {Element|null}
 */
function taskAnalysis(taskSelectedData) {
  var nodePath = taskSelectedData ? taskSelectedData.nodePath : '';
  return retrieveNodeFromPath(nodePath);
}

/**
 * Scroll to an element by tag, class, and text content
 * @param {string} path - The path to the element
 * @return {boolean} - True if the element was found and scrolled to, false otherwise
 */
function scrollToNodePath(path) {
  var node = retrieveNodeFromPath(path);
  if (node && node.scrollIntoView) {
    node.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
    return true;
  }
  return false;
}
function hideContainersSpinner() {
  var spinners = document.getElementsByClassName('doboard_task_widget-spinner_wrapper_for_containers');
  if (spinners.length > 0) {
    for (var i = 0; i < spinners.length; i++) {
      spinners[i].style.display = 'none';
    }
  }
  var containerClassesToShow = ['doboard_task_widget-all_issues-container', 'doboard_task_widget-concrete_issues-container'];
  for (var _i2 = 0; _i2 < containerClassesToShow.length; _i2++) {
    var containers = document.getElementsByClassName(containerClassesToShow[_i2]);
    if (containers.length > 0) {
      for (var _i3 = 0; _i3 < containers.length; _i3++) {
        containers[_i3].style.display = 'block';
      }
    }
  }
}
function getAvatarData(authorDetails) {
  var avatarStyle;
  var avatarCSSClass;
  var taskAuthorInitials;
  var hideAvatar = authorDetails.hasOwnProperty('userIsIssuer') && authorDetails.userIsIssuer === true;
  var initialsClass = 'doboard_task_widget-avatar-initials';
  if (authorDetails.taskAuthorAvatarImgSrc === null) {
    avatarStyle = "background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAE9GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4wLWMwMDAgNzkuMTcxYzI3ZmFiLCAyMDIyLzA4LzE2LTIyOjM1OjQxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuMCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjQtMDQtMTBUMTk6MDg6MDkrMDU6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDI0LTA0LTEwVDE5OjIxOjA4KzA1OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI0LTA0LTEwVDE5OjIxOjA4KzA1OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxNWRjOWI0Yy04ZWVmLTRkNTEtYmE0MS1kOTkzZTZmNjNmMTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTVkYzliNGMt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');";
    avatarCSSClass = 'doboard_task_widget-avatar_container';
    initialsClass += ' doboard_task_widget-hidden_element';
  } else {
    avatarStyle = "background-image:url('".concat(authorDetails.taskAuthorAvatarImgSrc, "');");
    avatarCSSClass = 'doboard_task_widget-avatar_container';
    initialsClass += ' doboard_task_widget-hidden_element';
  }
  return {
    avatarStyle: avatarStyle,
    avatarCSSClass: avatarCSSClass,
    taskAuthorInitials: taskAuthorInitials,
    initialsClass: initialsClass
  };
}