<template lang="pug">
div
  .mb-3
    .h3 Create User

  form.form(@submit='createUser')
    .input-group
      input(type='text' v-model='email' readonly=true)

    .input-group
      input(type='password' v-model='password' placeholder='password')

    button(type="submit" class="btn btn-primary") create
</template>

<script>
  const component = {
    data: function() {
      return {
        email: 'sh3@wh3.org',
        password: ''
      };
    },
    methods: {
      createUser: function(event) {
        event.preventDefault();

        const data = {
          email: this.email,
          password: this.password
        }

        Accounts.createUser(data, function(error) {
          console.log(error);
        });
      },
    }
  };

  export default component;
</script>
