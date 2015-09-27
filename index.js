/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-flowbuilder',

  init: function(name) {
    this.treePaths['vendor'] = require('path').join('i18n', 'i18n.js');
  },

  included: function(app) {
    this._super.included(app);

    // css
    app.import(app.bowerDirectory + '/coreweb-css/css/flowbuilder.css');

    // jsPlumb
    app.import(app.bowerDirectory + '/jsPlumb/dist/js/jsPlumb-1.7.10.js');

    // i18n
    this.app.import('vendor/i18n/i18n.js');
  }
};
