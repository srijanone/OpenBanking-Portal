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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/swagger_ui.script.js":
/*!*************************************!*\
  !*** ./src/js/swagger_ui.script.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(Object(source));

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}
/**
 * @file
 * Custom scripts to render file fields with Swagger UI.
 */


(function ($, window, Drupal, drupalSettings) {
  /**
   * Get Parsed and Formatted Token Data.
   *
   * @param {string} authData_string obtained from localstorage authData_string
   */
  var getTokenData = function getTokenData(authData_string) {
    if (!authData_string) {
      return undefined;
    }

    var authData = JSON.parse(authData_string);
    var expired = getCurrentTsInSeconds() - authData.obtained_on >= authData.expires_in;
    var parts = authData.id_token.split(".");
    var decodedJWTPayload = JSON.parse(window.atob(parts[1]));
    return {
      token: "Bearer ".concat(authData.access_token),
      expired: expired,
      cdsSubject: decodedJWTPayload.sub
    };
  };
  /**
   * Get Current Timestamp in Seconds.
   */


  var getCurrentTsInSeconds = function getCurrentTsInSeconds() {
    return Math.floor(Date.now() / 1000);
  };
  /**
   * Set Authorization and CDS values.
   *
   * @param {object} system system vairbale of Swagger UI.
   * @param {token: string, cdsSubject: string } param1 object of token and cdsSubject
   */


  var setAuthAndCds = function setAuthAndCds(system, _ref) {
    var token = _ref.token,
        cdsSubject = _ref.cdsSubject;
    var paths = system.spec().getIn(["json", "paths"]).toJS();

    for (var path in paths) {
      var methods = paths[path];

      for (var method in methods) {
        dispatchAction(system, {
          name: "Authorization",
          value: token,
          path: path,
          method: method
        });
        dispatchAction(system, {
          name: "x-cds-subject",
          value: cdsSubject,
          path: path,
          method: method
        });
      }
    }
  };
  /**
   * Get Parameter's Immutable Value.
   *
   * @param {object} system system vairbale of Swagger UI.
   * @param {path: string, method: string } param1 object of path and method
   */


  var getParameters = function getParameters(system, _ref2) {
    var path = _ref2.path,
        method = _ref2.method;
    return system.getStore().getState().getIn(["spec", "json", "paths", path, method, "parameters"]);
  };
  /**
   * Dispactch Redux Action.
   *
   * @param {*} system
   * @param {*} param1
   */


  var dispatchAction = function dispatchAction(system, _ref3) {
    var name = _ref3.name,
        path = _ref3.path,
        method = _ref3.method,
        value = _ref3.value;
    var parameters = getParameters(system, {
      path: path,
      method: method
    });
    var param = parameters.find(function (p) {
      return p.get("name") === name;
    });
    system.getStore().dispatch(system.specActions.changeParamByIdentity([path, method], param, value, false));
  };

  Drupal.behaviors.swaggerUIFormatter = {
    attach: function attach(context) {
      var MyCustomPlugin = function MyCustomPlugin(_ref4) {
        var React = _ref4.React;
        return {
          wrapComponents: {
            JsonSchemaForm: function JsonSchemaForm(Original, system) {
              return (
                /*#__PURE__*/
                function (_React$PureComponent) {
                  _inherits(P, _React$PureComponent);

                  function P(props) {
                    _classCallCheck(this, P);

                    return _possibleConstructorReturn(this, _getPrototypeOf(P).call(this, props));
                  }

                  _createClass(P, [{
                    key: "_showModal",
                    value: function _showModal() {
                      window.open(drupalSettings.apigee_openbank_oauth_oidc.url, "oauthwindow", "width=500,height=500,left=300,top=300");
                    }
                  }, {
                    key: "render",
                    value: function render() {
                      var isLoggedIn = system.authorizationSelectors.isLoggedIn();

                      if (this.props.description.startsWith("Authorization")) {
                        return React.createElement("div", null, React.createElement(Original, this.props), React.createElement("button", {
                          style: {
                            marginLeft: 5,
                            color: "white",
                            background: "green",
                            padding: "5px 10px",
                            borderRadius: 6
                          },
                          "class": "btn btn-sm authorize",
                          onClick: this._showModal
                        }, isLoggedIn ? "Regenerate Token" : "Generate Token"));
                      }

                      return React.createElement(Original, this.props);
                    }
                  }]);

                  return P;
                }(React.PureComponent)
              );
            },
            operations: function operations(Original, system) {
              return (
                /*#__PURE__*/
                function (_React$PureComponent2) {
                  _inherits(Operations, _React$PureComponent2);

                  function Operations(props) {
                    var _this;

                    _classCallCheck(this, Operations);

                    _this = _possibleConstructorReturn(this, _getPrototypeOf(Operations).call(this, props));
                    _this.listenToMessageEvent = _this.listenToMessageEvent.bind(_assertThisInitialized(_this)); // Bind function once.

                    return _this;
                  }
                  /**
                   * We will subscribe to message event from popup so that
                   * we can set the Token and CDS Value, and the Local Storage for future use.
                   *
                   * @param {Event} event Message Event
                   */


                  _createClass(Operations, [{
                    key: "listenToMessageEvent",
                    value: function listenToMessageEvent(event) {
                      if (event.data && event.data.type === "OIDC_TOKEN") {
                        var authData_string = JSON.stringify(_objectSpread({}, event.data.authorization_data, {
                          obtained_on: getCurrentTsInSeconds()
                        }));
                        window.localStorage.setItem("OIDC_TOKEN", authData_string);

                        var _getTokenData = getTokenData(authData_string),
                            cdsSubject = _getTokenData.cdsSubject,
                            token = _getTokenData.token;

                        setAuthAndCds(system, {
                          token: token,
                          cdsSubject: cdsSubject
                        });
                        system.authorizationActions.updateLoginStatus(true);
                      }
                    }
                  }, {
                    key: "componentDidMount",
                    value: function componentDidMount() {
                      window.addEventListener("message", this.listenToMessageEvent);
                      var authData_string = window.localStorage.getItem("OIDC_TOKEN");

                      if (authData_string && typeof authData_string === "string") {
                        var _getTokenData2 = getTokenData(authData_string),
                            cdsSubject = _getTokenData2.cdsSubject,
                            token = _getTokenData2.token,
                            expired = _getTokenData2.expired;

                        if (expired) {
                          window.localStorage.removeItem("OIDC_TOKEN");
                        } else {
                          setAuthAndCds(system, {
                            token: token,
                            cdsSubject: cdsSubject
                          });
                          system.authorizationActions.updateLoginStatus(true);
                        }
                      }
                    }
                  }, {
                    key: "componentWillUnmount",
                    value: function componentWillUnmount() {
                      // You need to unbind the same listener that was binded.
                      window.removeEventListener("message", this.listenToMessageEvent);
                    }
                  }, {
                    key: "render",
                    value: function render() {
                      return React.createElement(Original, this.props);
                    }
                  }]);

                  return Operations;
                }(React.PureComponent)
              );
            }
          },
          statePlugins: {
            authorization: {
              actions: {
                updateLoginStatus: function updateLoginStatus(loggedIn) {
                  return {
                    type: "LOGGED_IN",
                    payload: loggedIn
                  };
                }
              },
              reducers: {
                LOGGED_IN: function LOGGED_IN(loggedIn, action) {
                  return loggedIn.set("isLoggedIn", action.payload);
                }
              },
              selectors: {
                isLoggedIn: function isLoggedIn(loggedIn) {
                  return loggedIn.get("isLoggedIn");
                }
              }
            },
            spec: {
              wrapActions: {
                clearValidateParams: function clearValidateParams(oriAction, system) {
                  return function () {
                    var tokenData = getTokenData(window.localStorage.getItem("OIDC_TOKEN"));

                    for (var _len = arguments.length, payload = new Array(_len), _key = 0; _key < _len; _key++) {
                      payload[_key] = arguments[_key];
                    }

                    if (!tokenData || tokenData.expired) {
                      var path = payload[0][0];
                      var method = payload[0][1]; // dispatchAction({ name: 'x-cds-subject', value: 'myc', method, path });.

                      var parameters = getParameters(system, {
                        path: path,
                        method: method
                      });
                      var authParam = parameters.find(function (p) {
                        return p.get("name") === "Authorization";
                      });

                      if (authParam) {
                        window.open(drupalSettings.apigee_openbank_oauth_oidc.url, "oauthwindow", "width=500,height=500,left=300,top=300"); // system.authorizationActions.updateModalVisibilty(true);
                      }
                    }

                    return oriAction.apply(void 0, payload);
                  };
                }
              }
            }
          }
        };
      };
      /**
       * Swagger UI Module Settings Overwrite.
       */
      // Iterate over field values and render each field value with Swagger UI.


      for (var fieldNamePlusDelta in drupalSettings.swaggerUIFormatter) {
        if (drupalSettings.swaggerUIFormatter.hasOwnProperty(fieldNamePlusDelta)) {
          var fieldElementInField = drupalSettings.swaggerUIFormatter[fieldNamePlusDelta]; // Do not instantiate/re-render Swagger UI if it has been done
          // before (avoid re-rendering on AJAX requests for example).

          if ("swagger_ui_" + fieldNamePlusDelta in window) {
            continue;
          } // Add SVG definition to the DOM (old Swagger UI requirement).


          if (fieldElementInField.svgDefinition) {
            $("body", context).once("swagger-ui-svg-definition").prepend(fieldElementInField.svgDefinition);
          }

          var validatorUrl = undefined;

          switch (fieldElementInField.validator) {
            case "custom":
              validatorUrl = fieldElementInField.validatorUrl;
              break;

            case "none":
              validatorUrl = null;
              break;
          }

          var options = {
            // For BC, we kept the array instead of a single value.
            url: fieldElementInField.swaggerFiles[0],
            dom_id: "#swagger-ui-" + fieldNamePlusDelta,
            deepLinking: true,
            presets: [SwaggerUIBundle.presets.apis, // This is a dirty hack but it works out of the box.
            // See https://github.com/swagger-api/swagger-ui/issues/3229.
            fieldElementInField.showTopBar ? SwaggerUIStandalonePreset : SwaggerUIStandalonePreset.slice(1)],
            plugins: [MyCustomPlugin, SwaggerUIBundle.plugins.DownloadUrl],
            validatorUrl: validatorUrl,
            docExpansion: fieldElementInField.docExpansion,
            layout: "StandaloneLayout",
            tagsSorter: fieldElementInField.sortTagsByName ? "alpha" : "",
            supportedSubmitMethods: fieldElementInField.supportedSubmitMethods
          };

          if (fieldElementInField.oauth2RedirectUrl) {
            options.oauth2RedirectUrl = fieldElementInField.oauth2RedirectUrl;
          } // Allow altering the options.


          $(window).trigger("swaggerUIFormatterOptionsAlter", options);
          window["swagger_ui_" + fieldNamePlusDelta] = SwaggerUIBundle(options);
        }
      }
    }
  };
})(jQuery, window, Drupal, drupalSettings);

/***/ }),

/***/ 1:
/*!*******************************************!*\
  !*** multi ./src/js/swagger_ui.script.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/apple/src/au/profiles/contrib/apigee_devportal_kickstart_openbank_au/themes/custom/openbank_au/src/js/swagger_ui.script.js */"./src/js/swagger_ui.script.js");


/***/ })

/******/ });