import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/not-found/not-found.js';

import '../../ui/pages/events.js';
import '../../ui/pages/event.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'events' });
  },
});

FlowRouter.route('/events', {
  name: 'Events.index',
  action() {
    BlazeLayout.render('App_body', { main: 'events' });
  },
});

FlowRouter.route('/:friendlyId', {
  name: 'Events.show',
  action(params, queryParams) {
    BlazeLayout.render('App_body', { main: 'event' });
  }
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
