import Ember from 'ember';
import Serializable from 'ember-cli-flowbuilder/mixins/serializable';

export default Ember.Object.extend(Serializable, {
  name: null,  // unique
  title: null,
  description: null,
  type: null,
  next: null,  // next step name

  // Position on steps borad
  top: 0,
  left: 0
});
