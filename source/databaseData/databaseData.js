
export default async () => {
    let middlewareArray = (await import('./webappSetting/middleware')).default
    let templateArray = (await import('./webappSetting/template')).default
    let conditionArray = (await import('./webappSetting/condition')).default
    let oAuthArray = (await import('./webappSetting/oAuth')).default
    let schemaArray = (await import('./webappSetting/schema')).default
    
    let webappSetting = [].concat.apply([], [
        middlewareArray, 
        templateArray,
        conditionArray,
        oAuthArray,
        schemaArray
    ])
    
    return {
        webappSetting, 
        webappContent: [
            (await import('./webappContent/personalInfo.js')).default,
            (await import('./webappContent/ui.js')).default,
            (await import('./webappContent/article.js')).default,
            (await import('appscript/databaseData/content/language.js')).default,
            (await import('appscript/databaseData/content/relationship.js')).default,
            (await import('appscript/databaseData/content/country.js')).default
        ]
    }
}