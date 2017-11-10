import { Meteor } from 'meteor/meteor';
import { AuthorizedPaymentItems } from '../authorized-payment-items.js';

Meteor.publish('authorizedPaymentItems', function (eventId, personId) {
  return AuthorizedPaymentItems.find({eventId: eventId, personId: personId});
});
