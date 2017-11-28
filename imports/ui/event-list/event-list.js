import { Events } from '../../api/events/events.js';
import moment from 'moment';

import './event-list.jade';

Template.eventList.viewmodel({
  autorun: function() {
    Meteor.subscribe('events');
  },
  allEvents: function() {
    return Events.find({});
  }
});

Template.eventForm.viewmodel({
  createEvent: function(event) {
    event.preventDefault();

    const name = this.name().trim();
    const startsAt = this.startsAt().trim();
    const cashAmount = Number.parseFloat(this.cashAmount());

    Meteor.call('events.insert', {name, startsAt, cashAmount});
  }
});

Template.eventListItem.viewmodel({
  humanStartsAt() {
    return moment(this.startsAt()).format('ddd M/D');
  },
  url: function() {
    return `/${this.friendlyId()}`;
  }
});
