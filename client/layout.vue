<template lang="pug">
div
  .status-bar-reconnecting(v-if='reconnecting') reconnecting to server ...
  .status-bar-disconnected(v-else-if='disconnected') disconnected from server =(
  .container.pt-3.pt-md-4
    router-view
</template>

<script>
  const component = {
    meteor: {
      reconnecting: function() {
        switch (Meteor.status().status) {
          case 'connecting':
          case 'waiting':
            return true
          default:
            return false
        }
      },
      disconnected: function() {
        switch (Meteor.status().status) {
          case 'failed':
          case 'offline':
            return true
          default:
            return false
        }
      }
    },
  };

  export default component;
</script>
