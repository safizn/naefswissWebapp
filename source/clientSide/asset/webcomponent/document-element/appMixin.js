const App = window.App
export default Superclass => class extends Superclass {
    static get properties() {
        return {
            app: {
                type: Object,
                value: () => { return App },
                notify: true,
                reflectToAttribute: true,
            },
        }
    }
}

// System.import('setting.behavior.js').then(exports => window.App.behavior.setting = exports.default);
// Mixins are not supported curretly by Polymer, and babel as a side effect of hacks created.
// window.App.mixin = window.App.mixin || {};
// System.import('setting.mixin.js').then(exports => window.App.mixin.setting = exports.default);

// class MixinBuilder {  
//     constructor(superclass) {
//         this.superclass = superclass;
//     }

//     with(...mixins) { 
//         return mixins.reduce((c, mixin) => mixin(c), this.superclass);
//     }
// }
// window.App.module.Mixin = (superclass) => new MixinBuilder(superclass);   
