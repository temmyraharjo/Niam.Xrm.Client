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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/lib/fx.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/lib/base.ts":
/*!*************************!*\
  !*** ./src/lib/base.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Base = (function () {
    function Base(eventContext) {
        this.eventContext = eventContext;
    }
    Object.defineProperty(Base.prototype, "formContext", {
        get: function () {
            if (this._formContext == null) {
                this._formContext = this.eventContext.getFormContext();
            }
            return this._formContext;
        },
        enumerable: true,
        configurable: true
    });
    return Base;
}());
exports.Base = Base;


/***/ }),

/***/ "./src/lib/fx.ts":
/*!***********************!*\
  !*** ./src/lib/fx.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __webpack_require__(/*! ./base */ "./src/lib/base.ts");
var xrm_attribute_1 = __webpack_require__(/*! ./xrm-attribute */ "./src/lib/xrm-attribute.ts");
var xrm_control_1 = __webpack_require__(/*! ./xrm-control */ "./src/lib/xrm-control.ts");
var Fx = (function (_super) {
    __extends(Fx, _super);
    function Fx(eventContext, attributes, controls) {
        if (attributes === void 0) { attributes = null; }
        if (controls === void 0) { controls = null; }
        var _this = _super.call(this, eventContext) || this;
        if (attributes != null) {
            _this._attributes = attributes;
        }
        if (controls != null) {
            _this._controls = controls;
        }
        return _this;
    }
    Object.defineProperty(Fx.prototype, "attributes", {
        get: function () {
            if (this._attributes == null) {
                this._attributes = new xrm_attribute_1.XrmAttribute(this.eventContext);
            }
            return this._attributes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Fx.prototype, "controls", {
        get: function () {
            if (this._controls == null) {
                this._controls = new xrm_control_1.XrmControl(this.eventContext);
            }
            return this._controls;
        },
        enumerable: true,
        configurable: true
    });
    return Fx;
}(base_1.Base));
exports.Fx = Fx;


/***/ }),

/***/ "./src/lib/xrm-attribute.ts":
/*!**********************************!*\
  !*** ./src/lib/xrm-attribute.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __webpack_require__(/*! ./base */ "./src/lib/base.ts");
var XrmAttribute = (function (_super) {
    __extends(XrmAttribute, _super);
    function XrmAttribute() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.attributes = [];
        return _this;
    }
    XrmAttribute.prototype.get = function (attributeName) {
        var filter = this.attributes.filter(function (attr) { return attr.name === attributeName; });
        if (filter.length > 0)
            return filter[0].attribute;
        var attributeObj = this.formContext.getAttribute(attributeName);
        var value = {
            name: attributeName,
            attribute: attributeObj
        };
        this.attributes.push(value);
        return value.attribute;
    };
    XrmAttribute.prototype.getValue = function (attribute) {
        if (typeof attribute === "string") {
            return this.get(attribute).getValue();
        }
        return attribute.getValue();
    };
    XrmAttribute.prototype.setValue = function (attributeName, value) {
        this.get(attributeName).setValue(value);
        return this;
    };
    XrmAttribute.prototype.setRequiredLevel = function (attributeName, requiredLevel) {
        this.get(attributeName).setRequiredLevel(requiredLevel);
        return this;
    };
    XrmAttribute.prototype.getRequiredLevel = function (attributeName) {
        return this.get(attributeName).getRequiredLevel();
    };
    return XrmAttribute;
}(base_1.Base));
exports.XrmAttribute = XrmAttribute;


/***/ }),

/***/ "./src/lib/xrm-control.ts":
/*!********************************!*\
  !*** ./src/lib/xrm-control.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __webpack_require__(/*! ./base */ "./src/lib/base.ts");
