import localization from '/asset/webcomponent/document-element/localizationMixin.js'
import appMixin from '/asset/webcomponent/document-element/appMixin.js'

;(async () => {

    const localizationMixin = await localization
    const AppMixin = localizationMixin(appMixin(Polymer.ElementMixin(HTMLElement))) // Extend Polymer.Element base class

    class Element extends AppMixin {
        static get is() { return 'view-frontpage'; }
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