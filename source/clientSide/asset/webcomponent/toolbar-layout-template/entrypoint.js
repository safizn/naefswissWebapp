import { PolymerElement , html } from '/@webcomponent/@package/@polymer/polymer/polymer-element.js'
import { importHref } from '/@webcomponent/@package/@polymer/polymer/lib/utils/import-href.js'
import { defineCustomElement } from '/@javascript/defineCustomElement.decorator.js'
import polymerSupportPromiseBinding from '/@javascript/polymerSupportPromiseBinding.js' // add support for async function properties.
polymerSupportPromiseBinding(PolymerElement) // wrap with proxy providing new features
/** Mixin **/
import localization from '/@webcomponent/mixin/localizationMixin.js'
import appMixin from '/@webcomponent/mixin/appMixin.js'
import routeMixin from '/@webcomponent/mixin/routeMixin.js'
import templateMixin from '/@webcomponent/mixin/templateMixin.js'
/** Package WebComponent **/
import '/@webcomponent/@package/@polymer/app-layout/app-drawer/app-drawer.js'
import '/@webcomponent/@package/@polymer/app-layout/app-drawer-layout/app-drawer-layout.js'
import '/@webcomponent/@package/@polymer/app-layout/app-header/app-header.js'
import '/@webcomponent/@package/@polymer/app-layout/app-header-layout/app-header-layout.js'
import '/@webcomponent/@package/@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import '/@webcomponent/@package/@polymer/app-layout/app-toolbar/app-toolbar.js'
import '/@webcomponent/@package/@polymer/paper-button/paper-button.js'
import '/@webcomponent/@package/@polymer/paper-tabs/paper-tabs.js'
import '/@webcomponent/@package/@polymer/iron-pages/iron-pages.js'
import '/@webcomponent/@package/@polymer/iron-selector/iron-selector.js'
import '/@webcomponent/@package/@polymer/paper-icon-button/paper-icon-button.js'
import '/@webcomponent/@package/@polymer/iron-icons/iron-icons.js'
import '/@webcomponent/@package/@polymer/iron-icons/social-icons.js'
import '/@webcomponent/@package/@polymer/iron-icons/communication-icons.js'
import '/@webcomponent/@package/@polymer/iron-icons/av-icons.js'
import '/@webcomponent/@package/@polymer/paper-spinner/paper-spinner.js'
import '/@webcomponent/@package/@polymer/paper-progress/paper-progress.js'
/** Custom WebComponent **/
import '/@webcomponent/state404-template/entrypoint.js$renderJSImportWebcomponent'
import '/@webcomponent/language-picker/entrypoint.js$renderJSImportWebcomponent'

const component = {
    elementName: 'toolbar-layout-template',
    css: html`<custom-style><!--for polyfill compatibility--><style include="shared-styles">{%= argument.css %}</style></custom-style>`,
    html: html`{%= argument.html %}`,
}    

