import appMixin from '/@webcomponent/document-element/appMixin.js'
import convertParamsIntoURLEncodedQuery from '/@javascript/convertParamsIntoURLEncodedQuery.js'
import localization from '/@webcomponent/document-element/localizationMixin.js'
import { PolymerElement , html } from '/@webcomponent/component.package/@polymer/polymer/polymer-element.js'
import polymerSupportPromiseBinding from '/@webcomponent/document-element/polymerSupportPromiseBinding.js' // add support for async function properties.
polymerSupportPromiseBinding(PolymerElement) // wrap with proxy providing new features
import { defineCustomElement } from '/@javascript/defineCustomElement.decorator.js'
/** WebComponent **/
import '/@webcomponent/component.package/@polymer/iron-icons/communication-icons.js'
import '/@webcomponent/component.package/@polymer/iron-icons/iron-icons.js'
import '/@webcomponent/component.package/@polymer/app-layout/app-drawer/app-drawer.js'
import '/@webcomponent/timeline-grid/entrypoint.js$renderJSImportWebcomponent'
import '/@webcomponent/shared-styles.html$convertSharedStylesToJS'

;(async () => {
  const localizationMixin = await localization()
  const AppMixin = localizationMixin(appMixin(PolymerElement))
  const component = {
    css: html`<custom-style><!--for polyfill compatibility--><style include="shared-styles">{%= argument.css %}</style></custom-style>`,
    html: html`{%= argument.html %}`,
    superclass: AppMixin
  }    

  @defineCustomElement('view-underconstruction')
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