<?php

namespace Drupal\apigee_openbank_au_enhancement\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Entity\EntityStorageInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\file\Entity\File;
use Drupal\Core\Url;
use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * Class ApigeeNotifyForm.
 */
class ApigeeNotifyForm extends FormBase {

  /**
   * Entity storage for node entities.
   *
   * @var \Drupal\Core\Entity\EntityStorageInterface
   */
  protected $userStorage;

  /**
   * Constructs a new UserBulkEmail object.
   */
  public function __construct(
    EntityStorageInterface $user_storage
  ) {
    $this->userStorage = $user_storage;
  }

  /**
   *
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('entity_type.manager')->getStorage('user')
    );
    $controller->setStringTranslation($container->get('string_translation'));
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'apigee_notify_form';
  }

  /**
   * Display Message and Redirect at End of Batch.
   */
  public static function notifyUser($data, &$context) {
    try {
      $user_id = $data['user_id'];
      $account = user_load($user_id);
      $mailManager = \Drupal::service('plugin.manager.mail');
      $module = 'apigee_openbank_au_enhancement';
      $key = 'apigee_notify';
      $to = $account->getEmail();
      $context['message'] = t('Sending email to user with username: @username', ['@username' => $account->getUsername()]);
      if ($to) {
        $langcode = $account->getPreferredLangcode();
        $send = TRUE;
        $params = [
          'subject' => $data['subject'],
          'message' => $data['message']['value'],
          'attachments' => $data['attachments'],
        ];
        $result = $mailManager->mail($module, $key, $to, $langcode, $params, NULL, $send);
      }
    }
    catch (Exception $e) {
      \Drupal::messenger()->addError('User Bulk Email Failed');
      echo 'Caught exception in : ', $e->getMessage(), "\n";
    }
  }

  /**
   * Display Message and Redirect at End of Batch.
   */
  public static function finishBatch($success, $results) {
    if ($success) {
      \Drupal::messenger()->addMessage('Send Emails Succesfully');
    }
    else {
      \Drupal::messenger()->addError('Finished with an error');
    }
    $url = Url::fromRoute('<front>')->toString();
    $response = new RedirectResponse($url);
    $response->send();
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['user_group'] = [
      '#type' => 'select',
      '#title' => $this->t('User Group'),
      '#description' => $this->t('Notify all or subscribed users'),
      '#options' => ['All' => $this->t('All'), 'Subscribed' => $this->t('Subscribed')],
      '#default_value' => 'Subscribed',
      '#weight' => '0',
    ];
    $form['subject'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Subject'),
      '#description' => $this->t('Subject of Email'),
      '#maxlength' => 64,
      '#size' => 64,
      '#weight' => '0',
    ];
    $form['message'] = [
      '#type' => 'text_format',
      '#title' => $this->t('Message'),
      '#description' => $this->t('Message of Mail'),
      '#weight' => '0',
      '#rows' => 5,
    ];
    $form['attachments'] = [
      '#title' => t('Attachments'),
      '#type' => 'managed_file',
      '#upload_location' => 'public://import/',
      '#multiple' => TRUE,
      '#upload_validators' => [
        'file_validate_extensions' => ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'],
      ],
    ];
    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Submit'),
    ];

    return $form;
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
    $query = $this->userStorage->getQuery();
    $query->condition('status', 1);
    $type = $form_state->getValue('user_group');
    if ($type == 'Subscribed') {
      $query->condition('field_notify_user', 1);
    }
    $user_ids = $query->execute();
    $send_email_user_ids = [];
    if (count($user_ids)) {
      $users = $this->userStorage->loadMultiple($user_ids);
      foreach ($users as $user) {
        $send_email_user_ids[] = $user->id();
      }
      $class = get_class($this);
      $operations = [];
      $attachments = $form_state->getValue('attachments');
      if ($attachments && count($attachments) > 0) {
        foreach ($attachments as $attachment) {
          $file = File::load($attachment);
          $attachments[] = (object) [
            'filename' => $file->getFilename(),
            'uri' => $file->getFileUri(),
            'filemime' => $file->getMimeType(),
          ];
        }
      }
      else {
        $attachments = [];
      }
      foreach ($send_email_user_ids as $user_id) {
        $operations[] = [[$class, 'notifyUser'], [
          'params' => [
            'user_id' => $user_id,
            'message' => $form_state->getValue('message'),
            'subject' => $form_state->getValue('subject'),
            'attachments' => $attachments,
          ],
        ],
        ];
      }
      $batch = [
        'title' => $this->t('Send Email to Unregistered Users'),
        'operations' => $operations,
        'finished' => [$class, 'finishBatch'],
      ];
      batch_set($batch);
    }
    else {
      drupal_set_message('No InActive User Found');
    }

  }

}
