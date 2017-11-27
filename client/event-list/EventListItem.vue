<template lang="pug">
tr
  td
    router-link(:to='to') {{event.name}}
</template>

<script>
  const component = {
    props: ['event'],
    data: function() {
      const to = {
        name: 'eventPage',
        params: {
          eventFriendlyId: this.event.friendlyId
        }
      }

      return {to};
    }
  };

  export default component;
</script>
