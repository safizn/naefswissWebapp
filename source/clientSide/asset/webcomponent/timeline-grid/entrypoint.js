import convertParamsIntoURLEncodedQuery from '/@javascript/convertParamsIntoURLEncodedQuery.js'
import localization from '/@webcomponent/document-element/localizationMixin.js'
import appMixin from '/@webcomponent/document-element/appMixin.js'
import { PolymerElement , html } from '/@webcomponent/component.package/@polymer/polymer/polymer-element.js'
import polymerSupportPromiseBinding from '/@webcomponent/document-element/polymerSupportPromiseBinding.js' // add support for async function properties.
polymerSupportPromiseBinding(PolymerElement) // wrap with proxy providing new features
import { defineCustomElement } from '/@javascript/defineCustomElement.decorator.js'

;(async () => {

    const localizationMixin = await localization()
    const AppMixin = localizationMixin(appMixin(PolymerElement)) // Extend Polymer.Element base class
    const component = {
        css: html`<custom-style><!--for polyfill compatibility--><style include="shared-styles">{%= argument.css %}</style></custom-style>`,
        html: html`{%= argument.html %}`,
        superclass: AppMixin
    }    

    @defineCustomElement('timeline-grid')
    class Element extends component.superclass {
        static get template() { return html`${component.css}${component.html}` }
        static get properties() {
            return { /* properties metadata */ 
                achievement: {
                    type: Object, notify: true, reflectToAttribute: true
                }
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
            this.fetchData()
        }

        fetchData() {
            let params = { language: this.mode.language }
            let query = convertParamsIntoURLEncodedQuery(params)
            let entrypointKey = 'personalInfo'
            let url = `http://api.localhost/content/${entrypointKey}?${query}`
            return fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    extrafield: true,
                    schemaMode: 'nonStrict'
                }), 
                mode: 'cors',
                cache: 'no-cache',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).then(async response => {
                if(!response.ok) throw response.statusText // if status code resuted is not '200' (fetch resolves/passes on 404 for example.)
                let wrapperObject = await response.json()
                return wrapperObject[entrypointKey] // extract content object (without entrypointKey name)
            }).then(async data => {
                this.achievement = data // update property
            })
        }

    }

})() // async