import { PolymerElement , html } from '/@webcomponent/@package/@polymer/polymer/polymer-element.js'
import convertParamsIntoURLEncodedQuery from '/@javascript/convertParamsIntoURLEncodedQuery.js'
import polymerSupportPromiseBinding from '/@javascript/polymerSupportPromiseBinding.js' // add support for async function properties.
polymerSupportPromiseBinding(PolymerElement) // wrap with proxy providing new features
import { defineCustomElement } from '/@javascript/defineCustomElement.decorator.js'
/** Mixin **/
import appMixin from '/@webcomponent/mixin/appMixin.js'
import localization from '/@webcomponent/mixin/localizationMixin.js'
/** Package WebComponent **/
import '/@webcomponent/@package/@polymer/iron-icons/communication-icons.js'
import '/@webcomponent/@package/@polymer/iron-icons/iron-icons.js'
import '/@webcomponent/@package/@polymer/app-layout/app-drawer/app-drawer.js'
/** Custom WebComponent **/
import '/@webcomponent/timeline-grid/entrypoint.js$renderJSImportWebcomponent'
import '/@webcomponent/shared-styles.html$convertSharedStylesToJS'

const component = {
  elementName: 'undermaintenance-template',
  css: html`<custom-style><!--for polyfill compatibility--><style include="shared-styles">{%= argument.css %}</style></custom-style>`,
  html: html`{%= argument.html %}`,
}    

;(async () => {
  const localizationMixin = await localization()
  const AppMixin = localizationMixin(appMixin(PolymerElement))
  component.superclass = AppMixin

  @defineCustomElement(component.elementName)
  class Element extends AppMixin {
    static get template() { return html`${component.css}${component.html}` }
    static get properties() {
      return {
      }
    }

    connectedCallback() {
      super.connectedCallback();
      if(this.app.instance.distribution == "es5") this.$.title.style.display = "none"
    }
    
  }
})() // async

export default async () => {
  if(!customElements.get(component.elementName)) { // if element not defined wait till custom element is registered
      await customElements.whenDefined(component.elementName)
  }

  return component.elementName
}