<template lang="pug">
div
  .mb-3(v-if='filterLetter')
    .d-flex.justify-content-between.align-items-center.mb-2
      .filter-letter-heading {{ filterLetter.toUpperCase() }}
      div
        button.people-list-back(onclick="javascript:history.back()")
          | back

  .paid-only-stats.row(v-if='paidOnly')
    .col-6
      .h {{ paidCount }}
      .desc paid hashers
    // .col-4
    //  .h {{ cashPaidCount }}
    //  .desc hashers paid w/ cash
    .col-6
      .h
        span.font-weight-light $
        | {{ expectedCashTotal }}
      .desc paid w/ cash

  table.people-list()
    people-list-item(v-for="person in filteredPeople" :key='person._id' :person='person' :event='event')
</template>

<script>
  import { Session } from 'meteor/session';
  import { People } from '/imports/api/people/people.js';
  import { Regos } from '/imports/api/regos/regos.js';

  // TODO: refactor
  const component = {
    props: ['event', 'filterLetter', 'paidOnly'],
    meteor: {
      filteredPeople: {
        params: function() {
          return {filterLetter: this.filterLetter, paidOnly: this.paidOnly};
        },
        update: function({filterLetter, paidOnly}) {
          if (filterLetter) {
            let regex;
            if (filterLetter == '#') {
              regex = '^[^a-zA-Z]';
            } else {
              regex = `^${filterLetter}`;
            }

            const query = {name: {$regex: regex, $options: 'i'}};
            const options = {sort: {name: 1}};

            return People.find(query, options);
          } else if (paidOnly) {
            const regos = Regos.find({eventId: this.event._id});
            const personIds = regos.map((rego) => {
              return rego.personId;
            });

            return People.find({_id: {$in: personIds}}, {sort: {name: 1}});
          }
        }
      },
      paidCount: function() {
        return Regos.find({eventId: this.event._id}).count();
      },
      cashPaidCount: function() {
        return Regos.find({eventId: this.event._id, type: 'cash'}).count();
      },
      expectedCashTotal: function() {
        const cashRegos = Regos.find({eventId: this.event._id, type: 'cash'}).count();

        return this.event.cashAmount * cashRegos;
      }
    },
  };

  export default component;
</script>
