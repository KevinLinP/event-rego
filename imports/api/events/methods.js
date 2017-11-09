// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Events } from './events.js';

Meteor.methods({
  'events.insert'(name, cashAmount) {
    var friendlyUrl = require('friendly-url');

    check(name, String);
    check(cashAmount, Number);
    const friendlyId = friendlyUrl(name);

    const event = {
      name,
      cashAmount,
      friendlyId,
      createdAt: new Date(),
    }

    Events.schema.validate(event);
    return Events.insert(event);
  },

  'events.remove'(id) {
    return Events.remove({_id: id});
  },
});

