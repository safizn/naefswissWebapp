import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import { templatize } from '../../../@polymer/polymer/lib/utils/templatize.js';
import { afterNextRender } from '../../../@polymer/polymer/lib/utils/render-status.js';
import { FlattenedNodesObserver } from '../../../@polymer/polymer/lib/utils/flattened-nodes-observer.js';
import { ThemableMixin } from '../../../@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js';
import { IronFocusablesHelper } from '../../../@polymer/iron-overlay-behavior/iron-focusables-helper.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
import { useNativeCustomElements } from '../../../@polymer/polymer/lib/utils/settings.js';
/**
 * `<vaadin-overlay>` is a Polymer 2 element for creating overlays.
 *
 * ### Styling
 *
 * The following Shadow DOM parts are available for styling:
 *
 * Part name  | Description
 * -----------|---------------------------------------------------------|
 * `backdrop` | Backdrop of the overlay
 * `overlay`  | Container for position/sizing/alignment of the content
 * `content`  | Content of the overlay
 *
 * The following state attributes are available for styling:
 *
 * Attribute | Description | Part
 * ---|---|---
 * `opening` | Applied just after the overlay is attached to the DOM. You can apply a CSS @keyframe animation for this state. | `:host`
 * `closing` | Applied just before the overlay is detached from the DOM. You can apply a CSS @keyframe animation for this state. | `:host`
 *
 * The following custom CSS properties are available for styling:
 *
 * Custom CSS property | Description | Default value
 * ---|---|---
 * `--vaadin-overlay-viewport-bottom` | Bottom offset of the visible viewport area | `0` or detected offset
 *
 * See [ThemableMixin – how to apply styles for shadow parts](https://github.com/vaadin/vaadin-themable-mixin/wiki)
 *
 * @memberof Vaadin
 * @mixes Vaadin.ThemableMixin
 * @demo demo/index.html
 */
class OverlayElement extends ThemableMixin(PolymerElement) {
  static get template() {
    return html`
    <style>
      :host {
        z-index: 200;
        position: fixed;

        /*
          Despite of what the names say, <vaadin-overlay> is just a container
          for position/sizing/alignment. The actual overlay is the overlay part.
        */

        /*
          Default position constraints: the entire viewport. Note: themes can
          override this to introduce gaps between the overlay and the viewport.
        */
        top: 0;
        right: 0;
        bottom: var(--vaadin-overlay-viewport-bottom);
        left: 0;

        /* Use flexbox alignment for the overlay part. */
        display: flex;
        flex-direction: column; /* makes dropdowns sizing easier */
        /* Align to center by default. */
        align-items: center;
        justify-content: center;

        /* Allow centering when max-width/max-height applies. */
        margin: auto;

        /* The host is not clickable, only the overlay part is. */
        pointer-events: none;

        /* Remove tap highlight on touch devices. */
        -webkit-tap-highlight-color: transparent;

        /* CSS API for host */
        --vaadin-overlay-viewport-bottom: 0;
      }

      :host([hidden]),
      :host(:not([opened]):not([closing])) {
        display: none !important;
      }

      [part="overlay"] {
        -webkit-overflow-scrolling: touch;
        overflow: auto;
        pointer-events: auto;

        /* Prevent overflowing the host in MSIE 11 */
        max-width: 100%;
        box-sizing: border-box;

        -webkit-tap-highlight-color: initial; /* reenable tap highlight inside */
      }

      [part="backdrop"] {
        z-index: -1;
        content: "";
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        pointer-events: auto;
      }
    </style>

    <div id="backdrop" part="backdrop" hidden\$="{{!withBackdrop}}"></div>
    <div part="overlay" id="overlay" tabindex="0">
      <div part="content" id="content"></div>
    </div>
`;
  }

  static get is() {
    return 'vaadin-overlay';
  }

