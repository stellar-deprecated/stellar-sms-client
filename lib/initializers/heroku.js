import Stex from "stex";
import Initializer from "stex/lib/initializer";

Initializer.add('startup', 'heroku', ['stex.config'], function(stex) {
  stex.conf.set('PORT', process.env.PORT || 5000);
});
