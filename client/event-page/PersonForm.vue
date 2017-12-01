<template lang="pug">
form.form(@submit="createPerson")
  .form-row
    .col-10
      input.form-control(type='text' v-model="name" placeholder='name' required='true')

    .col-2
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
