import { Mongo } from 'meteor/mongo';

export const Payments = new Mongo.Collection('payments');

Payments.schema = new SimpleSchema({
  status: {type: String, defaultValue: 'created', allowedValues: ['created', 'approved', 'failed']},
  paymentId: {type: String},
  payerId: {type: String, optional: true},
  data: {type: Object, blackbox: true},
  createdAt: {type: Date, autoValue: () => {
    return new Date();
  }}
});
