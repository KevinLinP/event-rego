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
  event: function() {
    return this.parent().event();
  },
  paid: function() {
    const eventId = this.event()._id;
    const personId = this._id();
    const rego = Regos.findOne({
      eventId,
      personId
    });

    return (rego && rego.completed());
  },
  payPath: function(event) {
    const eventId = this.event().friendlyId;
    const personId = this.friendlyId();
    
    return `/${eventId}/pay?person=${personId}`;
  },
  payWithCash: function() {
    const eventId = this.event()._id;
    const personId = this._id();

    Meteor.call('regos.payWithCash', {eventId, personId});
  },
  payWithCashIcon: function() {
    return "💸";
  }
});
