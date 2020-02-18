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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/lib/xrm-fx-impl.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/lib/attribute-fx-impl.ts":
/*!**************************************!*\
  !*** ./src/lib/attribute-fx-impl.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar AttributeFxImpl = /** @class */ (function () {\r\n    function AttributeFxImpl(xrmFxContext) {\r\n        this.xrmFxContext = xrmFxContext;\r\n        this.attributes = {};\r\n    }\r\n    Object.defineProperty(AttributeFxImpl.prototype, \"form\", {\r\n        get: function () {\r\n            return this.xrmFxContext.formContext;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    AttributeFxImpl.prototype.getAttribute = function (attributeName) {\r\n        if (!this.attributes[attributeName]) {\r\n            this.attributes[attributeName] = this.form.getAttribute(attributeName);\r\n        }\r\n        return this.attributes[attributeName];\r\n    };\r\n    AttributeFxImpl.prototype.set = function (attributeName, value) {\r\n        var attribute = this.getAttribute(attributeName);\r\n        if (!attribute)\r\n            return;\r\n        attribute.setValue(value);\r\n    };\r\n    AttributeFxImpl.prototype.get = function (attributeName) {\r\n        var attribute = this.getAttribute(attributeName);\r\n        return !attribute ? null : attribute.getValue();\r\n    };\r\n    return AttributeFxImpl;\r\n}());\r\nexports.AttributeFxImpl = AttributeFxImpl;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbGliL2F0dHJpYnV0ZS1meC1pbXBsLnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9saWIvYXR0cmlidXRlLWZ4LWltcGwudHM/MGI1MCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBdHRyaWJ1dGVGeCB9IGZyb20gJy4vaW50ZXJmYWNlcy9hdHRyaWJ1dGUtZngnO1xyXG5pbXBvcnQgeyBYcm1GeENvbnRleHQgfSBmcm9tICcuL2ludGVyZmFjZXMveHJtLWZ4LWNvbnRleHQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEF0dHJpYnV0ZUZ4SW1wbDxUPiBpbXBsZW1lbnRzIEF0dHJpYnV0ZUZ4PFQ+IHtcclxuICBwcml2YXRlIGF0dHJpYnV0ZXM6IHtcclxuICAgIFthdHRyaWJ1dGVOYW1lOiBzdHJpbmddOiBYcm0uQXR0cmlidXRlcy5BdHRyaWJ1dGU7XHJcbiAgfSA9IHt9O1xyXG5cclxuICBwcml2YXRlIGdldCBmb3JtKCk6IFhybS5Gb3JtQ29udGV4dCB7XHJcbiAgICByZXR1cm4gdGhpcy54cm1GeENvbnRleHQuZm9ybUNvbnRleHQ7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHhybUZ4Q29udGV4dDogWHJtRnhDb250ZXh0KSB7fVxyXG5cclxuICBnZXRBdHRyaWJ1dGU8RmllbGQgZXh0ZW5kcyBFeHRyYWN0PGtleW9mIFQsIHN0cmluZz4+KFxyXG4gICAgYXR0cmlidXRlTmFtZTogRmllbGRcclxuICApOiBYcm0uQXR0cmlidXRlcy5BdHRyaWJ1dGUge1xyXG4gICAgaWYgKCF0aGlzLmF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0pIHtcclxuICAgICAgdGhpcy5hdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdID0gdGhpcy5mb3JtLmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5hdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdO1xyXG4gIH1cclxuXHJcbiAgc2V0PEZpZWxkIGV4dGVuZHMgRXh0cmFjdDxrZXlvZiBULCBzdHJpbmc+PihcclxuICAgIGF0dHJpYnV0ZU5hbWU6IEZpZWxkLFxyXG4gICAgdmFsdWU6IFRbRmllbGRdXHJcbiAgKSB7XHJcbiAgICBjb25zdCBhdHRyaWJ1dGUgPSB0aGlzLmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcclxuICAgIGlmICghYXR0cmlidXRlKSByZXR1cm47XHJcblxyXG4gICAgYXR0cmlidXRlLnNldFZhbHVlKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIGdldDxGaWVsZCBleHRlbmRzIEV4dHJhY3Q8a2V5b2YgVCwgc3RyaW5nPj4oYXR0cmlidXRlTmFtZTogRmllbGQpOiBUW0ZpZWxkXSB7XHJcbiAgICBjb25zdCBhdHRyaWJ1dGUgPSB0aGlzLmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcclxuXHJcbiAgICByZXR1cm4gIWF0dHJpYnV0ZSA/IG51bGwgOiBhdHRyaWJ1dGUuZ2V0VmFsdWUoKTtcclxuICB9XHJcbn1cclxuIl0sIm1hcHBpbmdzIjoiOztBQUdBO0FBU0E7QUFBQTtBQVJBO0FBUUE7QUFKQTtBQUFBO0FBQ0E7QUFDQTs7O0FBQUE7QUFJQTtBQUdBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUlBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFwQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/lib/attribute-fx-impl.ts\n");

/***/ }),

