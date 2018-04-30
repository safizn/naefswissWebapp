const App = window.App || {}; 
const SystemJS = window.SystemJS
import routeMixin from '/@webcomponent/document-element/routeMixin.js'
import appMixin from '/@webcomponent/document-element/appMixin.js'
import localization from '/@webcomponent/document-element/localizationMixin.js'
import templateMixin from '/@webcomponent/document-element/templateMixin.js'
import { PolymerElement , html } from '/@webcomponent/@package/@polymer/polymer/polymer-element.js'
import polymerSupportPromiseBinding from '/@webcomponent/document-element/polymerSupportPromiseBinding.js' // add support for async function properties.
polymerSupportPromiseBinding(PolymerElement) // wrap with proxy providing new features
// const waitForWebComponentsReady = new Promise(resolve => { window.addEventListener('WebComponentsReady', resolve) })
import { defineCustomElement } from '/@javascript/defineCustomElement.decorator.js'
import '/@webcomponent/@package/@polymer/iron-pages/iron-pages.js'
import '/@webcomponent/@package/@polymer/app-route/app-location.js'
import '/@webcomponent/@package/@polymer/app-route/app-route.js'
import '/@webcomponent/@package/@polymer/paper-progress/paper-progress.js'
import '/@webcomponent/shared-styles.html$convertSharedStylesToJS'
import '/@webcomponent/view-state404/entrypoint.js$renderJSImportWebcomponent'

const component = {
    elementName: 'document-element',
    css: html`<custom-style><!--for polyfill compatibility--><style include="shared-styles">{%= argument.css %}</style></custom-style>`,
    html: html`{%= argument.html %}`,
}    

;(async () => {

    const localizationMixin = await localization()
    const AppMixin = localizationMixin(appMixin(PolymerElement)) // Extend Polymer.Element base class // previously Polymer.ElementMixin(HTMLElement)
    const RouteMixin /* Class */ = routeMixin(templateMixin(AppMixin))
    
    component.superclass = RouteMixin
    
    @defineCustomElement(component.elementName)
    class Element extends component.superclass {
        
        static get template() { return html`${component.css}${RouteMixin.template}${component.html}` }
        
        static get properties() {
            return { /* properties metadata */
                mode: { 
                    type: Object, notify: true, reflectToAttribute: true,
                    computed: '_mode(app)' 
                },    
            }
        }
        
        constructor() { // in constructor - set default values & event listners. & Add shadow root which Polymer does.
            super()
            
            // Polymer does some checks and stamps the template in the this.ready function.
            // // Stamp template dom (if shadowRoot exists, Polymer will skip stamping next.)
            // this.attachShadow({ mode: 'open' })
            // let t = document.createElement('template')
            // t.innerHTML = this.template
            // this.shadowRoot.appendChild(t)

            // Values are altered when server renderint to front-end (slashes are added).
            this.app.setting.location.routeBasePath = window.location.origin || `${this.app.config.PROTOCOL}${this.app.config.HOST}` // previously was specified using server config, but this way the links will work on any origin.
            this.app.documentElement = this // register document element to be used as entrypoint to Polymer's binding system.

            this.addEventListener('localization-language-changed', event => console.log(`🌐 Language changed to: ${event.detail.language}`) );
            this.addEventListener('localization-language-loaded', event => console.log(`🌐 Loaded resource for: ${event.detail.language}`) );
            // Load language resource from server side passed data:
            // NOTE: the placement in constructor is for executing function before the equivalent fetch is called from localization mixin.
            let language = this.app.setting.mode.language
            // this.rerenderLocalization(language, this.app.uiContent)

            // let configuration = fetc(this.configurationKey) || {
            //     dynamicImport: [ 
            //         { key: '', file: '' }, 
            //         { key: '', file: '' }, 
            //     ],
            //     routeTree: {
            //         x, 
            //         y
            //     }

            // }
            

        }
        ready() { // invoked the first time added to the dom.
            // Polymer.Element : 
            // • Creates and attaches the element's shadow DOM tree.
            // • Initializes the data system, propagating initial values to data bindings.
            // • Allows observers and computed properties to run (as soon as any of their dependencies are defined).
            super.ready()
            // When possible, use afterNextRender to defer non-critical work until after first paint. (must load 'polymer/lib/utils/render-status.html')
            // Polymer.RenderStatus.afterNextRender(this, function() {
            //     this.addEventListener('click', this._handleClick);
            // });

            // template configuration: 
            this.templateConfig = {
                type: 'configurationObject',
                value: {
                    selectionKey: 'webapp-layout-toolbar',
                    resource: {
                        path: 'webapp-layout-toolbar/entrypoint.js$renderJSImportWebcomponent'
                    }
                }
            }
            this.loadTemplate({ resourceRelativePath: this.templateConfig.value.resource.path, selectionKey: this.templateConfig.value.selectionKey })
            
        }
        async connectedCallback() {
            super.connectedCallback(); // to allow Polymer to hook into the element's lifecycle.
        }
        disconnectionCallback() {
            super.disconnectionCallback()
        }
        attributeChangedCallback() {
            super.attributeChangedCallback()
        }

        _mode(app) {
            return {
                language: this.app.setting.mode.language,
                accesibility: {
                    color: 'light'
                }
            }
        }

    }

})() // async 

export default async () => {
    if(!customElements.get(component.elementName)) { // if element not defined wait till custom element is registered
        await customElements.whenDefined(component.elementName)
    }

    return component.elementName
}