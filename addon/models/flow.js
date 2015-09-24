import Ember from 'ember';
import Serializable from 'ember-cli-flowbuilder/mixins/serializable';

var Flow = Ember.Object.extend(Serializable, {
  name: null,
  description: null,
  steps: [],

  initFromJson: function (flowJson) {
    this.setProperties({
      name: flowJson.name,
      description: flowJson.description
    });

    var Step, step;
    flowJson.steps.forEach(function (stepJson) {
      Step = this.container.lookupFactory('flow-step-model:' + stepJson.type);
      step = Step.create(stepJson);
      this.get('steps').pushObject(step);
    }, this);
  }
});

export default Flow;
