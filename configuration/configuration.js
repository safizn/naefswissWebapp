const path = require('path')

const   projectPath = "/project",
        applicationPath = `${projectPath}/application`,
        SourceCodePath = `${applicationPath}/source`,
        distributionPath = `${applicationPath}/distribution`
const resolvedModule = {
    get appDeploymentLifecyclePath() { return path.dirname( require.resolve(`@dependency/appDeploymentLifecycle/package.json`) )  },
    get javascriptTestRunnerPath() { return path.dirname( require.resolve(`@dependency/javascriptTestRunner/package.json`) ) }
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
    script: {
        hostMachine: [
            { // example for module path
                type: 'module',
                key: 'containerManager',
                path: './setup/node_modules/@dependency/appDeploymentManager/setup/script/bin/containerManager.js'
            },
            {
                type: 'directory',
                path: './setup/script/hostMachine' // relative to applicaiton repository root.
            }
        ],
        container: [ // entrypoint configuration map, paths are relative to external app.
            {
                key: 'build',
                path: `${resolvedModule.appDeploymentLifecyclePath}/entrypoint/build/build.js`,
            },
            {
                key: 'production',
                path: `${resolvedModule.appDeploymentLifecyclePath}/entrypoint/production/deployProduction.js`,
            },
            {
                key: 'run',
                path: `${resolvedModule.appDeploymentLifecyclePath}/entrypoint/run/run.js`,
            },
            {
                key: 'test',
                path: `${resolvedModule.javascriptTestRunnerPath}/setup/script/bin/javascriptTestRunner.js`,
            }
        ]
    },
    distribution,
    directory: {
        application: {
            hostAbsolutePath: path.resolve(`${__dirname}/../..`),
            containerAbsolutePath: `${projectPath}/application`
        },
        projectPath, 
        appDeploymentLifecyclePath: resolvedModule.appDeploymentLifecyclePath,
        SourceCodePath,
        DestinationPath: distributionPath, // deprecated distributionBasePath - TODO: rename and use instead distribution basePath
        distributionPath,
        gulpPath: `${resolvedModule.appDeploymentLifecyclePath}/entrypoint/build`,
        babelPath: `${resolvedModule.appDeploymentLifecyclePath}/babel_javascriptTranspilation.js`,
        serverSidePath: `${SourceCodePath}/${serverSide.folderName}`,
        clientSidePath: `${SourceCodePath}/${clientSide.folderName}`,
        clientSide,
        serverSide
    },
}