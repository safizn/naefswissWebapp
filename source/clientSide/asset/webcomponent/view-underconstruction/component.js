import appMixin from '/asset/webcomponent/document-element/appMixin.js'
import convertParamsIntoURLEncodedQuery from '/asset/javascript/convertParamsIntoURLEncodedQuery.js'
import localization from '/asset/webcomponent/document-element/localizationMixin.js'

;(async () => {
  const localizationMixin = await localization()
  const AppMixin = localizationMixin(appMixin(Polymer.ElementMixin(HTMLElement)))
  class Element extends AppMixin {
    static get is() { return 'view-underconstruction'; }
    static get template() { return Polymer.html`${css}${html}` }
    static get properties() {
      return {
      }
    }

    connectedCallback() {
      super.connectedCallback();
      if(this.app.instance.distribution == "es5") this.$.title.style.display = "none"
    }
    
  }
  customElements.define(Element.is, Element);
})() // async