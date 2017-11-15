import './people.jade';
import { People } from '../../api/people/people.js';
import { Regos } from '../../api/regos/regos.js';

import './people-list.js';

Template.people.viewmodel({
  onCreated: function() {
    Meteor.subscribe('people');
  },
  filterLetter: function() {
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

Template.personForm.viewmodel({
  name: '',
  createPerson: function(event) {
    event.preventDefault();
    const name = this.name().trim();

    Meteor.call('people.insert', name);
  }
});
