module.exports = {
  description: 'Blueprint for ember-cli-flowbuilder',

  afterInstall: function() {
    return this.addBowerPackageToProject('jsPlumb', 'jsplumb#~1.7.10').then(function () {
      return this.addBowerPackageToProject('coreweb-css', 'git://github.com/hilotus/coreweb-css.git');
    }.bind(this));
  }
};
