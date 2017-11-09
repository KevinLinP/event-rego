import './event.jade';
import { Events } from '../../api/events/events.js';

import '../components/people.js';

Template.event.onCreated(function helloOnCreated() {
  this.getFriendlyId = () => {
    return FlowRouter.getParam('eventFriendlyId');
  }

  this.autorun(() => {
    this.subscribe('event', this.getFriendlyId());
  });
});

Template.event.helpers({
  event() {
    const friendlyId = FlowRouter.getParam('eventFriendlyId');
    return Events.findOne({friendlyId: friendlyId});
  }
});
