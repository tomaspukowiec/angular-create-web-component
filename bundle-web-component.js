const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
  const files = [
    './dist/angular-create-web-component/polyfills.js',
    './dist/angular-create-web-component/runtime.js',
    './dist/angular-create-web-component/main.js',
  ]
  await fs.ensureDir('element');
  await concat(files, 'element/my-element.js');
  await fs.copyFile('./dist/angular-create-web-component/styles.css', 'element/styles.css');
})();