/***/ "./src/lib/control-fx-impl.ts":
/*!************************************!*\
  !*** ./src/lib/control-fx-impl.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar ControlFxImpl = /** @class */ (function () {\r\n    function ControlFxImpl(xrmFxContext) {\r\n        this.xrmFxContext = xrmFxContext;\r\n        this.controls = {};\r\n    }\r\n    Object.defineProperty(ControlFxImpl.prototype, \"form\", {\r\n        get: function () {\r\n            return this.xrmFxContext.formContext;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    ControlFxImpl.prototype.getControl = function (attributeName) {\r\n        if (!this.controls[attributeName]) {\r\n            this.controls[attributeName] = this.form.getControl(attributeName);\r\n        }\r\n        return this.controls[attributeName];\r\n    };\r\n    ControlFxImpl.prototype.setDisabled = function (attributeName, isDisabled) {\r\n        var control = this.getControl(attributeName);\r\n        if (control == null)\r\n            return;\r\n        var standardControl = control;\r\n        if (standardControl == null)\r\n            return;\r\n        standardControl.setDisabled(isDisabled);\r\n    };\r\n    ControlFxImpl.prototype.getDisabled = function (attributeName) {\r\n        var control = this.getControl(attributeName);\r\n        if (control == null)\r\n            return false;\r\n        var standardControl = control;\r\n        if (standardControl == null)\r\n            return false;\r\n        return standardControl.getDisabled();\r\n    };\r\n    return ControlFxImpl;\r\n}());\r\nexports.ControlFxImpl = ControlFxImpl;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbGliL2NvbnRyb2wtZngtaW1wbC50cy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvbGliL2NvbnRyb2wtZngtaW1wbC50cz8wNmY0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRyb2xGeCB9IGZyb20gJy4vaW50ZXJmYWNlcy9jb250cm9sLWZ4JztcclxuaW1wb3J0IHsgWHJtRnhDb250ZXh0IH0gZnJvbSAnLi9pbnRlcmZhY2VzL3hybS1meC1jb250ZXh0JztcclxuXHJcbmV4cG9ydCBjbGFzcyBDb250cm9sRnhJbXBsPFQ+IGltcGxlbWVudHMgQ29udHJvbEZ4PFQ+IHtcclxuICBwcml2YXRlIGNvbnRyb2xzOiB7XHJcbiAgICBbYXR0cmlidXRlTmFtZTogc3RyaW5nXTogWHJtLkNvbnRyb2xzLkNvbnRyb2w7XHJcbiAgfSA9IHt9O1xyXG5cclxuICBwcml2YXRlIGdldCBmb3JtKCk6IFhybS5Gb3JtQ29udGV4dCB7XHJcbiAgICByZXR1cm4gdGhpcy54cm1GeENvbnRleHQuZm9ybUNvbnRleHQ7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHhybUZ4Q29udGV4dDogWHJtRnhDb250ZXh0KSB7fVxyXG5cclxuICBnZXRDb250cm9sPEZpZWxkIGV4dGVuZHMgRXh0cmFjdDxrZXlvZiBULCBzdHJpbmc+PihcclxuICAgIGF0dHJpYnV0ZU5hbWU6IEZpZWxkXHJcbiAgKTogWHJtLkNvbnRyb2xzLkNvbnRyb2wge1xyXG4gICAgaWYgKCF0aGlzLmNvbnRyb2xzW2F0dHJpYnV0ZU5hbWVdKSB7XHJcbiAgICAgIHRoaXMuY29udHJvbHNbYXR0cmlidXRlTmFtZV0gPSB0aGlzLmZvcm0uZ2V0Q29udHJvbChhdHRyaWJ1dGVOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5jb250cm9sc1thdHRyaWJ1dGVOYW1lXTtcclxuICB9XHJcblxyXG4gIHNldERpc2FibGVkPEZpZWxkIGV4dGVuZHMgRXh0cmFjdDxrZXlvZiBULCBzdHJpbmc+PihcclxuICAgIGF0dHJpYnV0ZU5hbWU6IEZpZWxkLFxyXG4gICAgaXNEaXNhYmxlZDogYm9vbGVhblxyXG4gICk6IHZvaWQge1xyXG4gICAgY29uc3QgY29udHJvbCA9IHRoaXMuZ2V0Q29udHJvbChhdHRyaWJ1dGVOYW1lKTtcclxuICAgIGlmIChjb250cm9sID09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBzdGFuZGFyZENvbnRyb2wgPSBjb250cm9sIGFzIFhybS5Db250cm9scy5TdGFuZGFyZENvbnRyb2w7XHJcbiAgICBpZiAoc3RhbmRhcmRDb250cm9sID09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICBzdGFuZGFyZENvbnRyb2wuc2V0RGlzYWJsZWQoaXNEaXNhYmxlZCk7XHJcbiAgfVxyXG5cclxuICBnZXREaXNhYmxlZDxGaWVsZCBleHRlbmRzIEV4dHJhY3Q8a2V5b2YgVCwgc3RyaW5nPj4oXHJcbiAgICBhdHRyaWJ1dGVOYW1lOiBGaWVsZFxyXG4gICk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgY29udHJvbCA9IHRoaXMuZ2V0Q29udHJvbChhdHRyaWJ1dGVOYW1lKTtcclxuICAgIGlmIChjb250cm9sID09IG51bGwpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBjb25zdCBzdGFuZGFyZENvbnRyb2wgPSBjb250cm9sIGFzIFhybS5Db250cm9scy5TdGFuZGFyZENvbnRyb2w7XHJcbiAgICBpZiAoc3RhbmRhcmRDb250cm9sID09IG51bGwpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICByZXR1cm4gc3RhbmRhcmRDb250cm9sLmdldERpc2FibGVkKCk7XHJcbiAgfVxyXG59XHJcbiJdLCJtYXBwaW5ncyI6Ijs7QUFHQTtBQVNBO0FBQUE7QUFSQTtBQVFBO0FBSkE7QUFBQTtBQUNBO0FBQ0E7OztBQUFBO0FBSUE7QUFHQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFJQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBRUE7QUFHQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQTdDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/lib/control-fx-impl.ts\n");

/***/ }),

