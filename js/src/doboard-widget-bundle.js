"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
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
    this.selectedText = selectedData.selectedText;
    this.widgetElement = this.createWidgetElement(type);
    this.taskDescription = this.widgetElement.querySelector('#doboard_task_description');
    this.submitButton = this.widgetElement.querySelector('#doboard_task_widget-submit_button');
    //this.bindEvents();
  }

  /**
   * Create widget element
   * @return {HTMLElement} widget element
   */
  return _createClass(CleanTalkWidgetDoboard, [{
    key: "createWidgetElement",
    value: function createWidgetElement(type) {
      var _this = this;
      var auth = true;
      if (!auth) {
        type = 'auth';
      }
      var widgetContainer = document.querySelector('.doboard_task_widget') ? document.querySelector('.doboard_task_widget') : document.createElement('div');
      widgetContainer.className = 'doboard_task_widget';
      widgetContainer.innerHTML = '';
      switch (type) {
        case 'create_task':
          widgetContainer.innerHTML = "\n                    <div class=\"doboard_task_widget-container doboard_task_widget-create\">\n                        <div class=\"doboard_task_widget-close_btn\">X</div>\n                        <h2>Doboard</h2>\n                        <input id=\"doboard_task_widget-title\" class=\"doboard_task_widget-title-input\" name=\"title\" placeholder=\"Title...\">\n                        <textarea id=\"doboard_task_widget-description\" class=\"doboard_task_widget-description-textarea\" name=\"description\" placeholder=\"Task description...\">".concat(this.selectedText, "</textarea>\n                        <button id=\"doboard_task_widget-submit_button\" class=\"doboard_task_widget-submit_button\">Create Task</button>\n                    </div>\n                ");
          break;
        case 'wrap':
          widgetContainer.innerHTML = "\n                    <div class=\"doboard_task_widget-container doboard_task_widget-wrap\">\n                        <img src=\"/spotfix/img/doboard-widget-logo.svg\" alt=\"Doboard logo\">\n                    </div>\n                ";
          break;
        case 'auth':
          widgetContainer.innerHTML = "\n                    <div class=\"doboard_task_widget-container doboard_task_widget-authorization\">\n                        <div class=\"doboard_task_widget-close_btn\">X</div>\n                        <h2>Doboard</h2>\n                        <input id=\"doboard_task_login\" name=\"login\" placeholder=\"Login or email\">\n                        <input id=\"doboard_task_password\" name=\"password\" placeholder=\"Password\">\n                        <button id=\"doboard_task_widget-submit_button\" class=\"doboard_task_widget-submit_button\">Authorization</button>\n                    </div>\n                ";
          break;
        case 'task_list':
          widgetContainer.innerHTML = "\n                    <div class=\"doboard_task_widget-container doboard_task_widget-task_list\">\n                        <div class=\"doboard_task_widget-close_btn\">X</div>\n                        <h2>Doboard</h2>\n                        <div class=\"doboard_task_widget-task_list-container\"></div>\n                    </div>\n                ";
          break;
        default:
          break;
      }
      document.body.appendChild(widgetContainer);
      switch (type) {
        case 'create_task':
          document.getElementById('doboard_task_widget-submit_button').addEventListener('click', function () {
            var taskTitle = document.getElementById('doboard_task_widget-title').value;
            var taskDescription = document.getElementById('doboard_task_widget-description').value;
            var typeSend = 'private';
            var taskDetails = {
              taskTitle: taskTitle,
              taskDescription: taskDescription,
              typeSend: typeSend,
              selectedData: selectedData
            };
            _this.submitTask(taskDetails);
            selectedData = {};
          });
          document.querySelector('.doboard_task_widget-close_btn').addEventListener('click', function () {
            _this.hide();
          });
          break;
        case 'wrap':
          document.querySelector('.doboard_task_widget-wrap').addEventListener('click', function () {
            _this.createWidgetElement('task_list');
          });
          break;
        case 'auth':
          document.querySelector('.doboard_task_widget-close_btn').addEventListener('click', function () {
            _this.hide();
          });
          break;
        case 'task_list':
          var tasks = this.getTasks();
          for (var i = 0; i < tasks.length; i++) {
            var elTask = tasks[i];
            var taskTitle = elTask.taskTitle;
            var taskDescription = elTask.taskDescription;
            var currentPageURL = elTask.selectedData.pageURL;
            var selectedPageURL = window.location.href;
            //console.log(elTask);

            if (currentPageURL == selectedPageURL) {
              document.querySelector(".doboard_task_widget-task_list-container").innerHTML += "\n                        <div class=\"doboard_task_widget-task_row\">\n                            <div class=\"doboard_task_widget-task_title\">\n                                <span class=\"doboard_task_widget-task-text_bold\">Title: </span>\n                                <span>".concat(taskTitle, "</span>\n                            </div>\n                            <div class=\"doboard_task_widget-task_description\">\n                                <span class=\"doboard_task_widget-task-text_bold\">Description: </span>\n                                <span>").concat(taskDescription, "</span>\n                            </div>\n                        </div>\n                        ");
              var taskElement = taskAnalysis(elTask.selectedData);
              if (taskElement) {
                taskElement.classList.add('doboard_task_widget-text_selection');
              }
            }
          }
          ;
          document.querySelector('.doboard_task_widget-close_btn').addEventListener('click', function () {
            _this.hide();
          });
          break;
        default:
          break;
      }
      return widgetContainer;
    }

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
    value: function submitTask(taskDetails) {
      if (taskDetails && taskDetails.taskTitle) {
        this.createTask(taskDetails);
        //this.taskInput.value = ''; нужна очистка полей
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
     * @return {JSON}
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
      document.querySelectorAll('.' + textSelectionclassName).forEach(function (n) {
        n.classList.remove(textSelectionclassName);
      });
    }
  }]);
}();
var selectedData = {};
var cssLink = document.createElement('link');
cssLink.rel = 'stylesheet';
cssLink.href = '/spotfix/styles/doboard-widget.css';
document.head.appendChild(cssLink);
document.addEventListener('DOMContentLoaded', function () {
  new CleanTalkWidgetDoboard('', 'wrap');
});
document.addEventListener('selectionchange', function (e) {
  console.log(document.getSelection());
  /*if (e.target.parentElement && e.target.parentElement.className.indexOf('doboard_task_widget') < 0) {
      selectedData = getSelectedData(window.getSelection(), e.target);
      let widgetExist = document.querySelector('.task-widget');
      openWidget(selectedData, widgetExist, 'create_task');
  }*/
});

