<template lang="pug">
div
  div(v-if='person')
    | {{person.name}}
  div is about to pay
  div(v-if='event')
    div
      | ${{event.cashAmount}} + ${{event.paypalFee()}}
    div 
      | for 
    div 
      | {{event.name}}

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
    },
    updated: function() {
      if (!this.event || !this.person || !document.getElementById('paypal-button')) {
        return;
      };

      const applyWithPromise = (method, args) => {
        return new Promise((resolve, reject) => {
          Meteor.apply(method, args, (error, result) => {
            if (error) reject(error);
            resolve(result);
          });
        });
      };

      const eventId = this.event._id;
      const personId = this.person._id;

      if (!document.getElementById('paypal-script')) {
        const paypalScript = document.createElement('script');
        paypalScript.setAttribute('src', 'https://www.paypalobjects.com/api/checkout.js')
        paypalScript.setAttribute('id', 'paypal-script')
        paypalScript.onload = function() {
          window.paypal.Button.render({
            env: 'sandbox', // Or 'sandbox'
            commit: true, // Show a 'Pay Now' button
            payment: function() {
              const id = applyWithPromise('paypal.createPayment', [eventId, personId]);
              return id;
            },
            onAuthorize: function(data) {
              applyWithPromise('paypal.authorizePayment', [data.paymentID, data.payerID]);
            }
          }, '#paypal-button');
        };

        document.head.appendChild(paypalScript);
      }
    }
  };

  export default component;
</script>
