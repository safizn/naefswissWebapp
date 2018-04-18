import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
Polymer({
  _template: html`
    <iron-location hash="{{hash}}"></iron-location>
`,

  is: 'redirect-hash',

  properties: {
    hash: {
      value: '',
      observer: 'hashChanged'
    }
  },

  hashChanged: function(hash) {
    this.hash = 'redirectedTo';
  }
});
Polymer({
  _template: html`
    <iron-location path="{{path}}"></iron-location>
`,

  is: 'redirect-path',

  properties: {
    path: {
      value: '',
      observer: 'pathChanged'
    }
  },

  pathChanged: function(path) {
    this.path = '/redirectedTo';
  }
});
Polymer({
  _template: html`
    <iron-location query="{{query}}"></iron-location>
`,

  is: 'redirect-query',

  properties: {
    query: {
      value: '',
      observer: 'queryChanged'
    }
  },

  queryChanged: function(query) {
    this.query = 'redirectedTo';
  }
});
