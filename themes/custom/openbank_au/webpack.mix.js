/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your application. See https://github.com/JeffreyWay/laravel-mix.
 |
 */
const proxy = 'https://cds.sandbox:8080';
const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Configuration
 |--------------------------------------------------------------------------
 */
mix
  .webpackConfig({
    externals: {
      jquery: 'jQuery'
    }
  })
  .setPublicPath('assets')
  .disableNotifications()
  .options({
    processCssUrls: false,
  });

/*
 |--------------------------------------------------------------------------
 | Browsersync
 |--------------------------------------------------------------------------
 */
mix.browserSync({
  proxy: proxy,
  files: ['assets/js/**/*.js', 'assets/css/**/*.css'],
  stream: true,
  port: 3000,
  https: {
    key: "/Users/apple/src/shared/server.key",
    cert: "/Users/apple/src/shared/server.cert",
  },
  target: 'cds.sandbox'
});

/*
 |--------------------------------------------------------------------------
 | SASS
 |--------------------------------------------------------------------------
 */
mix.sass('src/sass/openbank_au.style.scss', 'css');

/*
 |--------------------------------------------------------------------------
 | JS
 |--------------------------------------------------------------------------
 */
mix.js('src/js/openbank_au.script.js', 'js');
mix.react('src/js/swagger_ui.script.js', 'js');
//mix.js('src/js/swagger_ui.script.js', 'js');
