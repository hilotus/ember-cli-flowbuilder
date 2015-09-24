import Ember from 'ember';
import Flow from 'ember-cli-flowbuilder/models/flow';

export default Ember.Controller.extend({
  init() {
    this._super();
    this.set('model', Flow.create({name: 'My flow', description: 'My flow description', steps: []}));
  },

  actions: {
    printModel() {
      console.log(JSON.stringify(this.get('model').serialize()));
    }
  }
});
