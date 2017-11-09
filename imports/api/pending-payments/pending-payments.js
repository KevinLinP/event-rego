import { Mongo } from 'meteor/mongo';

export const PendingPayments = new Mongo.Collection('pendingPayments');
