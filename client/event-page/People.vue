<template lang="pug">
div
  div(v-if="filterLetter")
    table.people-list
      tr(v-for="person in filteredPeople")
        td {{person.name}}

  .row(v-else)
    filter-button(v-for="letter in letters" :letter="letter", :event="event")

  .mb-4
    .h6 Add hasher
    person-form
</template>

<script>
  import { People } from '/imports/api/people/people.js';

  const component = {
    props: ['event'],
    data: function() {
      let letters = [];

      let i;
      for (n = 0; n < 26; n++) {
        const letter = String.fromCharCode(97 + n);
        letters.push(letter);
      }

      return {
        letters
      };
    },
    meteor: {
      filteredPeople: {
        params: function() {
          return {filterLetter: this.filterLetter};
        },
        update: function({filterLetter}) {
          const query = {name: {$regex: `^${filterLetter}`, $options: 'i'}};
          const options = {sort: {name: 1}};

          return People.find(query, options);
        }
      }
    },
    computed: {
      filterLetter: function() {
        return this.$route.query.filter;
      }
    },
  };

  export default component;
</script>
