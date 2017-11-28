<template lang="pug">
div
  div(v-if='person') {{person.name}}
  div is about to pay
  div(v-if='event')
    | ${{event.cashAmount}} + ${{event.paypalFee()}} for {{event.name}}

    div
      small (safety third; as usual, please make sure the address bar has 'PayPal, Inc' in green before entering in any PayPal information)
      #paypal-button

</template>

<script>
  import { Events } from '/imports/api/events/events.js';
  import { People } from '/imports/api/people/people.js';
  import { Regos } from '/imports/api/regos/regos.js';

  const component = {
    data: function() {
      return {
        eventFriendlyId: this.$route.params.eventFriendlyId,
        personFriendlyId: this.$route.query.person
      };
    },
    meteor: {
      $subscribe: {
        'event': function() {
          return [this.eventFriendlyId];
        },
        'person': function() {
          return [this.personFriendlyId];
        },
        'singleRego': function() {
          return [this.eventFriendlyId, this.personFriendlyId];
        }
      },
      event: function() {
        return Events.findOne({friendlyId: this.eventFriendlyId});
      },
      person: function() {
        return People.findOne({friendlyId: this.personFriendlyId});
      }
    }
  };

  export default component;
</script>
