import { Meteor } from 'meteor/meteor';
import { Regos } from '../regos.js';

Meteor.publish('singleRego', function (eventId, personId) {
  return Regos.find({eventId: eventId, personId: personId});
});

Meteor.publish('eventRegos', function (eventId) {
  return Regos.find({eventId: eventId});
});
