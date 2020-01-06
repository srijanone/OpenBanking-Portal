# Installation

## Install Drupal Using Composer

``` 
$ composer create-project --prefer-dist drupal/recommended-project my_site_name_dir
```

[See Docs](https://www.drupal.org/docs/develop/using-composer/using-composer-to-install-drupal-and-manage-dependencies)
## Installing Profile

Add following in your base composer.json file
```
    {
        "type": "package",
        "package": {
            "name": "apigee/apigee_devportal_au_openbank_kickstart",
            "version": "0.0.1",
            "type": "drupal-profile",
            "dist": {
                "type": "zip",
                "url": "https://github.com/srijanone/OpenBanking-Portal/archive/master.zip"
            }
        }
    }
```

Run command from terminal
```
$ composer require apigee/apigee_devportal_au_openbank_kickstart
```

Install Drupal as usual installation.

Configure Drupal Apigee and Apigee Bank Settings.

Additionally, you can add Default Content during the installation.

