<?php

namespace Drupal\apigee_openbank_au_enhancement\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\DependencyInjection\ContainerInterface;
use GuzzleHttp\Client;
use Drupal\Core\Url;
use Drupal\Component\Serialization\Json;

/**
 * Class OAuth2Controller.
 */
class OAuth2Controller extends ControllerBase {
  /**
   * The Http Client.
   *
   * @var \GuzzleHttp\Client
   */
  protected $httpClient;

  /**
   * OAuth2Form constructor.
   *
   * @param \GuzzleHttp\Client $http_client
   *   The http client.
   */
  public function __construct(
    Client $http_client
  ) {
    $this->httpClient = $http_client;
  }

  /**
   * @inheritDoc
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('http_client')
    );
  }

  /**
   * Callback for OAuth2.
   *
   * @return string
   *   Obtain Token and closes itself, and set parent token.
   */
  public function callback(Request $request) {
    $au_config = \Drupal::config('apigee_openbank_au_enhancement.openbank.settings');
    $client_id = $au_config->get('client_id');
    $code = $request->request->get('code');
    $redirect_uri = Url::fromRoute('apigee_openbank_au_enhancement.oauth2_callback', [], ['absolute' => TRUE])->toString();
    $redirect_uri = str_replace(':8080', ':3000', $redirect_uri);
    $edge_json_settings = \Drupal::service('key.repository')->getKey('apigee_edge_connection_default')->get('key_provider_settings');
    $org = Json::decode($edge_json_settings['key_value'])['organization'];
    $env = 'test';
    $client_id = $au_config->get('client_id');
    $client_secret = $au_config->get('client_secret');
    $base_uri = $config->get('apigee_endpoint');
    $response = $this->httpClient->post('/token', [
      'base_uri' => $base_uri,
      'auth' => [$client_id, $client_secret],
      'form_params' => [
        'grant_type' => 'authorization_code',
        'code' => $code,
        'redirect_uri' => $redirect_uri,
        'refresh_token' => TRUE,
      ],
      'headers' => [
        'Content-type' => 'application/x-www-form-urlencoded',
        'Accept' => 'application/json',
      ],
    ]);
    if ($response->getStatusCode() !== 200) {
      throw new \Error("OAuth2 Token Couldn't be obtained");
    }
    $json_res = Json::decode($response->getBody()->getContents());

    return [
      '#markup' => '<div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
      <span class="sr-only">Loading...</span>
    </div>',
      '#attached' => [
        'library' => 'apigee_openbank_au_enhancement/oauth2_callback',
        'drupalSettings' => [
          'apigee_openbank_oauth_oidc' => [
            'authorization_data' => $json_res,
          ],
        ],
      ],
    ];
  }

}
