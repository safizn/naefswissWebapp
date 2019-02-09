const path = require('path')
const   projectPath = "/project",
        SourceCodePath = `${applicationPath}/source`,
        distributionPath = `${applicationPath}/distribution`
const resolvedModule = {
    get deploymentScript() { return path.dirname( require.resolve(`@dependency/deploymentScript/package.json`) )  },
    get javascriptTestRunner() { return path.dirname( require.resolve(`@dependency/javascriptTestRunner/package.json`) ) }
}
        
const   clientSide = {
            folderName: 'clientSide',
        },
        serverSide = {
            folderName: `serverSide`
        }

const distribution = {
    clientSide: {
        native: {
            prefix: 'nativeClientSide'
        },
        polyfill: {
            prefix: 'polyfillClientSide'
        }
    },
    serverSide: {
        folderName: serverSide.folderName
    }
}

module.exports = {
    databaseVersion: 1,
    dockerImageName: 'naefswiss-webapp',
    domain: 'naifaboswiss.com',
    hostStorageFolderName: 'naifaboswiss', // remote production folder
    stackName: 'naifaboswisswebapp',
    script: [
        {
            type: 'module',
            key: 'containerManager',
            path: './setup/node_modules/@dependency/scriptManager/setup/script/bin/containerManager.js'
        },
        {
            type: 'directory',
            path: './setup/script/hostMachine' // relative to applicaiton repository root.
        },
        {
            key: 'build',
            path: `${resolvedModule.deploymentScript}/entrypoint/build/build.js`,
        },
        {
            key: 'production',
            path: `${resolvedModule.deploymentScript}/entrypoint/production/deployProduction.js`,
        },
        {
            key: 'run',
            path: `${resolvedModule.deploymentScript}/entrypoint/run/run.js`,
        },
        {
            key: 'test',
            path: `${resolvedModule.javascriptTestRunner}/setup/script/bin/javascriptTestRunner.js`,
        }
    ],
    distribution,
    directory: {
        root: path.resolve(`${__dirname}/..`),
        application: {
            containerAbsolutePath: `${projectPath}/application`
        },
        projectPath, 
        deploymentScriptPath: resolvedModule.deploymentScript,
        SourceCodePath,
        DestinationPath: distributionPath, // deprecated distributionBasePath - TODO: rename and use instead distribution basePath
        distributionPath,
        gulpPath: `${resolvedModule.deploymentScript}/entrypoint/build`,
        babelPath: `${resolvedModule.deploymentScript}/babel_javascriptTranspilation.js`,
        serverSidePath: `${SourceCodePath}/${serverSide.folderName}`,
        clientSidePath: `${SourceCodePath}/${clientSide.folderName}`,
        clientSide,
        serverSide
    },
}
