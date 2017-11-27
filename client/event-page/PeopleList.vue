<template lang="pug">
tr
  td {{person.name}}
</template>

<script>
  const component = {
    props: ['person']
  };

  export default component;
</script>
