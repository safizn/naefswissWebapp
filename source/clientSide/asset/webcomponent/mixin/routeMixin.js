// TODO: Rename to stateCondition.

const SystemJS = window.SystemJS   
import { PolymerElement, html } from '/@webcomponent/@package/@polymer/polymer/polymer-element.js'

export default Superclass => class Route extends Superclass {
    static get properties() {
        return {
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
    
    /**
     * To take effect routeMixin should be used with templateMixin.
     */
    _routePageChanged(routePath, routeConfig) { // Choose page/view using URL path.
        if(!routeConfig) return; // skip initial change of one of the properties - TODO: Should be a better way to wait for all properties to be ready.
        let pathLevel = routePath.split( '/' )
        if(typeof pathLevel[0] == 'undefined') return; // skip initial `pathTopLevel` value of undefined.
        let templateKey = this.checkConditionTree(pathLevel)
        
        this.templateKey = templateKey        
    }
    
    checkConditionTree(pathLevel) {
        pathLevel = pathLevel.filter(item => item) // remove empty items.
        let templateKey = '' // default value
    
        let chosenRouteConfig = iterateOverRouteConfig({ routeConfig: this.routeConfig, pathLevel  })

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
            
            if(!chosenRouteConfig) return null

            let chosenChildRouteConfig;
            if(
                chosenRouteConfig.children && chosenRouteConfig.children.length > 0 &&
                pathLevel.length > 0 // there is a subpath to compare to.
            ) {
                chosenChildRouteConfig = iterateOverRouteConfig({ routeConfig: chosenRouteConfig.children, pathLevel  })
            }
            return chosenChildRouteConfig || chosenRouteConfig
        }

        templateKey = (chosenRouteConfig) ? chosenRouteConfig.templateKey : null;

        return templateKey
    }  


}