/***/ "./src/lib/xrm-fx-context-impl.ts":
/*!****************************************!*\
  !*** ./src/lib/xrm-fx-context-impl.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar XrmFxContextImpl = /** @class */ (function () {\r\n    function XrmFxContextImpl(eventContext) {\r\n        this.eventContext = eventContext;\r\n    }\r\n    Object.defineProperty(XrmFxContextImpl.prototype, \"formContext\", {\r\n        get: function () {\r\n            if (this._formContext == null) {\r\n                this._formContext = this.eventContext.getFormContext();\r\n            }\r\n            return this._formContext;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    return XrmFxContextImpl;\r\n}());\r\nexports.XrmFxContextImpl = XrmFxContextImpl;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbGliL3hybS1meC1jb250ZXh0LWltcGwudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2xpYi94cm0tZngtY29udGV4dC1pbXBsLnRzPzUzNWQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgWHJtRnhDb250ZXh0IH0gZnJvbSAnLi9pbnRlcmZhY2VzL3hybS1meC1jb250ZXh0JztcclxuXHJcbmV4cG9ydCBjbGFzcyBYcm1GeENvbnRleHRJbXBsIGltcGxlbWVudHMgWHJtRnhDb250ZXh0IHtcclxuICBwcml2YXRlIF9mb3JtQ29udGV4dDogWHJtLkZvcm1Db250ZXh0O1xyXG4gIGdldCBmb3JtQ29udGV4dCgpOiBYcm0uRm9ybUNvbnRleHQge1xyXG4gICAgaWYgKHRoaXMuX2Zvcm1Db250ZXh0ID09IG51bGwpIHtcclxuICAgICAgdGhpcy5fZm9ybUNvbnRleHQgPSB0aGlzLmV2ZW50Q29udGV4dC5nZXRGb3JtQ29udGV4dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLl9mb3JtQ29udGV4dDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBldmVudENvbnRleHQ6IFhybS5FdmVudHMuRXZlbnRDb250ZXh0KSB7fVxyXG59XHJcbiJdLCJtYXBwaW5ncyI6Ijs7QUFFQTtBQVVBO0FBQUE7QUFBQTtBQVJBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOzs7QUFBQTtBQUdBO0FBQUE7QUFYQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/lib/xrm-fx-context-impl.ts\n");

/***/ }),

