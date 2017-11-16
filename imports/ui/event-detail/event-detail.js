import { Events } from '../../api/events/events.js';
import moment from 'moment';

import './event-detail.jade';
import './people.js';

const fetchEvent = () => {
  const friendlyId = FlowRouter.getParam('eventFriendlyId');
  return Events.findOne({friendlyId: friendlyId});
};

Template.eventDetail.onCreated(function helloOnCreated() {
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

Template.eventDetail.helpers({
  event() {
    return fetchEvent();
  },
  humanStartsAt() {
    const event = fetchEvent();

    if (event) {
      return moment(event.startsAt).format('ddd M/D');
    } else {
      return null;
    }
  }
});
