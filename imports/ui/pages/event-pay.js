import './event-pay.jade';
import { Events } from '../../api/events/events.js';
import { People } from '../../api/people/people.js';

Template.eventPay.onCreated(function helloOnCreated() {
  this.getEventFriendlyId = () => {
    return FlowRouter.getParam('eventFriendlyId');
  }

  this.getPersonFriendlyId = () => {
    return FlowRouter.getQueryParam('person');
  }

  this.autorun(() => {
    this.subscribe('event', this.getEventFriendlyId());
  });

  this.autorun(() => {
    this.subscribe('person', this.getPersonFriendlyId());
  });

  this.autorun(() => {
    const eventFriendlyId = FlowRouter.getParam('eventFriendlyId');
    const event = Events.findOne({friendlyId: eventFriendlyId});

    const personFriendlyId = FlowRouter.getQueryParam('person');
    const person = People.findOne({friendlyId: personFriendlyId});

    if (!event || !person) {
      return;
    }

    const paypal = window.paypal;
    paypal.Button.render({
      env: 'sandbox', // Or 'sandbox'
      commit: true, // Show a 'Pay Now' button
      payment: function() {
        return Meteor.call('paypal.createPayment', 1, 2).then(function(id) {
          console.log(id);
          return id;
        });
      },
      onAuthorize: function(data) {
        return paypal.request.post(EXECUTE_PAYMENT_URL, {
          paymentID: data.paymentID,
          payerID:   data.payerID
        }).then(function() {
          // The payment is complete!
          // You can now show a confirmation message to the customer
        });
      }
    }, '#paypal-button');
  });

});

Template.eventPay.helpers({
  event() {
    const friendlyId = FlowRouter.getParam('eventFriendlyId');
    const event = Events.findOne({friendlyId: friendlyId});
    return event;
  },

  person() {
    const friendlyId = FlowRouter.getQueryParam('person');
    const person = People.findOne({friendlyId: friendlyId});
    return person;
  },
});
