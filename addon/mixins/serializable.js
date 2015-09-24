import Ember from 'ember';

export default Ember.Mixin.create({
  serialize: function () {
    var result = {};
    for (var key in Ember.$.extend(true, {}, this)) {
      // Skip these
      if (key === 'isInstance' ||
        key === 'isDestroyed' ||
        key === 'isDestroying' ||
        key === 'concatenatedProperties' ||
        key === '_debugContainerKey' ||
        key === 'container' ||
        key.match(/__ember\w+/) ||
        typeof this[key] === 'function') {
        continue;
      }

      if (key === 'steps') {
        result[key] = this[key].map(function (item) { return item.serialize(); });
      } else {
        result[key] = this[key];
      }
    }
    return result;
  }
});
