<template lang="pug">
.filter-button-div
  router-link(v-if='event' class='filter-button' :to='to' :disabled='disabled')
    | {{ display }}
  a(v-else class='filter-button' disabled='disabled')
    | {{ display }}
</template>

<script>
  import { Session } from 'meteor/session';
  import { People } from '/imports/api/people/people.js';

  const component = {
    props: ['letter', 'event'],
    data: function() {
      return {
        display: this.letter.toUpperCase(),
      };
    },
    meteor: {
      disabled: function() {
        let regex;
        if (this.letter == '#') {
          regex = '^[^a-zA-Z]';
        } else {
          regex = `^${this.letter}`;
        }

        return !People.findOne({name: {$regex: regex, $options: 'i'}});
      }
    },
    computed: {
      to: function() {
        if (!this.event) {
          return null;
        }

        return {
          name: 'eventPage',
          params: { eventFriendlyId: this.event.friendlyId },
          query: { filter: this.letter }
        };
      }
    }
  };

  export default component;
</script>
