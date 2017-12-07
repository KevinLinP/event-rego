import { Accounts } from 'meteor/accounts-base';

Accounts.validateNewUser((user) => {
  return false;
});
