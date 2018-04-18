
export default async () => {
    let middlewareArray = await import('./webappSetting/middleware')
    let templateArray = await import('./webappSetting/template')
    let conditionArray = await import('./webappSetting/condition')
    let oAuthArray = await import('./webappSetting/oAuth')
    let schemaArray = await import('./webappSetting/schema')
    
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
            await import('./webappContent/personalInfo.js'),
            await import('./webappContent/ui.js'),
            await import('./webappContent/article.js'),
            await import('appscript/databaseData/content/language.js'),
            await import('appscript/databaseData/content/relationship.js'),
            await import('appscript/databaseData/content/country.js')
        ]
    }
}