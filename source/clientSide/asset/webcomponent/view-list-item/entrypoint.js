import localization from '/@webcomponent/document-element/localizationMixin.js'
import appMixin from '/@webcomponent/document-element/appMixin.js'
import { PolymerElement , html } from '/@webcomponent/@package/@polymer/polymer/polymer-element.js'
import polymerSupportPromiseBinding from '/@webcomponent/document-element/polymerSupportPromiseBinding.js' // add support for async function properties.
polymerSupportPromiseBinding(PolymerElement) // wrap with proxy providing new features
import { defineCustomElement } from '/@javascript/defineCustomElement.decorator.js'
/** WebComponent **/
import '/@webcomponent/@package/@polymer/iron-icons/iron-icons.js'
import '/@webcomponent/@package/@polymer/paper-icon-button/paper-icon-button.js'
import '/@webcomponent/@package/@polymer/app-layout/app-toolbar/app-toolbar.js'
import '/@webcomponent/@package/@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import '/@webcomponent/@package/@polymer/app-layout/app-header/app-header.js'
import '/@webcomponent/@package/@polymer/app-layout/app-header-layout/app-header-layout.js'
import '/@webcomponent/shared-styles.html$convertSharedStylesToJS'

;(async () => {

    const localizationMixin = await localization()
    const AppMixin = localizationMixin(appMixin(PolymerElement)) // Extend Polymer.Element base class
    const component = {
        css: html`<custom-style><!--for polyfill compatibility--><style include="shared-styles">{%= argument.css %}</style></custom-style>`,
        html: html`{%= argument.html %}`,
        superclass: AppMixin
    }    
    @defineCustomElement('view-list-item')
    class Element extends component.superclass {

        static get template() { return html`${component.css}${component.html}` }
        static get properties() {
        return {
            app: Object,
        }
        }
    }

})() // async
