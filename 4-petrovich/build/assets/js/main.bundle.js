!function(r){var n={};function e(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return r[t].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=r,e.c=n,e.d=function(r,n,t){e.o(r,n)||Object.defineProperty(r,n,{enumerable:!0,get:t})},e.r=function(r){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},e.t=function(r,n){if(1&n&&(r=e(r)),8&n)return r;if(4&n&&"object"==typeof r&&r&&r.__esModule)return r;var t=Object.create(null);if(e.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:r}),2&n&&"string"!=typeof r)for(var o in r)e.d(t,o,function(n){return r[n]}.bind(null,o));return t},e.n=function(r){var n=r&&r.__esModule?function(){return r.default}:function(){return r};return e.d(n,"a",n),n},e.o=function(r,n){return Object.prototype.hasOwnProperty.call(r,n)},e.p="",e(e.s="./src/js/index.js")}({"./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */function(module,exports,__webpack_require__){"use strict";eval("\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nwindow.onload = function () {\n  var submitButton = document.querySelector('.form__submit');\n  var inputEmail = document.querySelector('.form-input__email input');\n  var inputPassword = document.querySelector('.form-input__password input');\n  var form = document.querySelector('.form');\n  var formError = document.querySelector('.form__error');\n  var formWrapper = document.querySelector('.form__wrapper');\n\n  function showError(message) {\n    if (message) {\n      formError.innerHTML = '\\u041E\\u0448\\u0438\\u0431\\u043A\\u0430: ' + message;\n    }\n  }\n\n  function validateEmail(inputText) {\n    var mailformat = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n    return mailformat.test(inputText);\n  }\n\n  function validatePassword(inputText) {\n    if (inputText.length > 3) {\n      inputPassword.focus();\n      return true;\n    }\n    return false;\n  }\n\n  function postForm() {\n    var url = 'http://test.kluatr.ru/api/user/login';\n    var data = new FormData(form);\n    fetch(url, {\n      method: 'POST',\n      body: data,\n      credentials: 'include'\n    }).then(function (response) {\n      return response.json();\n    }).then(function (data) {\n      if (data.success == false) {\n        showError(data.error);\n      } else {\n        getPoints();\n      }\n    }).catch(function (error) {\n      throw new Error(error);\n    });\n  }\n\n  function getPoints() {\n    var url = 'http://test.kluatr.ru/api/user/data';\n    fetch(url, {\n      credentials: 'include'\n    }).then(function (response) {\n      return response.json();\n    }).catch(function (error) {\n      showError('что-то пошло не так');\n      throw new Error(error);\n    }).then(function (data) {\n      return showPoints(data);\n    });\n  }\n\n  function showPoints(data) {\n    formWrapper.innerHTML = '';\n    Object.entries(data.data).forEach(function (_ref) {\n      var _ref2 = _slicedToArray(_ref, 2),\n          key = _ref2[0],\n          value = _ref2[1];\n\n      formWrapper.insertAdjacentHTML('beforeend', '<p class=\"bonus__entry\"> ' + key + ' : ' + value + '</p>');\n    });\n  }\n\n  submitButton.addEventListener('click', function (event) {\n    event.preventDefault();\n    if (validateEmail(inputEmail.value) && validatePassword(inputPassword.value)) {\n      postForm();\n      showError(false);\n    } else {\n      showError('Email или пароль введены неправильно');\n    }\n  });\n};\n\n//# sourceURL=webpack:///./src/js/index.js?")}});