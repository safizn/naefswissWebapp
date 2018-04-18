import '@polymer/polymer/polymer-legacy.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';

var SHADOW_WHEN_SCROLLING = 1;
var SHADOW_ALWAYS = 2;
var MODE_CONFIGS = {
  outerScroll: {
    'scroll': true
  },

  shadowMode: {
    'standard': SHADOW_ALWAYS,
    'waterfall': SHADOW_WHEN_SCROLLING,
    'waterfall-tall': SHADOW_WHEN_SCROLLING
  },

  tallMode: {
    'waterfall-tall': true
  }
};

Polymer({
  _template: html`
    <style>
      :host {
        @apply --layout-vertical;
        position: relative;
        height: 100%;
        @apply --paper-header-panel;
      }

      #mainContainer {
        @apply --layout-flex;
        position: relative;
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
      }

      #mainPanel {
        @apply --layout-vertical;
        @apply --layout-flex;
        position: relative;
        min-height: 0;
        @apply --paper-header-panel-body;
      }

      #mainContainer {
        @apply --paper-header-panel-container;
      }

      /*
       * mode: scroll
       */
      :host([mode=scroll]) #mainContainer {
        @apply --paper-header-panel-scroll-container;
        overflow: visible;
      }

      :host([mode=scroll]) {
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
      }

      /*
       * mode: cover
       */
      :host([mode=cover]) #mainContainer {
        @apply --paper-header-panel-cover-container;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }

      :host([mode=cover]) #mainPanel {
        position: static;
      }

      /*
       * mode: standard
       */
      :host([mode=standard]) #mainContainer {
        @apply --paper-header-panel-standard-container;
      }

      /*
       * mode: seamed
       */
      :host([mode=seamed]) #mainContainer {
        @apply --paper-header-panel-seamed-container;
      }


      /*
       * mode: waterfall
       */
      :host([mode=waterfall]) #mainContainer {
        @apply --paper-header-panel-waterfall-container;
      }

      /*
       * mode: waterfall-tall
       */
      :host([mode=waterfall-tall]) #mainContainer {
        @apply --paper-header-panel-waterfall-tall-container;
      }

      #dropShadow {
        transition: opacity 0.5s;
        height: 6px;
        box-shadow: inset 0px 5px 6px -3px rgba(0, 0, 0, 0.4);
        @apply --paper-header-panel-shadow;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        opacity: 0;
        pointer-events: none;
      }

      #dropShadow.has-shadow {
        opacity: 1;
      }

      #mainContainer > ::slotted(.fit) {
        @apply --layout-fit;
      }

    </style>

    <slot id="headerSlot" name="header"></slot>

    <div id="mainPanel">
      <div id="mainContainer" class\$="[[_computeMainContainerClass(mode)]]">
        <slot></slot>
      </div>
      <div id="dropShadow"></div>
    </div>
`,

  is: 'paper-header-panel',

  /**
   * Fired when the content has been scrolled. `event.detail.target` returns
   * the scrollable element which you can use to access scroll info such as
   * `scrollTop`.
   *
   *     <paper-header-panel on-content-scroll="scrollHandler">
   *       ...
   *     </paper-header-panel>
   *
   *
   *     scrollHandler: function(event) {
   *       var scroller = event.detail.target;
   *       console.log(scroller.scrollTop);
   *     }
   *
   * @event content-scroll
   */

  properties: {
    /**
     * Controls header and scrolling behavior. Options are
     * `standard`, `seamed`, `waterfall`, `waterfall-tall`, `scroll` and
     * `cover`. Default is `standard`.
     *
     * `standard`: The header is a step above the panel. The header will consume the
     * panel at the point of entry, preventing it from passing through to the
     * opposite side.
     *
     * `seamed`: The header is presented as seamed with the panel.
     *
     * `waterfall`: Similar to standard mode, but header is initially presented as
     * seamed with panel, but then separates to form the step.
     *
     * `waterfall-tall`: The header is initially taller (`tall` class is added to
     * the header).  As the user scrolls, the header separates (forming an edge)
     * while condensing (`tall` class is removed from the header).
     *
     * `scroll`: The header keeps its seam with the panel, and is pushed off screen.
     *
     * `cover`: The panel covers the whole `paper-header-panel` including the
     * header. This allows user to style the panel in such a way that the panel is
     * partially covering the header.
     *
     *     <paper-header-panel mode="cover">
     *       <paper-toolbar slot="header" class="tall">
     *         <paper-icon-button icon="menu"></paper-icon-button>
     *       </paper-toolbar>
     *       <div></div>
     *     </paper-header-panel>
     */
    mode: {
      type: String,
      value: 'standard',
      observer: '_modeChanged',
      reflectToAttribute: true
    },

    /**
     * If true, the drop-shadow is always shown no matter what mode is set to.
     */
    shadow: {
      type: Boolean,
      value: false
    },

    /**
     * The class used in waterfall-tall mode.  Change this if the header
     * accepts a different class for toggling height, e.g. "medium-tall"
     */
    tallClass: {
      type: String,
      value: 'tall'
    },

    /**
     * If true, the scroller is at the top
     */
    atTop: {
      type: Boolean,
      value: true,
      notify: true,
      readOnly: true,
      reflectToAttribute: true
    }
  },

  observers: [
    '_computeDropShadowHidden(atTop, mode, shadow)'
  ],

  attached: function() {
    this._addListener();
    // Run `scroll` logic once to initialize class names, etc.
    this._keepScrollingState();
  },

  detached: function() {
    this._removeListener();
  },

  ready: function() {
    this.scrollHandler = this._scroll.bind(this);
    console.warn(this.is, 'is deprecated. Please use app-layout instead!');
  },

  /**
   * Returns the header element
   * @return {!Element|undefined}
   */
  get header() {
    return dom(this.$.headerSlot).getDistributedNodes()[0];
  },

  /**
   * Returns the scrollable element.
   * @return {!HTMLElement}
   */
  get scroller() {
    return this._getScrollerForMode(this.mode);
  },

  /**
   * Returns true if the scroller has a visible shadow.
   * @return {boolean}
   */
  get visibleShadow() {
    return this.$.dropShadow.classList.contains('has-shadow');
  },

  _computeDropShadowHidden: function(atTop, mode, shadow) {
    var shadowMode = MODE_CONFIGS.shadowMode[mode];

    if (this.shadow) {
      this.toggleClass('has-shadow', true, this.$.dropShadow);
    } else if (shadowMode === SHADOW_ALWAYS) {
      this.toggleClass('has-shadow', true, this.$.dropShadow);
    } else if (shadowMode === SHADOW_WHEN_SCROLLING && !atTop) {
      this.toggleClass('has-shadow', true, this.$.dropShadow);
    } else {
      this.toggleClass('has-shadow', false, this.$.dropShadow);
    }
  },

  _computeMainContainerClass: function(mode) {
    // TODO:  It will be useful to have a utility for classes
    // e.g. Polymer.Utils.classes({ foo: true });

    var classes = {};

    classes['flex'] = mode !== 'cover';

    return Object.keys(classes).filter(
      function(className) {
        return classes[className];
      }).join(' ');
  },

  _addListener: function() {
    this.scroller.addEventListener('scroll', this.scrollHandler);
  },

  _removeListener: function() {
    this.scroller.removeEventListener('scroll', this.scrollHandler);
  },

  _modeChanged: function(newMode, oldMode) {
    var configs = MODE_CONFIGS;
    var header = this.header;
    var animateDuration = 200;

    if (header) {
      // in tallMode it may add tallClass to the header; so do the cleanup
      // when mode is changed from tallMode to not tallMode
      if (configs.tallMode[oldMode] && !configs.tallMode[newMode]) {
        header.classList.remove(this.tallClass);
        this.async(function() {
          header.classList.remove('animate');
        }, animateDuration);
      } else {
        this.toggleClass('animate', configs.tallMode[newMode], header);
      }
    }
    this._keepScrollingState();
  },

  _keepScrollingState: function() {
    var main = this.scroller;
    var header = this.header;

    this._setAtTop(main.scrollTop === 0);

    if (header && this.tallClass && MODE_CONFIGS.tallMode[this.mode]) {
      this.toggleClass(this.tallClass, this.atTop ||
          header.classList.contains(this.tallClass) &&
          main.scrollHeight < this.offsetHeight, header);
    }
  },

  _scroll: function() {
    this._keepScrollingState();
    this.fire('content-scroll', {target: this.scroller}, {bubbles: false});
  },

  _getScrollerForMode: function(mode) {
    return MODE_CONFIGS.outerScroll[mode] ?
        this : this.$.mainContainer;
  }
});
