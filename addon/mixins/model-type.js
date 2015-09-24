import Ember from 'ember';

export default Ember.Mixin.create({
  isStart: Ember.computed.equal('model.type', 'start'),
  isEnd: Ember.computed.equal('model.type', 'end'),
  isCondition: Ember.computed.equal('model.type', 'condition'),
  isProcess: Ember.computed.equal('model.type', 'process'),
  isStartOrEnd: Ember.computed('model.type', function () {
    return this.get('model.type') === 'start' || this.get('model.type') === 'end';
  })
});
