<template lang="pug">
div
  .mb-4(v-if='event')
    h1.h5 
      | {{event.name}}
      br
      small ${{event.cashAmount}}

  .mb-4(v-if='loggedIn')
    paid-only-toggle

  .mb-3
    people-list(v-if='viewPaidOnly' :event='event' :paidOnly='true')
    div(v-else)
      people-list(v-if="filterLetter" :event='event' :filterLetter='filterLetter')
      filter-buttons(v-else :event='event')

  .mb-4(v-if='loggedIn')
    .h6 Add hasher
    person-form
</template>

<script>
  import { Session } from 'meteor/session'
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
      },
      viewPaidOnly: function() {
        return Session.get('viewPaidOnly');
      },
      filterLetter: function() {
        return Session.get('filterLetter');
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
