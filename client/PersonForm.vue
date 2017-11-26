<template lang="pug">
form.person-form(@submit="createPerson")
  .mr-1
    input.form-control(type='text' v-model="name" placeholder='name' required='true')

  button(type="submit" class="btn btn-primary") add
</template>

<script>
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
