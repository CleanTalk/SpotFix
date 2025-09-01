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
          _context.next = 10;
          return fetch(DOBOARD_API_URL + '/' + accountId + '/task_add', {
            method: 'POST',
            body: formData
          });
        case 10:
          response = _context.sent;
          if (response.ok) {
            _context.next = 13;
            break;
          }
          throw new Error('Failed to create task');
        case 13:
          _context.next = 15;
          return response.json();
        case 15:
          responseBody = _context.sent;
          if (!(!responseBody || !responseBody.data)) {
            _context.next = 18;
            break;
          }
          throw new Error('Invalid response from server');
        case 18:
          if (!(responseBody.data.operation_status === 'FAILED')) {
            _context.next = 20;
            break;
          }
          throw new Error(responseBody.data.operation_message);
        case 20:
          if (!(responseBody.data.operation_status === 'SUCCESS')) {
            _context.next = 22;
            break;
          }
          return _context.abrupt("return", {
            taskId: responseBody.data.task_id,
            isPublic: 1 //todo MOCK!
          });
        case 22:
          throw new Error('Unknown error occurred during creating task');
        case 23:
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
var _registerUser = /*#__PURE__*/function () {
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
  return function registerUser(_x8, _x9, _x0, _x1) {
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
              taskCreatorTaskUser: task.creator_user_id
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
          console.log(responseBody);
          if (responseBody) {
            _context7.next = 11;
            break;
          }
          throw new Error('Invalid response from server');
        case 11:
          if (!(responseBody.data && responseBody.data.operation_status)) {
            _context7.next = 18;
            break;
          }
          if (!(responseBody.data.operation_status === 'FAILED')) {
            _context7.next = 14;
            break;
          }
          throw new Error(responseBody.data.operation_message);
        case 14:
          if (!(responseBody.data.operation_status === 'SUCCESS')) {
            _context7.next = 18;
            break;
          }
          if (!Array.isArray(responseBody.data.users)) {
            _context7.next = 17;
            break;
          }
          return _context7.abrupt("return", responseBody.data.users);
        case 17:
          return _context7.abrupt("return", []);
        case 18:
          if (!responseBody.operation_status) {
            _context7.next = 25;
            break;
          }
          if (!(responseBody.operation_status === 'FAILED')) {
            _context7.next = 21;
            break;
          }
          throw new Error(responseBody.operation_message);
        case 21:
          if (!(responseBody.operation_status === 'SUCCESS')) {
            _context7.next = 25;
            break;
          }
          if (!Array.isArray(responseBody.users)) {
            _context7.next = 24;
            break;
          }
          return _context7.abrupt("return", responseBody.users);
        case 24:
          return _context7.abrupt("return", []);
        case 25:
          throw new Error('Unknown error occurred during getting user');
        case 26:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function getUserDoboard(_x21, _x22, _x23) {
    return _ref7.apply(this, arguments);
  };
}();
function getTaskFullDetails(_x24, _x25) {
  return _getTaskFullDetails.apply(this, arguments);
}
function _getTaskFullDetails() {
  _getTaskFullDetails = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(params, taskId) {
    var sessionId, comments, users, lastComment, author, date, time, dt, avatarSrc, authorName;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          sessionId = localStorage.getItem('spotfix_session_id');
          _context14.next = 3;
          return getTaskCommentsDoboard(taskId, sessionId, params.accountId, params.projectToken);
        case 3:
          comments = _context14.sent;
          _context14.next = 6;
          return getUserDoboard(sessionId, params.projectToken, params.accountId);
        case 6:
          users = _context14.sent;
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
          // Вычисляем аватар и имя через отдельные функции
          avatarSrc = getAvatarSrc(author);
          authorName = getAuthorName(author);
          return _context14.abrupt("return", {
            taskId: taskId,
            taskAuthorAvatarImgSrc: avatarSrc,
            taskAuthorName: authorName,
            lastMessageText: lastComment ? lastComment.commentBody : 'No messages yet',
            lastMessageTime: time,
            issueTitle: comments.length > 0 ? comments[0].issueTitle : 'No Title',
            issueComments: comments.map(function (comment) {
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
          return _context14.stop();
      }
    }, _callee14);
  }));
  return _getTaskFullDetails.apply(this, arguments);
}
function handleCreateTask(_x26, _x27) {
  return _handleCreateTask.apply(this, arguments);
}
function _handleCreateTask() {
  _handleCreateTask = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(sessionId, taskDetails) {
    var result;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return createTaskDoboard(sessionId, taskDetails);
        case 3:
          result = _context15.sent;
          if (!(result && result.taskId && taskDetails.taskDescription)) {
            _context15.next = 7;
            break;
          }
          _context15.next = 7;
          return addTaskComment({
            projectToken: taskDetails.projectToken,
            accountId: taskDetails.accountId
          }, result.taskId, taskDetails.taskDescription);
        case 7:
          return _context15.abrupt("return", result);
        case 10:
          _context15.prev = 10;
          _context15.t0 = _context15["catch"](0);
          throw _context15.t0;
        case 13:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 10]]);
  }));
  return _handleCreateTask.apply(this, arguments);
}
function addTaskComment(_x28, _x29, _x30) {
  return _addTaskComment.apply(this, arguments);
}
function _addTaskComment() {
  _addTaskComment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16(params, taskId, commentText) {
    var sessionId;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          sessionId = localStorage.getItem('spotfix_session_id');
          if (sessionId) {
            _context16.next = 3;
            break;
          }
          throw new Error('No session');
        case 3:
          if (!(!params.projectToken || !params.accountId)) {
            _context16.next = 5;
            break;
          }
          throw new Error('Missing params');
        case 5:
          _context16.next = 7;
          return createTaskCommentDoboard(params.accountId, sessionId, taskId, commentText, params.projectToken);
        case 7:
          return _context16.abrupt("return", _context16.sent);
        case 8:
        case "end":
          return _context16.stop();
      }
    }, _callee16);
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
function getAllTasks(_x31) {
  return _getAllTasks.apply(this, arguments);
}
function _getAllTasks() {
  _getAllTasks = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17(params) {
    var projectToken, sessionId, tasksData;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          if (localStorage.getItem('spotfix_session_id')) {
            _context17.next = 2;
            break;
          }
          return _context17.abrupt("return", {});
        case 2:
          projectToken = params.projectToken;
          sessionId = localStorage.getItem('spotfix_session_id');
          _context17.next = 6;
          return getTasksDoboard(projectToken, sessionId, params.accountId, params.projectId);
        case 6:
          tasksData = _context17.sent;
          return _context17.abrupt("return", getTasksDoboard(projectToken, sessionId, params.accountId, params.projectId));
        case 8:
        case "end":
          return _context17.stop();
      }
    }, _callee17);
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
  var month = months[dateObj.getMonth()];
  var day = dateObj.getDate();
  var date = "".concat(month, " ").concat(day);
  var hours = dateObj.getHours().toString().padStart(2, '0');
  var minutes = dateObj.getMinutes().toString().padStart(2, '0');
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
function getIssuesCounterString() {
  var mock = {
    'totalTasks': 15,
    'tasksOnPage': 1
  };
  return "(".concat(mock.tasksOnPage, "/").concat(mock.totalTasks, ")");
}
function saveUserData(tasks) {
  // Save users avatars to local storage
}

