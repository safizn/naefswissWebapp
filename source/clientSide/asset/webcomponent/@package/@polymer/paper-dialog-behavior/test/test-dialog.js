import '@polymer/polymer/polymer-legacy.js';
import { PaperDialogBehavior } from '../paper-dialog-behavior.js';
import '../paper-dialog-shared-styles.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

Polymer({
  _template: html`
    <style include="paper-dialog-shared-styles"></style>
    <slot></slot>
`,

  is: 'test-dialog',

  behaviors: [
    PaperDialogBehavior
  ]
});
