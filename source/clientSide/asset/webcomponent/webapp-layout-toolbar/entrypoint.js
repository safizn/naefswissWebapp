import { PolymerElement , html } from '/@webcomponent/@package/@polymer/polymer/polymer-element.js'
import { importHref } from '/@webcomponent/@package/@polymer/polymer/lib/utils/import-href.js'
import { defineCustomElement } from '/@javascript/defineCustomElement.decorator.js'
import polymerSupportPromiseBinding from '/@webcomponent/document-element/polymerSupportPromiseBinding.js' // add support for async function properties.
polymerSupportPromiseBinding(PolymerElement) // wrap with proxy providing new features
import localization from '/@webcomponent/document-element/localizationMixin.js'
import appMixin from '/@webcomponent/document-element/appMixin.js'
import templateMixin from '/@webcomponent/document-element/templateMixin.js'
/** WebComponent **/
import '/@webcomponent/@package/@polymer/app-layout/app-drawer/app-drawer.js'
import '/@webcomponent/@package/@polymer/app-layout/app-drawer-layout/app-drawer-layout.js'
import '/@webcomponent/@package/@polymer/app-layout/app-header/app-header.js'
import '/@webcomponent/@package/@polymer/app-layout/app-header-layout/app-header-layout.js'
import '/@webcomponent/@package/@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import '/@webcomponent/@package/@polymer/app-layout/app-toolbar/app-toolbar.js'
import '/@webcomponent/@package/@polymer/paper-button/paper-button.js'
import '/@webcomponent/@package/@polymer/paper-tabs/paper-tabs.js'
import '/@webcomponent/@package/@polymer/iron-pages/iron-pages.js'
import '/@webcomponent/@package/@polymer/iron-selector/iron-selector.js'
import '/@webcomponent/@package/@polymer/paper-icon-button/paper-icon-button.js'
import '/@webcomponent/@package/@polymer/iron-icons/iron-icons.js'
import '/@webcomponent/@package/@polymer/iron-icons/social-icons.js'
import '/@webcomponent/@package/@polymer/iron-icons/communication-icons.js'
import '/@webcomponent/@package/@polymer/iron-icons/av-icons.js'
import '/@webcomponent/@package/@polymer/paper-spinner/paper-spinner.js'
import '/@webcomponent/@package/@polymer/paper-progress/paper-progress.js'
import '/@webcomponent/view-state404/entrypoint.js$renderJSImportWebcomponent'
import '/@webcomponent/language-picker/entrypoint.js$renderJSImportWebcomponent'

const component = {
    elementName: 'webapp-layout-toolbar',
    css: html`<custom-style><!--for polyfill compatibility--><style include="shared-styles">{%= argument.css %}</style></custom-style>`,
    html: html`{%= argument.html %}`,
}    

;(async () => {

    const localizationMixin = await localization()
    const AppMixin = templateMixin(localizationMixin(appMixin(PolymerElement))) // Extend Polymer.Element base class
    component.superclass = AppMixin

    @defineCustomElement(component.elementName)
    class Element extends component.superclass {
        
        static get template() { return html`${component.css}${component.html}` }
        static get properties() {
            return { /* properties metadata */ 
                route: Object,
                page: { 
                    type: Object, notify: true, reflectToAttribute: true, 
                    observer: '_pageChanged', 
                },
                // showspinner: {
                //     type: Boolean,
                //     notify: true,
                //     reflectToAttribute: true,
                //     observer: 'toggleSpinner',
                // },
            }
        }

        static get observers() { return [ /* observer descriptors */
            // "rerenderDiretion(direction)"
        ] }

        constructor() {
            super();
        }
        
        connectedCallback() {
            super.connectedCallback();
        }
        
        ready() {
            super.ready();
            // this.toggleDir(this.mode.language)
            if('ontouchstart' in window) this.$.drawer.swipeOpen = true // allow open swipe on drawer for touchscreen devices.
            let drawer = this.$.drawer
            drawer.addEventListener('iron-select', (event) => { 
                if(!drawer.persistent) drawer.close()
            })

        }
        
        rerenderDiretion(direction) {
            let drawer = this.$.drawer
            drawer.align = direction // not needed as it is directly data-binded.
            this.$.toolbar.dir = (direction == 'left') ? 'ltr' : 'rtl';
        }

        _pageChanged(page, oldView) { // Load page import on demand. Show 404 page if fails
            if (page.selectorName != null) {
                this.loadTemplate({
                    resourceRelativePath: page.file,
                    selectionKey: page.selectorName,
                    selectorId: 'pageSelector'
                })
                console.info(`📄 Page changed to: ${page.selectorName}`)
            }
        }
        
        // hideSpinner() {
        //   this.showspinner = false;
        // }

        // toggleSpinner(newValue, oldValue) {
        //   console.log(this.$.spinner)
        //   (newValue == true) ? this.$.spinner.setAttribute('active', "") : this.$.spinner.removeProperty("active");
        // }

    }

})() // async

export default async () => {
    if(!customElements.get(component.elementName)) { // if element not defined wait till custom element is registered
        await customElements.whenDefined(component.elementName)
    }

    return component.elementName
}