// Получить аватар автора
function getAvatarSrc(author) {
  if (author && author.avatar) {
    if (_typeof(author.avatar) === 'object' && author.avatar.m) {
      return author.avatar.m;
    } else if (typeof author.avatar === 'string') {
      return author.avatar;
    }
  }
  return '/spotfix/img/empty_avatar.png';
}

// Получить имя автора
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
      var _init = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(type) {
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              this.params = this.getParams();
              _context8.next = 3;
              return this.createWidgetElement(type);
            case 3:
              this.widgetElement = _context8.sent;
              this.bindWidgetInputsInteractive();
            case 5:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function init(_x32) {
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
        submitButton.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
          var taskTitleElement, taskTitle, taskDescriptionElement, taskDescription, userName, userEmail, userPassword, loginSectionElement, _userEmailElement, userNameElement, userPasswordElement, userEmailElement, submitButton, taskDetails, submitTaskResult;
          return _regeneratorRuntime().wrap(function _callee9$(_context9) {
            while (1) switch (_context9.prev = _context9.next) {
              case 0:
                // Check required fields: Report about and Description
                taskTitleElement = document.getElementById('doboard_task_widget-title');
                taskTitle = taskTitleElement.value;
                if (taskTitle) {
                  _context9.next = 7;
                  break;
                }
                taskTitleElement.style.borderColor = 'red';
                taskTitleElement.focus();
                taskTitleElement.addEventListener('input', function () {
                  this.style.borderColor = '';
                });
                return _context9.abrupt("return");
              case 7:
                taskDescriptionElement = document.getElementById('doboard_task_widget-description');
                taskDescription = taskDescriptionElement.value;
                if (taskDescription) {
                  _context9.next = 14;
                  break;
                }
                taskDescriptionElement.style.borderColor = 'red';
                taskDescriptionElement.focus();
                taskDescriptionElement.addEventListener('input', function () {
                  this.style.borderColor = '';
                });
                return _context9.abrupt("return");
              case 14:
                // If login section is open, check required fields: Nickname, Email
                userName = '';
                userEmail = '';
                userPassword = '';
                loginSectionElement = document.querySelector('.doboard_task_widget-login');
                if (!(loginSectionElement && loginSectionElement.classList.contains('active'))) {
                  _context9.next = 42;
                  break;
                }
                _userEmailElement = document.getElementById('doboard_task_widget-user_email');
                userNameElement = document.getElementById('doboard_task_widget-user_name');
                userPasswordElement = document.getElementById('doboard_task_widget-user_password');
                userEmail = _userEmailElement.value;
                if (userEmail) {
                  _context9.next = 28;
                  break;
                }
                _userEmailElement.style.borderColor = 'red';
                _userEmailElement.focus();
                _userEmailElement.addEventListener('input', function () {
                  this.style.borderColor = '';
                });
                return _context9.abrupt("return");
              case 28:
                if (!(_userEmailElement && userNameElement)) {
                  _context9.next = 35;
                  break;
                }
                userName = userNameElement.value;
                if (userName) {
                  _context9.next = 35;
                  break;
                }
                userNameElement.style.borderColor = 'red';
                userNameElement.focus();
                userNameElement.addEventListener('input', function () {
                  this.style.borderColor = '';
                });
                return _context9.abrupt("return");
              case 35:
                if (!(_userEmailElement && userPasswordElement && !userNameElement)) {
                  _context9.next = 42;
                  break;
                }
                userPassword = userPasswordElement.value;
                if (userPassword) {
                  _context9.next = 42;
                  break;
                }
                userPasswordElement.style.borderColor = 'red';
                userPasswordElement.focus();
                userPasswordElement.addEventListener('input', function () {
                  this.style.borderColor = '';
                });
                return _context9.abrupt("return");
              case 42:
                // If it is the login request
                userEmailElement = document.getElementById('doboard_task_widget-user_email');
                userEmail = userEmailElement.value;

                // Make the submit button disable with spinner
                submitButton = document.getElementById('doboard_task_widget-submit_button');
                submitButton.disabled = true;
                submitButton.innerText = 'Creating task...';
                taskDetails = {
                  taskTitle: taskTitle,
                  taskDescription: taskDescription,
                  //typeSend: typeSend,
                  selectedData: _this.selectedData,
                  projectToken: _this.params.projectToken,
                  projectId: _this.params.projectId,
                  accountId: _this.params.accountId
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
                _context9.next = 53;
                return _this.submitTask(taskDetails);
              case 53:
                submitTaskResult = _context9.sent;
                // Return the submit button normal state
                submitButton.disabled = false;
                submitButton.style.cursor = 'pointer';
                if (!submitTaskResult.needToLogin) {
                  _context9.next = 58;
                  break;
                }
                return _context9.abrupt("return");
              case 58:
                if (submitTaskResult.isPublic !== undefined) {
                  _this.selectedData.isPublic = submitTaskResult.isPublic;
                }
                localStorage.setItem("spotfix_task_data_".concat(submitTaskResult.taskId), JSON.stringify(_this.selectedData));
                _this.selectedData = {};
                _context9.next = 63;
                return _this.createWidgetElement('all_issues');
              case 63:
                hideContainersSpinner(false);
              case 64:
              case "end":
                return _context9.stop();
            }
          }, _callee9);
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
      var _createWidgetElement = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee1(type) {
        var _this2 = this,
          _document$querySelect;
        var showOnlyCurrentPage,
          widgetContainer,
          templateName,
          variables,
          taskDetails,
          issuesQuantityOnPage,
          tasks,
          i,
          elTask,
          taskId,
          taskTitle,
          _formatDate,
          lastMessageTime,
          taskDataString,
          taskData,
          currentPageURL,
          taskNodePath,
          taskPublicStatusImgSrc,
          taskPublicStatusHint,
          taskFullDetails,
          avatarData,
          _variables,
          taskElement,
          text,
          start,
          end,
          selectedText,
          beforeText,
          afterText,
          _taskDetails,
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
          _args1 = arguments;
        return _regeneratorRuntime().wrap(function _callee1$(_context1) {
          while (1) switch (_context1.prev = _context1.next) {
            case 0:
              showOnlyCurrentPage = _args1.length > 1 && _args1[1] !== undefined ? _args1[1] : false;
              widgetContainer = document.querySelector('.doboard_task_widget') ? document.querySelector('.doboard_task_widget') : document.createElement('div');
              widgetContainer.className = 'doboard_task_widget';
              widgetContainer.innerHTML = '';
              templateName = '';
              variables = {};
              _context1.t0 = type;
              _context1.next = _context1.t0 === 'create_issue' ? 9 : _context1.t0 === 'wrap' ? 12 : _context1.t0 === 'all_issues' ? 14 : _context1.t0 === 'concrete_issue' ? 16 : 22;
              break;
            case 9:
              templateName = 'create_issue';
              variables = {
                selectedText: this.selectedText,
                currentDomain: document.location.hostname || ''
              };
              return _context1.abrupt("break", 23);
            case 12:
              templateName = 'wrap';
              return _context1.abrupt("break", 23);
            case 14:
              templateName = 'all_issues';
              return _context1.abrupt("break", 23);
            case 16:
              templateName = 'concrete_issue';
              // todo: this is call duplicate!
              _context1.next = 19;
              return getTaskFullDetails(this.params, this.currentActiveTaskId);
            case 19:
              taskDetails = _context1.sent;
              variables = {
                issueTitle: taskDetails.issueTitle,
                issueComments: taskDetails.issueComments,
                issuesCounter: getIssuesCounterString(),
                paperclipImgSrc: '/spotfix/img/send-message--paperclip.svg',
                sendButtonImgSrc: '/spotfix/img/send-message--button.svg',
                msgFieldBackgroundImgSrc: '/spotfix/img/send-message--input-background.svg'
              };
              return _context1.abrupt("break", 23);
            case 22:
              return _context1.abrupt("break", 23);
            case 23:
              _context1.next = 25;
              return this.loadTemplate(templateName, variables);
            case 25:
              widgetContainer.innerHTML = _context1.sent;
              document.body.appendChild(widgetContainer);
              _context1.t1 = type;
              _context1.next = _context1.t1 === 'create_issue' ? 30 : _context1.t1 === 'wrap' ? 32 : _context1.t1 === 'all_issues' ? 37 : _context1.t1 === 'concrete_issue' ? 78 : 122;
              break;
            case 30:
              this.bindCreateTaskEvents();
              return _context1.abrupt("break", 123);
            case 32:
              _context1.next = 34;
              return this.getTaskCount();
            case 34:
              document.querySelector('.doboard_task_widget-wrap').addEventListener('click', function () {
                _this2.createWidgetElement('all_issues');
              });
              hideContainersSpinner(false);
              return _context1.abrupt("break", 123);
            case 37:
              issuesQuantityOnPage = 0; //let tasks = await getUserTasks(this.params);
              _context1.next = 40;
              return getAllTasks(this.params);
            case 40:
              tasks = _context1.sent;
              saveUserData(tasks);
              if (!(tasks.length > 0)) {
                _context1.next = 74;
                break;
              }
              document.querySelector(".doboard_task_widget-all_issues-container").innerHTML = '';
              i = 0;
            case 45:
              if (!(i < tasks.length)) {
                _context1.next = 73;
                break;
              }
              elTask = tasks[i]; // Data from api
              taskId = elTask.taskId;
              taskTitle = elTask.taskTitle;
              _formatDate = formatDate(elTask.taskLastUpdate), lastMessageTime = _formatDate.time; // Data from local storage
              taskDataString = localStorage.getItem("spotfix_task_data_".concat(taskId));
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
                _context1.next = 70;
                break;
              }
              issuesQuantityOnPage++;
              //define last message and update time
              /* let lastMessageDetails = await getTaskLastMessageDetails(this.params, taskId);
              const authorDetails = getTaskAuthorDetails(this.params, '1'); // todo MOCK! */
              _context1.next = 61;
              return getTaskFullDetails(this.params, taskId);
            case 61:
              taskFullDetails = _context1.sent;
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
              _context1.t2 = document.querySelector(".doboard_task_widget-all_issues-container").innerHTML;
              _context1.next = 67;
              return this.loadTemplate('list_issues', _variables);
            case 67:
              document.querySelector(".doboard_task_widget-all_issues-container").innerHTML = _context1.t2 += _context1.sent;
              taskElement = taskAnalysis(taskData);
              if (taskElement) {
                if (taskData.startSelectPosition !== undefined && taskData.endSelectPosition !== undefined) {
                  text = taskElement.innerHTML;
                  start = taskData.startSelectPosition;
                  end = taskData.endSelectPosition;
                  selectedText = text.substring(start, end);
                  beforeText = text.substring(0, start);
                  afterText = text.substring(end);
                  taskElement.innerHTML = beforeText + '<span class="doboard_task_widget-text_selection">' + selectedText + '</span>' + afterText;
                }
              }
            case 70:
              i++;
              _context1.next = 45;
              break;
            case 73:
              document.querySelector('.doboard_task_widget-header span').innerText += ' (' + issuesQuantityOnPage + ')';
            case 74:
              if (tasks.length === 0 || issuesQuantityOnPage === 0) {
                document.querySelector(".doboard_task_widget-all_issues-container").innerHTML = '<div class="doboard_task_widget-issues_list_empty">The issues list is empty</div>';
              }

              // Bind the click event to the task elements for scrolling to the selected text and Go to concrete issue interface by click issue-item row
              this.bindIssuesClick();
              hideContainersSpinner(false);
              return _context1.abrupt("break", 123);
            case 78:
              _context1.next = 80;
              return getTaskFullDetails(this.params, this.currentActiveTaskId);
            case 80:
              _taskDetails = _context1.sent;
              console.log(_taskDetails);
              variables = {
                issueTitle: _taskDetails.issueTitle,
                issueComments: _taskDetails.issueComments,
                issuesCounter: getIssuesCounterString(),
                chevronBackTitle: 'Back to all issues'
              };
              issuesCommentsContainer = document.querySelector('.doboard_task_widget-concrete_issues-container');
              dayMessagesData = [];
              initIssuerID = localStorage.getItem('spotfix_user_id');
              console.table('initIssuerID', initIssuerID);
              userIsIssuer = false;
              if (!(_taskDetails.issueComments.length > 0)) {
                _context1.next = 118;
                break;
              }
              issuesCommentsContainer.innerHTML = '';
              _iterator = _createForOfIteratorHelper(_taskDetails.issueComments);
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
              _context1.t3 = _regeneratorRuntime().keys(dayMessagesData);
            case 94:
              if ((_context1.t4 = _context1.t3()).done) {
                _context1.next = 115;
                break;
              }
              day = _context1.t4.value;
              currentDayMessages = dayMessagesData[day];
              dayMessagesWrapperHTML = '';
              currentDayMessages.sort(function (a, b) {
                return a.commentTime.localeCompare(b.commentTime);
              });
              _context1.t5 = _regeneratorRuntime().keys(currentDayMessages);
            case 100:
              if ((_context1.t6 = _context1.t5()).done) {
                _context1.next = 109;
                break;
              }
              messageId = _context1.t6.value;
              currentMessageData = currentDayMessages[messageId];
              _context1.t7 = dayMessagesWrapperHTML;
              _context1.next = 106;
              return this.loadTemplate('concrete_issue_messages', currentMessageData);
            case 106:
              dayMessagesWrapperHTML = _context1.t7 += _context1.sent;
              _context1.next = 100;
              break;
            case 109:
              _context1.t8 = daysWrapperHTML;
              _context1.next = 112;
              return this.loadTemplate('concrete_issue_day_content', {
                dayContentMonthDay: day,
                dayContentMessages: dayMessagesWrapperHTML
              });
            case 112:
              daysWrapperHTML = _context1.t8 += _context1.sent;
              _context1.next = 94;
              break;
            case 115:
              issuesCommentsContainer.innerHTML = daysWrapperHTML;
              _context1.next = 119;
              break;
            case 118:
              issuesCommentsContainer.innerHTML = 'No comments';
            case 119:
              sendForm = document.querySelector('.doboard_task_widget-send_message form');
              if (sendForm) {
                sendForm.addEventListener('submit', /*#__PURE__*/function () {
                  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee0(e) {
                    var input, commentText;
                    return _regeneratorRuntime().wrap(function _callee0$(_context0) {
                      while (1) switch (_context0.prev = _context0.next) {
                        case 0:
                          e.preventDefault();
                          input = sendForm.querySelector('.doboard_task_widget-send_message_input');
                          commentText = input.value.trim();
                          if (commentText) {
                            _context0.next = 5;
                            break;
                          }
                          return _context0.abrupt("return");
                        case 5:
                          input.disabled = true;
                          _context0.prev = 6;
                          _context0.next = 9;
                          return addTaskComment(_this2.params, _this2.currentActiveTaskId, commentText);
                        case 9:
                          input.value = '';
                          _context0.next = 12;
                          return _this2.createWidgetElement('concrete_issue');
                        case 12:
                          hideContainersSpinner(false);
                          _context0.next = 18;
                          break;
                        case 15:
                          _context0.prev = 15;
                          _context0.t0 = _context0["catch"](6);
                          alert('Error when adding a comment: ' + _context0.t0.message);
                        case 18:
                          input.disabled = false;
                        case 19:
                        case "end":
                          return _context0.stop();
                      }
                    }, _callee0, null, [[6, 15]]);
                  }));
                  return function (_x34) {
                    return _ref9.apply(this, arguments);
                  };
                }());
              }
              return _context1.abrupt("break", 123);
            case 122:
              return _context1.abrupt("break", 123);
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
                  console.log('click');
                  alert('This action is not implemented yet..');
                });
              }
              ((_document$querySelect = document.querySelector('.doboard_task_widget-close_btn')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.addEventListener('click', function () {
                _this2.hide();
              })) || '';
              return _context1.abrupt("return", widgetContainer);
            case 129:
            case "end":
              return _context1.stop();
          }
        }, _callee1, this);
      }));
      function createWidgetElement(_x33) {
        return _createWidgetElement.apply(this, arguments);
      }
      return createWidgetElement;
    }())
  }, {
    key: "bindIssuesClick",
    value: function bindIssuesClick() {
      var _this3 = this;
      document.querySelectorAll('.issue-item').forEach(function (item) {
        item.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
          var nodePath;
          return _regeneratorRuntime().wrap(function _callee10$(_context10) {
            while (1) switch (_context10.prev = _context10.next) {
              case 0:
                nodePath = JSON.parse(item.getAttribute('data-node-path'));
                scrollToNodePath(nodePath);
                _this3.currentActiveTaskId = item.getAttribute('data-task-id');
                _context10.next = 5;
                return _this3.createWidgetElement('concrete_issue');
              case 5:
                hideContainersSpinner(false);
              case 6:
              case "end":
                return _context10.stop();
            }
          }, _callee10);
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
      var _loadTemplate = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(templateName) {
        var variables,
          response,
          template,
          _i,
          _Object$entries,
          _Object$entries$_i,
          key,
          value,
          placeholder,
          _args11 = arguments;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              variables = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : {};
              _context11.next = 3;
              return fetch("/spotfix/templates/".concat(templateName, ".html"));
            case 3:
              response = _context11.sent;
              _context11.next = 6;
              return response.text();
            case 6:
              template = _context11.sent;
              for (_i = 0, _Object$entries = Object.entries(variables); _i < _Object$entries.length; _i++) {
                _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
                placeholder = "{{".concat(key, "}}");
                template = template.replaceAll(placeholder, value);
              }
              return _context11.abrupt("return", template);
            case 9:
            case "end":
              return _context11.stop();
          }
        }, _callee11);
      }));
      function loadTemplate(_x35) {
        return _loadTemplate.apply(this, arguments);
      }
      return loadTemplate;
    }())
  }, {
    key: "getTaskCount",
    value: function () {
      var _getTaskCount = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
        var projectToken, sessionId, tasks, taskCountElement;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              if (localStorage.getItem('spotfix_session_id')) {
                _context12.next = 2;
                break;
              }
              return _context12.abrupt("return", {});
            case 2:
              projectToken = this.params.projectToken;
              sessionId = localStorage.getItem('spotfix_session_id');
              _context12.next = 6;
              return getTasksDoboard(projectToken, sessionId, this.params.accountId, this.params.projectId);
            case 6:
              tasks = _context12.sent;
              taskCountElement = document.getElementById('doboard_task_widget-task_count');
              if (taskCountElement) {
                taskCountElement.innerText = tasks.length;
                taskCountElement.classList.remove('hidden');
              }
            case 9:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this);
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
      var _submitTask = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(taskDetails) {
        var sessionId;
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              if (localStorage.getItem('spotfix_session_id')) {
                _context13.next = 6;
                break;
              }
              _context13.next = 3;
              return this.registerUser(taskDetails);
            case 3:
              if (!taskDetails.userPassword) {
                _context13.next = 6;
                break;
              }
              _context13.next = 6;
              return this.loginUser(taskDetails);
            case 6:
              sessionId = localStorage.getItem('spotfix_session_id');
              if (sessionId) {
                _context13.next = 9;
                break;
              }
              return _context13.abrupt("return", {
                needToLogin: true
              });
            case 9:
              _context13.next = 11;
              return handleCreateTask(sessionId, taskDetails);
            case 11:
              return _context13.abrupt("return", _context13.sent);
            case 12:
            case "end":
              return _context13.stop();
          }
        }, _callee13, this);
      }));
      function submitTask(_x36) {
        return _submitTask.apply(this, arguments);
      }
      return submitTask;
    }())
  }, {
    key: "registerUser",
    value: function registerUser(taskDetails) {
      var userEmail = taskDetails.userEmail;
      var userName = taskDetails.userName;
      var projectToken = taskDetails.projectToken;
      var accountId = taskDetails.accountId;
      return _registerUser(projectToken, accountId, userEmail, userName).then(function (response) {
        if (response.accountExists) {
          document.querySelector(".doboard_task_widget-accordion>.doboard_task_widget-input-container").innerText = 'Account already exists. Please, login usin your password.';
          document.querySelector(".doboard_task_widget-accordion>.doboard_task_widget-input-container.hidden").classList.remove('hidden');
          document.getElementById("doboard_task_widget-user_password").focus();
        } else if (response.sessionId) {
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
      this.createWidgetElement('wrap');
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
  return {
    startSelectPosition: Math.min(anchorOffset, focusOffset),
    endSelectPosition: Math.max(anchorOffset, focusOffset),
    selectedText: selectedText,
    pageURL: pageURL,
    nodePath: calculateNodePath(selectedData.focusNode.parentNode)
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
    avatarStyle = hideAvatar ? 'opacity:0;' : '';
    avatarCSSClass = 'doboard_task_widget-avatar_placeholder';
    taskAuthorInitials = authorDetails.taskAuthorName.substring(0, 2).toUpperCase();
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