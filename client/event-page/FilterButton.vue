<template lang="pug">
.filter-button-div
  a(class='filter-button' v-if='event' :disabled='disabled' @click='setFilterLetter' href="javascript:void(0);")
    | {{ display() }}
</template>

<script>
  import { Session } from 'meteor/session';
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
      },
      setFilterLetter: function() {
        Session.set('filterLetter', this.letter);
      }
    }
  };

  export default component;
</script>
