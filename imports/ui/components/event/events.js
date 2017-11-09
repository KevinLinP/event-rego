import './events.jade';
import { Events } from '../../../api/events/events.js';

Template.events.onCreated(function helloOnCreated() {
  Meteor.subscribe('events');

  this.createEvent = () => {
    const name = this.$('[name=name]').val().trim();
    const cashAmount = Number.parseFloat(this.$('[name=cashAmount]').val());

    Meteor.call('events.insert', name, cashAmount);
  };
});

Template.events.helpers({
  events() {
    return Events.find({});
  }
});

Template.events.events({
  'submit .js-new-event-form'(event, instance) {
    event.preventDefault();
    instance.createEvent();
  }
});

Template.eventRow.helpers({
  url() {
    return `/${this.friendlyId}`;
  }
});

Template.eventRow.events({
  'click .js-delete-event-button'(event, instance) {
    Meteor.call('events.remove', this._id);
  }
});
