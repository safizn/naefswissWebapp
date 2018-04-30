const SystemJS = window.SystemJS   
import { PolymerElement, html } from '/@webcomponent/@package/@polymer/polymer/polymer-element.js'

export default Superclass => class Route extends Superclass {
    static get template() {
        return html`
            <!-- Bind to URL - Proxy for window.location for Managing top-level routes -->
            <app-location route="{{route}}"></app-location>
            <app-route route="{{route}}" pattern="/:pathTopLevel" data="{{routeData}}" tail="{{subroute}}"></app-route>
        `
    }
    static get properties() {
        return {
            layout: {
                type: String,
                notify: true,
                reflectToAttribute: true,
            },
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
        '_routePageChanged(route.path)',
        '_routeChanged(route)',
    ] }

    constructor() {
        super()
        this.routeConfig = [
            { // empty path
                path: '',
                documentKey: 'frontpage',
            },
            {
                path: 'step',
                documentKey: 'step',
            },
            {
                path: 'university',
                documentKey: 'universityPage',
            },
            {
                path: 'contact',
                documentKey: 'contact',
            },
            {
                path: 'view1',
                documentKey: 'homePage-view1',
            },
            {
                path: 'view2',
                documentKey: 'homePage-view2',
            },
            {
                path: 'view3',
                documentKey: 'homePage-view3',
            },
            {
                path: 'view404',
                documentKey: 'view-state404',
            },
            {
                path: 'studyfield',
                documentKey: 'studyfieldPage', // fallback in case children don't meet codition
                children: [
                    {
                        path: 'medicine',
                        documentKey: 'medicine'
                    },
                ]
            },
            {
                path: 'country',
                documentKey: 'countryPage',
                children: [
                    {
                        path: 'bucharest',
                        documentKey: 'bucharest'
                    }
                ]
            },
            {
                path: 'registration',
                documentKey: 'registration-agency',
                children: [
                    {
                        path: 'single',
                        documentKey: 'registration-single'
                    },
                    {
                        path: 'agency',
                        documentKey: 'registration-agency'
                    },
                ]
            },
        ]

    }

    ready() { // invoked the first time added to the dom.
        super.ready()
    }

    _routeChanged(route) {
        // console.log(route)
    }
    
    _routePageChanged(routePath) { // Choose page/view using URL path.
        let pathLevel = routePath.split( '/' )
        if(typeof pathLevel[0] == 'undefined') return; // skip initial `pathTopLevel` value of undefined.
        let documentKey = this.checkConditionTree(pathLevel)
        // Document & Template Tree procesing.
        let document = this.app.document.filter(unit => {
            if(unit.key == documentKey) return true
            return false
        })[0]
        
        // document.page.filename = document.page.file.substr(0, document.page.file.indexOf('.'));
        this.layout = document.layout
        this.page = document.page
        
    }
    
    checkConditionTree(pathLevel) { // 
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

