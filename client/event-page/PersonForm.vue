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
        
        Meteor.call('people.insert', this.name);
      }
    },
  };

  export default component;
</script>