;(async () => {

    const localizationMixin = await localization()
    const AppMixin = routeMixin(templateMixin(localizationMixin(appMixin(PolymerElement)))) // Extend Polymer.Element base class
    component.superclass = AppMixin

    @defineCustomElement(component.elementName)
    class Element extends component.superclass {
        
        static get template() { return html`${component.css}${component.html}` }
        static get properties() {
            return { /* properties metadata */ 
                route: Object,
                // showspinner: {
                //     type: Boolean,
                //     notify: true,
                //     reflectToAttribute: true,
                //     observer: 'toggleSpinner',
                // },
            }
        }

        static get observers() { return [ /* observer descriptors */
            // "rerenderDiretion(direction)"
        ] }

        constructor() {
            super();
        }
        
        ready() {
            super.ready();
            this.fallbackTemplateKey = 'notFound'
            this.templateConfig = [ // each configuration is a mutation configuration that changes the page/template either added elements or switching values...
                {
                    key: 'l1',
                    type: 'linkSelector', 
                    data: {
                        selectorId: 'headertoolbar'
                    }
                },
                {
                    key: 'l2',
                    type: 'linkSelector', 
                    data: {
                        selectorId: 'drawerSelector'
                    }
                },
                {
                    key: '902134075',
                    type: 'importConfigurationObject',
                    data: {
                        insertionPoint: {
                            selectorId: 'pageSelector',
                            selectionKey: 'about-template' // optional - if not present the element name is used.
                        },
                        resource: {
                            path: 'about-template/entrypoint.js$renderJSImportWebcomponent'
                        },                    
                    },
                    children: ['l1', 'l2']
                },
                {
                    key: '15877890',
                    type: 'importConfigurationObject',
                    data: {
                        insertionPoint: {
                            selectorId: 'pageSelector',
                            selectionKey: 'contact-template' // optional - if not present the element name is used.
                        },
                        resource: {
                            path: 'contact-template/entrypoint.js$renderJSImportWebcomponent'
                        },                    
                    },
                    children: ['l1', 'l2']
                },
                {
                    key: 't1',
                    type: 'importConfigurationObject',
                    data: {
                        insertionPoint: {
                            selectorId: 'pageSelector',
                            selectionKey: 'news-template' // optional - if not present the element name is used.
                        },
                        resource: {
                            path: 'news-template/entrypoint.js$renderJSImportWebcomponent'
                        },                    
                    },
                    children: ['l1', 'l2']
                },
                {
                    key: 't2',
                    type: 'importConfigurationObject',
                    data: {
                        insertionPoint: {
                            selectorId: 'pageSelector',
                            selectionKey: 'projects-template' // optional - if not present the element name is used.
                        },
                        resource: {
                            path: 'projects-template/entrypoint.js$renderJSImportWebcomponent'
                        },                    
                    },
                    children: ['l1', 'l2']
                },
                {
                    key: 't3',
                    type: 'importConfigurationObject',
                    data: {
                        insertionPoint: {
                            selectorId: 'pageSelector',
                            selectionKey: 'resume-template' // optional - if not present the element name is used.
                        },
                        resource: {
                            path: 'resume-template/entrypoint.js$renderJSImportWebcomponent'
                        },                    
                    },
                    children: ['l1', 'l2']
                },
                {
                    key: 'notFound',
                    type: 'importConfigurationObject',
                    data: {
                        insertionPoint: {
                            selectorId: 'pageSelector',
                            selectionKey: 'state404-template' // optional - if not present the element name is used.
                        },
                        resource: {
                            path: 'state404-template/entrypoint.js$renderJSImportWebcomponent'
                        },                    
                    },
                },

            ]
            this.routeConfig = [
                { // empty path
                    path: '',
                    templateKey: '902134075',
                },
                { 
                    path: 'contact',
                    templateKey: '15877890',
                },
                { 
                    path: 'news',
                    templateKey: 't1',
                },
                { 
                    path: 'projects',
                    templateKey: 't2',
                },
                { 
                    path: 'resume',
                    templateKey: 't3',
                },
                { // example for nested children
                    path: 'x',
                    templateKey: '15123',
                    children: [
                        {
                            path: 'sub1',
                            templateKey: ''
                        },
                        {
                            path: 'sub2',
                            templateKey: ''
                        },
                    ]
                },
            ]
            // this.toggleDir(this.mode.language)
            if('ontouchstart' in window) this.$.drawer.swipeOpen = true // allow open swipe on drawer for touchscreen devices.
            let drawer = this.$.drawer
            drawer.addEventListener('iron-select', (event) => {
                if(!drawer.persistent) drawer.close()
            })
    

        }

        connectedCallback() {
            super.connectedCallback();
        }

        rerenderDiretion(direction) {
            let drawer = this.$.drawer
            drawer.align = direction // not needed as it is directly data-binded.
            this.$.toolbar.dir = (direction == 'left') ? 'ltr' : 'rtl';
        }
        
        // hideSpinner() {
        //   this.showspinner = false;
        // }

        // toggleSpinner(newValue, oldValue) {
        //   console.log(this.$.spinner)
        //   (newValue == true) ? this.$.spinner.setAttribute('active', "") : this.$.spinner.removeProperty("active");
        // }

    }

})() // async

export default async () => {
    if(!customElements.get(component.elementName)) { // if element not defined wait till custom element is registered
        await customElements.whenDefined(component.elementName)
    }

    return component.elementName
}