<template lang="pug">
div
  .mb-4(v-if='event')
    h1.h5 {{event.name}}
    h2.h6 ${{event.cashAmount}}

  people-list(v-if="filterLetter" :event='event')
  filter-buttons(v-else :event='event')
  script(src="https://www.paypalobjects.com/api/checkout.js")

  .mb-4(v-if='loggedIn')
    .h6 Add hasher
    person-form
</template>

<script>
  import { Events } from '/imports/api/events/events.js';

  const component = {
    meteor: {
      $subscribe: {
        'event': function() {
          return [this.friendlyId()];
        },
        'eventRegos': function() {
          return [this.friendlyId()];
        },
        'people': []
      },
      event: function() {
        return Events.findOne({friendlyId: this.friendlyId()});
      },
      loggedIn: function() {
        return !!Meteor.userId();
      }
    },
    methods: {
      friendlyId: function() {
        return this.$route.params.eventFriendlyId;
      }
    },
    computed: {
      filterLetter: function() {
        return this.$route.query.filter;
      },
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
