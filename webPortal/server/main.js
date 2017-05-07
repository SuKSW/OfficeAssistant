import { Meteor } from 'meteor/meteor';
import { Path1 } from '/api/collections.js';

Meteor.startup(() => {
  // code to run on server at startup
	return Meteor.methods({
	  	removePath1 : function(){
	  		return Path1.remove({});
	  	}
	});
});