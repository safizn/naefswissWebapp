const App = window.App || {}; 
const SystemJS = window.SystemJS
import appMixin from '/@webcomponent/document-element/appMixin.js'
import localization from '/@webcomponent/document-element/localizationMixin.js'
import { PolymerElement , html } from '/@webcomponent/component.package/@polymer/polymer/polymer-element.js'
import polymerSupportPromiseBinding from '/@webcomponent/document-element/polymerSupportPromiseBinding.js' // add support for async function properties.
polymerSupportPromiseBinding(PolymerElement) // wrap with proxy providing new features
import { defineCustomElement } from '/@javascript/defineCustomElement.decorator.js'

// const waitForWebComponentsReady = new Promise(resolve => { window.addEventListener('WebComponentsReady', resolve) })
/** WebComponent **/
import '/@webcomponent/shared-styles.html$convertSharedStylesToJS'
import '/@webcomponent/component.package/@polymer/iron-icons/communication-icons.js'
import '/@webcomponent/component.package/@polymer/iron-icons/iron-icons.js'

;(async () => {

    const localizationMixin = await localization()
    const AppMixin = localizationMixin(appMixin(PolymerElement)) // Extend Polymer.Element base class

    const component = {
        css: html`<custom-style><!--for polyfill compatibility--><style include="shared-styles">{%= argument.css %}</style></custom-style>`,
        html: html`{%= argument.html %}`,
        superclass: AppMixin
    }    

    @defineCustomElement('view-frontpage')
    class Element extends component.superclass {
        static get template() { return html`${component.css}${component.html}` }
        static get properties() { return {} }

        connectedCallback() {
            super.connectedCallback();
            if(this.app.instance.distribution == "es5") this.$.title.style.display = "none"
        }
        
    }

})() // async