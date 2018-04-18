import '@polymer/polymer/polymer-legacy.js';
import { IronMenuBehavior } from '@polymer/iron-menu-behavior/iron-menu-behavior.js';
import '@polymer/paper-styles/default-theme.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <style>
      :host {
        display: block;
        padding: 8px 0;

        background: var(--paper-listbox-background-color, var(--primary-background-color));
        color: var(--paper-listbox-color, var(--primary-text-color));

        @apply --paper-listbox;
      }
    </style>

    <slot></slot>
`,

  is: 'paper-listbox',

  behaviors: [
    IronMenuBehavior
  ],

  /** @private */
  hostAttributes: {
    role: 'listbox'
  }
});
