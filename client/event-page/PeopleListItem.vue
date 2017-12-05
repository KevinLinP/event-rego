<template lang="pug">
tr.person-list-item
  td.person-list-item-name {{ person.name }}
  td.person-list-item-buttons(v-if='event')
    .paid-indicator(v-if='paid')
      i.fa.fa-paypal(v-if='paidWithPaypal')
      i.fa.fa-check(@click='undoPayWithCash')

    span(v-else)
      button.pay-with-cash-button(v-if='loggedIn' @click='payWithCash')
        i.fa.fa-money
      a.paypal-pay-button(v-else :href='payPath()')
        i.fa.fa-paypal
</template>

<script>
  import { Regos } from '/imports/api/regos/regos.js';

  const component = {
    props: ['person', 'event'],
    meteor: {
      loggedIn: function() {
        return !!Meteor.userId();
      },
      paid: function() {
        const eventId = this.event._id;
        const personId = this.person._id;

        const rego = Regos.findOne({
          eventId,
          personId
        });

        return (rego && rego.completed());
      },
      paidWithPaypal: function() {
        const eventId = this.event._id;
        const personId = this.person._id;

        const rego = Regos.findOne({
          eventId,
          personId
        });

        return rego && (rego.type == 'paypal');
      }
    },
    methods: {
      payPath: function(event) {
        const eventId = this.event.friendlyId;
        const personId = this.person.friendlyId;

        return `/${eventId}/pay?person=${personId}`;
      },
      payWithCash: function(event) {
        const eventId = this.event._id;
        const personId = this.person._id;

        Meteor.call('regos.payWithCash', {eventId, personId});
      },
      undoPayWithCash: function(event) {
        if (!this.loggedIn) {
          return;
        }

        if (this.paidWithPaypal) {
          alert('This app cannot refund PayPal payments =(');
        } else {
          const confirm = window.confirm(`Do you really want to undo ${this.person.name}'s cash payment?`);
          if (confirm) {
            const eventId = this.event._id;
            const personId = this.person._id;

            Meteor.call('regos.undoPayWithCash', {eventId, personId});
          }
        }
      }
    }
  };

  export default component;
</script>
