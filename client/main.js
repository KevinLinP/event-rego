import Vue from 'vue';
import {RouterFactory, nativeScrollBehavior} from 'meteor/akryum:vue-router2';

import VueMeteorTracker from 'vue-meteor-tracker';
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Meteor.startup(() => {
  const router = new RouterFactory({
    mode: 'history',
    scrollBehavior: nativeScrollBehavior,
  }).create();

  Vue.use(VueMeteorTracker);
  Vue.use(BootstrapVue);

  new Vue({
    router,
    el: '#app',
    render: (createElement) => {
      return createElement(Vue.component('layout'));
    }
  });
});
