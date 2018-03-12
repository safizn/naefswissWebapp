const Polymer = window.Polymer
const SystemJS = window.SystemJS
import resolveObjectPath from '/asset/javascript/resolveObjectPath.js'
import convertParamsIntoURLEncodedQuery from '/asset/javascript/convertParamsIntoURLEncodedQuery.js'

export default async function() {
    let idb = await SystemJS.import('idb')    

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
    return Superclass => class extends Superclass {
       
        static get properties() {
            return {
                mode: { type: Object, notify: true, reflectToAttribute: true,
                    computed: '_mode(app)' 
                },
                localize: { // defining the function in the properties object of Polymer, allows for triggering re-rendering of its content in the template when the function value is set.
                    type: Function, notify: true,  
                    value: () => async function (indexdbTable, resourceKey) {
                        let language = this.mode.language // current selected language
                        let content = await getIndexDB({ indexdbTable, language: language })
                        return resolveObjectPath({ stringPath: resourceKey, object: content })
                        // return this.resource[language][resourceKey]
                    }
                },
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

        static get observers() { return [
            'rerenderLocalization(mode.language)', // could be implemented with computed binding also.
        ] }

        constructor() {
            super()

        }
        
        async ready() {
            super.ready()
            
            // Load language resources
            await this.loadResource('English')
            await this.loadResource('Arabic')
        }
        
        _mode(app) {
            return {
                language: app.setting.mode.language,
                accesibility: {
                    color: 'light'
                }
            }
        }

        async loadResource(language) {
            let params = {
                language: language,
                key: 't1'
            }
            let query = convertParamsIntoURLEncodedQuery(params)
            let entrypointKey = 'ui'
            let content = await fetch(`http://api.localhost/content/${entrypointKey}?${query}`, {
                method: 'POST',
                body: JSON.stringify({
                    extrafield: false
                }), 
                mode: 'cors',
                cache: 'no-cache',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).then(res => res.json())

            await setIndexDB([{ keyname: params.language, value: content[entrypointKey] }])
        }

        rerenderLocalization(language) {
            console.log(`🌐 Language changed to: ${language}`)
            // this.localize = this.localize.bind(this)
            // this.notifyPath('localize', this.localize.bind(this))
            this._propertiesChanged(this.__data, { localize: this.localize }, {localize: this.localize}) // skip value verification and comparison, execute change effect immidiately. using internal function
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

}

