import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['form-control'],

  selectedLocale: null,

  isEnus: Ember.computed('selectedLocale', function () {
    return this.get('selectedLocale') === 'en-us';
  }),

  isZhcn: Ember.computed('selectedLocale', function () {
    return this.get('selectedLocale') === 'zh-cn';
  }),

  init: function () {
    this._super();
    this.set('selectedLocale', window.localStorage.getItem('ember-cli-flowbuilder-i18n-locale'));
  },

  actions: {
    selectLocale: function (locale) {
      window.localStorage.setItem('ember-cli-flowbuilder-i18n-locale', locale);
      window.location.reload();
    }
  }
});
