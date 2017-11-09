// Definition of the links collection

import { Mongo } from 'meteor/mongo';

export const Events = new Mongo.Collection('events');

Events.schema = new SimpleSchema({
  name: {type: String},
  friendlyId: {type: String},
  cashAmount: {type: Number, decimal: true},
  createdAt: {type: Date}
});

Events.helpers({
  paypalFee() {
    let cents = this.cashAmount * 100;
    cents = (cents * 0.029) + 30;
    cents = Math.ceil(cents);

    return (cents / 100).toFixed(2);
  },

  paypalTotal() {
    return this.cashAmount + this.paypalFee();
  }
});
