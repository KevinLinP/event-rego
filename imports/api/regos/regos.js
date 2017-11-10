import { Mongo } from 'meteor/mongo';

export const Regos = new Mongo.Collection('regos');

Regos.schema = new SimpleSchema({
  status: {type: String, defaultValue: 'pending', allowedValues: ['pending', 'completed']},
  eventId: {type: String},
  personId: {type: String},
  paymentId: {type: String},
  createdAt: {type: Date, autoValue: () => {
    return new Date();
  }}
});
