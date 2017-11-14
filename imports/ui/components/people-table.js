import { People } from '../../api/people/people.js';
import { Regos } from '../../api/regos/regos.js';

import './people-table.jade';

Template.peopleTable.helpers({
  people() {
    let query = {};
    const filter = FlowRouter.getQueryParam('filter');
    if (filter) {
      query = {name: {$regex: `^${filter}`, $options: 'i'}};
    }

    return People.find(query);
  },

  filterLetter() {
    const filter = FlowRouter.getQueryParam('filter')
    return filter.toUpperCase();
  }
});

Template.personRow.helpers({
  paid() {
    const eventId = Template.parentData(1).event._id;
    const personId = this._id;
    const rego = Regos.findOne({eventId, personId});

    if (rego && rego.completed()) {
      return true;
    } else {
      return false;
    }
  },

  payPath(event) {
    const eventId = Template.parentData(1).event.friendlyId;
    const personId = Template.currentData().friendlyId;

    return `/${eventId}/pay?person=${personId}`;
  }
});
