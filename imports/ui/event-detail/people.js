import { People } from '../../api/people/people.js';
import { Regos } from '../../api/regos/regos.js';

import './people.jade';
import './people-list.js';
import './filter-buttons.js';

Template.people.viewmodel({
  onCreated: function() {
    Meteor.subscribe('people');
  },
  filterLetter: function() {
    return FlowRouter.getQueryParam('filter');
  }
});

Template.personForm.viewmodel({
  name: '',
  createPerson: function(event) {
    event.preventDefault();
    const name = this.name().trim();

    // TODO: navigate to filter page

    Meteor.call('people.insert', name);
  }
});
