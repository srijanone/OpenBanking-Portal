/**
 * @file
 * Custom scripts to render file fields with Swagger UI.
 */

(function($, window, Drupal, drupalSettings) {
  /**
   * Get Parsed and Formatted Token Data.
   *
   * @param {string} authData_string obtained from localstorage authData_string
   */
  const getTokenData = function(authData_string) {
    if (!authData_string) {
      return undefined;
    }
    const authData = JSON.parse(authData_string);
    const expired =
      getCurrentTsInSeconds() - authData.obtained_on >= authData.expires_in;
    const parts = authData.id_token.split(".");
    const decodedJWTPayload = JSON.parse(window.atob(parts[1]));
    return {
      token: `Bearer ${authData.access_token}`,
      expired,
      cdsSubject: decodedJWTPayload.sub
    };
  };
  /**
   * Get Current Timestamp in Seconds.
   */
  const getCurrentTsInSeconds = function() {
    return Math.floor(Date.now() / 1000);
  };
  /**
   * Set Authorization and CDS values.
   *
   * @param {object} system system vairbale of Swagger UI.
   * @param {token: string, cdsSubject: string } param1 object of token and cdsSubject
   */
  const setAuthAndCds = function(system, { token, cdsSubject }) {
    const paths = system
      .spec()
      .getIn(["json", "paths"])
      .toJS();
    for (const path in paths) {
      const methods = paths[path];
      for (const method in methods) {
        dispatchAction(system, {
          name: "Authorization",
          value: token,
          path,
          method
        });
        dispatchAction(system, {
          name: "x-cds-subject",
          value: cdsSubject,
          path,
          method
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
  const getParameters = function(system, { path, method }) {
    return system
      .getStore()
      .getState()
      .getIn(["spec", "json", "paths", path, method, "parameters"]);
  };
  /**
   * Dispactch Redux Action.
   *
   * @param {*} system
   * @param {*} param1
   */
  const dispatchAction = function(system, { name, path, method, value }) {
    const parameters = getParameters(system, { path, method });
    const param = parameters.find(p => p.get("name") === name);
    system
      .getStore()
      .dispatch(
        system.specActions.changeParamByIdentity(
          [path, method],
          param,
          value,
          false
        )
      );
  };
  Drupal.behaviors.swaggerUIFormatter = {
    attach: function(context) {
      const MyCustomPlugin = function({ React }) {
        return {
          wrapComponents: {
            JsonSchemaForm: (Original, system) =>
              class P extends React.PureComponent {
                constructor(props) {
                  super(props);
                }
                _showModal() {
                  window.open(
                    drupalSettings.apigee_openbank_oauth_oidc.url,
                    "oauthwindow",
                    "width=500,height=500,left=300,top=300"
                  );
                }
                render() {
                  const isLoggedIn = system.authorizationSelectors.isLoggedIn();
                  if (this.props.description.startsWith("Authorization")) {
                    return (
                      <div>
                        <Original {...this.props} />
                        <button
                          style={{
                            marginLeft: 5,
                            color: "white",
                            background: "green",
                            padding: "5px 10px",
                            borderRadius: 6
                          }}
                          class="btn btn-sm authorize"
                          onClick={this._showModal}
                        >
                          {isLoggedIn ? "Regenerate Token" : "Generate Token"}
                        </button>
                      </div>
                    );
                  }
                  return <Original {...this.props} />;
                }
              },
            operations: (Original, system) =>
              class Operations extends React.PureComponent {
                constructor(props) {
                  super(props);
                  this.listenToMessageEvent = this.listenToMessageEvent.bind(
                    this
                  ); // Bind function once.
                }
                /**
                 * We will subscribe to message event from popup so that
                 * we can set the Token and CDS Value, and the Local Storage for future use.
                 *
                 * @param {Event} event Message Event
                 */
                listenToMessageEvent(event) {
                  if (event.data && event.data.type === "OIDC_TOKEN") {
                    const authData_string = JSON.stringify({
                      ...event.data.authorization_data,
                      obtained_on: getCurrentTsInSeconds()
                    });
                    window.localStorage.setItem("OIDC_TOKEN", authData_string);
                    const { cdsSubject, token } = getTokenData(authData_string);
                    setAuthAndCds(system, { token, cdsSubject });
                    system.authorizationActions.updateLoginStatus(true);
                  }
                }
                componentDidMount() {
                  window.addEventListener("message", this.listenToMessageEvent);
                  const authData_string = window.localStorage.getItem(
                    "OIDC_TOKEN"
                  );
                  if (authData_string && typeof authData_string === "string") {
                    const { cdsSubject, token, expired } = getTokenData(
                      authData_string
                    );
                    if (expired) {
                      window.localStorage.removeItem("OIDC_TOKEN");
                    } else {
                      setAuthAndCds(system, { token, cdsSubject });
                      system.authorizationActions.updateLoginStatus(true);
                    }
                  }
                }
                componentWillUnmount() {
                  // You need to unbind the same listener that was binded.
                  window.removeEventListener(
                    "message",
                    this.listenToMessageEvent
                  );
                }
                render() {
                  return <Original {...this.props} />;
                }
              }
          },
          statePlugins: {
            authorization: {
              actions: {
                updateLoginStatus: function(loggedIn) {
                  return {
                    type: "LOGGED_IN",
                    payload: loggedIn
                  };
                }
              },
              reducers: {
                LOGGED_IN: function(loggedIn, action) {
                  return loggedIn.set("isLoggedIn", action.payload);
                }
              },
              selectors: {
                isLoggedIn: function(loggedIn) {
                  return loggedIn.get("isLoggedIn");
                }
              }
            },
            spec: {
              wrapActions: {
                clearValidateParams: (oriAction, system) => (...payload) => {
                  const tokenData = getTokenData(
                    window.localStorage.getItem("OIDC_TOKEN")
                  );
                  if (!tokenData || tokenData.expired) {
                    const path = payload[0][0];
                    const method = payload[0][1];
                    // dispatchAction({ name: 'x-cds-subject', value: 'myc', method, path });.
                    const parameters = getParameters(system, { path, method });
                    const authParam = parameters.find(
                      p => p.get("name") === "Authorization"
                    );
                    if (authParam) {
                      window.open(
                        drupalSettings.apigee_openbank_oauth_oidc.url,
                        "oauthwindow",
                        "width=500,height=500,left=300,top=300"
                      );
                      // system.authorizationActions.updateModalVisibilty(true);
                    }
                  }
                  return oriAction(...payload);
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
      for (const fieldNamePlusDelta in drupalSettings.swaggerUIFormatter) {
        if (
          drupalSettings.swaggerUIFormatter.hasOwnProperty(fieldNamePlusDelta)
        ) {
          const fieldElementInField =
            drupalSettings.swaggerUIFormatter[fieldNamePlusDelta];
          // Do not instantiate/re-render Swagger UI if it has been done
          // before (avoid re-rendering on AJAX requests for example).
          if ("swagger_ui_" + fieldNamePlusDelta in window) {
            continue;
          }

          // Add SVG definition to the DOM (old Swagger UI requirement).
          if (fieldElementInField.svgDefinition) {
            $("body", context)
              .once("swagger-ui-svg-definition")
              .prepend(fieldElementInField.svgDefinition);
          }

          let validatorUrl = undefined;
          switch (fieldElementInField.validator) {
            case "custom":
              validatorUrl = fieldElementInField.validatorUrl;
              break;

            case "none":
              validatorUrl = null;
              break;
          }

          const options = {
            // For BC, we kept the array instead of a single value.
            url: fieldElementInField.swaggerFiles[0],
            dom_id: "#swagger-ui-" + fieldNamePlusDelta,
            deepLinking: true,
            presets: [
              SwaggerUIBundle.presets.apis,
              // This is a dirty hack but it works out of the box.
              // See https://github.com/swagger-api/swagger-ui/issues/3229.
              fieldElementInField.showTopBar
                ? SwaggerUIStandalonePreset
                : SwaggerUIStandalonePreset.slice(1)
            ],
            plugins: [MyCustomPlugin, SwaggerUIBundle.plugins.DownloadUrl],
            validatorUrl: validatorUrl,
            docExpansion: fieldElementInField.docExpansion,
            layout: "StandaloneLayout",
            tagsSorter: fieldElementInField.sortTagsByName ? "alpha" : "",
            supportedSubmitMethods: fieldElementInField.supportedSubmitMethods
          };

          if (fieldElementInField.oauth2RedirectUrl) {
            options.oauth2RedirectUrl = fieldElementInField.oauth2RedirectUrl;
          }

          // Allow altering the options.
          $(window).trigger("swaggerUIFormatterOptionsAlter", options);

          window["swagger_ui_" + fieldNamePlusDelta] = SwaggerUIBundle(options);
        }
      }
    }
  };
})(jQuery, window, Drupal, drupalSettings);
