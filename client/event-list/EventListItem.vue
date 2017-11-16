<template lang="pug">
tr
  td
    a(:href='href()') {{event.name}}
</template>

<script>
  const component = {
    props: ['event'],
    methods: {
      href: function() {
        return `/${this.event.friendlyId}`;
      }
    }
  };

  export default component;
</script>
