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
});

Template.eventPay.onRendered(function() {
  this.autorun(() => {
    const eventFriendlyId = FlowRouter.getParam('eventFriendlyId');
    const event = Events.findOne({friendlyId: eventFriendlyId});

    const personFriendlyId = FlowRouter.getQueryParam('person');
    const person = People.findOne({friendlyId: personFriendlyId});

    if (!event || !person) {
      return;
    }

    if (!this.paypalAttached) {
      this.paypalAttached = true;

      this.$('script').ready(() => {
        const applyWithPromise = (method, args) => {
          return new Promise((resolve, reject) => {
            Meteor.call(method, args, (error, result) => {
              if (error) reject(error);
              resolve(result);
            });
          });
        }

        const paypal = window.paypal;
        paypal.Button.render({
          env: 'sandbox', // Or 'sandbox'
          commit: true, // Show a 'Pay Now' button
          payment: function() {
            const id = applyWithPromise('paypal.createPayment', event._id, person._id);
            console.log(id);
            return id;
          },
          onAuthorize: function(data) {
            Meteor.call('paypal.authorizePayment', data.paymentID, data.payerID);
            //const id = applyWithPromise('paypal.createPayment', event._id, person._id);
            //return paypal.request.post(EXECUTE_PAYMENT_URL, {
              //paymentID: data.paymentID,
              //payerID:   data.payerID
            //}).then(function() {
              //// change state here
            //});
          }
        }, '#paypal-button');
      });
    }
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

  onPaypalReady() {
  }
});
