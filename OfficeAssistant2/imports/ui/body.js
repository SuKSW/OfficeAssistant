import { Template } from 'meteor/templating';
import { Robots } from '../api/robots.js';
import './robot.js';
import './body.html';

Template.body.helpers({
  robots(){
  	return Robots.find({}, { sort: { createdAt: -1 } });
  },
});

Template.body.events({
  'submit .new-robot'(event) {

    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const robot_name = target.robot_input.value;

    // Insert a task into the collection
    Robots.insert({
      robot_name,
      createdAt: new Date(), // current time
    });

    // Clear form
    target.robot_input.value = '';
  },
});

 