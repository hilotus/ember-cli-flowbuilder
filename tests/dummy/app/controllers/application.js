import Ember from 'ember';

export default Ember.Controller.extend({
  init() {
    this._super();
    var Flow = this.container.lookupFactory('flow-model:main');
    // this.set('model', Flow.create({name: 'My flow', description: 'My flow description', steps: []}));

    var flow = Flow.create();
    flow.initFromJson(
      {
        "name": "My flow",
        "description": "My flow description",
        "steps": [{
          "name": '364',
          "type": "start",
          "title": "start",
          "top": 73,
          "left": 100,
          "outPoint": "364BottomCenter",
          "next": '381',
          "description": null
        }, {
          "name": '381',
          "type": "condition",
          "title": "condition",
          "top": 92,
          "left": 311,
          "inPoint": "381TopCenter",
          "outPoint": "381BottomCenter",
          "next": '390',
          "description": null
        }, {
          "name": '390',
          "type": "end",
          "title": "end",
          "top": 230,
          "left": 420,
          "inPoint": "390TopCenter",
          "description": null,
          "next": null
        }]
      }
    );
    this.set('model', flow);
  },

  actions: {
    printModel() {
      console.log(JSON.stringify(this.get('model').serialize()));
    }
  }
});
