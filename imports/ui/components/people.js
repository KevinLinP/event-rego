import './people.jade';
import { People } from '../../api/people/people.js';
import { Regos } from '../../api/regos/regos.js';

import './people-list.js';

Template.people.onCreated(function() {
  Meteor.subscribe('people');
});

Template.people.helpers({
  filterLetter() {
    return FlowRouter.getQueryParam('filter');
  }
});

Template.filterButtons.helpers({
  letters() {
    const eventFriendlyId = FlowRouter.getParam('eventFriendlyId');
    let letters = [];

    let i;
    for (n = 0; n < 26; n++) {
      const letter = String.fromCharCode(97+ n);
      const active = !!People.findOne({name: {$regex: `^${letter}`, $options: 'i'}});

      letters.push({
        display: letter.toUpperCase(),
        href: `/${eventFriendlyId}?filter=${letter}`,
        active
      });
    }
    
    return letters;
  }
});

Template.personForm.onCreated(function() {
  this.createPerson = () => {
    const name = this.$('[name=name]').val().trim();
    const phoneNumber = this.$('[name=phoneNumber]').val().trim();

    Meteor.call('people.insert', name, phoneNumber);
  };
});

Template.personForm.events({
  'submit form'(event, instance) {
    event.preventDefault();
    instance.createPerson();
  }
});
