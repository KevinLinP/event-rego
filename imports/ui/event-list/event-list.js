import './event-list.jade';
import { Events } from '../../api/events/events.js';

Template.eventList.onCreated(function helloOnCreated() {
  Meteor.subscribe('events');
});

Template.eventList.helpers({
  events() {
    return Events.find({});
  }
});

Template.eventForm.onCreated(function() {
  this.createEvent = () => {
    const name = this.$('[name=name]').val().trim();
    const cashAmount = Number.parseFloat(this.$('[name=cashAmount]').val());

    Meteor.call('events.insert', name, cashAmount);
  };
});

Template.eventForm.helpers({
  'submit .js-new-event-form'(event, instance) {
    event.preventDefault();
    instance.createEvent();
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
