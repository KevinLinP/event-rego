<template lang="pug">
nav.paid-only-toggle
  router-link(:to='allTo' :class='{active: !paidOnly}') all
  router-link(:to='paidTo' :class='{active: paidOnly}') paid
</template>

<script>
  import { Session } from 'meteor/session'

  const component = {
    props: ['event', 'paidOnly'],
    data: function() {
      return {
        allTo: {name: 'eventPage', params: {eventFriendlyId: this.event.friendlyId}},
        paidTo: {name: 'eventPage', params: {eventFriendlyId: this.event.friendlyId}, query: {paidOnly: 'true'}},
      }
    }
  };

  export default component;
</script>
