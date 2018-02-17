<template lang="pug">
form.form(@submit="createPerson")
  .person-form-controls
    input(type='text' v-model="name" placeholder='name' required='true')
    button(type="submit" class="btn btn-primary") add
</template>

<script>
  import { Session } from 'meteor/session';

  const component = {
    data: function() {
      return {
        name: '',
      };
    },
    methods: {
      createPerson: function(jsEvent) {
        jsEvent.preventDefault();

        Meteor.call('people.insert', this.name, (error, person) => {
          if (!error) {
            var firstLetter;
            let name = person.name;
            let regex = /^[a-zA-Z]/;

            if (name.match(regex)) {
              firstLetter = name[0].toLowerCase();
            } else {
              firstLetter = '#';
            }

            let router = this.$router;
            let currentRoute = router.currentRoute;
            let currentFilter = currentRoute.query.filter;

            if (currentFilter != firstLetter) {
              router.push({path: currentRoute.path, query: {filter: firstLetter}});
            }
          }
        });
      }
    },
  };

  export default component;
</script>
