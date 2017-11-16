import { Meteor } from 'meteor/meteor';
import { Regos } from '../regos.js';
import { Events } from '../../events/events.js';

Meteor.publish('singleRego', function (eventId, personId) {
  return Regos.find({eventId: eventId, personId: personId});
});

Meteor.publish('eventRegos', function (eventFriendlyId) {
  const event = Events.findOne({friendlyId: eventFriendlyId});
  if (event) {
    return Regos.find({eventId: event._id});
  }
});
