import { Accounts } from 'meteor/accounts-base';

Accounts.validateNewUser((user) => {
  const emails = _.pluck(user.emails, 'address');

  return _.contains(emails, 'sh3@wh3.org');
});
