<template lang="pug">
nav.paid-only-toggle
  a(href='javascript:void(0);' :class='{active: !viewPaidOnly}' @click='clickAll') all
  a(href='javascript:void(0);' :class='{active: viewPaidOnly}' @click='clickPaid') paid
</template>

<script>
  import { Session } from 'meteor/session'

  const component = {
    beforeCreate: function() {
      Session.setDefault('viewPaidOnly', false);
    },
    meteor: {
      viewPaidOnly: function() {
        return Session.get('viewPaidOnly');
      }
    },
    methods: {
      clickAll: function() {
        Session.set('viewPaidOnly', false);
      },
      clickPaid: function() {
        Session.set('viewPaidOnly', true);
      }
    }
  };

  export default component;
</script>
