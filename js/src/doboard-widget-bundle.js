"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) r.unshift(t); return function e() { for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; return e.done = !0, e; }; }
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
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var DOBOARD_API_URL = 'https://api-next.doboard.com';
var createTaskDoboard = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(sessionId, taskDetails) {
    var accountId, formData, response, responseBody;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          accountId = taskDetails.accountId;
          formData = new FormData();
          formData.append('session_id', sessionId);
          formData.append('project_token', taskDetails.projectToken);
          formData.append('project_id', taskDetails.projectId);
          formData.append('user_id', localStorage.getItem('spotfix_user_id'));
          formData.append('name', taskDetails.taskTitle);
          formData.append('comment', taskDetails.taskDescription);
          _context.n = 1;
          return fetch(DOBOARD_API_URL + '/' + accountId + '/task_add', {
            method: 'POST',
            body: formData
          });
        case 1:
          response = _context.v;
          if (response.ok) {
            _context.n = 2;
            break;
          }
          throw new Error('Failed to create task');
        case 2:
          _context.n = 3;
          return response.json();
        case 3:
          responseBody = _context.v;
          if (!(!responseBody || !responseBody.data)) {
            _context.n = 4;
            break;
          }
          throw new Error('Invalid response from server');
        case 4:
          if (!(responseBody.data.operation_status === 'FAILED')) {
            _context.n = 5;
            break;
          }
          throw new Error(responseBody.data.operation_message);
        case 5:
          if (!(responseBody.data.operation_status === 'SUCCESS')) {
            _context.n = 6;
            break;
          }
          return _context.a(2, {
            taskId: responseBody.data.task_id,
            isPublic: 1 //todo MOCK!
          });
        case 6:
          throw new Error('Unknown error occurred during creating task');
        case 7:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function createTaskDoboard(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var createTaskCommentDoboard = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(accountId, sessionId, taskId, comment, projectToken) {
    var status,
      response,
      responseBody,
      _args2 = arguments;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          status = _args2.length > 5 && _args2[5] !== undefined ? _args2[5] : 'ACTIVE';
          _context2.n = 1;
          return fetch(DOBOARD_API_URL + '/' + accountId + '/comment_add' + '?session_id=' + sessionId + '&task_id=' + taskId + '&comment=' + comment + '&project_token=' + projectToken + '&status=' + status, {
            method: 'GET'
          });
        case 1:
          response = _context2.v;
          if (response.ok) {
            _context2.n = 2;
            break;
          }
          throw new Error('Failed to create task comment');
        case 2:
          _context2.n = 3;
          return response.json();
        case 3:
          responseBody = _context2.v;
          if (!(!responseBody || !responseBody.data)) {
            _context2.n = 4;
            break;
          }
          throw new Error('Invalid response from server');
        case 4:
          if (!(responseBody.data.operation_status === 'FAILED')) {
            _context2.n = 5;
            break;
          }
          throw new Error(responseBody.data.operation_message);
        case 5:
          if (!(responseBody.data.operation_status === 'SUCCESS')) {
            _context2.n = 6;
            break;
          }
          return _context2.a(2, {
            commentId: responseBody.data.comment_id
          });
        case 6:
          throw new Error('Unknown error occurred during creating task comment');
        case 7:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return function createTaskCommentDoboard(_x3, _x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();
var _registerUser = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(projectToken, accountId, email, nickname) {
    var formData, response, responseBody;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          formData = new FormData();
          formData.append('project_token', projectToken);
          formData.append('account_id', accountId);
          if (email && nickname) {
            formData.append('email', email);
            formData.append('nickname', nickname);
          }
          _context3.n = 1;
          return fetch(DOBOARD_API_URL + '/user_registration', {
            method: 'POST',
            body: formData
          });
        case 1:
          response = _context3.v;
          if (response.ok) {
            _context3.n = 2;
            break;
          }
          throw new Error('Registration failed');
        case 2:
          _context3.n = 3;
          return response.json();
        case 3:
          responseBody = _context3.v;
          if (!(!responseBody || !responseBody.data)) {
            _context3.n = 4;
            break;
          }
          throw new Error('Invalid response from server');
        case 4:
          if (!(responseBody.data.operation_status === 'FAILED')) {
            _context3.n = 5;
            break;
          }
          throw new Error(responseBody.data.operation_message);
        case 5:
          if (!(responseBody.data.operation_status === 'SUCCESS')) {
            _context3.n = 7;
            break;
          }
          if (!(responseBody.data.user_email_confirmed === 1)) {
            _context3.n = 6;
            break;
          }
          return _context3.a(2, {
            accountExists: true
          });
        case 6:
          return _context3.a(2, {
            sessionId: responseBody.data.session_id,
            userId: responseBody.data.user_id,
            email: responseBody.data.email
          });
        case 7:
          throw new Error('Unknown error occurred during registration');
        case 8:
          return _context3.a(2);
      }
    }, _callee3);
  }));
  return function registerUser(_x8, _x9, _x0, _x1) {
    return _ref3.apply(this, arguments);
  };
}();
var _loginUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(email, password) {
    var formData, response, responseBody;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          formData = new FormData();
          formData.append('email', email);
          formData.append('password', password);
          _context4.n = 1;
          return fetch(DOBOARD_API_URL + '/user_authorize', {
            method: 'POST',
            body: formData
          });
        case 1:
          response = _context4.v;
          if (response.ok) {
            _context4.n = 2;
            break;
          }
          throw new Error('Authorization failed');
        case 2:
          _context4.n = 3;
          return response.json();
        case 3:
          responseBody = _context4.v;
          if (!(!responseBody || !responseBody.data)) {
            _context4.n = 4;
            break;
          }
          throw new Error('Invalid response from server');
        case 4:
          if (!(responseBody.data.operation_status === 'FAILED')) {
            _context4.n = 5;
            break;
          }
          throw new Error(responseBody.data.operation_message);
        case 5:
          if (!(responseBody.data.operation_status === 'SUCCESS')) {
            _context4.n = 6;
            break;
          }
          return _context4.a(2, {
            sessionId: responseBody.data.session_id,
            userId: responseBody.data.user_id,
            email: email
          });
        case 6:
          throw new Error('Unknown error occurred during registration');
        case 7:
          return _context4.a(2);
      }
    }, _callee4);
  }));
  return function loginUser(_x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();
var getTasksDoboard = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(projectToken, sessionId, accountId, projectId, userId) {
    var formData, response, responseBody;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          formData = new FormData();
          formData.append('project_token', projectToken);
          formData.append('session_id', sessionId);
          formData.append('project_id', projectId);
          formData.append('status', 'ACTIVE');
          if (userId) {
            formData.append('user_id', userId);
          }
          _context5.n = 1;
          return fetch(DOBOARD_API_URL + '/' + accountId + '/task_get', {
            method: 'POST',
            body: formData
          });
        case 1:
          response = _context5.v;
          if (response.ok) {
            _context5.n = 2;
            break;
          }
          throw new Error('Getting tasks failed');
        case 2:
          _context5.n = 3;
          return response.json();
        case 3:
          responseBody = _context5.v;
          if (!(!responseBody || !responseBody.data)) {
            _context5.n = 4;
            break;
          }
          throw new Error('Invalid response from server');
        case 4:
          if (!(responseBody.data.operation_status === 'FAILED')) {
            _context5.n = 5;
            break;
          }
          throw new Error(responseBody.data.operation_message);
        case 5:
          if (!(responseBody.data.operation_status === 'SUCCESS')) {
            _context5.n = 6;
            break;
          }
          return _context5.a(2, responseBody.data.tasks.map(function (task) {
            return {
              taskId: task.task_id,
              taskTitle: task.name,
              taskLastUpdate: task.updated,
              taskCreated: task.created,
              taskCreatorTaskUser: task.creator_user_id
            };
          }));
        case 6:
          throw new Error('Unknown error occurred during getting tasks');
        case 7:
          return _context5.a(2);
      }
    }, _callee5);
  }));
  return function getTasksDoboard(_x12, _x13, _x14, _x15, _x16) {
    return _ref5.apply(this, arguments);
  };
}();
var getTaskCommentsDoboard = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(taskId, sessionId, accountId, projectToken) {
    var status,
      response,
      responseBody,
      _args6 = arguments;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          status = _args6.length > 4 && _args6[4] !== undefined ? _args6[4] : 'ACTIVE';
          _context6.n = 1;
          return fetch(DOBOARD_API_URL + '/' + accountId + '/comment_get' + '?session_id=' + sessionId + '&status=' + status + '&task_id=' + taskId + '&project_token=' + projectToken, {
            method: 'GET'
          });
        case 1:
          response = _context6.v;
          if (response.ok) {
            _context6.n = 2;
            break;
          }
          throw new Error('Getting logs failed');
        case 2:
          _context6.n = 3;
          return response.json();
        case 3:
          responseBody = _context6.v;
          if (!(!responseBody || !responseBody.data)) {
            _context6.n = 4;
            break;
          }
          throw new Error('Invalid response from server');
        case 4:
          if (!(responseBody.data.operation_status === 'FAILED')) {
            _context6.n = 5;
            break;
          }
          throw new Error(responseBody.data.operation_message);
        case 5:
          if (!(responseBody.data.operation_status === 'SUCCESS')) {
            _context6.n = 6;
            break;
          }
          return _context6.a(2, responseBody.data.comments.map(function (comment) {
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
        case 6:
          throw new Error('Unknown error occurred during getting comments');
        case 7:
          return _context6.a(2);
      }
    }, _callee6);
  }));
  return function getTaskCommentsDoboard(_x17, _x18, _x19, _x20) {
    return _ref6.apply(this, arguments);
  };
}();
var getUserDoboard = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(sessionId, projectToken, accountId) {
    var response, responseBody;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          _context7.n = 1;
          return fetch(DOBOARD_API_URL + '/' + accountId + '/user_get' + '?session_id=' + sessionId + '&project_token=' + projectToken, {
            method: 'GET'
          });
        case 1:
          response = _context7.v;
          if (response.ok) {
            _context7.n = 2;
            break;
          }
          throw new Error('Getting user failed');
        case 2:
          _context7.n = 3;
          return response.json();
        case 3:
          responseBody = _context7.v;
          console.log(responseBody);
          if (responseBody) {
            _context7.n = 4;
            break;
          }
          throw new Error('Invalid response from server');
        case 4:
          if (!(responseBody.data && responseBody.data.operation_status)) {
            _context7.n = 7;
            break;
          }
          if (!(responseBody.data.operation_status === 'FAILED')) {
            _context7.n = 5;
            break;
          }
          throw new Error(responseBody.data.operation_message);
        case 5:
          if (!(responseBody.data.operation_status === 'SUCCESS')) {
            _context7.n = 7;
            break;
          }
          if (!Array.isArray(responseBody.data.users)) {
            _context7.n = 6;
            break;
          }
          return _context7.a(2, responseBody.data.users);
        case 6:
          return _context7.a(2, []);
        case 7:
          if (!responseBody.operation_status) {
            _context7.n = 10;
            break;
          }
          if (!(responseBody.operation_status === 'FAILED')) {
            _context7.n = 8;
            break;
          }
          throw new Error(responseBody.operation_message);
        case 8:
          if (!(responseBody.operation_status === 'SUCCESS')) {
            _context7.n = 10;
            break;
          }
          if (!Array.isArray(responseBody.users)) {
            _context7.n = 9;
            break;
          }
          return _context7.a(2, responseBody.users);
        case 9:
          return _context7.a(2, []);
        case 10:
          throw new Error('Unknown error occurred during getting user');
        case 11:
          return _context7.a(2);
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
  _getTaskFullDetails = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(params, taskId) {
    var sessionId, comments, users, lastComment, author, date, time, dt, avatarSrc, authorName;
    return _regenerator().w(function (_context14) {
      while (1) switch (_context14.n) {
        case 0:
          sessionId = localStorage.getItem('spotfix_session_id');
          _context14.n = 1;
          return getTaskCommentsDoboard(taskId, sessionId, params.accountId, params.projectToken);
        case 1:
          comments = _context14.v;
          _context14.n = 2;
          return getUserDoboard(sessionId, params.projectToken, params.accountId);
        case 2:
          users = _context14.v;
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
          return _context14.a(2, {
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
      }
    }, _callee14);
  }));
  return _getTaskFullDetails.apply(this, arguments);
}
function handleCreateTask(_x26, _x27) {
  return _handleCreateTask.apply(this, arguments);
}
function _handleCreateTask() {
  _handleCreateTask = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(sessionId, taskDetails) {
    var result, _t1;
    return _regenerator().w(function (_context15) {
      while (1) switch (_context15.p = _context15.n) {
        case 0:
          _context15.p = 0;
          _context15.n = 1;
          return createTaskDoboard(sessionId, taskDetails);
        case 1:
          result = _context15.v;
          if (!(result && result.taskId && taskDetails.taskDescription)) {
            _context15.n = 2;
            break;
          }
          _context15.n = 2;
          return addTaskComment({
            projectToken: taskDetails.projectToken,
            accountId: taskDetails.accountId
          }, result.taskId, taskDetails.taskDescription);
        case 2:
          return _context15.a(2, result);
        case 3:
          _context15.p = 3;
          _t1 = _context15.v;
          throw _t1;
        case 4:
          return _context15.a(2);
      }
    }, _callee15, null, [[0, 3]]);
  }));
  return _handleCreateTask.apply(this, arguments);
}
function addTaskComment(_x28, _x29, _x30) {
  return _addTaskComment.apply(this, arguments);
}
function _addTaskComment() {
  _addTaskComment = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(params, taskId, commentText) {
    var sessionId;
    return _regenerator().w(function (_context16) {
      while (1) switch (_context16.n) {
        case 0:
          sessionId = localStorage.getItem('spotfix_session_id');
          if (sessionId) {
            _context16.n = 1;
            break;
          }
          throw new Error('No session');
        case 1:
          if (!(!params.projectToken || !params.accountId)) {
            _context16.n = 2;
            break;
          }
          throw new Error('Missing params');
        case 2:
          _context16.n = 3;
          return createTaskCommentDoboard(params.accountId, sessionId, taskId, commentText, params.projectToken);
        case 3:
          return _context16.a(2, _context16.v);
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
  _getAllTasks = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(params) {
    var projectToken, sessionId, tasksData;
    return _regenerator().w(function (_context17) {
      while (1) switch (_context17.n) {
        case 0:
          if (localStorage.getItem('spotfix_session_id')) {
            _context17.n = 1;
            break;
          }
          return _context17.a(2, {});
        case 1:
          projectToken = params.projectToken;
          sessionId = localStorage.getItem('spotfix_session_id');
          _context17.n = 2;
          return getTasksDoboard(projectToken, sessionId, params.accountId, params.projectId);
        case 2:
          tasksData = _context17.v;
          return _context17.a(2, getTasksDoboard(projectToken, sessionId, params.accountId, params.projectId));
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
  return null;
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
      var _init = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(type) {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              this.params = this.getParams();
              _context8.n = 1;
              return this.createWidgetElement(type);
            case 1:
              this.widgetElement = _context8.v;
              this.bindWidgetInputsInteractive();
            case 2:
              return _context8.a(2);
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
        submitButton.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
          var taskTitleElement, taskTitle, taskDescriptionElement, taskDescription, userName, userEmail, userPassword, loginSectionElement, _userEmailElement, userNameElement, userPasswordElement, userEmailElement, submitButton, taskDetails, submitTaskResult;
          return _regenerator().w(function (_context9) {
            while (1) switch (_context9.n) {
              case 0:
                // Check required fields: Report about and Description
                taskTitleElement = document.getElementById('doboard_task_widget-title');
                taskTitle = taskTitleElement.value;
                if (taskTitle) {
                  _context9.n = 1;
                  break;
                }
                taskTitleElement.style.borderColor = 'red';
                taskTitleElement.focus();
                taskTitleElement.addEventListener('input', function () {
                  this.style.borderColor = '';
                });
                return _context9.a(2);
              case 1:
                taskDescriptionElement = document.getElementById('doboard_task_widget-description');
                taskDescription = taskDescriptionElement.value;
                if (taskDescription) {
                  _context9.n = 2;
                  break;
                }
                taskDescriptionElement.style.borderColor = 'red';
                taskDescriptionElement.focus();
                taskDescriptionElement.addEventListener('input', function () {
                  this.style.borderColor = '';
                });
                return _context9.a(2);
              case 2:
                // If login section is open, check required fields: Nickname, Email
                userName = '';
                userEmail = '';
                userPassword = '';
                loginSectionElement = document.querySelector('.doboard_task_widget-login');
                if (!(loginSectionElement && loginSectionElement.classList.contains('active'))) {
                  _context9.n = 5;
                  break;
                }
                _userEmailElement = document.getElementById('doboard_task_widget-user_email');
                userNameElement = document.getElementById('doboard_task_widget-user_name');
                userPasswordElement = document.getElementById('doboard_task_widget-user_password');
                userEmail = _userEmailElement.value;
                if (userEmail) {
                  _context9.n = 3;
                  break;
                }
                _userEmailElement.style.borderColor = 'red';
                _userEmailElement.focus();
                _userEmailElement.addEventListener('input', function () {
                  this.style.borderColor = '';
                });
                return _context9.a(2);
              case 3:
                if (!(_userEmailElement && userNameElement)) {
                  _context9.n = 4;
                  break;
                }
                userName = userNameElement.value;
                if (userName) {
                  _context9.n = 4;
                  break;
                }
                userNameElement.style.borderColor = 'red';
                userNameElement.focus();
                userNameElement.addEventListener('input', function () {
                  this.style.borderColor = '';
                });
                return _context9.a(2);
              case 4:
                if (!(_userEmailElement && userPasswordElement && !userNameElement)) {
                  _context9.n = 5;
                  break;
                }
                userPassword = userPasswordElement.value;
                if (userPassword) {
                  _context9.n = 5;
                  break;
                }
                userPasswordElement.style.borderColor = 'red';
                userPasswordElement.focus();
                userPasswordElement.addEventListener('input', function () {
                  this.style.borderColor = '';
                });
                return _context9.a(2);
              case 5:
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
                _context9.n = 6;
                return _this.submitTask(taskDetails);
              case 6:
                submitTaskResult = _context9.v;
                // Return the submit button normal state
                submitButton.disabled = false;
                submitButton.style.cursor = 'pointer';
                if (!submitTaskResult.needToLogin) {
                  _context9.n = 7;
                  break;
                }
                return _context9.a(2);
              case 7:
                if (submitTaskResult.isPublic !== undefined) {
                  _this.selectedData.isPublic = submitTaskResult.isPublic;
                }
                localStorage.setItem("spotfix_task_data_".concat(submitTaskResult.taskId), JSON.stringify(_this.selectedData));
                _this.selectedData = {};
                _context9.n = 8;
                return _this.createWidgetElement('all_issues');
              case 8:
                hideContainersSpinner(false);
              case 9:
                return _context9.a(2);
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
      var _createWidgetElement = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(type) {
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
          _args1 = arguments,
          _t2,
          _t3,
          _t4,
          _t5,
          _t6,
          _t7,
          _t8,
          _t9,
          _t0;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              showOnlyCurrentPage = _args1.length > 1 && _args1[1] !== undefined ? _args1[1] : false;
              widgetContainer = document.querySelector('.doboard_task_widget') ? document.querySelector('.doboard_task_widget') : document.createElement('div');
              widgetContainer.className = 'doboard_task_widget';
              widgetContainer.innerHTML = '';
              templateName = '';
              variables = {};
              _t2 = type;
              _context1.n = _t2 === 'create_issue' ? 1 : _t2 === 'wrap' ? 2 : _t2 === 'all_issues' ? 3 : _t2 === 'concrete_issue' ? 4 : 6;
              break;
            case 1:
              templateName = 'create_issue';
              variables = {
                selectedText: this.selectedText,
                currentDomain: document.location.hostname || ''
              };
              return _context1.a(3, 7);
            case 2:
              templateName = 'wrap';
              return _context1.a(3, 7);
            case 3:
              templateName = 'all_issues';
              return _context1.a(3, 7);
            case 4:
              templateName = 'concrete_issue';
              // todo: this is call duplicate!
              _context1.n = 5;
              return getTaskFullDetails(this.params, this.currentActiveTaskId);
            case 5:
              taskDetails = _context1.v;
              variables = {
                issueTitle: taskDetails.issueTitle,
                issueComments: taskDetails.issueComments,
                issuesCounter: getIssuesCounterString(),
                paperclipImgSrc: '/spotfix/img/send-message--paperclip.svg',
                sendButtonImgSrc: '/spotfix/img/send-message--button.svg',
                msgFieldBackgroundImgSrc: '/spotfix/img/send-message--input-background.svg'
              };
              return _context1.a(3, 7);
            case 6:
              return _context1.a(3, 7);
            case 7:
              _context1.n = 8;
              return this.loadTemplate(templateName, variables);
            case 8:
              widgetContainer.innerHTML = _context1.v;
              document.body.appendChild(widgetContainer);
              _t3 = type;
              _context1.n = _t3 === 'create_issue' ? 9 : _t3 === 'wrap' ? 10 : _t3 === 'all_issues' ? 12 : _t3 === 'concrete_issue' ? 20 : 30;
              break;
            case 9:
              this.bindCreateTaskEvents();
              return _context1.a(3, 31);
            case 10:
              _context1.n = 11;
              return this.getTaskCount();
            case 11:
              document.querySelector('.doboard_task_widget-wrap').addEventListener('click', function () {
                _this2.createWidgetElement('all_issues');
              });
              hideContainersSpinner(false);
              return _context1.a(3, 31);
            case 12:
              issuesQuantityOnPage = 0; //let tasks = await getUserTasks(this.params);
              _context1.n = 13;
              return getAllTasks(this.params);
            case 13:
              tasks = _context1.v;
              saveUserData(tasks);
              if (!(tasks.length > 0)) {
                _context1.n = 19;
                break;
              }
              document.querySelector(".doboard_task_widget-all_issues-container").innerHTML = '';
              i = 0;
            case 14:
              if (!(i < tasks.length)) {
                _context1.n = 18;
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
                _context1.n = 17;
                break;
              }
              issuesQuantityOnPage++;
              //define last message and update time
              /* let lastMessageDetails = await getTaskLastMessageDetails(this.params, taskId);
              const authorDetails = getTaskAuthorDetails(this.params, '1'); // todo MOCK! */
              _context1.n = 15;
              return getTaskFullDetails(this.params, taskId);
            case 15:
              taskFullDetails = _context1.v;
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
              _t4 = document.querySelector(".doboard_task_widget-all_issues-container").innerHTML;
              _context1.n = 16;
              return this.loadTemplate('list_issues', _variables);
            case 16:
              document.querySelector(".doboard_task_widget-all_issues-container").innerHTML = _t4 += _context1.v;
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
            case 17:
              i++;
              _context1.n = 14;
              break;
            case 18:
              document.querySelector('.doboard_task_widget-header span').innerText += ' (' + issuesQuantityOnPage + ')';
            case 19:
              if (tasks.length === 0 || issuesQuantityOnPage === 0) {
                document.querySelector(".doboard_task_widget-all_issues-container").innerHTML = '<div class="doboard_task_widget-issues_list_empty">The issues list is empty</div>';
              }

              // Bind the click event to the task elements for scrolling to the selected text and Go to concrete issue interface by click issue-item row
              this.bindIssuesClick();
              hideContainersSpinner(false);
              return _context1.a(3, 31);
            case 20:
              _context1.n = 21;
              return getTaskFullDetails(this.params, this.currentActiveTaskId);
            case 21:
              _taskDetails = _context1.v;
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
                _context1.n = 28;
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
              _t5 = _regeneratorKeys(dayMessagesData);
            case 22:
              if ((_t6 = _t5()).done) {
                _context1.n = 27;
                break;
              }
              day = _t6.value;
              currentDayMessages = dayMessagesData[day];
              dayMessagesWrapperHTML = '';
              currentDayMessages.sort(function (a, b) {
                return a.commentTime.localeCompare(b.commentTime);
              });
              _t7 = _regeneratorKeys(currentDayMessages);
            case 23:
              if ((_t8 = _t7()).done) {
                _context1.n = 25;
                break;
              }
              messageId = _t8.value;
              currentMessageData = currentDayMessages[messageId];
              _t9 = dayMessagesWrapperHTML;
              _context1.n = 24;
              return this.loadTemplate('concrete_issue_messages', currentMessageData);
            case 24:
              dayMessagesWrapperHTML = _t9 += _context1.v;
              _context1.n = 23;
              break;
            case 25:
              _t0 = daysWrapperHTML;
              _context1.n = 26;
              return this.loadTemplate('concrete_issue_day_content', {
                dayContentMonthDay: day,
                dayContentMessages: dayMessagesWrapperHTML
              });
            case 26:
              daysWrapperHTML = _t0 += _context1.v;
              _context1.n = 22;
              break;
            case 27:
              issuesCommentsContainer.innerHTML = daysWrapperHTML;
              _context1.n = 29;
              break;
            case 28:
              issuesCommentsContainer.innerHTML = 'No comments';
            case 29:
              sendForm = document.querySelector('.doboard_task_widget-send_message form');
              if (sendForm) {
                sendForm.addEventListener('submit', /*#__PURE__*/function () {
                  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(e) {
                    var input, commentText, _t;
                    return _regenerator().w(function (_context0) {
                      while (1) switch (_context0.p = _context0.n) {
                        case 0:
                          e.preventDefault();
                          input = sendForm.querySelector('.doboard_task_widget-send_message_input');
                          commentText = input.value.trim();
                          if (commentText) {
                            _context0.n = 1;
                            break;
                          }
                          return _context0.a(2);
                        case 1:
                          input.disabled = true;
                          _context0.p = 2;
                          _context0.n = 3;
                          return addTaskComment(_this2.params, _this2.currentActiveTaskId, commentText);
                        case 3:
                          input.value = '';
                          _context0.n = 4;
                          return _this2.createWidgetElement('concrete_issue');
                        case 4:
                          hideContainersSpinner(false);
                          _context0.n = 6;
                          break;
                        case 5:
                          _context0.p = 5;
                          _t = _context0.v;
                          alert('Error when adding a comment: ' + _t.message);
                        case 6:
                          input.disabled = false;
                        case 7:
                          return _context0.a(2);
                      }
                    }, _callee0, null, [[2, 5]]);
                  }));
                  return function (_x34) {
                    return _ref9.apply(this, arguments);
                  };
                }());
              }
              return _context1.a(3, 31);
            case 30:
              return _context1.a(3, 31);
            case 31:
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
              return _context1.a(2, widgetContainer);
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
        item.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
          var nodePath;
          return _regenerator().w(function (_context10) {
            while (1) switch (_context10.n) {
              case 0:
                nodePath = JSON.parse(item.getAttribute('data-node-path'));
                scrollToNodePath(nodePath);
                _this3.currentActiveTaskId = item.getAttribute('data-task-id');
                _context10.n = 1;
                return _this3.createWidgetElement('concrete_issue');
              case 1:
                hideContainersSpinner(false);
              case 2:
                return _context10.a(2);
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
      var _loadTemplate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(templateName) {
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
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              variables = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : {};
              _context11.n = 1;
              return fetch("/spotfix/templates/".concat(templateName, ".html"));
            case 1:
              response = _context11.v;
              _context11.n = 2;
              return response.text();
            case 2:
              template = _context11.v;
              for (_i = 0, _Object$entries = Object.entries(variables); _i < _Object$entries.length; _i++) {
                _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
                placeholder = "{{".concat(key, "}}");
                template = template.replaceAll(placeholder, value);
              }
              return _context11.a(2, template);
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
      var _getTaskCount = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
        var projectToken, sessionId, tasks, taskCountElement;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              if (localStorage.getItem('spotfix_session_id')) {
                _context12.n = 1;
                break;
              }
              return _context12.a(2, {});
            case 1:
              projectToken = this.params.projectToken;
              sessionId = localStorage.getItem('spotfix_session_id');
              _context12.n = 2;
              return getTasksDoboard(projectToken, sessionId, this.params.accountId, this.params.projectId);
            case 2:
              tasks = _context12.v;
              taskCountElement = document.getElementById('doboard_task_widget-task_count');
              if (taskCountElement) {
                taskCountElement.innerText = tasks.length;
                taskCountElement.classList.remove('hidden');
              }
            case 3:
              return _context12.a(2);
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
      var _submitTask = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(taskDetails) {
        var sessionId;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              if (localStorage.getItem('spotfix_session_id')) {
                _context13.n = 2;
                break;
              }
              _context13.n = 1;
              return this.registerUser(taskDetails);
            case 1:
              if (!taskDetails.userPassword) {
                _context13.n = 2;
                break;
              }
              _context13.n = 2;
              return this.loginUser(taskDetails);
            case 2:
              sessionId = localStorage.getItem('spotfix_session_id');
              if (sessionId) {
                _context13.n = 3;
                break;
              }
              return _context13.a(2, {
                needToLogin: true
              });
            case 3:
              _context13.n = 4;
              return handleCreateTask(sessionId, taskDetails);
            case 4:
              return _context13.a(2, _context13.v);
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