var XrmControl = (function (_super) {
    __extends(XrmControl, _super);
    function XrmControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.controls = [];
        return _this;
    }
    XrmControl.prototype.get = function (attribute) {
        var filter = this.controls.filter(function (e) { return e.attribute === attribute; });
        if (filter.length !== 0)
            return filter[0].control;
        var value = this.formContext.getControl(attribute);
        this.controls.push({
            attribute: attribute,
            control: value
        });
        return value;
    };
    XrmControl.prototype.setVisible = function (attribute, isVisible) {
        var attr = this.get(attribute);
        if (!attr)
            return this;
        attr.setVisible(isVisible);
        return this;
    };
    XrmControl.prototype.getVisible = function (attribute) {
        return this.get(attribute).getVisible();
    };
    return XrmControl;
}(base_1.Base));
exports.XrmControl = XrmControl;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9iYXNlLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvZngudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi94cm0tYXR0cmlidXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIveHJtLWNvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO0lBQ0ksY0FBbUIsWUFBcUM7UUFBckMsaUJBQVksR0FBWixZQUFZLENBQXlCO0lBQUksQ0FBQztJQUc3RCxzQkFBYyw2QkFBVzthQUF6QjtZQUNFLElBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLEVBQUM7Z0JBQzNCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN4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RTNCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCwrQkFBVSxHQUFWLFVBQVcsU0FBaUI7UUFDeEIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFDTCxpQkFBQztBQUFELENBQUMsQ0E3QitCLFdBQUksR0E2Qm5DO0FBN0JZLGdDQUFVIiwiZmlsZSI6ImZ4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvbGliL2Z4LnRzXCIpO1xuIiwiZXhwb3J0IGNsYXNzIEJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIGV2ZW50Q29udGV4dDogWHJtLkV2ZW50cy5FdmVudENvbnRleHQpIHsgfVxyXG5cclxuICAgIHByaXZhdGUgX2Zvcm1Db250ZXh0OiBYcm0uRm9ybUNvbnRleHQ7XHJcbiAgICBwcm90ZWN0ZWQgZ2V0IGZvcm1Db250ZXh0KCkge1xyXG4gICAgICBpZih0aGlzLl9mb3JtQ29udGV4dCA9PSBudWxsKXtcclxuICAgICAgICB0aGlzLl9mb3JtQ29udGV4dCA9IHRoaXMuZXZlbnRDb250ZXh0LmdldEZvcm1Db250ZXh0KCk7XHJcbiAgICAgIH1cclxuICBcclxuICAgICAgcmV0dXJuIHRoaXMuX2Zvcm1Db250ZXh0O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgQmFzZSB9IGZyb20gJy4vYmFzZSc7XHJcbmltcG9ydCB7IEZ4Q29yZSB9IGZyb20gJy4vaW50ZXJmYWNlcy9meC1jb3JlJztcclxuaW1wb3J0IHsgRnhBdHRyaWJ1dGUgfSBmcm9tICcuL2ludGVyZmFjZXMvZngtYXR0cmlidXRlJztcclxuaW1wb3J0IHsgRnhDb250cm9sIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2Z4LWNvbnRyb2wnO1xyXG5pbXBvcnQgeyBYcm1BdHRyaWJ1dGUgfSBmcm9tICcuL3hybS1hdHRyaWJ1dGUnO1xyXG5pbXBvcnQgeyBYcm1Db250cm9sIH0gZnJvbSAnLi94cm0tY29udHJvbCc7XHJcblxyXG5leHBvcnQgY2xhc3MgRnggZXh0ZW5kcyBCYXNlIGltcGxlbWVudHMgRnhDb3JlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGV2ZW50Q29udGV4dDogWHJtLkV2ZW50cy5FdmVudENvbnRleHQsXHJcbiAgICBhdHRyaWJ1dGVzOiBGeEF0dHJpYnV0ZSA9IG51bGwsXHJcbiAgICBjb250cm9sczogRnhDb250cm9sID0gbnVsbFxyXG4gICkge1xyXG4gICAgc3VwZXIoZXZlbnRDb250ZXh0KTtcclxuXHJcbiAgICBpZiAoYXR0cmlidXRlcyAhPSBudWxsKSB7XHJcbiAgICAgIHRoaXMuX2F0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjb250cm9scyAhPSBudWxsKSB7XHJcbiAgICAgIHRoaXMuX2NvbnRyb2xzID0gY29udHJvbHM7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9hdHRyaWJ1dGVzOiBGeEF0dHJpYnV0ZTtcclxuICBnZXQgYXR0cmlidXRlcygpOiBGeEF0dHJpYnV0ZSB7XHJcbiAgICBpZiAodGhpcy5fYXR0cmlidXRlcyA9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuX2F0dHJpYnV0ZXMgPSBuZXcgWHJtQXR0cmlidXRlKHRoaXMuZXZlbnRDb250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5fYXR0cmlidXRlcztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2NvbnRyb2xzOiBGeENvbnRyb2w7XHJcbiAgZ2V0IGNvbnRyb2xzKCk6IEZ4Q29udHJvbCB7XHJcbiAgICBpZiAodGhpcy5fY29udHJvbHMgPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLl9jb250cm9scyA9IG5ldyBYcm1Db250cm9sKHRoaXMuZXZlbnRDb250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5fY29udHJvbHM7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEZ4QXR0cmlidXRlIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2Z4LWF0dHJpYnV0ZSc7XHJcbmltcG9ydCB7IEJhc2UgfSBmcm9tICcuL2Jhc2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFhybUF0dHJpYnV0ZSBleHRlbmRzIEJhc2UgaW1wbGVtZW50cyBGeEF0dHJpYnV0ZSB7XHJcbiAgYXR0cmlidXRlczogeyBuYW1lOiBzdHJpbmc7IGF0dHJpYnV0ZTogWHJtLkF0dHJpYnV0ZXMuQXR0cmlidXRlIH1bXSA9IFtdO1xyXG4gIGdldChhdHRyaWJ1dGVOYW1lOiBzdHJpbmcpOiBYcm0uQXR0cmlidXRlcy5BdHRyaWJ1dGUge1xyXG4gICAgY29uc3QgZmlsdGVyID0gdGhpcy5hdHRyaWJ1dGVzLmZpbHRlcihhdHRyID0+IGF0dHIubmFtZSA9PT0gYXR0cmlidXRlTmFtZSk7XHJcbiAgICBpZiAoZmlsdGVyLmxlbmd0aCA+IDApIHJldHVybiBmaWx0ZXJbMF0uYXR0cmlidXRlO1xyXG5cclxuICAgIGNvbnN0IGF0dHJpYnV0ZU9iaiA9IHRoaXMuZm9ybUNvbnRleHQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xyXG4gICAgY29uc3QgdmFsdWUgPSB7XHJcbiAgICAgIG5hbWU6IGF0dHJpYnV0ZU5hbWUsXHJcbiAgICAgIGF0dHJpYnV0ZTogYXR0cmlidXRlT2JqXHJcbiAgICB9O1xyXG4gICAgdGhpcy5hdHRyaWJ1dGVzLnB1c2godmFsdWUpO1xyXG5cclxuICAgIHJldHVybiB2YWx1ZS5hdHRyaWJ1dGU7XHJcbiAgfVxyXG5cclxuICBnZXRWYWx1ZTxUPihhdHRyaWJ1dGU6IHN0cmluZyB8IFhybS5BdHRyaWJ1dGVzLkF0dHJpYnV0ZSk6IFQge1xyXG4gICAgaWYodHlwZW9mIGF0dHJpYnV0ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXQoYXR0cmlidXRlKS5nZXRWYWx1ZSgpIGFzIFQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGF0dHJpYnV0ZS5nZXRWYWx1ZSgpIGFzIFQ7XHJcbiAgfVxyXG5cclxuICBzZXRWYWx1ZTxUPihhdHRyaWJ1dGVOYW1lOiBzdHJpbmcsIHZhbHVlOiBUKTogRnhBdHRyaWJ1dGUge1xyXG4gICAgdGhpcy5nZXQoYXR0cmlidXRlTmFtZSkuc2V0VmFsdWUodmFsdWUpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgc2V0UmVxdWlyZWRMZXZlbChhdHRyaWJ1dGVOYW1lOiBzdHJpbmcsIHJlcXVpcmVkTGV2ZWw6IFhybS5BdHRyaWJ1dGVzLlJlcXVpcmVtZW50TGV2ZWwpIHtcclxuICAgIHRoaXMuZ2V0KGF0dHJpYnV0ZU5hbWUpLnNldFJlcXVpcmVkTGV2ZWwocmVxdWlyZWRMZXZlbCk7XHJcbiAgICBcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgZ2V0UmVxdWlyZWRMZXZlbChhdHRyaWJ1dGVOYW1lOiBzdHJpbmcpOiBYcm0uQXR0cmlidXRlcy5SZXF1aXJlbWVudExldmVsIHtcclxuICAgIHJldHVybiB0aGlzLmdldChhdHRyaWJ1dGVOYW1lKS5nZXRSZXF1aXJlZExldmVsKCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEZ4Q29udHJvbCB9IGZyb20gJy4vaW50ZXJmYWNlcy9meC1jb250cm9sJztcclxuaW1wb3J0IHsgQmFzZSB9IGZyb20gJy4vYmFzZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgWHJtQ29udHJvbCBleHRlbmRzIEJhc2UgaW1wbGVtZW50cyBGeENvbnRyb2wge1xyXG4gICAgXHJcbiAgICBwcml2YXRlIGNvbnRyb2xzOiB7YXR0cmlidXRlOiBzdHJpbmcsIGNvbnRyb2w6IFhybS5Db250cm9scy5Db250cm9sfVtdID0gW107XHJcblxyXG4gICAgZ2V0KGF0dHJpYnV0ZTogc3RyaW5nKTogWHJtLkNvbnRyb2xzLkNvbnRyb2wge1xyXG4gICAgICAgIGNvbnN0IGZpbHRlciA9IHRoaXMuY29udHJvbHMuZmlsdGVyKGU9PiBlLmF0dHJpYnV0ZSA9PT0gYXR0cmlidXRlKTtcclxuICAgICAgICBpZihmaWx0ZXIubGVuZ3RoICE9PSAwKSByZXR1cm4gZmlsdGVyWzBdLmNvbnRyb2w7XHJcblxyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5mb3JtQ29udGV4dC5nZXRDb250cm9sKGF0dHJpYnV0ZSk7XHJcbiAgICAgICAgdGhpcy5jb250cm9scy5wdXNoKHtcclxuICAgICAgICAgICAgYXR0cmlidXRlLFxyXG4gICAgICAgICAgICBjb250cm9sOiB2YWx1ZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VmlzaWJsZShhdHRyaWJ1dGU6IHN0cmluZywgaXNWaXNpYmxlOiBib29sZWFuKTogRnhDb250cm9sIHtcclxuICAgICAgICBjb25zdCBhdHRyID0gdGhpcy5nZXQoYXR0cmlidXRlKSBhcyBYcm0uQ29udHJvbHMuU3RhbmRhcmRDb250cm9sO1xyXG4gICAgICAgIGlmKCFhdHRyKSByZXR1cm4gdGhpcztcclxuXHJcbiAgICAgICAgYXR0ci5zZXRWaXNpYmxlKGlzVmlzaWJsZSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFZpc2libGUoYXR0cmlidXRlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXQoYXR0cmlidXRlKS5nZXRWaXNpYmxlKCk7XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9