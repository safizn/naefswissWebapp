import resolveObjectPath from '/@javascript/resolveObjectPath.js'
import convertParamsIntoURLEncodedQuery from '/@javascript/convertParamsIntoURLEncodedQuery.js'

let staticClass; // dedup - prevent execution multiple times
export default async function() {
    let idb = (await import('/@javascript/idbPackage.manualNativeModuleExport.js')).default
    async function setIndexDB(resource) {
        let databaseName = 'webappContent',
        databaseVersion = 1,
        tableName = 'uiContent',
        transactionTableList = [ tableName ]
        let keysResult = await idb
            .open(databaseName, databaseVersion, upgradeDB => { upgradeDB.createObjectStore(tableName) })
            .then(async db => {
                for(let data of resource) {
                    await db.transaction(transactionTableList, 'readwrite')
                        .objectStore(tableName)
                        .put(data.value, data.keyname)
                }
                return db
            })
        return keysResult
    }
    
    async function getIndexDB({ indexdbTable, language}) {
        let databaseName = 'webappContent',
        databaseVersion = 1,
        tableName = indexdbTable,
        transactionTableList = [ tableName ]
        let content = await idb
            .open(databaseName, databaseVersion, upgradeDB => { upgradeDB.createObjectStore(tableName) })
            .then(async db => {
                return await db.transaction(transactionTableList, 'readonly')
                    .objectStore(tableName)
                    .get(language)
            })
        return content
    }

    async function getKeysIndexDB() {
        idb // ......
        .then(async db => {
            let tx = await db.transaction(transactionTableList)
            let table = tx.objectStore(tableName)
            let keyArray = []
            let key = table.iterateCursor.call(table, cursor => {
                if(!cursor) return 'No Keys'
                keyArray.push(cursor.key)
                cursor.continue()
            })
            return new Promise(async (resolve, reject) => {
                await tx.complete
                resolve(keyArray)
            })
        })
    }
    
    // TODO: structure data as object with keys in indexdb, such that data is configured per tem.
    return Superclass => {
        if(staticClass) return staticClass
        let array = []
        staticClass = class Localization extends Superclass {
                        
            static get properties() {
                return {
                    mode: { type: Object, notify: true, reflectToAttribute: false, },
                    localize: { // defining the function in the properties object of Polymer, allows for triggering re-rendering of its content in the template when the function value is set.
                        type: Function, notify: true,  
                        computed: '_localize(mode.language)'
                    },
                    direction: { type: String, notify: true, reflectToAttribute: true }                
                    // another solution instead of using observers.
                    // localize: { type: Function, 
                    //     computed: 'computeLocalize(mode.language)'
                    // },
                    // Memory based resource as opposed to requesting indexDB resource.
                    // resource: { type: Object, notify: true, reflectToAttribute: true,
                    //     value: {
                    //         Arabic: { greeting: 'مرحباً', contact: 'تواصل'},
                    //         English: { greeting: 'Hello', contact: 'contact' }
                    //     }
                    // },
                }
            }

            static get observers() {
                return [
                    'rerenderLocalization(mode.language)', // could be implemented with computed binding also.
                    'dispatchLanguageEvent(mode.language)',
                    'updateURL(mode.language)',
                    'toggleDir(mode.language)'
                ]
            }

            constructor() {
                super()
            }
            
            async ready() {
                super.ready()
                // this._createMethodObserver('rerenderLocalization(mode.language)', true);
                // this._createComputedProperty('localize', '_localize(mode.language)', true);
            }
            
            _localize(language) {
                return async function (indexdbTable, resourceKey) {
                    let contentObject = await getIndexDB({ indexdbTable, language: language })
                    let content = resolveObjectPath({ stringPath: resourceKey, object: contentObject })
                    content = (content) ? content : '𝔐𝔦𝔰𝔰𝔦𝔫𝔤 ℭ𝔬𝔫𝔱𝔢𝔫𝔱'; // fallback content
                    return content 
                    // return this.resource[language][resourceKey]
                }
            }
            
            rerenderLocalization(language, content) {
                // Save fetch promise to language reference
                if(!(language in staticClass.loadedResource)) {
                    staticClass.loadedResource[language] = this.loadLocalizationResource({ language: language, content }) // load resource if doesn't exist.
                    staticClass.loadedResource[language].then(() => {
                        this.dispatchLanguageLoaded(language, { bubbles: false })
                    })
                }
                // notify changes for each instance 
                staticClass.loadedResource[language].then(() => {
                    this.notifyPath('localize', this.localize.bind(this))
                    // this.localize = this.localize.bind(this) // update all localize template parts - doesn't work for some reason.
                    // this._propertiesChanged(this.__data, { localize: this.localize }, {localize: this.localize}) // skip value verification and comparison, execute change effect immidiately. using internal function
                })

            }

            loadLocalizationResource({ language, content = null }) {
                let contentPromise;
                if(!content) { // fetch resource
                    let params = {
                        language: language,
                        option: 'merged',
                        // key: 't1' // get specific version only of a speicific aggregation group.
                    }
                    let query = convertParamsIntoURLEncodedQuery(params)
                    let entrypointKey = 'ui'
                    contentPromise = fetch(`${this.app.setting.location.apiBasePath}/content/${entrypointKey}?${query}`, {
                        method: 'POST',
                        body: JSON.stringify({
                            extrafield: true,
                            schemaMode: 'nonStrict',
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
                    })
                    .catch(console.error)
                    .then(content => setIndexDB([{ keyname: language, value: content }]))
                } else {
                    contentPromise = setIndexDB([{ keyname: language, value: content }])
                }
                return contentPromise
            }
                
            dispatchLanguageLoaded(language, additionalOption = {}) {
                let eventOption = {detail: {language: language}, bubbles: true, composed: true}
                this.dispatchEvent(new CustomEvent('localization-language-loaded', Object.assign(eventOption, additionalOption)))
            }
            dispatchLanguageEvent(language) {
                this.dispatchEvent(new CustomEvent('localization-language-changed', {detail: {language: language}}))
            }

            updateURL(language) {
                // update URL route to include "?lang=<language>" parameter
                let url = new URL(window.location.href)
                // If your expected result is "http://foo.bar/?x=42&y=2"
                url.searchParams.set('language', language);
                history.replaceState({}, false, url)
            }

            toggleDir(language) {
                const rightDirectionLanguages = ['Arabic', "Hebrew"]
                let direction = (rightDirectionLanguages.includes(language)) ? 'right': 'left';
                this.direction = direction
            }    

            // computeLocalize(language) {
            //     console.log(language)
            //     // return (keyname) => {
            //     //     console.log(keyname)
            //     // }
            // }    

            async connectedCallback() {
                super.connectedCallback(); // to allow Polymer to hook into the element's lifecycle.

                // this.mode.language = 'English'; this.notifyPath('mode.language') // changing language should be followed by notification of the binding system in the default mode of dirty/shallow checking.


            }
                    
        }

        staticClass.loadedResource = {} // Track loaded languages, to prevent loaded same resource twice.

        return staticClass
    }

}

