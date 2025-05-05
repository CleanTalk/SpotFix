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
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return r; }; var t, r = {}, e = Object.prototype, n = e.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag"; function c(t, r, e, n) { return Object.defineProperty(t, r, { value: e, enumerable: !n, configurable: !n, writable: !n }); } try { c({}, ""); } catch (t) { c = function c(t, r, e) { return t[r] = e; }; } function h(r, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype); return c(a, "_invoke", function (r, e, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var c = d(u, n); if (c) { if (c === f) continue; return c; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var h = s(r, e, n); if ("normal" === h.type) { if (o = n.done ? 4 : 2, h.arg === f) continue; return { value: h.arg, done: n.done }; } "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg); } }; }(r, n, new Context(o || [])), !0), a; } function s(t, r, e) { try { return { type: "normal", arg: t.call(r, e) }; } catch (t) { return { type: "throw", arg: t }; } } r.wrap = h; var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var l = {}; c(l, i, function () { return this; }); var p = Object.getPrototypeOf, y = p && p(p(x([]))); y && y !== e && n.call(y, i) && (l = y); var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l); function g(t) { ["next", "throw", "return"].forEach(function (r) { c(t, r, function (t) { return this._invoke(r, t); }); }); } function AsyncIterator(t, r) { function e(o, i, a, u) { var c = s(t[o], t, i); if ("throw" !== c.type) { var h = c.arg, f = h.value; return f && "object" == _typeof(f) && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) { e("next", t, a, u); }, function (t) { e("throw", t, a, u); }) : r.resolve(f).then(function (t) { h.value = t, a(h); }, function (t) { return e("throw", t, a, u); }); } u(c.arg); } var o; c(this, "_invoke", function (t, n) { function i() { return new r(function (r, o) { e(t, n, r, o); }); } return o = o ? o.then(i, i) : i(); }, !0); } function d(r, e) { var n = e.method, o = r.i[n]; if (o === t) return e.delegate = null, "throw" === n && r.i.return && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f; var i = s(o, r.i, e.arg); if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f; var a = i.arg; return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f); } function w(t) { this.tryEntries.push(t); } function m(r) { var e = r[4] || {}; e.type = "normal", e.arg = t, r[4] = e; } function Context(t) { this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0); } function x(r) { if (null != r) { var e = r[i]; if (e) return e.call(r); if ("function" == typeof r.next) return r; if (!isNaN(r.length)) { var o = -1, a = function e() { for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e; return e.value = t, e.done = !0, e; }; return a.next = a; } } throw new TypeError(_typeof(r) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) { var r = "function" == typeof t && t.constructor; return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name)); }, r.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t; }, r.awrap = function (t) { return { __await: t }; }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () { return this; }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(h(t, e, n, o), i); return r.isGeneratorFunction(e) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, g(v), c(v, u, "Generator"), c(v, i, function () { return this; }), c(v, "toString", function () { return "[object Generator]"; }), r.keys = function (t) { var r = Object(t), e = []; for (var n in r) e.unshift(n); return function t() { for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t; return t.done = !0, t; }; }, r.values = x, Context.prototype = { constructor: Context, reset: function reset(r) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(r) { if (this.done) throw r; var e = this; function n(t) { a.type = "throw", a.arg = r, e.next = t; } for (var o = e.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i[4], u = this.prev, c = i[1], h = i[2]; if (-1 === i[0]) return n("end"), !1; if (!c && !h) throw Error("try statement without catch or finally"); if (null != i[0] && i[0] <= u) { if (u < c) return this.method = "next", this.arg = t, n(c), !0; if (u < h) return n(h), !1; } } }, abrupt: function abrupt(t, r) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var n = this.tryEntries[e]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i); }, complete: function complete(t, r) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f; }, finish: function finish(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[2] === t) return this.complete(e[4], e[3]), m(e), f; } }, catch: function _catch(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[0] === t) { var n = e[4]; if ("throw" === n.type) { var o = n.arg; m(e); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(r, e, n) { return this.delegate = { i: x(r), r: e, n: n }, "next" === this.method && (this.arg = t), f; } }, r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var createTaskDoboard = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(taskDetails) {
    var response;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return fetch('https://api.yourtaskboard.com/tasks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskDetails)
          });
        case 2:
          response = _context.sent;
          if (response.ok) {
            _context.next = 5;
            break;
          }
          throw new Error('Failed to create task');
        case 5:
          _context.next = 7;
          return response.json();
        case 7:
          return _context.abrupt("return", _context.sent);
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function createTaskDoboard(_x) {
    return _ref.apply(this, arguments);
  };
}();
var getTasksDoboard = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var response;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return fetch('https://api.yourtaskboard.com/tasks');
        case 2:
          response = _context2.sent;
          if (response.ok) {
            _context2.next = 5;
            break;
          }
          throw new Error('Failed to fetch tasks');
        case 5:
          _context2.next = 7;
          return response.json();
        case 7:
          return _context2.abrupt("return", _context2.sent);
        case 8:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function getTasksDoboard() {
    return _ref2.apply(this, arguments);
  };
}();
var createTaskLS = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(taskDetails) {
    var keyTask;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          keyTask = 'doboard_task-' + Date.now();
          localStorage.setItem(keyTask, JSON.stringify(taskDetails));
        case 2:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function createTaskLS(_x2) {
    return _ref3.apply(this, arguments);
  };
}();
function getTasksLS() {
  var tasks = [];
  var i = 0;
  for (var key in localStorage) {
    if (key.indexOf("doboard_task-") == 0) {
      tasks[i] = JSON.parse(localStorage[key]);
      i++;
    }
  }
  ;
  return tasks;
}
;
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
              _context4.next = 2;
              return this.createWidgetElement(type);
            case 2:
              this.widgetElement = _context4.sent;
              this.taskDescription = this.widgetElement.querySelector('#doboard_task_description');
              this.submitButton = this.widgetElement.querySelector('#doboard_task_widget-submit_button');
            case 5:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function init(_x3) {
        return _init.apply(this, arguments);
      }
      return init;
    }())
  }, {
    key: "bindAuthEvents",
    value: function bindAuthEvents() {
      var _this = this;
      var authWidget = document.querySelector('.doboard_task_widget-authorization');
      if (authWidget) {
        var loginInput = document.getElementById('doboard_task_widget_login');
        var passwordInput = document.getElementById('doboard_task_widget_password');
        var submitButton = document.getElementById('doboard_task_widget-submit_button');
        submitButton.addEventListener('click', function () {
          var login = loginInput.value;
          var password = passwordInput.value;
          console.log('Login:', login);
          console.log('Password:', password);

          // Устанавливаем куку авторизации
          document.cookie = "doboard_task_widget_user_authorized=true; path=/";
          console.log('Authorization cookie set.');

          // Закрываем виджет после авторизации
          _this.hide();
        });
      }
    }

    /**
     * Binding events to create a task
     */
  }, {
    key: "bindCreateTaskEvents",
    value: function bindCreateTaskEvents() {
      var _this2 = this;
      var submitButton = document.getElementById('doboard_task_widget-submit_button');
      if (submitButton) {
        submitButton.addEventListener('click', function () {
          var taskTitle = document.getElementById('doboard_task_widget-title').value;
          var taskDescription = document.getElementById('doboard_task_widget-description').value;
          var typeSend = 'private';
          var taskDetails = {
            taskTitle: taskTitle,
            taskDescription: taskDescription,
            typeSend: typeSend,
            selectedData: _this2.selectedData
          };
          _this2.submitTask(taskDetails);
          _this2.selectedData = {};
        });
      }
    }

    /**
     * Create widget element
     * @return {HTMLElement} widget element
     */
  }, {
    key: "createWidgetElement",
    value: (function () {
      var _createWidgetElement = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(type) {
        var _themeData,
          _themeData2,
          _themeData3,
          _themeData4,
          _this3 = this,
          _document$querySelect;
        var widgetContainer, tasks, issuesQuantityOnPage, i, elTask, taskTitle, taskDescription, currentPageURL, selectedPageURL, _themeData5, taskSelectedData, taskElement, text, start, end, selectedText, beforeText, afterText;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              /*let auth = true;
              if (!auth) {
                  type = 'auth';
              }*/
              widgetContainer = document.querySelector('.doboard_task_widget') ? document.querySelector('.doboard_task_widget') : document.createElement('div');
              widgetContainer.className = 'doboard_task_widget';
              widgetContainer.innerHTML = '';
              tasks = this.getTasks();
              _context5.t0 = type;
              _context5.next = _context5.t0 === 'create_issue' ? 7 : _context5.t0 === 'wrap' ? 10 : _context5.t0 === 'auth' ? 13 : _context5.t0 === 'all_issues' ? 16 : 19;
              break;
            case 7:
              templateName = 'create_issue';
              variables = {
                selectedText: this.selectedText,
                themeUrl: ((_themeData = themeData) === null || _themeData === void 0 ? void 0 : _themeData.themeUrl) || '',
                currentDomain: document.location.hostname || ''
              };
              return _context5.abrupt("break", 20);
            case 10:
              templateName = 'wrap';
              variables = {
                themeUrl: ((_themeData2 = themeData) === null || _themeData2 === void 0 ? void 0 : _themeData2.themeUrl) || ''
              };
              return _context5.abrupt("break", 20);
            case 13:
              templateName = 'auth';
              variables = {
                themeUrl: ((_themeData3 = themeData) === null || _themeData3 === void 0 ? void 0 : _themeData3.themeUrl) || ''
              };
              return _context5.abrupt("break", 20);
            case 16:
              templateName = 'all_issues';
              variables = {
                themeUrl: ((_themeData4 = themeData) === null || _themeData4 === void 0 ? void 0 : _themeData4.themeUrl) || ''
              };
              return _context5.abrupt("break", 20);
            case 19:
              return _context5.abrupt("break", 20);
            case 20:
              _context5.next = 22;
              return this.loadTemplate(templateName, variables);
            case 22:
              widgetContainer.innerHTML = _context5.sent;
              document.body.appendChild(widgetContainer);
              _context5.t1 = type;
              _context5.next = _context5.t1 === 'create_issue' ? 27 : _context5.t1 === 'wrap' ? 29 : _context5.t1 === 'auth' ? 31 : _context5.t1 === 'all_issues' ? 33 : 57;
              break;
            case 27:
              this.bindCreateTaskEvents();
              return _context5.abrupt("break", 58);
            case 29:
              document.querySelector('.doboard_task_widget-wrap').addEventListener('click', function () {
                if (!isUserAuthorized()) {
                  _this3.createWidgetElement('auth');
                } else {
                  _this3.createWidgetElement('all_issues');
                }
              });
              return _context5.abrupt("break", 58);
            case 31:
              this.bindAuthEvents(); // Binding events for authorization
              return _context5.abrupt("break", 58);
            case 33:
              issuesQuantityOnPage = 0;
              if (!(tasks.length > 0)) {
                _context5.next = 55;
                break;
              }
              i = 0;
            case 36:
              if (!(i < tasks.length)) {
                _context5.next = 55;
                break;
              }
              elTask = tasks[i];
              taskTitle = elTask.taskTitle;
              taskDescription = elTask.taskDescription;
              currentPageURL = elTask.selectedData.pageURL;
              selectedPageURL = window.location.href;
              if (!(currentPageURL == selectedPageURL)) {
                _context5.next = 52;
                break;
              }
              issuesQuantityOnPage++;
              variables = {
                taskTitle: taskTitle || '',
                taskDescription: taskDescription || '',
                themeUrl: ((_themeData5 = themeData) === null || _themeData5 === void 0 ? void 0 : _themeData5.themeUrl) || '',
                avatarImg: '/spotfix/img/empty_avatar.png'
              };
              _context5.t2 = document.querySelector(".doboard_task_widget-all_issues-container").innerHTML;
              _context5.next = 48;
              return this.loadTemplate('list_issues', variables);
            case 48:
              document.querySelector(".doboard_task_widget-all_issues-container").innerHTML = _context5.t2 += _context5.sent;
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
            case 52:
              i++;
              _context5.next = 36;
              break;
            case 55:
              if (tasks.length == 0 || issuesQuantityOnPage == 0) {
                document.querySelector(".doboard_task_widget-all_issues-container").innerHTML = '<div class="doboard_task_widget-issues_list_empty">The issues list is empty</div>';
              }
              return _context5.abrupt("break", 58);
            case 57:
              return _context5.abrupt("break", 58);
            case 58:
              ((_document$querySelect = document.querySelector('.doboard_task_widget-close_btn')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.addEventListener('click', function () {
                _this3.hide();
              })) || '';
              return _context5.abrupt("return", widgetContainer);
            case 60:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function createWidgetElement(_x4) {
        return _createWidgetElement.apply(this, arguments);
      }
      return createWidgetElement;
    }()
    /**
     * Load the template
     * @param {string} templateName
     * @param {object} variables
     * @return {string} template
     */
    )
  }, {
    key: "loadTemplate",
    value: (function () {
      var _loadTemplate = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(templateName) {
        var variables,
          response,
          template,
          _i,
          _Object$entries,
          _Object$entries$_i,
          key,
          value,
          placeholder,
          _args6 = arguments;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              variables = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
              _context6.next = 3;
              return fetch("/wp-content/themes/twentytwentyfourspotfix/spotfix/templates/".concat(templateName, ".html"));
            case 3:
              response = _context6.sent;
              _context6.next = 6;
              return response.text();
            case 6:
              template = _context6.sent;
              for (_i = 0, _Object$entries = Object.entries(variables); _i < _Object$entries.length; _i++) {
                _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
                placeholder = "{{".concat(key, "}}");
                template = template.replaceAll(placeholder, value);
              }
              return _context6.abrupt("return", template);
            case 9:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      function loadTemplate(_x5) {
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
    value: function submitTask(taskDetails) {
      if (taskDetails && taskDetails.taskTitle) {
        this.createTask(taskDetails);
        //this.taskInput.value = ''; We need to clear the fields
        this.hide();
      } else {
        alert('Please enter task title.');
      }
    }

    /**
     * Create a task
     * @param {*} taskDetails
     */
  }, {
    key: "createTask",
    value: function createTask(taskDetails) {
      // Call the API to create a task
      // This function should be implemented in api.js
      if (taskDetails.typeSend == 'private') {
        createTaskLS(taskDetails);
      } else {
        createTaskDoboard(taskDetails);
      }
    }

    /**
     * Get the task
     * @return {[]}
     */
  }, {
    key: "getTasks",
    value: function getTasks() {
      //let tasksDoboard = getTasksDoboard();
      var tasksLS = getTasksLS();
      return tasksLS;
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
  }]);
}();
var selectedData = {};

/*let cssLink = document.createElement('link');
cssLink.rel = 'stylesheet';
cssLink.href = '/spotfix/styles/doboard-widget.css';
document.head.appendChild(cssLink);*/

document.addEventListener('DOMContentLoaded', function () {
  // Проверяем, авторизован ли пользователь
  if (!isUserAuthorized()) {
    // Если пользователь не авторизован, открываем интерфейс авторизации
    new CleanTalkWidgetDoboard({}, 'auth');
  } else {
    // Если пользователь авторизован, открываем интерфейс wrap или другой
    new CleanTalkWidgetDoboard({}, 'wrap');
  }
});
var widgetTimeout;
document.addEventListener('selectionchange', function (e) {
  if (widgetTimeout) {
    clearTimeout(widgetTimeout);
  }
  widgetTimeout = setTimeout(function () {
    var selection = window.getSelection();
    if (selection.type === 'Range') {
      var _selectedData = getSelectedData(selection);
      var widgetExist = document.querySelector('.task-widget');
      if (!isUserAuthorized()) {
        openWidget(_selectedData, widgetExist, 'auth');
      } else {
        openWidget(_selectedData, widgetExist, 'create_issue');
      }
    }
  }, 1000);
});

/**
 * Open the widget to create a task.
 * @param {*} selectedText
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
 * Check if the user is authorized
 * @return {boolean}
 */
function isUserAuthorized() {
  var authCookie = getCookie('doboard_task_widget_user_authorized'); // Замените 'doboard_task_widget_user_authorized' на имя вашей куки
  return authCookie === 'true'; // Предполагается, что кука содержит 'true' для авторизованных пользователей
}