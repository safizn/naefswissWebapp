import { LegacyElementMixin } from './lib/legacy/legacy-element-mixin.js';
import './lib/legacy/polymer-fn.js';
import './lib/legacy/templatizer-behavior.js';
import './lib/elements/dom-bind.js';
import './lib/elements/dom-repeat.js';
import './lib/elements/dom-if.js';
import './lib/elements/array-selector.js';
import './lib/elements/custom-style.js';
import './lib/legacy/mutable-data-behavior.js';
import { html as html$0 } from './lib/utils/html-tag.js';
export const Base = LegacyElementMixin(HTMLElement).prototype;
export { html$0 as html };
