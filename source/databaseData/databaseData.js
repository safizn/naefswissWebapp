let middlewareArray = require('./webappSetting/middleware')
let templateArray = require('./webappSetting/template')
let conditionArray = require('./webappSetting/condition')
let oAuthArray = require('./webappSetting/oAuth')
let schemaArray = require('./webappSetting/schema')

let webappSetting = [].concat.apply([], [
    middlewareArray, 
    templateArray,
    conditionArray,
    oAuthArray,
    schemaArray
])

export default {
    webappSetting, 
    webappContent: [
        require('./webappContent/article.js'),
        require('appscript/databaseData/content/language.js'),
        require('appscript/databaseData/content/country.js')
    ]
}