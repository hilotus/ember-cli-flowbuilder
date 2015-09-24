import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['flow-builder-main'],

  model: null,  // form model

  step: null,  // selected field

  tag: 'editFlow',  // left tabs

  isAddStepTag: Ember.computed('tag', function () {
    return this.get('tag') === 'addStep';
  }),

  isEditStepTag: Ember.computed('tag', function () {
    return this.get('tag') === 'editStep';
  }),

  isEditFlowTag: Ember.computed('tag', function () {
    return this.get('tag') === 'editFlow';
  }),

  fieldChanged: Ember.observer('field', function () {
    if (this.field) {
      this.set('tag', 'editField');
    }
  }),

  jsPlumbInstance: null,

  didInsertElement: function () {
    Ember.run.schedule('afterRender', this, function () {
      var height = this.$().height();  // flow-builder-main's height
      this.$('.flow-builder-board').css({height: height});

      this.jsPlumbInstance = window.jsPlumb.getInstance({
        // default drag options
        DragOptions: { cursor: 'pointer', zIndex: 2000 },
        // the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
        // case it returns the 'labelText' member that we set on each connection in the 'init' method below.
        ConnectionOverlays: [
          [ "Arrow", { location: 1 } ],
          [ "Label", {
            location: 0.1,
            id: "label",
            cssClass: "flow-step-line-title"
          }]
        ],
        Container: ".flow-builder-board"
      });

      this.jsPlumbInstance.registerConnectionType("basic", {
        connector: "StateMachine",
        paintStyle: { strokeStyle: "red", lineWidth: 4 },
        hoverPaintStyle: { strokeStyle: "blue" },
        overlays: [ "Arrow" ]
      });

      // TODO: save step next when connection.
      this.jsPlumbInstance.bind("connection", function (connectInfo) {
        var connection = connectInfo.connection;
        connection.getOverlay("label").setLabel(connection.sourceId + "-" + connection.targetId);
        // console.log("connection " + connection.id + " was dragged");
      });

    });
  },

  actions: {
    toggleTag: function (tag) {
      this.set('tag', tag);
    },

    addStep: function (stepType) {
      var Step = this.container.lookupFactory('flow-step-model:' + stepType);
      if (!Step) {
        throw new Ember.Error(stepType + ' is not supported.');
      }

      var step = Step.create({name: Ember.uuid(), type: stepType, title: stepType});
      step.setProperties({top: parseInt(Math.random() * 100), left: 100});
      this.get('model.steps').pushObject(step);
    }
  }
});
