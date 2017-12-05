export default [
  {
    path: '/',
    name: 'eventList',
    component: '/client/event-list/EventList.vue'
  },
  {
    path: '/login',
    name: 'loginPage',
    component: '/client/login-page/LoginPage.vue'
  },
  {
    path: '/logout',
    name: 'logoutPage',
    component: '/client/login-page/LoginPage.vue'
  },
  {
    path: '/:eventFriendlyId',
    name: 'eventPage',
    component: '/client/event-page/EventPage.vue'
  },
  {
    path: '/:eventFriendlyId/pay',
    name: 'payPage',
    component: '/client/pay-page/PayPage.vue'
  },
];
