import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  'paypal.createPayment'(eventId, personId) {
    var paypal = require('paypal-rest-sdk');
    console.log(process.env.PAYPAL_CLIENT_ID);

    paypal.configure({
      'mode': 'sandbox', //sandbox or live
      'client_id': process.env.PAYPAL_CLIENT_ID,
      'client_secret': process.env.PAYPAL_CLIENT_SECRET
    });

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
    }

    paypal.payment.create(payment, function (error, payment) {
      if (error) {
        console.log(error);
        throw error;
      } else {
        console.log(payment.id);
        return payment.id;
      }
    });
  },
});
