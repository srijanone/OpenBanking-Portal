/**
 * @file
 */

(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.oauth2_form = {
    attach: function (context, settings) {
      console.log(window.opener);
      /*window.opener.postMessage(
        {
          type: "ACCESS_TOKEN",
          access_token: drupalSettings.apigee_openbank_oauth_oidc
        },
        window.location.origin
      );
      window.close();*/
    }
  };

})(jQuery, Drupal, drupalSettings);
