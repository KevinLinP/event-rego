import './event-list.jade';
import { Events } from '../../api/events/events.js';

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

    alert('hi');

    const name = this.name().trim();
    const startsAt = this.startsAt().trim();
    const cashAmount = Number.parseFloat(this.cashAmount());

    Meteor.call('events.insert', {name, startsAt, cashAmount});
  }
});

Template.eventListItem.helpers({
  url() {
    return `/${this.friendlyId}`;
  }
});

Template.eventListItem.events({
  'click .js-delete-event-button'(event, instance) {
    Meteor.call('events.remove', this._id);
  }
});
