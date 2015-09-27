import Ember from "ember";

export default Ember.Helper.helper(function(params) {
  var keyPath = params[0];
  var escaped = window.I18nFlow.t(keyPath);
  return new Ember.Handlebars.SafeString(escaped);
});
