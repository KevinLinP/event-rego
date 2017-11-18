<template lang="pug">
div
  .mb-2
    strong New Event

  form.event-form(@submit='createEvent')
    .input-group
      input(type='text' v-model='name' placeholder='event name')

    .input-group
      input(type='text' v-model='startsAt' placeholder='date and time')

    .input-group
      .input-group-addon $
      input(type='number' v-model='cashAmount' placeholder='hash cash' step="1.00")

    button(type="submit" class="btn btn-primary") create
</template>

<script>
  const component = {
    data: function() {
      return {
        name: '',
        startsAt: '',
        cashAmount: ''
      };
    },
    methods: {
      createEvent: function(jsEvent) {
        jsEvent.preventDefault();

        const event = {
          name: this.name,
          startsAt: this.startsAt,
          cashAmount: this.cashAmount
        };

        Meteor.call('events.insert', event);
      }
    },
  };

  export default component;
</script>
