import './event.jade';
import { Events } from '../../../api/events/events.js';

Template.event.onCreated(function helloOnCreated() {
  this.getFriendlyId = () => {
    return FlowRouter.getParam('friendlyId');
  }

  this.autorun(() => {
    this.subscribe('event', this.getFriendlyId());
  });
});

Template.event.helpers({
  event() {
    const friendlyId = FlowRouter.getParam('friendlyId');
    return Events.findOne({friendlyId: friendlyId});
  }
});
