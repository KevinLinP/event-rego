<template lang="pug">
.row
  .filter-button-div(v-for="letter in letters")
    a.filter-button(v-if="letter.active" href="letter.href")
      div {{letter.display}}
    a.filter-button(v-else disabled='disabled')
      div {{letter.display}}
</template>

<script>
  import { People } from '/imports/api/people/people.js';

  const component = {
    methods: {
      friendlyId: function() {
        return this.$route.params.eventFriendlyId;
      }
    },
    computed: {
      filterLetter: function() {
        return this.$route.query.filter;
      },
      letters: function() {
        const eventFriendlyId = this.friendlyId();
        let letters = [];

        let i;
        for (n = 0; n < 26; n++) {
          const letter = String.fromCharCode(97+ n);
          const active = !!People.findOne({name: {$regex: `^${letter}`, $options: 'i'}});

          letters.push({
            display: letter.toUpperCase(),
            href: `/${eventFriendlyId}?filter=${letter}`,
            active
          });
        }
        
        return letters;
      }
    }
  };

  export default component;
</script>
