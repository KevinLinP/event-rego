import { Mongo } from 'meteor/mongo';

export const AuthorizedPayments = new Mongo.Collection('authorizedPayments');
