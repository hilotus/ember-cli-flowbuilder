import Flow from 'ember-cli-flowbuilder/models/flow';
import StartStep from 'ember-cli-flowbuilder/models/steps/start-step';
import EndStep from 'ember-cli-flowbuilder/models/steps/end-step';
import ConditionStep from 'ember-cli-flowbuilder/models/steps/condition-step';
import ProcessStep from 'ember-cli-flowbuilder/models/steps/process-step';

export default {
  name: 'flow-field',

  initialize: function (registry) {
    registry.register('flow-model:main', Flow, { instantiate: false, singleton: true });
    registry.register('flow-step-model:start', StartStep, { instantiate: false, singleton: true });
    registry.register('flow-step-model:end', EndStep, { instantiate: false, singleton: true });
    registry.register('flow-step-model:condition', ConditionStep, { instantiate: false, singleton: true });
    registry.register('flow-step-model:process', ProcessStep, { instantiate: false, singleton: true });
  }
};
