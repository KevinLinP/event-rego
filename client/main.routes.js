export default [
  {
    path: '/',
    name: 'eventList',
    component: '/client/event-list/EventList.vue'
  },
  {
    path: '/:eventFriendlyId',
    name: 'eventPage',
    component: '/client/event-page/EventPage.vue'
  },
];
