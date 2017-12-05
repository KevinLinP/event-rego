<template lang="pug">
.text-center
  .mb-5
    .h3(v-if='person')
      | {{person.name}}
    .mb-1 
      | is about to pay
    div(v-if='event')
      .h2
        | ${{displayCashAmount}} + ${{displayPaypalFee}}
      .mb-1
        | for 
      .h3
        | {{event.name}}

  div(v-if='$subReady.singleRego')
    div(v-if='rego')
      div(v-if='rego.status == "completed"') Payment completed
      div(v-else) Payment in progress
    div(v-else)
      .mb-1
        #paypal-button.paypal-button-container
      small (as usual, please make sure the address bar has 'PayPal,&nbsp;Inc' in green before entering in any PayPal information)

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
        }
      },
      event: function() {
        const event = Events.findOne({friendlyId: this.eventFriendlyId});
        if (this.person) {
          this.$subscribe('singleRego', event._id, this.person._id);
        }

        return event
      },
      person: function() {
        const person = People.findOne({friendlyId: this.personFriendlyId});

        if (this.event) {
          this.$subscribe('singleRego', this.event._id, person._id);
        }

        return person;
      },
      rego: {
        params: function() {
          return {
            event: this.event,
            person: this.person
          };
        },
        update: function({event, person}) {
          if (!event || !person) {
            return null;
          }

          const rego = Regos.findOne({eventId: event._id, personId: person._id});
          console.log(rego);
          return rego;
        }
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
            style: {size: 'responsive'},
            payment: function() {
              const id = applyWithPromise('regos.createPaypalPayment', [{eventId, personId}]);
              return id;
            },
            onAuthorize: function(data) {
              const paymentId = data.paymentID;
              const payerId = data.payerID;
              applyWithPromise('regos.authorizePaypalPayment', [{paymentId, payerId}]);
            }
          }, '#paypal-button');
        };

        document.head.appendChild(paypalScript);
      }
    },
    computed: {
      displayCashAmount: function() {
        return this.event.cashAmount.toFixed(2);
      },
      displayPaypalFee: function() {
        return this.event.paypalFee().toFixed(2);
      }
    }
  };

  export default component;
</script>
