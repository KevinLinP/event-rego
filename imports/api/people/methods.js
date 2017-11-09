// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { People } from './people.js';

Meteor.methods({
  'people.insert'(name, phoneNumber) {
    var friendlyUrl = require('friendly-url');

    check(name, String);
    check(phoneNumber, String);
    const friendlyId = friendlyUrl(name);

    return People.insert({
      name,
      phoneNumber,
      friendlyId,
      createdAt: new Date(),
    });
  },

  'people.remove'(id) {
    return People.remove({_id: id});
  },
});
