import { Meteor } from 'meteor/meteor';
import { Promise } from 'meteor/promise';
import { check } from 'meteor/check';

import { Events } from '../events/events.js';
import { People } from '../people/people.js';
import { Payments } from '../payments/payments.js';
import { Regos } from '../regos/regos.js';

const paypalClient = (paypal) => {
  let env = new paypal.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);
  return new paypal.PayPalHttpClient(env);
}

const paymentObj = function(event, person) {
  const itemName = `Hash cash: ${event.name.substring(0, 59)} (${person.name.substring(0, 39)})`

  const items = [
    {
      name: itemName,
      quantity: 1,
      price: event.cashAmount,
      currency: 'USD',
      sku: `${event._id}-${person._id}`
    },
    {
      name: 'handling fee',
      quantity: 1,
      price: event.paypalFee(),
      currency: 'USD',
      sku: `fee`
    }
  ];

  return {
    intent: 'sale',
    payer: {
      payment_method: 'paypal'
    },
    redirect_urls: {
      return_url: 'http://localhost:3000/events',
      cancel_url: 'http://localhost:3000/events'
    },
    transactions: [{
      amount: {
        currency: 'USD',
        total: event.paypalTotal()
      },
      item_list: {
        items: items
      }
    }]
  };
};

const fetchObjects = (eventId, personId) => {
  return {
    event: Events.findOne(eventId),
    person: People.findOne(personId)
  };
}

const getRegoData = (payment) => {
  let items = payment.transactions[0].item_list.items;
  if (items.length != 2) {
    return null;
  }

  items = _.reject(items, (item) => {
    return (item.sku == 'fee');
  });

  let item = items[0];
  const [eventId, personId] = item.sku.split('-');

  return fetchObjects(eventId, personId);
};


Meteor.methods({
  'regos.payWithCash'({eventId, personId}) {
    check(eventId, String);
    check(personId, String);

    const { event, person } = fetchObjects(eventId, personId);
    let rego = {
      type: 'cash',
      status: 'completed',
      eventId: event._id,
      personId: person._id,
    }

    Regos.schema.clean(rego);
    Regos.schema.validate(rego);
    Regos.insert(rego);
  },
  'paypal.createPayment'(eventId, personId) {
    const { event, person } = fetchObjects(eventId, personId);

    const paypal = require('paypal-rest-sdk');
    const client = paypalClient(paypal);

    let request = new paypal.PaymentCreateRequest();
    request.requestBody(paymentObj(event, person));

    const response = Promise.await(client.execute(request));
    const payment = response.result;

    const paymentDoc = {
      paymentId: payment.id,
      data: payment
    };

    const rawPayments = Payments.rawCollection();
    const syncInsert = Meteor.wrapAsync(rawPayments.insert, rawPayments);

    Payments.schema.clean(paymentDoc);
    Payments.schema.validate(paymentDoc);
    syncInsert(paymentDoc);

    return payment.id;
  },

  'paypal.authorizePayment'(paymentId, payerId) {
    const paymentDoc = Payments.findOne({paymentId: paymentId});
    if (paymentDoc.status != 'created') {
      return;
    }
    let payment = paymentDoc.data;

    const { event, person } = getRegoData(payment);
    let rego = {
      type: 'paypal',
      eventId: event._id,
      personId: person._id,
      paymentId: paymentId
    }

    Regos.schema.clean(rego);
    Regos.schema.validate(rego);
    const regoId = Regos.insert(rego); // atomicity guaranteed here

    if (!regoId) {
      return null;
    }

    const paypal = require('paypal-rest-sdk');
    const client = paypalClient(paypal);

    const request = new paypal.PaymentExecuteRequest(paymentId);
    request.requestBody({payer_id: payerId});
    const response = Promise.await(client.execute(request));
    payment = response.result;

    if (payment.state == 'approved') {
      Regos.update(regoId, {
        $set: {status: 'completed'}
      });

      Payments.update(paymentDoc.id, {
        $set: {status: 'completed'}
      });
    } else if (payment.state == 'failed') {
      Regos.remove(regoId);

      Payments.update(paymentDoc.id, {
        $set: {status: 'failed'}
      });
    } else {
      // =/
    }
  },
});
