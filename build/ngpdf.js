(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"), require("pdfjs-dist"));
	else if(typeof define === 'function' && define.amd)
		define("ngpdf", ["angular", "pdfjs-dist"], factory);
	else if(typeof exports === 'object')
		exports["ngpdf"] = factory(require("angular"), require("pdfjs-dist"));
	else
		root["ngpdf"] = factory(root["angular"], root["pdfjs-dist"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _pdfjsDist = __webpack_require__(1);

var _pdfjsDist2 = _interopRequireDefault(_pdfjsDist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pdfjs = void 0;
if (_pdfjsDist2.default) pdfjs = _pdfjsDist2.default.PDFJS;

exports.default = _angular2.default.module('ngPdf', []).component('ngPdf', {
    template: '\n            <style>\n                .ng-pdf-container {\n                    background-color: rgb(82, 86, 89);\n                    padding: 60px 5px 5px 5px;\n                    text-align: center;\n                    position: relative;\n                }\n\n                .ng-pdf-header {\n                    position: absolute;\n                    top: 0;\n                    left: 0;\n                    height: 50px;\n                    line-height: 50px;                \n                    width: 100%;\n                    background-color: rgb(50, 54, 57);\n                    color: rgb(241, 241, 241);\n                    font-size: 0.9em;\n                    font-family: Helvetica;\n                    box-shadow: 0px 0px 10px #000;                \n                }\n\n                .ng-pdf-button {\n                    background-color: transparent;\n                    border: none;\n                    color: rgba(255, 255, 255, 0.8);\n                    font-size: 1.5em;\n                    outline: none;\n                    cursor: pointer;\n                    line-height: 45px;\n                }\n                \n                .ng-pdf-button:hover {\n                    color: rgba(255, 255, 255, 1);\n                }\n\n                .ng-pdf-button:disabled {\n                    color: rgba(255, 255, 255, 0.1);\n                    cursor: not-allowed;\n                }\n\n                .ng-pdf-button-right {\n                    float: right;\n                }\n\n                .ng-pdf-button-left {\n                    float: left;\n                }\n\n                .ng-pdf-page {\n                    max-width: 100%;\n                    box-shadow: 0px 0px 10px #000;\n                    background-color: #fff;\n                }\n            </style>\n            <div class="ng-pdf-container">\n                <div class="ng-pdf-header">\n                    <button\n                        class="ng-pdf-button ng-pdf-button-left"\n                        ng-click="$ctrl.changePage($ctrl.page - 1)"\n                        ng-disabled="$ctrl.loading || $ctrl.page == 1">\n                        &#9668;\n                    </button>\n                    <span ng-if="!$ctrl.loading">{{$ctrl.page}} / {{$ctrl.pdf.numPages}}</span>\n                    <span ng-if="$ctrl.loading">Loading</span>                \n                    <button\n                        class="ng-pdf-button ng-pdf-button-right"                \n                        ng-click="$ctrl.changePage($ctrl.page + 1)"\n                        ng-disabled="$ctrl.loading || $ctrl.page == $ctrl.pdf.numPages">\n                        &#9658;\n                    </button>\n                </div>\n                <canvas class="ng-pdf-page" ng-show="!$ctrl.loading"></canvas>\n            </div>\n        ',
    bindings: {
        url: '@'
    },
    controller: function controller($element, $timeout) {
        var $ctrl = this;
        var canvas = null;

        // PDF Functions
        var getPDF = function getPDF(url) {
            return new Promise(function (resolve, reject) {
                pdfjs.getDocument(url).then(function (pdf) {
                    resolve(pdf);
                });
            });
        };

        var getPage = function getPage(pdf, n) {
            return new Promise(function (resolve, reject) {
                pdf.getPage(n).then(function (page) {
                    resolve(page);
                });
            });
        };

        var renderPage = function renderPage(page, canvas) {
            return new Promise(function (resolve, reject) {
                var viewport = page.getViewport(1.0);
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                var ctx = canvas.getContext('2d');
                page.render({
                    canvasContext: ctx,
                    viewport: viewport
                }).then(function () {
                    return resolve();
                });
            });
        };

        // Controls
        $ctrl.changePage = function (n) {
            $ctrl.page = n;
            $ctrl.loading = true;
            getPage($ctrl.pdf, n).then(function (page) {
                renderPage(page, canvas).then(function () {
                    $timeout(function () {
                        $ctrl.loading = false;
                    });
                });
            });
        };

        $ctrl.$onInit = function () {
            if (window.PDFJS) {
                pdfjs = window.PDFJS;
            }

            if (!pdfjs) {
                console.error("[ngPdf] PDF.js is not loaded");
                return;
            }

            pdfjs.disableWorker = true;
            $ctrl.loading = true;
            $ctrl.page = 0;
            canvas = $element.find("canvas")[0];
            getPDF($ctrl.url).then(function (pdf) {
                $timeout(function () {
                    $ctrl.pdf = pdf;
                    $ctrl.changePage(1);
                });
            });
        };
    }
}).name;
;

/***/ })
/******/ ]);
});
//# sourceMappingURL=ngpdf.js.map