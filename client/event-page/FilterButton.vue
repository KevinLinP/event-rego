<template lang="pug">
.filter-button-div
  router-link(class='filter-button' v-if='event' :to='to' :disabled='disabled')
    | {{ display() }}
</template>

<script>
  import { People } from '/imports/api/people/people.js';

  const component = {
    props: ['letter', 'event'],
    meteor: {
      disabled: function() {
        return !People.findOne({name: {$regex: `^${this.letter}`, $options: 'i'}});
      }
    },
    methods: {
      display: function() {
        return this.letter.toUpperCase();
      }
    },
    computed: {
      to: function() {
        if (!this.event) {
          return null;
        }

        return {
          name: 'eventPage',
          params: {
            eventFriendlyId: this.event.friendlyId
          },
          query: {
            filter: this.letter
          }
        }
      }
    }
  };

  export default component;
</script>
