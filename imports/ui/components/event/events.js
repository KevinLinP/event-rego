import './events.jade';
import { Events } from '../../../api/events/events.js';

Template.events.onCreated(function helloOnCreated() {
  Meteor.subscribe('events');

  this.createEvent = () => {
    const name = this.$('[name=name]').val().trim();
    const cashAmount = Number.parseFloat(this.$('[name=cashAmount]').val());

    Meteor.call('createEvent', name, cashAmount);
  };
});

Template.events.helpers({
  events() {
    console.log(Events.find({}).count());
    return Events.find({});
  }
});

Template.events.events({
  'submit #new-event-form'(event, instance) {
    event.preventDefault();
    instance.createEvent();
  },
});
