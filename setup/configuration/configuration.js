const   projectPath = "/project",
        applicationPath = `${projectPath}/application`,
        appDeploymentLifecyclePath = `${applicationPath}/dependency/appDeploymentLifecycle`,
        SourceCodePath = `${applicationPath}/source`,
        distributionPath = `${applicationPath}/distribution`

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
        hostMachine: {
            path: './setup/script/hostMachine' // relative to applicaiton repository root.
        }, 
        container: [ // entrypoint configuration map, paths are relative to external app.
            {
                key: 'build',
                path: `${appDeploymentLifecyclePath}/entrypoint/build/build.js`,
            },
            {
                key: 'production',
                path: `${appDeploymentLifecyclePath}/entrypoint/production/deployProduction.js`,
            },
            {
                key: 'run',
                path: `${appDeploymentLifecyclePath}/entrypoint/run/run.js`,
            },
            {
                key: 'test',
                path: `${appDeploymentLifecyclePath}/entrypoint/test/test.js`,
            }
        ]
    },
    distribution,
    directory: {
        projectPath, 
        appDeploymentLifecyclePath,
        SourceCodePath,
        DestinationPath: distributionPath, // deprecated distributionBasePath - TODO: rename and use instead distribution basePath
        distributionPath,
        gulpPath: `${appDeploymentLifecyclePath}/entrypoint/build`,
        babelPath: `${appDeploymentLifecyclePath}/babel_javascriptTranspilation.js`,
        serverSidePath: `${SourceCodePath}/${serverSide.folderName}`,
        clientSidePath: `${SourceCodePath}/${clientSide.folderName}`,
        clientSide,
        serverSide
    },
}