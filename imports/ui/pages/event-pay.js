import './event-pay.jade';
import { Events } from '../../api/events/events.js';
import { People } from '../../api/people/people.js';

Template.eventPay.onCreated(function helloOnCreated() {
  this.getEventFriendlyId = () => {
    return FlowRouter.getParam('eventFriendlyId');
  }
  this.getPersonFriendlyId = () => {
    return FlowRouter.getQueryParam('person');
  }

  this.autorun(() => {
    this.subscribe('event', this.getEventFriendlyId());
  });

  this.autorun(() => {
    this.subscribe('person', this.getPersonFriendlyId());
  });
});

Template.eventPay.helpers({
  event() {
    const friendlyId = FlowRouter.getParam('eventFriendlyId');
    const event = Events.findOne({friendlyId: friendlyId});
    return event;
  },

  person() {
    const friendlyId = FlowRouter.getQueryParam('person');
    const person = People.findOne({friendlyId: friendlyId});
    return person;
  },
});
