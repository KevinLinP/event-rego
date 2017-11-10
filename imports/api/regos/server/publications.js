import { Meteor } from 'meteor/meteor';
import { Regos } from '../regos.js';

Meteor.publish('singleRego', function (eventId, personId) {
  return Regos.find({eventId: eventId, personId: personId});
});
