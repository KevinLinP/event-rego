import './person-form.jade';

Template.personForm.viewmodel({
  name: '',
  createPerson: function(event) {
    event.preventDefault();
    const name = this.name().trim();

    // TODO: navigate to filter page

    Meteor.call('people.insert', name);
  }
});
