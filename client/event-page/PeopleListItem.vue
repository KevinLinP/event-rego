<template lang="pug">
tr.person-list-item
  td.person-list-item-name {{ person.name }}
  td.person-list-item-buttons(v-if='event')
    span.cash-paid-icon(v-if='paid')
      i.fa.fa-check
    span(v-else)
      a.paypal-pay-button(:href='payPath()')
        i.fa.fa-paypal
      <!--if currentUser-->
        <!--button.pay-with-cash-button($b='click: payWithCash()')= payWithCashIcon-->
</template>

<script>
  import { Regos } from '/imports/api/regos/regos.js';

  const component = {
    props: ['person', 'event'],
    meteor: {
      paid: function() {
        console.log(this.event);
        const eventId = this.event._id;
        const personId = this.person._id;
        const rego = Regos.findOne({
          eventId,
          personId
        });

        return (rego && rego.completed());
      },
    },
    methods: {
      payPath: function(event) {
        const eventId = this.event._id;
        const personId = this.person.friendlyId;

        return `/${eventId}/pay?person=${personId}`;
      },
    }
  };

  export default component;
</script>
