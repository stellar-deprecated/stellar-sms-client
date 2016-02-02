import Stex from "stex";
import Initializer from "stex/lib/initializer";
import {Server} from 'stellar-sdk';

Initializer.add('startup', 'horizon', ['stex.config'], function(stex) {
  stex.horizon = new Server(stex.conf.get('horizon'));
});
