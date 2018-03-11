// window.addEventListener('WebComponentsReady', function() {
class Element extends Polymer.Element {
    static get is() { return 'webapp-layout-toolbar'; }
    static get template() { return Polymer.html`${css}${html}` }
    static get properties() {
        return { /* properties metadata */ 
            route: Object,
            app: { type: Object, notify: true },
            page: { type: Object, notify: true, reflectToAttribute: true, observer: '_pageChanged', },
            text: { type: String, notify: true, reflectToAttribute: true }     
            // showspinner: {
            //     type: Boolean,
            //     notify: true,
            //     reflectToAttribute: true,
            //     observer: 'toggleSpinner',
            // },
        }
    }

    static get observers() { return [ /* observer descriptors */
    ] }

    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
    }

    ready() {
        super.ready();
        if('ontouchstart' in window) this.$.drawer.swipeOpen = true // allow open swipe on drawer for touchscreen devices.
    }

    _pageChanged(page, oldView) {
        // Load page import on demand. Show 404 page if fails
        if (page.selectorName != null) {
            console.info(`📄 Page changed to: ${page.selectorName}`)
            // let callbackOnload = this.hideSpinner;
            // let resolvedPageUrl = this.resolveUrl(`../${page.file}`);
            let resolvedPageUrl = new URL(`${page.file}`,`${this.app.setting.location.cdnBasePath}/asset/webcomponent/`)
            let callbackError = this._showPage404;
            Polymer.importHref(resolvedPageUrl.href, null, callbackError, true);
        }

        if (!this.$.drawer.persistent) {
            this.$.drawer.close();  
        }
    }

    // hideSpinner() {
    //   this.showspinner = false;
    // }

    // toggleSpinner(newValue, oldValue) {
    //   console.log(this.$.spinner)
    //   (newValue == true) ? this.$.spinner.setAttribute('active', "") : this.$.spinner.removeProperty("active");
    // }

    _showPage404() {
        this.page.selectorName = 'viewState404';
    }

    }
    // Register custom element definition using standard platform API
    customElements.define(Element.is, Element);
// })
