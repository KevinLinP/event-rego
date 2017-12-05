<template lang="pug">
div
  div(v-if='loggedIn')
    .mb-5
      .h3 Currently logged in as admin
    div
      router-link(:to="{name: 'eventList'}" class="btn btn-primary") Back to events
      button.btn.btn-secondary.pull-right(@click='logout') logout
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
