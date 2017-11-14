import './people.jade';
import { People } from '../../api/people/people.js';
import { Regos } from '../../api/regos/regos.js';

Template.people.onCreated(function() {
  Meteor.subscribe('people');
});

Template.people.helpers({
  people() {
    return People.find({});
  },
});

Template.peopleGrid.helpers({
  letters() {
    let letters = [];

    let i;
    for (n = 0; n < 26; n++) {
      letters.push(String.fromCharCode(65 + n));
    }
    
    return letters;
  }
});

Template.personRow.helpers({
  paid() {
    const eventId = Template.parentData(1).event._id;
    const personId = this._id;
    const rego = Regos.findOne({eventId, personId});

    if (rego && rego.completed()) {
      return true;
    } else {
      return false;
    }
  },

  payPath(event) {
    const eventId = Template.parentData(1).event.friendlyId;
    const personId = Template.currentData().friendlyId;

    return `/${eventId}/pay?person=${personId}`;
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
