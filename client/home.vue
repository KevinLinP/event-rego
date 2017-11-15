<template>
  <ul>
    <li v-for="event in events">
      {{ event.name }}
    </li>
  </ul>
</template>

<script>
  import Vue from 'vue';
  import {RouterFactory} from 'meteor/akryum:vue-router2';
  import {ReactiveVar} from 'meteor/reactive-var';
  import { Events } from '/imports/api/events/events.js';

  const component = {
    meteor: {
      $subscribe: {
        'events': []
      },
      events: function() {
        return Events.find({});
      }
    }
  };

  RouterFactory.configure((factory) => {
    factory.addRoutes([
      {
        path: '/',
        name: 'home',
        component,
      },
    ]);
  });
  export default component;
</script>
