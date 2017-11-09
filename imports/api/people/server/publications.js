import { Meteor } from 'meteor/meteor';
import { People } from '../people.js';

Meteor.publish('people', function () {
  return People.find({});
});

Meteor.publish('person', function (friendlyId) {
  return People.find({friendlyId: friendlyId});
});
