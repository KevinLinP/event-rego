<template lang="pug">
tr
  td
    router-link(:to='to') {{event.name}}
  td {{humanStartsAt}}
</template>

<script>
  import moment from 'moment';

  const component = {
    props: ['event'],
    data: function() {
      const to = {
        name: 'eventPage',
        params: {
          eventFriendlyId: this.event.friendlyId
        }
      }

      const humanStartsAt = moment(this.event.startsAt).format('ddd M/D');

      return {
        to,
        humanStartsAt
      };
    }
  };

  export default component;
</script>
