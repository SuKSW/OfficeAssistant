import { Template } from 'meteor/templating';
import { Robots } from '../api/robots.js';
import './robot.html';

 

Template.robot.events({

  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Robots.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },

  'click .delete'() {
    Robots.remove(this._id);
  },
});

