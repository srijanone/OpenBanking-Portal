/**
 * @file
 */

(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.oauth2_callback = {
    attach: function (context, settings) {
      console.log(window.location.origin);
      window.opener.postMessage(
        {
          type: "OIDC_TOKEN",
          authorization_data: drupalSettings.apigee_openbank_oauth_oidc.authorization_data,
        },
        window.location.origin
      );
      window.close();
    }
  };

})(jQuery, Drupal, drupalSettings);
