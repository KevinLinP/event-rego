import { Mongo } from 'meteor/mongo';

export const Regos = new Mongo.Collection('regos');

Regos.schema = new SimpleSchema({
  status: {type: String, defaultValue: 'in_progress', allowedValues: ['in_progress', 'completed']},
  eventId: {type: String},
  personId: {type: String},
  paymentId: {type: String},
  createdAt: {type: Date, autoValue: () => {
    return new Date();
  }}
});

Regos.helpers({
  completed() {
    return (this.status == 'completed');
  },

  inProgress() {
    return (this.status == 'in_progress');
  }
});
