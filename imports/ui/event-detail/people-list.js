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

    return People.find(query, {sort: {name: 1}});
  },
  filterLetterDisplay: function() {
    return this.filterLetter().toUpperCase();
  },
});

Template.personListItem.viewmodel({
  event: function() {
    return this.parent().event();
  },
  rego: function() {
    const eventId = this.event()._id;
    const personId = this._id();
    const rego = Regos.findOne({
      eventId,
      personId
    });

    return rego;
  },
  paid: function() {
    const rego = this.rego();

    return (rego && rego.completed());
  },
  paidWithPaypal() {
    return this.rego().type == 'paypal';
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
});
