// Definition of the links collection

import { Mongo } from 'meteor/mongo';

export const People = new Mongo.Collection('people');

People.schema = new SimpleSchema({
  name: {type: String},
  friendlyId: {type: String},
  nationalPhoneNumber: {type: String, optional: true},
  e164PhoneNumber: {type: String, optional: true},
  createdAt: {type: Date, autoValue: () => {
    return new Date();
  }}
});
