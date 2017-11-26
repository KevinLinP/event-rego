<template lang="pug">
div
  div(v-if="filterLetter")
    table.people-list
      tr(v-for="person in people")
        td {{person.name}}
  div(v-else)
    filter-buttons
  .mb-4
    .h6 Add hasher
    person-form
</template>

<script>
  import { Regos } from '/imports/api/regos/regos.js';
  import { People } from '/imports/api/people/people.js';

  const component = {
    meteor: {
      people: function() {
        return People.find({});
      }
    },
    computed: {
      filterLetter: function() {
        return this.$route.query.filter;
      }
    }
  };

  export default component;
</script>
