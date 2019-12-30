<?php

namespace Drupal\apigee_devportal_kickstart_openbank_au\Installer\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Messenger\MessengerInterface;

/**
 * Configuration form for Apigee Edge.
 */
class OpenBankConfigurationForm extends ConfigFormBase {

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
    return 'open_bank_settings_profile';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {

    // Add a form title for the installer.
    $form['#title'] = $this->t('Open Bank Settings');

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

    // Add a skip this step button.
    $form['actions']['skip'] = [
      '#type' => 'submit',
      '#value' => $this->t('Skip this step'),
      '#submit' => [[$this, 'skipStepSubmit']],
      '#name' => 'skip',
      '#limit_validation_errors' => [],
    ];

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    // Clear error messages.
    $this->messenger()->deleteByType(MessengerInterface::TYPE_ERROR);

    parent::submitForm($form, $form_state);
    $this->config('apigee_openbank_au_enhancement.openbank.settings')
    ->set('client_id', $form_state->getValue('client_id'))
    ->set('client_secret', $form_state->getValue('client_secret'))
    ->set('apigee_endpoint', $form_state->getValue('apigee_endpoint'))
    ->save();
  }

  /**
   * Provides a submit handler for the skip step button.
   *
   * @param array $form
   *   The form.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The form state.
   */
  public function skipStepSubmit(array $form, FormStateInterface $form_state) {
    global $install_state;
    $install_state['completed_task'] = install_verify_completed_task();
  }

}