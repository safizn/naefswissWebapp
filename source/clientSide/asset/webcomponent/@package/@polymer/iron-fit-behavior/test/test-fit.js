import '@polymer/polymer/polymer-legacy.js';
import { IronFitBehavior } from '../iron-fit-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
Polymer({
  _template: html`
    <style>
      :host {
        display: block;
        background: black;
        color: white;
        padding: 8px;
      }
    </style>
    <slot></slot>
`,

  is: 'test-fit',

  behaviors: [
    IronFitBehavior
  ]
});