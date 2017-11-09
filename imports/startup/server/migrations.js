import { Migrations } from 'meteor/percolate:migrations';

import { Events } from '../../api/events/events.js';
import { People } from '../../api/people/people.js';

Migrations.add({
  version: 1,
  name: '',
  up: () => {
    Events.rawCollection().createIndex({friendlyId: 1}, {unique: true});
    People.rawCollection().createIndex({friendlyId: 1}, {unique: true});
  }
});

Meteor.startup(() => {
  Migrations.migrateTo('latest')
});
