<template lang="pug">
div
  table.people-list
    people-list-item(v-for="person in filteredPeople" :person='person')
</template>

<script>
  import { People } from '/imports/api/people/people.js';

  const component = {
    props: ['event'],
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
