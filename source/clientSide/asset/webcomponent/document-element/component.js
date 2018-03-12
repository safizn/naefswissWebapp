import routeMixin from '/asset/webcomponent/document-element/routeMixin.js'
import appMixin from '/asset/webcomponent/document-element/appMixin.js'
import localization from '/asset/webcomponent/document-element/localizationMixin.js'
import polymerSupportPromiseBinding from '/asset/webcomponent/document-element/polymerSupportPromiseBinding.js'
polymerSupportPromiseBinding() // add support for async function properties.
const App = window.App || {}; 

// const waitForWebComponentsReady = new Promise(resolve => { window.addEventListener('WebComponentsReady', resolve) })

;(async () => {

    const localizationMixin = await localization()
    const AppMixin = localizationMixin(appMixin(Polymer.ElementMixin(HTMLElement))) // Extend Polymer.Element base class
    const RouteMixin /* Class */ = routeMixin(AppMixin)

    class Element extends RouteMixin {

        static get elementName() { return 'document-element'; }
        
        static get template() {
            return Polymer.html`${css}${RouteMixin.template}${html}` 
        }
        
        static get properties() {
            return { /* properties metadata */
                
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
            this.app.setting.location.routeBasePath = `${this.app.config.PROTOCOL}${this.app.config.HOST}`
            this.app.documentElement = this // register document element to be used as entrypoint to Polymer's binding system.
            console.log(this.app)
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
        
    }

    window.customElements.define(Element.elementName, Element) // Register custom element definition using standard platform API

})() // async 