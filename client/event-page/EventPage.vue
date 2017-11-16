<template lang="pug">
div
  h1 {{ event.name }}
  | {{ regoCount }}
</template>

<script>
  import { Events } from '/imports/api/events/events.js';
  import { Regos } from '/imports/api/regos/regos.js';

  const component = {
    meteor: {
      $subscribe: {
        'event': function() {
          return [this.friendlyId()];
        },
        'eventRegos': function() {
          return [this.friendlyId()];
        }
      },
      event: function() {
        return Events.findOne({friendlyId: this.friendlyId()});
      }
    },
    methods: {
      friendlyId: function() {
        return this.$route.params.eventFriendlyId;
      }
    },
    computed: {
      regoCount: function() {
        if (this.event) {
          return Regos.find({eventId: this.event._id}).count();
        } else {
          return null;
        }
      }
    }
  };

  export default component;
</script>
