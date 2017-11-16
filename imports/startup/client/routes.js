import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/layout.js';
import '../../ui/pages/not-found/not-found.js';

import '../../ui/event-list/event-list.js';
import '../../ui/event-detail/event-detail.js';
import '../../ui/pages/event-pay.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'eventList' });
  },
});

FlowRouter.route('/events', {
  name: 'Events.index',
  action() {
    BlazeLayout.render('App_body', { main: 'eventList' });
  },
});

FlowRouter.route('/:eventFriendlyId', {
  name: 'Events.show',
  action(params, queryParams) {
    BlazeLayout.render('App_body', { main: 'eventDetail' });
  }
});

FlowRouter.route('/:eventFriendlyId/pay', {
  name: 'Events.pay',
  action(params, queryParams) {
    BlazeLayout.render('App_body', { main: 'eventPay' });
  }
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
