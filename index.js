/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-flowbuilder',

  included: function(app) {
    this._super.included(app);

    // css
    app.import(app.bowerDirectory + '/coreweb-css/css/colorful.css');
    app.import(app.bowerDirectory + '/coreweb-css/css/flowbuilder.css');

    // font awesome
    app.import(app.bowerDirectory + '/font-awesome/fonts/fontawesome-webfont.ttf', {destDir: "fonts"});
    app.import(app.bowerDirectory + '/font-awesome/fonts/fontawesome-webfont.eot', {destDir: "fonts"});
    app.import(app.bowerDirectory + '/font-awesome/fonts/fontawesome-webfont.svg', {destDir: "fonts"});
    app.import(app.bowerDirectory + '/font-awesome/fonts/fontawesome-webfont.woff', {destDir: "fonts"});
    app.import(app.bowerDirectory + '/font-awesome/fonts/fontawesome-webfont.woff2', {destDir: "fonts"});
    app.import(app.bowerDirectory + '/font-awesome/fonts/FontAwesome.otf', {destDir: "fonts"});
    app.import(app.bowerDirectory + '/font-awesome/css/font-awesome.min.css');

    // jsPlumb
    app.import(app.bowerDirectory + '/jsPlumb/dist/js/jsPlumb-1.7.10.js');
  }
};
