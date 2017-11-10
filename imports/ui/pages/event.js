import './event.jade';
import { Events } from '../../api/events/events.js';

import '../components/people.js';

const fetchEvent = () => {
  const friendlyId = FlowRouter.getParam('eventFriendlyId');
  return Events.findOne({friendlyId: friendlyId});
};

Template.event.onCreated(function helloOnCreated() {
  this.getFriendlyId = () => {
    return FlowRouter.getParam('eventFriendlyId');
  }

  this.autorun(() => {
    this.subscribe('event', this.getFriendlyId());
  });

  this.autorun(() => {
    const event = fetchEvent();

    if (event) {
      this.subscribe('eventRegos', event._id);
    }
  });
});

Template.event.helpers({
  event() {
    return fetchEvent();
  }
});
