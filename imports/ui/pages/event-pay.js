import { Events } from '../../api/events/events.js';
import { People } from '../../api/people/people.js';
import { Regos } from '../../api/regos/regos.js';

import './event-pay.jade';

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

fetchRego = () => {
  const event = fetchEvent();
  const person = fetchPerson();

  if (!event || !person) {
    return null;
  }

  return Regos.findOne({eventId: event._id, personId: person._id});
}

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
      this.subscribe('singleRego', event._id, person._id);
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
      Meteor.call('paypal.authorizePayment', data.paymentID, data.payerID);
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

Template.eventPay.helpers({
  event() {
    return fetchEvent();
  },

  person() {
    return fetchPerson();
  },

  pendingClass() {
    const rego = fetchRego();
    console.log(rego);
    if (rego && (rego.status == 'in_progress')) {
      return '';
    } else {
      return 'd-none';
    }
  },

  paymentCompletedClass() {
    const rego = fetchRego();
    if (rego && (rego.status == 'completed')) {
      return '';
    } else {
      return 'd-none';
    }
  },

  paypalButtonClass() {
    if (fetchRego()) {
      return 'd-none';
    } else {
      return '';
    }
  }
});
