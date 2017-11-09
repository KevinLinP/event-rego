// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { People } from './people.js';

Meteor.methods({
  'people.insert'(name, phoneNumber) {
    check(name, String);
    check(phoneNumber, String);

    return People.insert({
      name,
      phoneNumber,
      createdAt: new Date(),
    });
  },

  'people.remove'(id) {
    return People.remove({_id: id});
  },
});
