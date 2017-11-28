<template lang="pug">
div
  div(v-if='loggedIn')
    .mb-5
      .h3 Currently logged in as admin
    button.btn.btn-primary(@click='logout') logout
  login-form(v-else)
</template>

<script>
  const component = {
    meteor: {
      loggedIn: function() {
        return !!Meteor.userId();
      }
    },
    methods: {
      logout: function() {
        Meteor.logout();
      }
    }
  };

  export default component;
</script>
