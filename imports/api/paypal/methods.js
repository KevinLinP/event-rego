import { Meteor } from 'meteor/meteor';
import { Promise } from 'meteor/promise';
import { check } from 'meteor/check';

import { Events } from '../events/events.js';
import { People } from '../people/people.js';
import { PendingPayments } from '../pending-payments/pending-payments.js';
import { AuthorizedPayments } from '../authorized-payments/authorized-payments.js';

Meteor.methods({
  'paypal.createPayment'(eventId, personId) {
    const paypal = require('paypal-rest-sdk');

    let env = new paypal.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);
    let client = new paypal.PayPalHttpClient(env);

    const payment = {
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
          total: '5.00',
        },
        description: 'Rego'
      }]
    };

    let request = new paypal.PaymentCreateRequest();
    request.requestBody(payment);

    const response = Promise.await(client.execute(request));

    return response.result.id;
  },
});
