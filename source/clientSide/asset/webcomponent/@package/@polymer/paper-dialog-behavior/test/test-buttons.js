import '@polymer/polymer/polymer-legacy.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

Polymer({
  _template: html`
    <button dialog-dismiss="" id="dismiss">dismiss</button>
    <button dialog-confirm="" id="confirm">confirm</button>
`,

  is: 'test-buttons'
});
