<?php

namespace Drupal\apigee_openbank_au_enhancement\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class OpenBankSettings.
 */
class OpenBankSettings extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'apigee_openbank_au_enhancement.openbank.settings',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'open_bank_settings';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('apigee_openbank_au_enhancement.openbank.settings');
    $form['apigee_endpoint'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Apigee Endpoint'),
      '#description' => $this->t('For test purposes, any string will do'),
      '#maxlength' => 128,
      '#size' => 64,
      '#default_value' => $config->get('apigee_endpoint'),
      '#placeholder' => 'https://openbank-aunz-test.apigee.net',
    ];
    $form['client'] = [
      '#type' => 'details',
      '#title' => $this->t('Default Client'),
      '#open' => TRUE,
    ];
    $form['client']['client_id'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Accounts Client Id'),
      '#description' => $this->t('Default OAuth2 Accounts Client'),
      '#maxlength' => 128,
      '#size' => 64,
      '#default_value' => $config->get('client_id'),
    ];
    $form['client']['client_secret'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Accounts Client Secret'),
      '#description' => $this->t('Default OAuth2 Accounts Client Secret'),
      '#maxlength' => 128,
      '#size' => 64,
      '#default_value' => $config->get('client_secret'),
    ];
    $form['oauth2'] = [
      '#type' => 'details',
      '#title' => $this->t('OAUth2 Settings'),
      '#open' => TRUE,
    ];
    $form['oauth2']['scope'] = [
      '#type' => 'textarea',
      '#title' => $this->t('OAuth2 Scope'),
      '#description' => $this->t('Default OAuth2 Accounts Client'),
      '#size' => 64,
      '#default_value' => $config->get('scope'),
    ];
    $form['oauth2']['nonce'] = [
      '#type' => 'textfield',
      '#title' => $this->t('OAuth2 Nonce'),
      '#description' => $this->t('For test purposes, any string will do'),
      '#maxlength' => 128,
      '#size' => 64,
      '#default_value' => $config->get('nonce'),
    ];
    $form['oauth2']['state'] = [
      '#type' => 'textfield',
      '#title' => $this->t('OAuth2 State'),
      '#description' => $this->t('For test purposes, any string will do'),
      '#maxlength' => 128,
      '#size' => 64,
      '#default_value' => $config->get('state'),
    ];
    $form['oauth2']['max_age'] = [
      '#type' => 'number',
      '#title' => $this->t('OAuth2 Max Age'),
      '#maxlength' => 128,
      '#size' => 64,
      '#default_value' => $config->get('max_age'),
    ];
    $form['oauth2']['exp'] = [
      '#type' => 'number',
      '#title' => $this->t('Epoch timestamp'),
      '#description' => $this->t('Any value in the future will work'),
      '#maxlength' => 128,
      '#size' => 64,
      '#default_value' => $config->get('exp'),
    ];
    $form['oauth2']['jtl'] = [
      '#type' => 'textfield',
      '#title' => $this->t('JTL'),
      '#description' => $this->t('For test purposes, any string will do'),
      '#maxlength' => 128,
      '#size' => 64,
      '#default_value' => $config->get('jtl'),
    ];
    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    parent::validateForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    parent::submitForm($form, $form_state);
    $this->config('apigee_openbank_au_enhancement.openbank.settings')
      ->set('client_id', $form_state->getValue('client_id'))
      ->set('client_secret', $form_state->getValue('client_secret'))
      ->set('scope', $form_state->getValue('scope'))
      ->set('nonce', $form_state->getValue('nonce'))
      ->set('state', $form_state->getValue('state'))
      ->set('max_age', $form_state->getValue('max_age'))
      ->set('exp', $form_state->getValue('exp'))
      ->set('jtl', $form_state->getValue('jtl'))
      ->set('apigee_endpoint', $form_state->getValue('apigee_endpoint'))
      ->save();
  }

}
