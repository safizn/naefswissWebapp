const   path = require('path'),
        configuration = require('../../setup/configuration/configuration.js'),
        { addModuleResolutionPath } = require('./utility/addModuleResolutionPath.js'),
        babelJSTranspilerPath = path.normalize(`${configuration.directory.appDeploymentLifecyclePath}/babel_javascriptTranspilation.js/entrypoint.js`)

/** Set any environment variables before loading rest of the modules - this is done only in the entrypoint, since babel transforms the code */
process.env.SZN_DEBUG = true // show/hide console messages.
process.env.DEBUG = 'oidc-provider:*'

switch (process.env.DEPLOYMENT) {
    case 'production':
    break;
    case 'development':
    default:
        // Transpile js scripts on runtime using Babel.
        // global.SZN = {}
        // global.SZN.APP = require('appscript/configuration/configuration.export.js') // Load configuration settings. NOTE: babel doesn't order import correctly when compiling, therefore global.SZN is required in this file not in app.js.
        const babelJSCompiler = require(babelJSTranspilerPath)
        babelJSCompiler({
            babelConfigurationFile: 'serverRuntime.BabelConfig.js'
        })
    break;
}

require('./app.js')

