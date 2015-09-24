import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['flow-builder-main'],

  model: null,  // form model

  step: null,  // selected step

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

  stepChanged: Ember.observer('step', function () {
    if (this.step) {
      this.set('tag', 'editStep');
    }
  }),

  jsPlumbInstance: null,

  init: function () {
    this._super();
    this.set('jsPlumbInstance', window.jsPlumb.getInstance({
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
    }));
  },

  didInsertElement: function () {
    Ember.run.schedule('afterRender', this, function () {
      var height = this.$().height();  // flow-builder-main's height
      this.$('.flow-builder-board').css({height: height});

      this.jsPlumbInstance.registerConnectionType("basic", {
        connector: "StateMachine",
        paintStyle: { strokeStyle: "red", lineWidth: 4 },
        hoverPaintStyle: { strokeStyle: "blue" },
        overlays: [ "Arrow" ]
      });

      // Save step next when connection.
      // connInfo, originalEvent
      this.jsPlumbInstance.bind("connection", function (connInfo) {
        var sourceId = connInfo.connection.sourceId,
          targetId = connInfo.connection.targetId,

          sourceStep = this.get('model.steps').filter(function (step) {
            return Ember.isEqual(step.get('name'), sourceId);
          })[0],

          targetStep = this.get('model.steps').filter(function (step) {
            return Ember.isEqual(step.get('name'), targetId);
          })[0];

        if (sourceStep) {
          sourceStep.next = targetStep.name;
          connInfo.connection.getOverlay("label").setLabel(sourceStep.title + " - " + targetStep.title);
        } else {
          // delete the connection.
          Ember.run.next(function () {
            this.jsPlumbInstance.detach(connInfo.connection);
          }.bind(this));
        }
      }.bind(this));

      // conn, originalEvent
      this.jsPlumbInstance.bind("click", function (conn) {
        // if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
        //   instance.detach(conn);
        conn.toggleType("basic");
      }.bind(this));

      // Render lines
      this.get('model.steps').forEach(function (step) {
        if (step.next) {
          var next = this.get('model.steps').filter(function (s) { return s.name === step.next; } )[0];
          if (next) {
            this.jsPlumbInstance.connect({uuids: [step.outPoint, next.inPoint]});
          }
        }
      }, this);

      // window.jsPlumb.fire("jsPlumbDemoLoaded", this.jsPlumbInstance);
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

      var step = Step.create({name: Ember.uuid() + '', type: stepType, title: stepType});
      step.setProperties({top: parseInt(Math.random() * 100), left: 100});
      this.get('model.steps').pushObject(step);
    },

    delete: function (step) {
      this.jsPlumbInstance.removeAllEndpoints(this.$().find('#' + step.name));
      this.get('model.steps').removeObject(step);
    }
  }
});
