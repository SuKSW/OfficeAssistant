import { Meteor } from 'meteor/meteor';
<<<<<<< HEAD
import { Path1 } from '/api/collections.js';

Meteor.startup(() => {
  // code to run on server at startup
  return Meteor.methods({
  	removePath1 : function(){
  		return Path1.remove({});
  	}
  });
=======

Meteor.startup(() => {
  // code to run on server at startup
>>>>>>> 5e8b2cdb8ec8b6388d1b007fd59cc46ed0262756
});
