<template lang="pug">
div
  .mb-2
    h1.h3 Events

  table.table
    event-list-item(v-for='event in events' :key='event._id' :event='event')

  event-form(v-if='loggedIn')
</template>

<script>
  import { Events } from '/imports/api/events/events.js';

  const component = {
    meteor: {
      $subscribe: {
        'events': []
      },
      loggedIn: function() {
        return !!Meteor.userId();
      },
      events: function() {
        return Events.find({}, {sort: {startsAt: -1}});
      }
    }
  };

  export default component;
</script>
