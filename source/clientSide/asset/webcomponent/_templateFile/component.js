import appMixin from '/asset/webcomponent/document-element/appMixin.js'

;(async () => {

    const AppMixin = appMixin(Polymer.ElementMixin(HTMLElement))
    class Element extends AppMixin {
        static get is() { return ''; }
        static get template() { return html`${css}${html}` }
        static get properties() {
            return { /* properties metadata */ 
            }
        }

        static get observers() { return [ /* observer descriptors */

        ] }

        constructor() {
            super();
        }
        
        ready() {
            super.ready();
        }

        connectedCallback() {
            super.connectedCallback();
        }       

    }
    customElements.define(Element.is, Element);

})() // async