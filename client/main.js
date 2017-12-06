import Vue from 'vue';
import {RouterFactory, nativeScrollBehavior} from 'meteor/akryum:vue-router2';

import VueMeteorTracker from 'vue-meteor-tracker';

Meteor.startup(() => {
  const router = new RouterFactory({
    mode: 'history',
    scrollBehavior: nativeScrollBehavior,
  }).create();

  Vue.use(VueMeteorTracker);

  new Vue({
    router,
    el: '#app',
    render: (createElement) => {
      return createElement(Vue.component('layout'));
    }
  });
});
