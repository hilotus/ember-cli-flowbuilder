import Ember from 'ember';
import ModelTypeMixin from 'ember-cli-flowbuilder/mixins/model-type';

export default Ember.Component.extend(ModelTypeMixin, {
  classNameBindings: [':flow-builder-edit-step-wrapper', 'typeClass'],

  model: null,  // step model
  targetObject: null,  // form builder component
});
