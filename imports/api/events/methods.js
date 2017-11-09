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

    return Events.insert({
      name,
      cashAmount,
      friendlyId,
      createdAt: new Date(),
    });
  },

  'events.remove'(id) {
    return Events.remove({_id: id});
  },
});

