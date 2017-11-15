import { People } from '../../api/people/people.js';
import { Regos } from '../../api/regos/regos.js';

import './people-list.jade';

Template.peopleList.viewmodel({
  filterLetter: function() {
    return FlowRouter.getQueryParam('filter');
  },
  people: function() {
    let query = {};
    let filterLetter = this.filterLetter();
    if (filterLetter) {
      query = {name: {$regex: `^${filterLetter}`, $options: 'i'}};
    }

    return People.find(query);
  },
  filterLetterDisplay: function() {
    return this.filterLetter().toUpperCase();
  },
});

Template.personListItem.viewmodel({
  paid: function() {
    const eventId = Template.parentData(1).event._id;
    const personId = this._id();
    const rego = Regos.findOne({eventId, personId});

    return (rego && rego.completed());
  },
  payPath: function(event) {
    //const eventId = Template.parentData(1).event.friendlyId;
    //const personId = Template.currentData().friendlyId;
    
    //return `/${eventId}/pay?person=${personId}`;
    return ``;
  },
  payWithCashIcon: function() {
    return "💸";
  }
});
