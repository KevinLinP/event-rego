<template lang="pug">
div
  .mb-3
    .h3 Login
  form.form(@submit='login')
    .input-group
      input(type='text' v-model='email' readonly=true)

    .input-group
      input(type='password' v-model='password' placeholder='password')

    button(type="submit" class="btn btn-primary") login
</template>

<script>
  const component = {
    data: function() {
      return {
        email: 'sh3@gmail.com',
        password: ''
      };
    },
    methods: {
      login: function(event) {
        event.preventDefault();
        Meteor.loginWithPassword(this.email, this.password, function(error) {
          console.log(error);
        })
      },
    }
  };

  export default component;
</script>
