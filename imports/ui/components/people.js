import './people.jade';
import { People } from '../../api/people/people.js';

Template.people.onCreated(function() {
  Meteor.subscribe('people');
});

Template.people.helpers({
  people() {
    return People.find({});
  }
});

Template.personRow.helpers({
  payPath(event) {
    const eventId = Template.parentData(1).event.friendlyId;
    const personId = Template.currentData().friendlyId;

    return `/${eventId}/pay?person=${personId}`;
  },

  sendLinkClasses() {
    const classes = 'btn disabled js-send-link';

    if (this.e164PhoneNumber) {
      classes += ' btn-outline-secondary';
    } else {
      classes += ' btn-outline-secondary';
    }

    return classes;
  }
});

Template.personForm.onCreated(function() {
  this.createPerson = () => {
    const name = this.$('[name=name]').val().trim();
    const phoneNumber = this.$('[name=phoneNumber]').val().trim();

    Meteor.call('people.insert', name, phoneNumber);
  };
});

Template.personForm.events({
  'submit form'(event, instance) {
    event.preventDefault();
    instance.createPerson();
  }
});
