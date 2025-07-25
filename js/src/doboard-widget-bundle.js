"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
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
            taskId: responseBody.data.task_id
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
var _registerUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(projectToken, accountId, email, password) {
    var formData, response, responseBody;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          formData = new FormData();
          formData.append('project_token', projectToken);
          formData.append('account_id', accountId);
          if (email && password) {
            formData.append('email', email);
            formData.append('password', password);
          }
          _context2.next = 6;
          return fetch(DOBOARD_API_URL + '/user_registration', {
            method: 'POST',
            body: formData
          });
        case 6:
          response = _context2.sent;
          if (response.ok) {
            _context2.next = 9;
            break;
          }
          throw new Error('Authorization failed');
        case 9:
          _context2.next = 11;
          return response.json();
        case 11:
          responseBody = _context2.sent;
          if (!(!responseBody || !responseBody.data)) {
            _context2.next = 14;
            break;
          }
          throw new Error('Invalid response from server');
        case 14:
          if (!(responseBody.data.operation_status === 'FAILED')) {
            _context2.next = 16;
            break;
          }
          throw new Error(responseBody.data.operation_message);
        case 16:
          if (!(responseBody.data.operation_status === 'SUCCESS')) {
            _context2.next = 18;
            break;
          }
          return _context2.abrupt("return", {
            sessionId: responseBody.data.session_id,
            userId: responseBody.data.user_id,
            email: responseBody.data.email
          });
        case 18:
          throw new Error('Unknown error occurred during registration');
        case 19:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function registerUser(_x3, _x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var getTasksDoboard = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(sessionId, accountId, projectId) {
    var formData, response, responseBody;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          formData = new FormData();
          formData.append('session_id', sessionId);
          formData.append('user_id', localStorage.getItem('spotfix_user_id'));
          formData.append('project_id', projectId);
          _context3.next = 6;
          return fetch(DOBOARD_API_URL + '/' + accountId + '/task_get', {
            method: 'POST',
            body: formData
          });
        case 6:
          response = _context3.sent;
          console.log(response);
          if (response.ok) {
            _context3.next = 10;
            break;
          }
          throw new Error('Getting tasks failed');
        case 10:
          _context3.next = 12;
          return response.json();
        case 12:
          responseBody = _context3.sent;
          if (!(!responseBody || !responseBody.data)) {
            _context3.next = 15;
            break;
          }
          throw new Error('Invalid response from server');
        case 15:
          if (!(responseBody.data.operation_status === 'FAILED')) {
            _context3.next = 17;
            break;
          }
          throw new Error(responseBody.data.operation_message);
        case 17:
          if (!(responseBody.data.operation_status === 'SUCCESS')) {
            _context3.next = 19;
            break;
          }
          return _context3.abrupt("return", responseBody.data.tasks.map(function (task) {
            return {
              taskId: task.task_id,
              userId: task.user_id
            };
          }));
        case 19:
          throw new Error('Unknown error occurred during getting tasks');
        case 20:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function getTasksDoboard(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

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
      var _init = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(type) {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              this.params = this.getParams();
              _context4.next = 3;
              return this.createWidgetElement(type);
            case 3:
              this.widgetElement = _context4.sent;
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function init(_x10) {
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
      var checkbox = document.getElementById('doboard_task_widget-switch');
      var label = document.getElementById('doboard_task_widget-switch-label');
      var img = document.getElementById('doboard_task_widget-switch-img');
      var desc = document.getElementById('doboard_task_widget-switch-desc');
      var updateSwitch = function updateSwitch() {
        if (checkbox.checked) {
          label.textContent = 'Public';
          img.src = '/spotfix/img/public.svg';
          if (desc) desc.textContent = 'Anyone can see this conversation.';
        } else {
          label.textContent = 'Private';
          img.src = '/spotfix/img/private.svg';
          if (desc) desc.textContent = 'This conversation can see only you and support';
        }
      };
      if (checkbox && label && img) {
        checkbox.addEventListener('change', updateSwitch);
        updateSwitch();
      }
      if (submitButton) {
        submitButton.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
          var taskTitle, taskDescription, userName, userEmail, typeSend, taskDetails, submitTaskResult;
          return _regeneratorRuntime().wrap(function _callee5$(_context5) {
            while (1) switch (_context5.prev = _context5.next) {
              case 0:
                // @ToDo make the submit button disable with spinner
                taskTitle = document.getElementById('doboard_task_widget-title').value;
                taskDescription = document.getElementById('doboard_task_widget-description').value;
                userName = document.getElementById('doboard_task_widget-user_name').value;
                userEmail = document.getElementById('doboard_task_widget-user_email').value;
                typeSend = checkbox && !checkbox.checked ? 'private' : 'public';
                taskDetails = {
                  taskTitle: taskTitle,
                  taskDescription: taskDescription,
                  typeSend: typeSend,
                  selectedData: _this.selectedData,
                  userName: userName,
                  userEmail: userEmail,
                  projectToken: _this.params.projectToken,
                  projectId: _this.params.projectId,
                  accountId: _this.params.accountId
                };
                _context5.next = 8;
                return _this.submitTask(taskDetails);
              case 8:
                submitTaskResult = _context5.sent;
                localStorage.setItem("spotfix_task_data_".concat(submitTaskResult.taskId), JSON.stringify(_this.selectedData));
                _this.selectedData = {};
                _context5.next = 13;
                return _this.createWidgetElement('all_issues');
              case 13:
              case "end":
                return _context5.stop();
            }
          }, _callee5);
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
      var _createWidgetElement = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(type) {
        var _this2 = this,
          _document$querySelect;
        var widgetContainer, templateName, variables, issuesQuantityOnPage, tasks, i, elTask, taskTitle, taskDescription, currentPageURL, selectedPageURL, taskNodePath, _variables, taskSelectedData, taskElement, text, start, end, selectedText, beforeText, afterText;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              widgetContainer = document.querySelector('.doboard_task_widget') ? document.querySelector('.doboard_task_widget') : document.createElement('div');
              widgetContainer.className = 'doboard_task_widget';
              widgetContainer.innerHTML = '';
              templateName = '';
              variables = {};
              _context6.t0 = type;
              _context6.next = _context6.t0 === 'create_issue' ? 8 : _context6.t0 === 'wrap' ? 11 : _context6.t0 === 'all_issues' ? 13 : 15;
              break;
            case 8:
              templateName = 'create_issue';
              variables = {
                selectedText: this.selectedText,
                currentDomain: document.location.hostname || ''
              };
              return _context6.abrupt("break", 16);
            case 11:
              templateName = 'wrap';
              return _context6.abrupt("break", 16);
            case 13:
              templateName = 'all_issues';
              return _context6.abrupt("break", 16);
            case 15:
              return _context6.abrupt("break", 16);
            case 16:
              _context6.next = 18;
              return this.loadTemplate(templateName, variables);
            case 18:
              widgetContainer.innerHTML = _context6.sent;
              document.body.appendChild(widgetContainer);
              _context6.t1 = type;
              _context6.next = _context6.t1 === 'create_issue' ? 23 : _context6.t1 === 'wrap' ? 25 : _context6.t1 === 'all_issues' ? 27 : 56;
              break;
            case 23:
              this.bindCreateTaskEvents();
              return _context6.abrupt("break", 57);
            case 25:
              document.querySelector('.doboard_task_widget-wrap').addEventListener('click', function () {
                _this2.createWidgetElement('all_issues');
              });
              return _context6.abrupt("break", 57);
            case 27:
              issuesQuantityOnPage = 0;
              _context6.next = 30;
              return this.getTasks();
            case 30:
              tasks = _context6.sent;
              if (!(tasks.length > 0)) {
                _context6.next = 53;
                break;
              }
              i = 0;
            case 33:
              if (!(i < tasks.length)) {
                _context6.next = 53;
                break;
              }
              elTask = tasks[i];
              taskTitle = elTask.taskTitle;
              taskDescription = elTask.taskDescription;
              currentPageURL = elTask.selectedData.pageURL;
              selectedPageURL = window.location.href;
              taskNodePath = elTask.selectedData.nodePath;
              if (!(currentPageURL == selectedPageURL)) {
                _context6.next = 50;
                break;
              }
              issuesQuantityOnPage++;
              _variables = {
                taskTitle: taskTitle || '',
                taskDescription: taskDescription || '',
                avatarImg: '/spotfix/img/empty_avatar.png',
                nodePath: taskNodePath
              };
              _context6.t2 = document.querySelector(".doboard_task_widget-all_issues-container").innerHTML;
              _context6.next = 46;
              return this.loadTemplate('list_issues', _variables);
            case 46:
              document.querySelector(".doboard_task_widget-all_issues-container").innerHTML = _context6.t2 += _context6.sent;
              taskSelectedData = elTask.selectedData;
              taskElement = taskAnalysis(taskSelectedData);
              if (taskElement) {
                if (taskSelectedData.startSelectPosition && taskSelectedData.endSelectPosition) {
                  text = taskElement.innerHTML;
                  start = taskSelectedData.startSelectPosition;
                  end = taskSelectedData.endSelectPosition;
                  selectedText = text.substring(start, end);
                  beforeText = text.substring(0, start);
                  afterText = text.substring(end);
                  taskElement.innerHTML = beforeText + '<span class="doboard_task_widget-text_selection">' + selectedText + '</span>' + afterText;
                }
              }
            case 50:
              i++;
              _context6.next = 33;
              break;
            case 53:
              if (tasks.length == 0 || issuesQuantityOnPage == 0) {
                document.querySelector(".doboard_task_widget-all_issues-container").innerHTML = '<div class="doboard_task_widget-issues_list_empty">The issues list is empty</div>';
              }

              // Bind the click event to the task elements for scrolling to the selected text
              this.bindIssuesScroll();
              return _context6.abrupt("break", 57);
            case 56:
              return _context6.abrupt("break", 57);
            case 57:
              ((_document$querySelect = document.querySelector('.doboard_task_widget-close_btn')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.addEventListener('click', function () {
                _this2.hide();
              })) || '';
              return _context6.abrupt("return", widgetContainer);
            case 59:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function createWidgetElement(_x11) {
        return _createWidgetElement.apply(this, arguments);
      }
      return createWidgetElement;
    }())
  }, {
    key: "bindIssuesScroll",
    value: function bindIssuesScroll() {
      document.querySelectorAll('.issue-item').forEach(function (item) {
        item.addEventListener('click', function () {
          var nodePath = JSON.parse(this.getAttribute('data-node-path'));
          scrollToNodePath(nodePath);
        });
      });
    }

    /**
     * Load the template
     * @param {string} templateName
     * @param {object} variables
     * @return {string} template
     */
  }, {
    key: "loadTemplate",
    value: (function () {
      var _loadTemplate = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(templateName) {
        var variables,
          response,
          template,
          _i,
          _Object$entries,
          _Object$entries$_i,
          key,
          value,
          placeholder,
          _args7 = arguments;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              variables = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
              _context7.next = 3;
              return fetch("/spotfix/templates/".concat(templateName, ".html"));
            case 3:
              response = _context7.sent;
              _context7.next = 6;
              return response.text();
            case 6:
              template = _context7.sent;
              for (_i = 0, _Object$entries = Object.entries(variables); _i < _Object$entries.length; _i++) {
                _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
                placeholder = "{{".concat(key, "}}");
                template = template.replaceAll(placeholder, value);
              }
              return _context7.abrupt("return", template);
            case 9:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }));
      function loadTemplate(_x12) {
        return _loadTemplate.apply(this, arguments);
      }
      return loadTemplate;
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
    )
  }, {
    key: "submitTask",
    value: (function () {
      var _submitTask = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(taskDetails) {
        var sessionId;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              if (localStorage.getItem('spotfix_session_id')) {
                _context8.next = 3;
                break;
              }
              _context8.next = 3;
              return this.registerUser(taskDetails);
            case 3:
              sessionId = localStorage.getItem('spotfix_session_id');
              _context8.next = 6;
              return this.createTask(sessionId, taskDetails);
            case 6:
              return _context8.abrupt("return", _context8.sent);
            case 7:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function submitTask(_x13) {
        return _submitTask.apply(this, arguments);
      }
      return submitTask;
    }()
    /**
     * Create a task
     * @param {*} taskDetails
     * @param {string} sessionId
     */
    )
  }, {
    key: "createTask",
    value: function createTask(sessionId, taskDetails) {
      return createTaskDoboard(sessionId, taskDetails).then(function (response) {
        return response;
      });
    }
  }, {
    key: "registerUser",
    value: function registerUser(taskDetails) {
      var userEmail = taskDetails.userEmail;
      var userName = taskDetails.userName;
      var projectToken = taskDetails.projectToken;
      var accountId = taskDetails.accountId;
      return _registerUser(projectToken, accountId, userEmail, userName).then(function (response) {
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
     * Get the task
     * @return {[]}
     */
  }, {
    key: "getTasks",
    value: function getTasks() {
      if (!localStorage.getItem('spotfix_session_id')) {
        return {};
      }
      var sessionId = localStorage.getItem('spotfix_session_id');
      return getTasksDoboard(sessionId, this.params.accountId, this.params.projectId);
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
    key: "delay",
    value: function delay(ms) {
      return new Promise(function (resolve) {
        return setTimeout(resolve, ms);
      });
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
      var widgetExist = document.querySelector('.task-widget');
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
  return {
    startSelectPosition: selectedData.anchorOffset,
    endSelectPosition: selectedData.focusOffset,
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
  var nodePath = taskSelectedData.nodePath;
  return retrieveNodeFromPath(nodePath);
}

/**
 * Get the value of a cookie by name
 * @param {string} name
 * @return {string|null}
 */
function getCookie(name) {
  var value = "; ".concat(document.cookie);
  var parts = value.split("; ".concat(name, "="));
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return null;
}

/**
 * Set a cookie with specified parameters
 * @param {string} name - The name of the cookie
 * @param {string} value - The value of the cookie
 * @param {Date} expires - Expiration date of the cookie
 */
function setCookie(name, value, expires) {
  document.cookie = "".concat(name, "=").concat(value, "; path=/; expires=").concat(expires.toUTCString(), "; Secure; SameSite=Strict");
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