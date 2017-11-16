<template lang="pug">
div
  .mb-2
    h1.h3 Events

  table.table
    EventListItem(v-for='event in events' :key='event._id' :event='event')
</template>

<script>
  import { Events } from '/imports/api/events/events.js';

  const component = {
    methods: {
    },
    meteor: {
      $subscribe: {
        'events': []
      },
      events: function() {
        return Events.find({});
      }
    }
  };

  export default component;
</script>
