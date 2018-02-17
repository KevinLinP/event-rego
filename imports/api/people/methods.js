// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { People } from './people.js';

const formatPhoneNumber = (phoneNumber) => {
  const lib = require('google-libphonenumber');
  const PNF = lib.PhoneNumberFormat;
  const phoneUtil = lib.PhoneNumberUtil.getInstance();

  const parsedNumber = phoneUtil.parse(phoneNumber, 'US');

  return {
    nationalPhoneNumber: phoneUtil.format(parsedNumber, PNF.NATIONAL),
    e164PhoneNumber: phoneUtil.format(parsedNumber, PNF.E164),
  }
};

Meteor.methods({
  'people.insert'(name, phoneNumber) {
    if (!Meteor.userId()) { 
      console.log('unauthorized operation detected!');
      return;
    }

    let phoneNumbers = {}
    if (phoneNumber) {
      phoneNumbers = formatPhoneNumber(phoneNumber);
    }

    const friendlyUrl = require('friendly-url');
    const friendlyId = friendlyUrl(name);

    const person = {
      name,
      ...phoneNumbers,
      friendlyId,
      createdAt: new Date(),
    }

    People.schema.clean(person);
    People.schema.validate(person);
    People.insert(person);

    return person;
  }
});
