<template lang="pug">
.row
  filter-button(v-for="letter in letters" :letter='letter' :event='event')
</template>

<script>
  const component = {
    props: ['event'],
    data: function() {
      let letters = [];

      let i;
      for (n = 0; n < 26; n++) {
        const letter = String.fromCharCode(97 + n);
        letters.push(letter);
      }

      return {
        letters
      };
    }
  };

  export default component;
</script>
