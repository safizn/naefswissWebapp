import '@polymer/polymer/polymer-legacy.js';
import { AppRouteConverterBehavior } from './app-route-converter-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';

Polymer({
  is: 'app-route-converter',

  behaviors: [AppRouteConverterBehavior]
});