/**
 * Open the widget to create a task.
 * @param {*} selectedText
 */
function openWidget(selectedData, widgetExist, type) {
  if (selectedData && !widgetExist) {
    new CleanTalkWidgetDoboard(selectedData, type);
  }
}
function getSelectedData(selectedData, selectedTarget) {
  var pageURL = window.location.href;
  var selectedTagName = selectedTarget.tagName;
  var selectedText = selectedData.toString();
  var selectedDataObj = {
    startSelectPosition: selectedData.anchorOffset,
    endSelectPosition: selectedData.focusOffset,
    selectedText: selectedText,
    pageURL: pageURL,
    selectedTagName: selectedTagName,
    selectedClassName: selectedTarget.className,
    selectedParentClassName: selectedTarget.parentNode.className
  };
  return selectedDataObj;
}
function findSelectElem(elem, parentClassName, tagName, selectedText) {
  var taskElement = '';
  if (elem.length > 0) {
    for (var i = 0; i < elem.length; i++) {
      var el = elem[i];
      if (el.parentNode.className == parentClassName && el.tagName == tagName && el.outerHTML.match(selectedText)) {
        taskElement = el;
      } else {
        console.log('Not match element');
      }
    }
    ;
  } else {
    console.log('Empty element');
  }
  return taskElement;
}
function taskAnalysis(task) {
  var className = task.selectedClassName;
  var parentClassName = task.selectedParentClassName;
  var tagName = task.selectedTagName;
  var selectedText = task.selectedText;
  var taskElement = '';
  console.log(task);
  if (className && parentClassName) {
    var elemByClassName = document.getElementsByClassName(className);
    taskElement = findSelectElem(elemByClassName, parentClassName, tagName, selectedText);
  }
  if (!className && parentClassName) {
    var elemByparentClassName = document.getElementsByClassName(parentClassName);
    for (var i = 0; i < elemByparentClassName.length; i++) {
      var childrenEl = elemByparentClassName[i].children;
      taskElement = findSelectElem(childrenEl, parentClassName, tagName, selectedText);
    }
  }
  return taskElement;
}