  static get properties() {
    return {
      opened: {
        type: Boolean,
        notify: true,
        reflectToAttribute: true
      },

      template: {
        type: Object,
        notify: true
      },

      content: {
        type: Object,
        notify: true
      },

      withBackdrop: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },

      /**
       * When true the overlay won't disable the main content, showing
       * it doesn’t change the functionality of the user interface.
       */
      modeless: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        observer: '_modelessChanged'
      },

      /**
       * When true move focus to the first focusable element in the overlay,
       * or to the overlay if there are no focusable elements.
       */
      focusTrap: {
        type: Boolean,
        value: false
      },

      _focusedElement: {
        type: Object
      },

      _mouseDownInside: {
        type: Boolean
      },

      _mouseUpInside: {
        type: Boolean
      },

      _instance: {
        type: Object
      },

      _boundIronOverlayCanceledListener: {
        type: Object
      }
    };
  }

  static get observers() {
    return ['_openedChanged(opened)', '_templateChanged(template)', '_contentChanged(content)'];
  }

  constructor() {
    super();
    this._boundMouseDownListener = this._mouseDownListener.bind(this);
    this._boundMouseUpListener = this._mouseUpListener.bind(this);
    this._boundOutsideClickListener = this._outsideClickListener.bind(this);
    this._boundKeydownListener = this._keydownListener.bind(this);

    this._observer = new FlattenedNodesObserver(this, info => {
      this._setTemplateFromNodes(info.addedNodes);
    });

    // Listener for preventing closing of the paper-dialog and all components extending `iron-overlay-behavior`.
    this._boundIronOverlayCanceledListener = e => {
      e.preventDefault();
      window.removeEventListener('iron-overlay-canceled', this._boundIronOverlayCanceledListener);
    };

    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      this._boundIosResizeListener = () => this._detectIosNavbar();
    }
  }

  ready() {
    super.ready();

    this._observer.flush();

    // Need to add dummy click listeners to this and the backdrop or else
    // the document click event listener (_outsideClickListener) may never
    // get invoked on iOS Safari (reproducible in <vaadin-dialog>
    // and <vaadin-context-menu>).
    this.addEventListener('click', () => {});
    this.$.backdrop.addEventListener('click', () => {});
  }

  _detectIosNavbar() {
    if (!this.opened) {
      return;
    }

    const innerHeight = window.innerHeight;
    const innerWidth = window.innerWidth;

    const landscape = innerWidth > innerHeight;

    const clientHeight = document.documentElement.clientHeight;

    if (landscape && clientHeight > innerHeight) {
      this.style.setProperty('--vaadin-overlay-viewport-bottom', clientHeight - innerHeight + 'px');
    } else {
      this.style.setProperty('--vaadin-overlay-viewport-bottom', '0');
    }
  }

  _setTemplateFromNodes(nodes) {
    this.template = nodes.filter(node => node.localName && node.localName === 'template')[0] || this.template;
  }

  /**
   * @event vaadin-overlay-close
   * fired before the `vaadin-overlay` will be closed. If canceled the closing of the overlay is canceled as well.
   */
  close(sourceEvent) {
    var evt = new CustomEvent('vaadin-overlay-close', {bubbles: true, cancelable: true, detail: {sourceEvent: sourceEvent}});
    this.dispatchEvent(evt);
    if (!evt.defaultPrevented) {
      this.opened = false;
    }
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.parentNode === document.body) {
      window.addEventListener('iron-overlay-canceled', this._boundIronOverlayCanceledListener);
    }

    if (this._boundIosResizeListener) {
      this._detectIosNavbar();
      window.addEventListener('resize', this._boundIosResizeListener);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // Removing the event listener in case `iron-overlay-canceled` was not fired.
    // In Shady DOM the overlay can be reattached asynchronously so we need to check that the overlay is not currently attached to body.
    if (window.ShadyDOM && window.ShadyDOM.inUse) {
      if (this.parentNode !== document.body) {
        window.removeEventListener('iron-overlay-canceled', this._boundIronOverlayCanceledListener);
      }
    } else {
      if (!this.parentNode) {
        window.removeEventListener('iron-overlay-canceled', this._boundIronOverlayCanceledListener);
      }
    }

    this._boundIosResizeListener && window.removeEventListener('resize', this._boundIosResizeListener);
  }

  _mouseDownListener(event) {
    this._mouseDownInside = event.composedPath().indexOf(this.$.overlay) >= 0;
  }

  _mouseUpListener(event) {
    this._mouseUpInside = event.composedPath().indexOf(this.$.overlay) >= 0;
  }

  /**
   * We need to listen on 'click' / 'tap' event and capture it and close the overlay before
   * propagating the event to the listener in the button. Otherwise, if the clicked button would call
   * open(), this would happen: https://www.youtube.com/watch?v=Z86V_ICUCD4
   *
   * @event vaadin-overlay-outside-click
   * fired before the `vaadin-overlay` will be closed on outside click. If canceled the closing of the overlay is canceled as well.
   */
  _outsideClickListener(event) {
    if (event.composedPath().indexOf(this.$.overlay) !== -1 ||
        this._mouseDownInside || this._mouseUpInside) {
      this._mouseDownInside = false;
      this._mouseUpInside = false;
      return;
    }
    if (!this._last) {
      return;
    }

    const evt = new CustomEvent('vaadin-overlay-outside-click', {bubbles: true, cancelable: true, detail: {sourceEvent: event}});
    this.dispatchEvent(evt);

    if (this.opened && !evt.defaultPrevented) {
      this.close(event);
    }
  }

  /**
   * @event vaadin-overlay-escape-press
   * fired before the `vaadin-overlay` will be closed on ESC button press. If canceled the closing of the overlay is canceled as well.
   */
  _keydownListener(event) {
    if (!this._last) {
      return;
    }

    // TAB
    if (event.key === 'Tab' && this.focusTrap) {
      // if only tab key is pressed, cycle forward, else cycle backwards.
      this._cycleTab(event.shiftKey ? -1 : 1);

      event.preventDefault();

    // ESC
    } else if (event.key === 'Escape' || event.key === 'Esc') {
      const evt = new CustomEvent('vaadin-overlay-escape-press', {bubbles: true, cancelable: true, detail: {sourceEvent: event}});
      this.dispatchEvent(evt);

      if (this.opened && !evt.defaultPrevented) {
        this.close(event);
      }
    }
  }

  /**
   * @event vaadin-overlay-open
   * fired after the `vaadin-overlay` is opened.
   */
  _openedChanged(opened) {
    if (opened) {
      this._animatedOpening();

      afterNextRender(this, () => {
        if (this.focusTrap) {
          this._cycleTab(0, 0);
        }

        const evt = new CustomEvent('vaadin-overlay-open', {bubbles: true});
        this.dispatchEvent(evt);
      });

      if (!this.modeless) {
        this._enterModalState();
      }
    } else {
      this._animatedClosing();
      this._exitModalState();
    }
  }

  _animatedOpening() {
    this._attachOverlay();
    this.setAttribute('opening', '');
    const name = getComputedStyle(this).getPropertyValue('animation-name');
    if (name && name != 'none') {
      const listener = () => {
        this.removeEventListener('animationend', listener);
        this.removeAttribute('opening');
      };
      this.addEventListener('animationend', listener);
    } else {
      this.removeAttribute('opening');
    }
  }

  _attachOverlay() {
    this._placeholder = document.createComment('vaadin-overlay-placeholder');
    this.parentNode.insertBefore(this._placeholder, this);
    document.body.appendChild(this);
  }

  _animatedClosing() {
    if (this._placeholder) {
      this.setAttribute('closing', '');
      const name = getComputedStyle(this).getPropertyValue('animation-name');
      if (name && name != 'none') {
        const listener = () => {
          this._detachOverlay();
          this.removeAttribute('closing');
          this.removeEventListener('animationend', listener);
        };
        this.addEventListener('animationend', listener);
      } else {
        this._detachOverlay();
        this.removeAttribute('closing');
      }
    }
  }

  _detachOverlay() {
    this._placeholder.parentNode.insertBefore(this, this._placeholder);
    this._processPendingMutationObserversFor(document.body);
    this._placeholder.parentNode.removeChild(this._placeholder);
  }

  /**
   * returns true if this is the last one in the opened overlays stack
   */
  get _last() {
    return this == Array.from(document.body.children).filter(e => e instanceof OverlayElement).pop();
  }

  _modelessChanged(modeless) {
    if (!modeless) {
      if (this.opened) {
        this._enterModalState();
      }
    } else {
      this._exitModalState();
    }
  }

  _enterModalState() {
    document.addEventListener('mousedown', this._boundMouseDownListener);
    document.addEventListener('mouseup', this._boundMouseUpListener);
    document.addEventListener('click', this._boundOutsideClickListener, true);
    document.addEventListener('keydown', this._boundKeydownListener);

    if (document.body.style.pointerEvents !== 'none') {
      // Set body pointer-events to 'none' to disable mouse interactions with
      // other document nodes.
      this._previousDocumentPointerEvents = document.body.style.pointerEvents;
      document.body.style.pointerEvents = 'none';
    }
  }

  _exitModalState() {
    document.removeEventListener('mousedown', this._boundMouseDownListener);
    document.removeEventListener('mouseup', this._boundMouseUpListener);
    document.removeEventListener('click', this._boundOutsideClickListener, true);
    document.removeEventListener('keydown', this._boundKeydownListener);

    if (this._previousDocumentPointerEvents !== undefined) {
      // Restore body pointer-events
      document.body.style.pointerEvents = this._previousDocumentPointerEvents;
      delete this._previousDocumentPointerEvents;
    }
  }

  _templateChanged(template) {
    const Templatizer = templatize(template, this, {
      forwardHostProp: function(prop, value) {
        if (this._instance) {
          this._instance.forwardHostProp(prop, value);
        }
      }
    });

    this._instance = new Templatizer({});
    this.content = this._instance.root;
  }

  _contentChanged(content) {
    this.$.content.appendChild(content);
  }

  _isFocused(element) {
    return element && element.getRootNode().activeElement === element;
  }

  _cycleTab(increment, index) {
    const focusableElements = this._getFocusableElements();

    if (index === undefined) {
      index = focusableElements.indexOf(this._focusedElement);
      if (!this._isFocused(this._focusedElement)) {
        this._focusedElement = focusableElements.reduce((prev, e) => {
          return !prev && this._isFocused(e) ? e : prev;
        }, undefined);
      }
      index = this._focusedElement ? focusableElements.indexOf(this._focusedElement) : index;
    }

    // search for visible elements and select the next possible match
    for (let i = 0; i < focusableElements.length; i++) {
      index = index + increment;

      // rollover to first item
      if (index === focusableElements.length) {
        index = 0;

      // go to last item
      } else if (index === -1) {
        index = focusableElements.length - 1;
      }

      // determine if element is visible
      this._focusedElement = focusableElements[index];
      if (this._focusedElement) {
        return this._focusedElement.focus();
      }
    }

    // fallback if there are no focusable elements
    this._focusedElement = this.$.overlay;
    this.$.overlay.focus();
  }

  _getFocusableElements() {
    // collect all focusable elements
    return IronFocusablesHelper.getTabbableNodes(this.$.overlay).
      filter(element => !element.shadowRoot || IronFocusablesHelper.getTabbableNodes(element).length === 0);
  }

  _processPendingMutationObserversFor(node) {
    if (window.CustomElements && !useNativeCustomElements) {
      CustomElements.takeRecords(node);
    }
  }
}

customElements.define(OverlayElement.is, OverlayElement);

export { OverlayElement };
