// Definition of the links collection

import { Mongo } from 'meteor/mongo';

export const Events = new Mongo.Collection('events');

Events.helpers({
  paypalAmount() {
    const amount = (this.cashAmount * 1.05) + 0.05;
    return amount.toFixed(2);
  }
});
