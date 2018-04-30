const SystemJS = window.SystemJS   
import { PolymerElement, html } from '/@webcomponent/@package/@polymer/polymer/polymer-element.js'

export default Superclass => class Route extends Superclass {
    static get properties() {
        return {
            page: {
                type: Object,
                notify: true,
                reflectToAttribute: true,
            },
            route: {
                type: Object
            },
            subroute: {
                type: Object,
                notify: true,
                reflectToAttribute: true,
            },
            routeConfig: {
                type: Object,
                notify: true,
                // reflectToAttribute: true,
            }
        }
    }

    static get observers() { return [ /* observer descriptors */
        '_routePageChanged(route.path, routeConfig)',
        '_routeChanged(route, routeConfig)',
    ] }

    constructor() {
        super()
    }

    ready() { // invoked the first time added to the dom.
        super.ready()
    }

    _routeChanged(route, routeConfig) {
        // console.log(route)
    }
    
    _routePageChanged(routePath, routeConfig) { // Choose page/view using URL path.
        if(!routeConfig) return; // skip initial change of one of the properties - TODO: Should be a better way to wait for all properties to be ready.
        let pathLevel = routePath.split( '/' )
        if(typeof pathLevel[0] == 'undefined') return; // skip initial `pathTopLevel` value of undefined.
        let documentKey = this.checkConditionTree(pathLevel)
        // Document & Template Tree procesing.
        let document = this.app.document.filter(unit => {
            if(unit.key == documentKey) return true
            return false
        })[0]
        
        // document.page.filename = document.page.file.substr(0, document.page.file.indexOf('.'));
        // this.layout = document.layout
        this.page = document.page
        
    }
    
    checkConditionTree(pathLevel) {
        pathLevel = pathLevel.filter(item => item) // remove empty items.
        let documentKey = '' // default value

        function iterateOverRouteConfig({ routeConfig, pathLevel }) {
            let currentPathLevel = pathLevel.shift() // remove and get first item
            let chosenRouteConfig;
            chosenRouteConfig = routeConfig.filter(route => {
                if(!currentPathLevel) { // in case undefined - compare it as boolean.
                    return Boolean(route.path) == Boolean(currentPathLevel)
                } else {
                    return route.path == currentPathLevel
                } 
            })[0]
            
            let chosenChildRouteConfig;
            if(
                chosenRouteConfig.children && chosenRouteConfig.children.length > 0 &&
                pathLevel.length > 0 // there is a subpath to compare to.
            ) {
                chosenChildRouteConfig = iterateOverRouteConfig({ routeConfig: chosenRouteConfig.children, pathLevel  })
            }
            return chosenChildRouteConfig || chosenRouteConfig
        }
    
        let chosenRouteConfig = iterateOverRouteConfig({ routeConfig: this.routeConfig, pathLevel  })
        documentKey = chosenRouteConfig.documentKey

        return documentKey
    }  


}

