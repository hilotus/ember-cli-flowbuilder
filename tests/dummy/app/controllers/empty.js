import Ember from 'ember';

export default Ember.Controller.extend({
  init() {
    this._super();
    var Flow = this.container.lookupFactory('flow-model:main');
    var flow = Flow.create({name: 'My flow', description: 'My flow description', steps: []});
    this.set('model', flow);
  },

  actions: {
    printModel() {
      console.log(JSON.stringify(this.get('model').serialize()));
    }
  }
});
