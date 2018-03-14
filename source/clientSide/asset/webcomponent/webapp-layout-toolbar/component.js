import localization from '/asset/webcomponent/document-element/localizationMixin.js'
import appMixin from '/asset/webcomponent/document-element/appMixin.js'

;(async () => {

    const localizationMixin = await localization
    const AppMixin = localizationMixin(appMixin(Polymer.ElementMixin(HTMLElement))) // Extend Polymer.Element base class

    class Element extends AppMixin {
        
        static get is() { return 'webapp-layout-toolbar'; }
        static get template() { return Polymer.html`${css}${html}` }
        static get properties() {
            return { /* properties metadata */ 
                route: Object,
                app: { type: Object, notify: true },
                page: { type: Object, notify: true, reflectToAttribute: true, observer: '_pageChanged', },
                // showspinner: {
                //     type: Boolean,
                //     notify: true,
                //     reflectToAttribute: true,
                //     observer: 'toggleSpinner',
                // },
            }
        }

        static get observers() { return [ /* observer descriptors */
            "rerenderDiretion(direction)"
        ] }

        constructor() {
            super();
        }
        
        connectedCallback() {
            super.connectedCallback();
        }
        
        ready() {
            super.ready();
            this.toggleDir(this.mode.language)
            if('ontouchstart' in window) this.$.drawer.swipeOpen = true // allow open swipe on drawer for touchscreen devices.
            let persistentDrawer = this.$.drawer.persistent
            if (this.$.drawer.persistent != undefined && !this.$.drawer.persistent) {
                this.$.drawer.open();  
            }
        }
        
        rerenderDiretion(direction) {
            let drawer = this.$.drawer
            drawer.align = direction // not needed as it is directly data-binded.
            this.$.toolbar.dir = (direction == 'left') ? 'ltr' : 'rtl';
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
            let drawer = this.$.drawer
            if(drawer && drawer.close) drawer.close()
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

})() // async