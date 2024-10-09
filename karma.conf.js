// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/ecomarket-app-frontend'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox', // Para evitar problemas de permisos en entornos de CI
          '--disable-gpu', // Desactiva la aceleración de hardware (no es necesaria en entornos de CI)
          '--disable-extensions',
          '--disable-dev-shm-usage', // Soluciona problemas en sistemas con poco espacio en /dev/shm
          '--disable-setuid-sandbox',
          '--disable-software-rasterizer',
          '--disable-web-security',
          '--disable-features=VizDisplayCompositor',
          '--headless',
          '--remote-debugging-port=9222'
        ]
      }
    },
    singleRun: true, // Cambiar a true para que Karma ejecute las pruebas una sola vez en CI/CD
    restartOnFileChange: false // Cambiar a false para evitar reinicios en CI/CD
  });
};

// Configurar Puppeteer para utilizar la versión correcta de Chrome en CI
process.env.CHROME_BIN = require('puppeteer').executablePath();