/***/ "./src/lib/xrm-fx-impl.ts":
/*!********************************!*\
  !*** ./src/lib/xrm-fx-impl.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar xrm_fx_context_impl_1 = __webpack_require__(/*! ./xrm-fx-context-impl */ \"./src/lib/xrm-fx-context-impl.ts\");\r\nvar attribute_fx_impl_1 = __webpack_require__(/*! ./attribute-fx-impl */ \"./src/lib/attribute-fx-impl.ts\");\r\nvar control_fx_impl_1 = __webpack_require__(/*! ./control-fx-impl */ \"./src/lib/control-fx-impl.ts\");\r\nvar XrmFxImpl = /** @class */ (function () {\r\n    function XrmFxImpl(eventContext) {\r\n        this.eventContext = eventContext;\r\n    }\r\n    Object.defineProperty(XrmFxImpl.prototype, \"context\", {\r\n        get: function () {\r\n            if (this._context == null) {\r\n                this._context = new xrm_fx_context_impl_1.XrmFxContextImpl(this.eventContext);\r\n            }\r\n            return this._context;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(XrmFxImpl.prototype, \"attributeFx\", {\r\n        get: function () {\r\n            if (this._attributeFx == null) {\r\n                this._attributeFx = new attribute_fx_impl_1.AttributeFxImpl(this.context);\r\n            }\r\n            return this._attributeFx;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(XrmFxImpl.prototype, \"controlFx\", {\r\n        get: function () {\r\n            if (this._controlFx == null) {\r\n                this._controlFx = new control_fx_impl_1.ControlFxImpl(this.context);\r\n            }\r\n            return this._controlFx;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    return XrmFxImpl;\r\n}());\r\nexports.XrmFxImpl = XrmFxImpl;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbGliL3hybS1meC1pbXBsLnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9saWIveHJtLWZ4LWltcGwudHM/MGEyZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBYcm1GeCB9IGZyb20gJy4vaW50ZXJmYWNlcy94cm0tZngnO1xyXG5pbXBvcnQgeyBYcm1GeENvbnRleHQgfSBmcm9tICcuL2ludGVyZmFjZXMveHJtLWZ4LWNvbnRleHQnO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVGeCB9IGZyb20gJy4vaW50ZXJmYWNlcy9hdHRyaWJ1dGUtZngnO1xyXG5pbXBvcnQgeyBYcm1GeENvbnRleHRJbXBsIH0gZnJvbSAnLi94cm0tZngtY29udGV4dC1pbXBsJztcclxuaW1wb3J0IHsgQXR0cmlidXRlRnhJbXBsIH0gZnJvbSAnLi9hdHRyaWJ1dGUtZngtaW1wbCc7XHJcbmltcG9ydCB7IENvbnRyb2xGeCB9IGZyb20gJy4vaW50ZXJmYWNlcy9jb250cm9sLWZ4JztcclxuaW1wb3J0IHsgQ29udHJvbEZ4SW1wbCB9IGZyb20gJy4vY29udHJvbC1meC1pbXBsJztcclxuXHJcbmV4cG9ydCBjbGFzcyBYcm1GeEltcGw8VD4gaW1wbGVtZW50cyBYcm1GeDxUPiB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIGV2ZW50Q29udGV4dDogWHJtLkV2ZW50cy5FdmVudENvbnRleHQpIHt9XHJcblxyXG4gIHByaXZhdGUgX2NvbnRleHQ6IFhybUZ4Q29udGV4dDtcclxuICBnZXQgY29udGV4dCgpOiBYcm1GeENvbnRleHQge1xyXG4gICAgaWYgKHRoaXMuX2NvbnRleHQgPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLl9jb250ZXh0ID0gbmV3IFhybUZ4Q29udGV4dEltcGwodGhpcy5ldmVudENvbnRleHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLl9jb250ZXh0O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfYXR0cmlidXRlRng6IEF0dHJpYnV0ZUZ4PFQ+O1xyXG4gIGdldCBhdHRyaWJ1dGVGeCgpOiBBdHRyaWJ1dGVGeDxUPiB7XHJcbiAgICBpZiAodGhpcy5fYXR0cmlidXRlRnggPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLl9hdHRyaWJ1dGVGeCA9IG5ldyBBdHRyaWJ1dGVGeEltcGwodGhpcy5jb250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5fYXR0cmlidXRlRng7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9jb250cm9sRng6IENvbnRyb2xGeDxUPjtcclxuICBnZXQgY29udHJvbEZ4KCkgOiBDb250cm9sRng8VD4ge1xyXG4gICAgaWYodGhpcy5fY29udHJvbEZ4ID09IG51bGwpIHtcclxuICAgICAgdGhpcy5fY29udHJvbEZ4ID0gbmV3IENvbnRyb2xGeEltcGw8VD4odGhpcy5jb250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5fY29udHJvbEZ4O1xyXG4gIH1cclxufVxyXG4iXSwibWFwcGluZ3MiOiI7O0FBR0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7O0FBQUE7QUFHQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7O0FBQUE7QUFHQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7O0FBQUE7QUFDQTtBQUFBO0FBN0JBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/lib/xrm-fx-impl.ts\n");

/***/ })

/******/ });