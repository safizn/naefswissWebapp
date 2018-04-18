import '@polymer/polymer/polymer-legacy.js';
import { NeonSharedElementAnimatableBehavior } from '../neon-shared-element-animatable-behavior.js';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

Polymer({
  _template: html`

`,

  is: 'a-resizable-page',

  behaviors: [
    NeonSharedElementAnimatableBehavior,
    IronResizableBehavior
  ]
});

Polymer({
  _template: html`

`,

  is: 'b-resizable-page',

  behaviors: [
    NeonSharedElementAnimatableBehavior,
    IronResizableBehavior
  ]
});

Polymer({
  _template: html`

`,

  is: 'c-resizable-page',

  behaviors: [
    NeonSharedElementAnimatableBehavior,
    IronResizableBehavior
  ]
});
