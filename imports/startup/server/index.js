// Import server startup through a single index entry point

import './migrations.js';

import '../../api/events/events.js';
import '../../api/events/methods.js';
import '../../api/events/server/publications.js';

import '../../api/people/people.js';
import '../../api/people/methods.js';
import '../../api/people/server/publications.js';

import '../../api/regos/regos.js';
import '../../api/regos/server/publications.js';

import '../../api/paypal/methods.js';
