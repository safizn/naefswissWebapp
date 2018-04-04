import appMixin from '/asset/webcomponent/document-element/appMixin.js'

;(async () => {

    const AppMixin = appMixin(Polymer.ElementMixin(HTMLElement))

    class Element extends AppMixin {
        static get is() { return 'language-picker'; }
        static get template() { return Polymer.html`${css}${html}` }
        static get properties() {
            return { /* properties metadata */ 
                language: {
                    type: String,
                    notify: true,
                    reflectToAttribute: true
                },
                languageCode: {
                    type: String,
                    // computed: '_languageCode(language)'
                }
            }
        }

        static get observers() { return [ /* observer descriptors */
            'changeDirection(language)'
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
        
        _languageCode(language) {
            return this.languageList
                    .find(languageItem => languageItem.name == language)
                    .code
        }
        
        changeDirection(language) {
            let rightLanguages = ['Arabic', 'Hebrew']
            this.$.menu.horizontalAlign = (rightLanguages.includes(language)) ? 'left' : 'right'; // alignment is opposite to text direction.
        }
    }

    Element.prototype.languageList = [
        {
            name: 'Arabic',
            code: 'AR',
        },
        {
            name: 'English',
            code: 'EN',
        },
        {
            name: 'Hebrew',
            code: 'HE'
        }
    ]

    customElements.define(Element.is, Element);

})() // async