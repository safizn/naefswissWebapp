const SystemJS = window.SystemJS   
import { PolymerElement, html } from '/@webcomponent/@package/@polymer/polymer/polymer-element.js'
import '/@webcomponent/view-state404/entrypoint.js$renderJSImportWebcomponent'

const baseMixin = Superclass => class Template extends Superclass {
    static get properties() { return {
        templateConfig: { 
            type: Object, 
            notify: true, 
            reflectToAttribute: true,
        },    
    } }

    static get observers() { return [ /* observer descriptors */
    ] }

    constructor() {
        super()
    }

    ready() { // invoked the first time added to the dom.
        super.ready()
        console.log(this.app)
    }

    loadTemplate({ resourceRelativePath, selectionKey } = {}) {  // Load page import on demand. Show 404 page if fails
        // let callbackOnload = this.hideSpinner;
        let resourceResolvedObject = new URL(`${resourceRelativePath}`,`${this.app.setting.location.cdnBasePath}/@webcomponent/`)
        let callbackError = this._showPage404.bind(this);
        let extension = resourceResolvedObject.href.split('.').pop();
        this.activateLoading()
        if(extension == 'html') {
            importHref(resourceResolvedObject.href, this.deactivateLoading, callbackError, true)
        } else {
            import(resourceResolvedObject).catch(callbackError)
                .then(async ({ default: module }) => {
                    
                    let selectorElement = this.$.pageSelector
                    if(module) {
                        let elementName = await module()
                        if(!selectorElement.querySelector(elementName)) {
                            let elementTag = document.createElement(elementName)
                            selectionKey = elementName || selectionKey
                            elementTag.setAttribute('name', selectionKey)
                            selectorElement.appendChild(elementTag)
                        }
                    }
                    
                    this.deactivateLoading()
                    selectorElement.select(selectionKey)

                })
        }
    }

    activateLoading() {
        this.$.loader.removeAttribute("hidden")
    }
    deactivateLoading() {
        this.$.loader.setAttribute("hidden", true)
    }

    _showPage404() {
        this.$.pageSelector.selected = 'viewState404';
        this.deactivateLoading()
        throw('Failed to load !')
    }


}

export default baseMixin

