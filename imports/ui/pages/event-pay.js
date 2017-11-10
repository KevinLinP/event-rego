import './event-pay.jade';
import { Events } from '../../api/events/events.js';
import { People } from '../../api/people/people.js';
import { AuthorizedPaymentItems } from '../../api/authorized-payment-items/authorized-payment-items.js';

Template.eventPay.onCreated(function helloOnCreated() {
  this.getEventFriendlyId = () => {
    return FlowRouter.getParam('eventFriendlyId');
  }

  this.getPersonFriendlyId = () => {
    return FlowRouter.getQueryParam('person');
  }

  this.autorun(() => {
    this.subscribe('event', this.getEventFriendlyId());
    this.subscribe('person', this.getPersonFriendlyId());
  });

  this.autorun(() => {
    const event = fetchEvent();
    const person = fetchPerson();

    if (person && event) {
      this.subscribe('authorizedPaymentItems', event._id, person._id);
    }
  });
});

const applyWithPromise = (method, args) => {
  return new Promise((resolve, reject) => {
    Meteor.apply(method, args, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};

const attachPaypal = (event, person) => {
  const paypal = window.paypal;
  paypal.Button.render({
    env: 'sandbox', // Or 'sandbox'
    commit: true, // Show a 'Pay Now' button
    payment: function() {
      const id = applyWithPromise('paypal.createPayment', [event._id, person._id]);
      return id;
    },
    onAuthorize: function(data) {
      const response = applyWithPromise('paypal.authorizePayment', [data.paymentID, data.payerID]);
    }
  }, '#paypal-button');
};

Template.eventPay.onRendered(function() {
  this.autorun(() => {
    const event = fetchEvent();
    const person = fetchPerson();

    if (!event || !person) {
      return;
    }

    if (!this.paypalAttached) {
      this.paypalAttached = true;

      this.$('script').ready(() => {
        this.paypalInterval = setInterval(() => {
          if (window.paypal && window.paypal.Button && window.paypal.Button.render) {
            clearInterval(this.paypalInterval);
            attachPaypal(event, person);
          }
        }, 10);
      });
    }
  });
});

const fetchEvent = () => {
  const friendlyId = FlowRouter.getParam('eventFriendlyId');
  const event = Events.findOne({friendlyId: friendlyId});
  return event;
};

const fetchPerson = () => {
  const friendlyId = FlowRouter.getQueryParam('person');
  const person = People.findOne({friendlyId: friendlyId});
  return person;
};

fetchAuthorizedPaymentItem = () => {
  const event = fetchEvent();
  const person = fetchPerson();

  if (!event || !person) {
    return null;
  }

  return AuthorizedPaymentItems.findOne({eventId: event._id, personId: person._id});
}

Template.eventPay.helpers({
  event() {
    return fetchEvent();
  },

  person() {
    return fetchPerson();
  },

  pendingClass() {
    if (fetchAuthorizedPaymentItem()) {
      return '';
    } else {
      return 'd-none';
    }
  },

  paypalButtonClass() {
    if (fetchAuthorizedPaymentItem()) {
      return 'd-none';
    } else {
      return '';
    }
  }
});
