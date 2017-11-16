import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Events } from './events.js';

Meteor.methods({
  'events.insert'(fields) {
    var friendlyUrl = require('friendly-url');
    var chrono = require('chrono-node');
    chrono.parseDate('An appointment on Sep 12-13');

    let {name, startsAt, cashAmount} = fields;
    check(name, String);
    check(cashAmount, Number);

    startsAt = chrono.parseDate(startsAt);
    const friendlyId = friendlyUrl(name);

    const event = {
      name,
      cashAmount,
      startsAt,
      friendlyId
    }

    Events.schema.clean(event);
    Events.schema.validate(event);

    return Events.insert(event);
  },

  'events.remove'(id) {
    return Events.remove({_id: id});
  },
});

