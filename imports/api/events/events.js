// Definition of the links collection

import { Mongo } from 'meteor/mongo';

export const Events = new Mongo.Collection('events');

Events.schema = new SimpleSchema({
  name: {type: String},
  friendlyId: {type: String},
  startsAt: {type: Date},
  cashAmount: {type: Number, decimal: true},
  createdAt: {type: Date, autoValue: () => {
    return new Date();
  }}
});

Events.helpers({
  // inverse of y = x - 0.29x - .3
  paypalFee() {
    let cashAmountCents = this.cashAmount * 100;
    let feeCents = (cashAmountCents + 30) / 0.971;
    feeCents = feeCents - cashAmountCents;
    feeCents = Math.ceil(feeCents);

    return (feeCents / 100);
  },

  paypalTotal() {
    return this.cashAmount + this.paypalFee();
  }
});
