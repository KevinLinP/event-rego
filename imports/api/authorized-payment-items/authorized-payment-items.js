import { Mongo } from 'meteor/mongo';

export const AuthorizedPaymentItems = new Mongo.Collection('authorizedPaymentItems');

AuthorizedPaymentItems.schema = new SimpleSchema({
  status: {type: String, defaultValue: 'pending', allowedValues: ['pending', 'completed']},
  eventId: {type: String},
  personId: {type: String},
  paymentId: {type: String},
  createdAt: {type: Date, autoValue: () => {
    return new Date();
  }}
});
