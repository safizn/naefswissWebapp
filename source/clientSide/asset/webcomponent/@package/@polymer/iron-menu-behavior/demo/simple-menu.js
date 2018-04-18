import '@polymer/polymer/polymer-legacy.js';
import { IronMenuBehavior } from '../iron-menu-behavior.js';
import '@polymer/paper-styles/color.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

Polymer({
  _template: html`
    <style>
      :host > ::slotted(*) {
        display: block;
      }

      :host > ::slotted(.iron-selected) {
        color: white;
        background-color: var(--google-blue-500);
      }
    </style>

    <slot></slot>
`,

  is: 'simple-menu',

  behaviors: [
    IronMenuBehavior
  ]
});
