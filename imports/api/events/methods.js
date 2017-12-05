import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Events } from './events.js';

Meteor.methods({
  'events.insert'(fields) {
    if (!Meteor.userId()) { 
      console.log('unauthorized operation detected!');
      return;
    }

    var friendlyUrl = require('friendly-url');
    var chrono = require('chrono-node');

    let {name, startsAt, cashAmount} = fields;
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
    if (!Meteor.userId()) { 
      console.log('unauthorized operation detected!');
      return;
    }

    return Events.remove({_id: id});
  },
});

