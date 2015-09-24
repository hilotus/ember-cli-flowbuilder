import Ember from 'ember';
import ModelTypeMixin from 'ember-cli-flowbuilder/mixins/model-type';

// this is the paint style for the connecting lines..
var connectorPaintStyle = {
    lineWidth: 4,
    strokeStyle: "#61B7CF",
    joinstyle: "round",
    outlineColor: "white",
    outlineWidth: 2
  },
  // .. and this is the hover style.
  connectorHoverStyle = {
    lineWidth: 4,
    strokeStyle: "#216477",
    outlineWidth: 2,
    outlineColor: "white"
  },
  endpointHoverStyle = {
    fillStyle: "#216477",
    strokeStyle: "#216477"
  },
  // the definition of source endpoints (the small blue ones)
  sourceEndpoint = {
    endpoint: "Dot",
    paintStyle: {
      strokeStyle: "#7AB02C",
      fillStyle: "transparent",
      radius: 7,
      lineWidth: 3
    },
    isSource: true,
    connector: [ "Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true } ],
    connectorStyle: connectorPaintStyle,
    hoverPaintStyle: endpointHoverStyle,
    connectorHoverStyle: connectorHoverStyle,
    dragOptions: {},
    overlays: [
      [ "Label", { location: [0.5, 1.5] }  ]
    ]
  },
  // the definition of target endpoints (will appear when the user drags a connection)
  targetEndpoint = {
    endpoint: "Dot",
    paintStyle: { fillStyle: "#7AB02C", radius: 11 },
    hoverPaintStyle: endpointHoverStyle,
    maxConnections: 1,
    dropOptions: { hoverClass: "flow-step-line-hover", activeClass: "flow-step-line-active" },
    isTarget: true,
    overlays: [
      [ "Label", { location: [0.5, -0.5] } ]
    ]
  };

export default Ember.Component.extend(ModelTypeMixin, {
  classNameBindings: [':flow-builder-step', 'typeClass', 'isSelected:selected'],
  attributeBindings: ['style'],

  typeClass: Ember.computed('model.type', function () {
    return 'flow-step-' + this.get('model.type');
  }),

  style: Ember.computed('model.top', 'model.left', function () {
    return Ember.String.htmlSafe("top:%@px;left:%@px;".fmt(this.get('model.top'), this.get('model.left')));
  }),

  model: null,  // step model
  targetObject: null,  // form builder component

  jsPlumbInstance: null,

  isSelected: Ember.computed('model.name', 'targetObject.step.name', function () {
    return Ember.isEqual(this.get('model.name'), this.get('targetObject.step.name'));
  }),

  didInsertElement: function () {
    Ember.run.schedule('afterRender', this, function () {
      this.$().attr('id', this.get('model.name'));

      this.$().bind('click tap', function () {
        this.set('targetObject.step', this.get('model'));
      }.bind(this));

      this.jsPlumbInstance.draggable(this.$(), {
        grid: [20, 20],
        stop: function (event) {
          // event.pos [left, top]
          this.set('model.top', event.pos[1]);
          this.set('model.left', event.pos[0]);
        }.bind(this)
      });

      var inPoint = this.get('model.inPoint'),
        outPoint = this.get('model.outPoint');

      if (!inPoint) {
        inPoint = this.get('model.name') + 'TopCenter';
        this.set('model.inPoint', inPoint);
      }
      if (!outPoint) {
        outPoint = this.get('model.name') + 'BottomCenter';
        this.set('model.outPoint', outPoint);
      }

      // Generate endpoints
      if (this.get('model.type') === 'start') {
        this.jsPlumbInstance.addEndpoint(this.$().attr('id'), {anchor: 'BottomCenter', uuid: outPoint}, sourceEndpoint);
      } else if (this.get('model.type') === 'end') {
        this.jsPlumbInstance.addEndpoint(this.$().attr('id'), {anchor: 'TopCenter', uuid: inPoint}, targetEndpoint);
      } else {
        this.jsPlumbInstance.addEndpoint(this.$().attr('id'), {anchor: 'TopCenter', uuid: inPoint}, targetEndpoint);
        this.jsPlumbInstance.addEndpoint(this.$().attr('id'), {anchor: 'BottomCenter', uuid: outPoint}, sourceEndpoint);
      }
    });
  }
});
