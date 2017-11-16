import { People } from '../../api/people/people.js';

import './filter-buttons.jade';

Template.filterButtons.helpers({
  letters() {
    const eventFriendlyId = FlowRouter.getParam('eventFriendlyId');
    let letters = [];

    let i;
    for (n = 0; n < 26; n++) {
      const letter = String.fromCharCode(97+ n);
      const active = !!People.findOne({name: {$regex: `^${letter}`, $options: 'i'}});

      letters.push({
        display: letter.toUpperCase(),
        href: `/${eventFriendlyId}?filter=${letter}`,
        active
      });
    }
    
    return letters;
  }
});
