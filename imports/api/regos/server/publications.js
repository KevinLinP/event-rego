import { Meteor } from 'meteor/meteor';
import { Regos } from '../regos.js';

Meteor.publish('regos', function (eventId, personId) {
  return Regos.find({eventId: eventId, personId: personId});
});
