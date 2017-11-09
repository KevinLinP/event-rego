import { Meteor } from 'meteor/meteor';
import { People } from '../people.js';

Meteor.publish('people', function () {
  return People.find({});
});
