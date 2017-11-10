import { Migrations } from 'meteor/percolate:migrations';

import { Events } from '../../api/events/events.js';
import { People } from '../../api/people/people.js';
import { Payments } from '../../api/payments/payments.js';
import { AuthorizedPaymentItems } from '../../api/authorized-payment-items/authorized-payment-items.js';

Migrations.add({
  version: 1,
  name: '',
  up: () => {
    Events.rawCollection().createIndex({friendlyId: 1}, {unique: true});
    People.rawCollection().createIndex({friendlyId: 1}, {unique: true});
  }
});

Migrations.add({
  version: 2,
  name: '',
  up: () => {
    Payments.rawCollection().createIndex({paymentId: 1}, {unique: true});
    AuthorizedPaymentItems.rawCollection().createIndex({eventId: 1, personId: 1}, {unique: true});
  }
});

Meteor.startup(() => {
  Migrations.migrateTo('latest')
});
